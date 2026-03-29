import { FaPencilAlt } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
export default function iaTask({
  TaskName,
  Description,
}: {
  TaskName: string;
  Description: string;
}) {
  return (
    <div className="flex flex-col w-full pt-6 pb-6 pr-10 pl-10 gap-8 border-gray-200 border-1 rounded-xl">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg text-w-bold">{TaskName}</h3>
        <p className="text-sm text-gray-600">{Description}</p>
      </div>
      <div>
        <div className="flex w- full">
          <div className="flex w-1/2 gap-1 items-center">
            <CiTrash />
            <p>Supprimer</p>
          </div>
          <div className="flex w-1/2 gap-1 items-center">
            <FaPencilAlt />
            <p>Modifier</p>
          </div>
        </div>
      </div>
    </div>
  );
}
