import React from "react";

interface ProjectProgressProps {
    done: number;
    total: number;
}

export default function ProjectProgress({ done, total }: ProjectProgressProps) {
    const percent = Math.round((done * 100) / (total || 1));
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between font-normal text-[12px] text-gray-600">
                <p>Progression</p>
                <p>{percent} %</p>
            </div>
            <div className="w-full flex flex-col  gap-2">

            <div className="w-full bg-gray-200 rounded-[7px] h-2 overflow-hidden">
                <div
                    className="bg-[#D3590B] h-2 rounded-[7px] transition-all duration-300"
                    style={{ width: `${percent}%` }}
                    />
            </div>
            <div className="w-full text-start">
              <p className="font-normal text-[10px] text-gray-600">
                  {done}/{total} tâches terminées
                </p>
            </div>
                    </div>
        </div>
    );
}
