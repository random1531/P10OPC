import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useProjectStore } from "@/store/useProjectStore";

export default function ModifTaskProject({
  Delete,
  Autorised,
  Modif
}: {
  Delete: () => void;
  Autorised: boolean;
  Modif: ()=>void
}) {
  const [isopen, setIsOpen] = useState(false);


  return (
    <div className="relative flex items-center justify-center h-14 w-14 border-gray-200 border rounded-xl text-xs">
      <button
        type="button"
        className="cursor-pointer flex items-center justify-center w-full h-full"
        aria-label="modification suppression"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <BsThreeDots />
      </button>
      {isopen && (
        <div className="absolute top-0 left-0 min-w-30 border border-gray-200 z-20 bg-white rounded-lg shadow-lg py-2 animate-fade-in">
          <div className="flex flex-col w-full gap-1 h-full">
            <button
              onClick={Autorised ? Delete : undefined}
              className={`text-sm w-full px-3 py-2 text-left rounded-t-lg transition-colors
                            ${Autorised ? "hover:bg-red-100 text-red-600 cursor-pointer bg-white" : "text-gray-400 cursor-not-allowed bg-gray-100"}`}
              disabled={!Autorised}
            >
              Supprimé
            </button>
            <button onClick={Modif} className="text-sm w-full px-3 py-2 text-left hover:bg-orange-100 transition-colors">
              Modifié
            </button>
            <button
              className="text-sm w-full px-3 py-2 text-left hover:bg-gray-100 rounded-b-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Fermé
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
