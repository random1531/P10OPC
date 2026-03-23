"use client"
import { useEffect, useState } from "react";
import { useProtected } from "../../context/ContextProvider"
import { UpdateUser } from "./function";
export default function setting() {
    const { userDetail, loading, error, refreshUserDetail } = useProtected();
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        if (userDetail) {
            setEmail(userDetail?.email);
            setName(userDetail?.name)
        }
    }, [userDetail])
    return (
        <div className="flex flex-col gap-3 w-full items-center mt-14">
            <div className="flex flex-col gap-11 w-5/6 bg-white pt-10 pb-10 pr-14 pl-14 rounded-xl border-2 border-gray-200">
            <div className="flex flex-col" >
                <p>Mon compte</p>
                <p>{userDetail?.name}</p>

            </div>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await UpdateUser({ name, email });
                }} className="flex flex-col gap-3 w-full" action="">
                    <div className="flex flex-col gap-3" >
                        <div className="flex flex-col gap-3">
                            <label htmlFor="name">Nom</label>
                            <input onChange={(e) => setName(e.target.value)} id="name" className="h-14  rounded-sm pt-5 pb-5 pr-4 pl-4 border-1 border-gray-400 bg-white" type="text" value={name} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="prenom">Prénom</label>
                            <input id="prenom" className="h-14 rounded-sm pt-5 pb-5 pr-4 pl-4 border-1 border-gray-400 bg-white" type="text" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} id="email" className="h-14 rounded-sm pt-5 pb-5 pr-4 pl-4 border-1 border-gray-400 bg-white" type="text" value={email} />
                        </div>
                    </div>
                      <div className="flex flex-col gap-3">
                            <label htmlFor="password">Password</label>
                            <input id="password" className="h-14 rounded-sm pt-5 pb-5 pr-4 pl-4 border-1 border-gray-400 bg-white" type="password"/>
                        </div>
                    <button type="submit" className="text-lg bg-black rounded-xl text-white pt-3 pb-3 pr-5 pl-5 w-3xs" >Modifier les informations</button>
                </form>
            </div>

        </div>
    )
}