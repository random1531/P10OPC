"use client"

import { ReactNode } from "react";

type ModalCreateTaskProps = {
    children?: ReactNode;
    onClose: () => void;
};

export default function ModalCreateTask({ children, onClose }: ModalCreateTaskProps) {
    return (
        <div className="flex items-center justify-center fixed inset-0 w-full h-full bg-gray-400 bg-opacity-60 z-50">
            <div className="relative w-80 h-96 bg-white rounded-xl shadow-lg flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                    aria-label="Fermer la modal"
                >
                    ×
                </button>
                <div className="flex-1 p-4 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}