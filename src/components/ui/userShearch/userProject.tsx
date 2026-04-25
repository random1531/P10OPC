import { useEffect, useState } from "react";
import SearchUser from "./usershearch";
import type { User } from "../../../types/user";

export default function ProjectMembersManager({
  initialMembers,
  onAdd,
  onRemove,
  projectId,
}: {
  initialMembers: User[];
  onAdd: (projectId: string, emails: string[]) => Promise<boolean | void>;
  onRemove: (projectId: string, email: string) => Promise<boolean | void>;
  projectId: string;
}) {
  const [userSelected, setUserSelected] = useState<string[]>(
    initialMembers.map((m) => m.email),
  );

  useEffect(() => {
    setUserSelected(initialMembers.map((m) => m.email));
  }, [initialMembers]);

  const initialEmails = new Set(initialMembers.map((m) => m.email));

  const handleAdd = async () => {
    const toAdd = userSelected.filter((e) => !initialEmails.has(e));
    if (toAdd.length === 0) return;
    await onAdd(projectId, toAdd);
  };

  return (
    <div className="w-full">
      <SearchUser userSelected={userSelected} setUserSelected={setUserSelected} />
      <div className="flex flex-wrap gap-2 mt-2">
        {initialMembers.map((m) => (
          <button
            key={m.id}
            type="button"
            className="px-2 py-1 bg-gray-100 rounded text-sm"
            onClick={() => onRemove(projectId, m.email)}
          >
            {m.name} ×
          </button>
        ))}
      </div>
      <div className="mt-2">
        <button
          type="button"
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={handleAdd}
        >
          Ajouter sélection
        </button>
      </div>
    </div>
  );
}