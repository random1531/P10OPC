import { HiSparkles } from "react-icons/hi";

type HeroHeaderProps = {
  ProjectName: string | undefined;
  ProjectDescription: string | undefined;
  onCreateTask: () => void;
  onCreateIATask: () => void;
  OpenModifProject: () => void;
};

export default function HeroHeader({
  ProjectName,
  ProjectDescription,
  onCreateTask,
  onCreateIATask,
  OpenModifProject,
}: HeroHeaderProps) {
  return (
    <div className="w-full flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col gap-2 max-w-full md:max-w-2xl">
        <div className="flex gap-2 items-center">
          <p className="font-sans font-semibold text-2xl sm:text-3xl text-[#1F1F1F] wrap-break-words">
            {ProjectName}
          </p>
          <p
            className="text-[#D3590B] underline cursor-pointer"
            onClick={OpenModifProject}
          >
            Modifier
          </p>
        </div>
        <p className="font-sans font-normal text-sm sm:text-base md:text-lg text-gray-500 wrap-break-words">
          {ProjectDescription}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:justify-end">
        <button
          onClick={onCreateTask}
          className="bg-black text-white py-3 px-5 sm:px-7 md:px-9 cursor-pointer rounded-xl w-full sm:w-auto"
        >
          Créer une tâche
        </button>

        <button
          onClick={onCreateIATask}
          className="flex gap-2 items-center justify-center bg-[#D3590B] text-white cursor-pointer py-3 px-5 sm:px-7 md:px-9 rounded-xl w-full sm:w-auto"
        >
          <HiSparkles />
          IA
        </button>
      </div>
    </div>
  );
}
