import { useEffect, useState } from "react";
import { searchuserFc } from "./function";
import type { User } from "../../../types/user";
export default function SearchUser({
  userSelected,
  setUserSelected,
}: {
  userSelected: string[];
  setUserSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [useSh, setUseSh] = useState<string>("");
  const [UserFound, SetUserFound] = useState<User[]>([]);

  useEffect(() => {
    if (useSh.trim().length < 2) {
      SetUserFound([]);
      return;
    }
    const fetchUsers = async () => {
      const result = await searchuserFc({ searchUse: useSh });
      SetUserFound(result.data?.users || []);
    };
    fetchUsers();
  }, [useSh]);

  return (
    <div className="w-full">
      <input
        className="w-full"
        type="search"
        value={useSh}
        onChange={(e) => setUseSh(e.target.value)}
        placeholder="Rechercher un utilisateur..."
      />
      {Array.isArray(UserFound) &&
        UserFound.map((e) => (
          <div key={e.id} className="py-1">
            <button
              type="button"
              className="w-full text-left hover:bg-gray-50 px-2 py-1"
              onClick={() =>
                setUserSelected((prev) =>
                  prev.includes(e.email) ? prev.filter((p) => p !== e.email) : [...prev, e.email]
                )
              }
            >
              {e.name}
            </button>
            <hr />
          </div>
        ))}

      {userSelected.length === 0 ? null : (
        <div className="flex flex-wrap gap-2 mt-2">
          {userSelected.map((email) => (
            <button
              key={email}
              type="button"
              className="px-2 py-1 bg-gray-100 rounded text-sm"
              onClick={() => setUserSelected((prev) => prev.filter((p) => p !== email))}
            >
              {email} ×
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
