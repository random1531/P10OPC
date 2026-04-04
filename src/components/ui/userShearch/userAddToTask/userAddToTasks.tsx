import { ProjectMember } from "@/types/user";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function UserAddToTasks({ userMap }: { userMap?: ProjectMember[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])

    const handleClick = () => setIsOpen(!isOpen)

    const handleSelect = (userId: string) => {
        if (selectedUsers.includes(userId)) {
            // Si déjà sélectionné, on le retire
            setSelectedUsers(selectedUsers.filter(id => id !== userId))
        } else {
            // Sinon on l'ajoute
            setSelectedUsers([...selectedUsers, userId])
        }
    }

    return (
        <div className="rounded-[4px] h-auto border border-gray-200 py-[19px] px-[17px]">
            <div className="flex w-full justify-between">
                <p>{selectedUsers.length === 0 ? 'Choisir un ou plusieurs collaborateurs' : `${selectedUsers.length} sélectionné(s)`}</p>
                <FaChevronDown onClick={handleClick} />
            </div>
            {isOpen && (
                <div className="flex flex-col gap-2">
                    {userMap?.map((item) => (
                        <span 
                            key={item.user.id} 
                            onClick={() => handleSelect(item.user.id)}
                            className={`cursor-pointer ${selectedUsers.includes(item.user.id) ? 'font-bold text-blue-600' : ''}`}
                        >
                            {selectedUsers.includes(item.user.id) ? '✓ ' : ''}{item.user.name}
                        </span>
                    ))}
                </div>
            )}
        </div>)
}