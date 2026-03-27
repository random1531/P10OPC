"use client"

import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

type ModalCreateTaskProps = {
    children?: ReactNode;
    onClose: () => void;
};

export default function ModalCreateTask({ children, onClose }: ModalCreateTaskProps) {
    return (
        <div className="flex items-center justify-center fixed inset-0 w-full h-full bg-gray-100 bg-opacity-90 z-50">
            <div className="relative w-lg h-10/12 bg-white rounded-xl shadow-lg flex flex-col pt-18 pb-18 pr-16 pl-16">
            <IoIosClose  
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"  
            aria-label="Fermer la modal" 
            onClick={onClose}/>
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}