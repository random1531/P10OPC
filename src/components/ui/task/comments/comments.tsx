import type { Comment } from "@/types/task";
import { useProjectTasksStore } from "@/store/useProjectTasksStore";
import { useState } from "react";
import Loader from "../../tools/loader";
import { FaRegTrashAlt } from "react-icons/fa";

type CommentsProps = {
  comment: Comment;
  currentUserId?: string;
  projectId: string;
  taskId: string;
};

export default function Comments({
  comment,
  currentUserId,
  projectId,
  taskId,
}: CommentsProps) {
  const { deleteComment } = useProjectTasksStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    console.log(projectId)
    await deleteComment(projectId,taskId, comment.id);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-between h-20">
            <p>{comment?.author?.name.substring(0, 2)}</p>
            <div className="flex justify-between bg-gray-100 h-20 w-11/12 rounded-xl p-4">
              <div className="flex flex-col justify-between">
                <p>{comment?.author?.name}</p>
                <p>{comment?.content}</p>
              </div>
              <div className="flex flex-col h-full justify-between items-end-safe">
                <p className="text-[10px] text-gray-600">
                  {new Date(comment?.createdAt).toLocaleDateString("fr-FR", {
                    dateStyle: "medium",
                  })}
                  ,{" "}
                  {new Date(comment?.createdAt).toLocaleTimeString("fr-FR", {
                    timeStyle: "short",
                  })}
                </p>
                {currentUserId && comment?.author?.id === currentUserId ? (
                  <FaRegTrashAlt
                    className="cursor-pointer"
                    onClick={handleDelete}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
