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
  <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white w-full max-w-full p-4 sm:p-5 relative shadow-sm overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h5 className="text-black text-base sm:text-lg font-semibold line-clamp-2 wrap-break-word">
            {taskname}
          </h5>
          <p className="text-gray-500 text-sm mt-1 hidden sm:block line-clamp-3 wrap-break-word">
            {description}
          </p>
        </div>

        <div className="ml-3 self-start">
          <Badge status={badgeStatus} />
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 mt-3 flex-wrap">
        <div className="flex items-center gap-1 max-w-[40%]">
          <FaFolderOpen className="text-sm shrink-0" />
          <span className="hidden sm:inline truncate">{projectName}</span>
        </div>

        <span className="hidden sm:inline">|</span>

        <div className="flex items-center gap-1">
          <FaCalendarAlt className="text-sm shrink-0" />
          <span className="hidden sm:inline truncate">{duedate}</span>
        </div>

        <span className="hidden sm:inline">|</span>

        <div className="flex items-center gap-1">
          <MdComment className="text-sm shrink-0" />
          <span className="hidden sm:inline">{totalcomment}</span>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-black text-white rounded-xl h-8 w-20 sm:h-10 sm:w-32">
          Voir
        </button>
      </div>
    </div>
  );
}
