import { FaFolderOpen } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import Badge from "../badge/badge";
export default function cardTaskKanban({
  taskname,
  description,
  projectName,
  duedate,
  totalcomment,
  badgeStatus,
}: {
  taskname: string;
  description: string;
  totalcomment: number;
  duedate: string;
  projectName: string;
  badgeStatus: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white w-full min-w-[320px] max-w-[370px] min-h-[180px] p-5 relative shadow-sm">
      <div className="flex w-full">
        <div className="flex flex-col gap-1 mb-3 w-2/3">
          <h5 className="text-black text-lg font-semibold">{taskname}</h5>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        <div className="top-4 right-4 w-1/3">
          <Badge status={badgeStatus} />
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <FaFolderOpen />
          <span>{projectName}</span>
        </div>
        <span>|</span>
        <div className="flex items-center gap-1">
          <FaCalendarAlt />
          <span>{duedate}</span>
        </div>
        <span>|</span>
        <div className="flex items-center gap-1">
          <MdComment />
          <span>{totalcomment}</span>
        </div>
      </div>

      <button className="bg-black text-white rounded-xl h-10 w-32 mt-auto">
        Voir
      </button>
    </div>
  );
}
