import { useProjectTasksStore } from "@/store/useProjectTasksStore";
import { useState } from "react";
import Loader from "../../tools/loader";
import { useProtected } from "@/app/context/ContextProvider";

type AddCommentsProps = {
  projectId: string;
  taskId: string;
};

export default function AddCommentsToTask({
  projectId,
  taskId,
}: AddCommentsProps) {
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { addComment, refreshComments } = useProjectTasksStore();
    const { userDetail, loading, error, refreshUserDetail } = useProtected()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setIsLoading(true);
    const success = await addComment(projectId, taskId, comment);

    setIsLoading(false);

    if (success) {
      setComment("");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-between h-32">
            <p className="w-6.75 h-6.75 flex items-center justify-center gap-[4.15px] rounded-full  pt-[8.72px] pr-[4.98px] pb-[8.72px] pl-[4.98px] bg-orange-200">
              {userDetail?.name.substring(0, 2)}
            </p>
          <form
            onSubmit={handleSubmit}
            className="flex items-end flex-col gap-2.5 justify-between h-full w-11/12 rounded-xl"
          >
            <div className="flex justify-between bg-gray-100 h-20 w-full rounded-xl">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Ajouter un commentaire..."
                className="w-full h-full border-2"
              />
            </div>
            <button
              type="submit"
              disabled={!comment.trim()}
              className={` text-white rounded-xl w-2xs h-12 disabled:opacity-50 ${!comment.trim() ? "bg-gray-400" : `bg-black`}`}
            >
              Envoyer
            </button>
          </form>
        </div>
      )}
    </>
  );
}
