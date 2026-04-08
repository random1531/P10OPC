import { ProjectMember } from "@/types/user";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

interface UserAddToTasksProps {
  userMap?: ProjectMember[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

export default function UserAddToTasks({
  userMap,
  onSelectionChange,
}: UserAddToTasksProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    onSelectionChange?.(selectedUsers);
  }, [selectedUsers, onSelectionChange]);

  const handleClick = () => setIsOpen(!isOpen);

  const handleSelect = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="rounded-sm h-12 border border-gray-200 py-4 px-3 relative z-10">
      <div
        onClick={handleClick}
        className="flex w-full justify-between h-12 cursor-pointer"
      >
        <p>
          {selectedUsers.length === 0
            ? "Choisir un ou plusieurs collaborateurs"
            : `${selectedUsers.length} sélectionné(s)`}
        </p>
        <FaChevronDown />
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 absolute z-100 top-full left-0 w-full  border border-gray-200 bg-white">
          {userMap?.map((item) => (
            <span
              key={item.user.id}
              onClick={() => handleSelect(item.user.id)}
              className={`cursor-pointer ${selectedUsers.includes(item.user.id) ? "font-bold text-blue-600" : ""}`}
            >
              {selectedUsers.includes(item.user.id) ? "✓ " : ""}
              {item.user.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
