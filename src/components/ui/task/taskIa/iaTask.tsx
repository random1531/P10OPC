import { FaPencilAlt } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
export default function iaTask({
  TaskName,
  Description,
  handleDelete,
  handleModif,
  onChangeName,
  onChangeDescription,
}: {
  TaskName: string;
  Description: string;
  handleDelete: () => void;
  handleModif?:()=>void
  onChangeName?: (val: string) => void;
  onChangeDescription?: (val: string) => void;
}) {
  return (
    <div className="flex flex-col w-full pt-6 pb-6 pr-10 pl-10 gap-8 border-gray-200 border rounded-xl">
      <div className="flex flex-col gap-2">
        <textarea
          className="text-lg text-w-bold"
          value={TaskName}
          onChange={(e) => onChangeName && onChangeName(e.target.value)}
        />
        <textarea
          className="text-sm text-gray-600"
          value={Description}
          onChange={(e) => onChangeDescription && onChangeDescription(e.target.value)}
        /> </div>
      <div>
        <div className="flex w- full">
          <div
            onClick={handleDelete}
            className="flex w-1/2 gap-1 items-center cursor-pointer"
          >
            <CiTrash />
            <p>Supprimer</p>
          </div>
          <div 
          onClick={handleModif}
          className="flex w-1/2 gap-1 items-center">
            <FaPencilAlt />
            <p>Modifier</p>
          </div>
        </div>
      </div>
    </div>
  );
}
