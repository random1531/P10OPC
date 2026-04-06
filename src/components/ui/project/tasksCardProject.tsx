import { FaChevronUp } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import ModifTaskProject from "../projectDetail/modifiTaskProject";
import Comments from "../task/comments/comments";
import AddCommentsToTask from "../task/comments/addComments";
import type { Task } from "@/types/task";
import Badge from "../badge/badge";
import { DeleteTask } from "@/features/task/api";
import { useProtected } from "@/app/context/ContextProvider";
import { useProjectTasksStore } from "@/store/useProjectTasksStore";
interface TasksCardProjectProps {
    task: Task;
    isOpen: string | null;
    setIsOpen: (id: string | null) => void;
    projectId: string;
    ownerId?: string;
}
export default function TasksCardProject({
    task,
    isOpen,
    setIsOpen,
    projectId,
    ownerId
}: TasksCardProjectProps) {
    const { userDetail, refreshProjects } = useProtected();
    const { deleteTask } = useProjectTasksStore()
    const isAuthorised =
        task.assignees.some(a => a.user.id === userDetail?.id) ||
        ownerId === userDetail?.id;

    const handleToggleComments = () => {
        setIsOpen(isOpen === task.id ? null : task.id);
    };

    const handleDelete = async () => {
        await deleteTask(task.projectId, task.id);

    };

    const formattedDate = `${new Date(task.dueDate).getDate()} ${new Date(task.dueDate).toLocaleString("fr-FR", { month: "long" })}`;

    return (
        <div className="flex flex-col w-full gap-6 bg-white rounded-xl border-gray-100 border-2 py-5 px-4 sm:px-6 md:px-8">
            <div className="flex flex-col w-full gap-6">

                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <p className="font-semibold text-lg text-black">{task.title}</p>
                            <Badge status={task.status} />
                        </div>
                        <p className="text-sm font-normal text-gray-600">{task.description}</p>
                    </div>
                    <ModifTaskProject
                        Autorised={isAuthorised}
                        Delete={handleDelete}
                    />
                </div>


                <p className="flex w-full items-center font-normal text-[12px] text-gray-600">
                    Échéance:{" "}
                    <span className="flex gap-1 items-center font-normal text-[12px] text-black">
                        <CiCalendarDate /> {formattedDate}
                    </span>
                </p>


                <div>
                    <p>Assigné à :</p>
                    <div className="flex gap-2.5">
                        {task.assignees.map((assignee) => (
                            <p key={assignee.id}>
                                {assignee.user.name.substring(0, 2).toUpperCase()} {assignee.user.name}
                            </p>
                        ))}
                    </div>
                </div>

                <hr />


                <div className="flex justify-between">
                    <p>Commentaires ({task.comments.length})</p>
                    <FaChevronUp
                        onClick={handleToggleComments}
                        className={`cursor-pointer transition-transform duration-200 ${isOpen === task.id ? "rotate-180" : ""}`}
                    />
                </div>
            </div>


            {isOpen === task.id && (
                <div className="flex flex-col gap-4">
                    {task.comments.map((comment, index) => (
                        <Comments
                            key={comment?.id || `comment-${index}`}
                            comment={comment}
                            currentUserId={userDetail?.id}
                            taskId={task.id}
                            projectId={task.projectId}
                        />
                    ))}
                    <AddCommentsToTask projectId={projectId} taskId={task.id} />
                </div>
            )}
        </div>
    );
}