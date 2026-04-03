import { useState } from "react"
import InputForm from "./input"
import SearchUser from "../userShearch/usershearch"
import { useProjectStore } from "@/store/useProjectStore"

export default function CreatProject({ onClose }: { onClose: () => void }) {
    const { addProject } = useProjectStore()
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [users, setUsers] = useState<string[]>([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await addProject(title, description, users)
        if (success) {
            onClose() 
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputForm idvalue="titre" type="text" onchange={(e) => setTitle(e.target.value)} labelText="titre" valueInput={title} />
            <InputForm idvalue="description" type="text" onchange={(e) => setDescription(e.target.value)} labelText="description" valueInput={description}/>
            <SearchUser userSelected={users} setUserSelected={setUsers} />
            <button type="submit">Créer</button>
        </form>
    )
}