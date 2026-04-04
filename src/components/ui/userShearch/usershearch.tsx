import { useEffect, useState } from "react"
import { searchuserFc } from "./function"
import type { User } from "../../../types/user"
export default function SearchUser({ userSelected, setUserSelected }:
    { userSelected: string[]; setUserSelected: React.Dispatch<React.SetStateAction<string[]>> }) {
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
                onChange={e => setUseSh(e.target.value)}
                placeholder="Rechercher un utilisateur..."
            />
            {Array.isArray(UserFound) && UserFound.map((e) => (
                <div key={e.id}>
                    <span className="h-2 w-full" onClick={() => setUserSelected(prev => [...prev, e.email])}>
                        {e.name}
                    </span>
                    <hr />
                </div>
            ))}

        </div>
    );
}