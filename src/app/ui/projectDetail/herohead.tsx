import { HiSparkles } from "react-icons/hi";
export default function HeroHeader({ ProjectName, ProjectDescription, onCreateTask,
    onCreateIATask }:
    {
        ProjectName: string | undefined, ProjectDescription: string | undefined, onCreateTask: () => void;
        onCreateIATask: () => void;
    }) {
    return (
        <div className="w-full flex justify-between">
            <div className="flex flex-col gap-3.5">

                <p className="font-sans font-semibold text-2xl text-[#1F1F1F]">{ProjectName}</p>
                <p className="font-sans font-normal text-lg text-gray-500">{ProjectDescription}</p>
            </div>
            <div className="flex  gap-2.5 items-center">
                <button onClick={onCreateTask} className="bg-black text-white pt-3.5 pb-3.5 pl-9 pr-9 cursor-pointer rounded-xl">
                    Créer une tâche
                </button>

                <button onClick={onCreateIATask} className="flex gap-1 items-center bg-[#D3590B] text-white cursor-pointer pt-3.5 pb-3.5 pl-9 pr-9 rounded-xl">
                    <HiSparkles />  IA
                </button>
            </div>
        </div>
    )
}