import { FaFolderOpen } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import Badge from "../badge/badge";
export default function cardTask({ taskname, description, projectName, duedate, totalcomment, badgeStatus }: { taskname: string, description: string, totalcomment: number, duedate: string, projectName: string, badgeStatus: string }) {

    return (
        <div className="flex items-center justify-between rounded-xl border-1 border-gray-200 w-full h-40 pt-6 pb-6 pl-10 pr-10">
            <div className="flex flex-col justify-items-start items-start gap-9">
                <div className="flex flex-col gap-2">
                <h5 className="text-black">{taskname}</h5>
                <p className="text-gray-500">{description}</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="flex text-gray-500 items-center justify-center  gap-1">
                        <FaFolderOpen />
                        <span>
                            {projectName}
                        </span>
                    </div>
                    <div className="flex text-gray-500 items-center justify-center  gap-1"><FaCalendarAlt />
                        <span>
                            {duedate}
                        </span>
                    </div>
                    <div className="flex text-gray-500 items-center justify-center  gap-1">
                        <MdComment />
                        <span>
                            {totalcomment}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end gap-9" >
                <Badge status={badgeStatus} />
                <button className="bg-black text-white rounded-xl h-12 w-32">Voir</button>
            </div>
        </div>
    )
}