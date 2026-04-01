import { useState } from "react"
import InputForm from "./input"
import SearchUser from "../userShearch/usershearch"
import {CreateProject} from "../../../app/(protected)/function"

export default function CreatProject() {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [users, setUsers] = useState<string[]>([])

    const handleChange = ()=>{
        CreateProject({Title:title,description:description,userIds:users})
    }

    return (
        <form action={handleChange}>
            <InputForm idvalue="titre" type="text" onchange={(e) => setTitle(e.target.value)} labelText="titre" valueInput={title} />
            <InputForm idvalue="description" type="text" onchange={(e) => setDescription(e.target.value)} labelText="description" valueInput={description}/>
            <SearchUser userSelected={users} setUserSelected={setUsers} />
            <button type="submit">Crée</button>
            
        </form>
    )
}