"use client"
import { useProtected } from "../../context/ContextProvider"
export default function setting(){
 const { userDetail, loading, error, refreshUserDetail } = useProtected();

    return(
        <div className="flex flex-col gap-3">
            <label htmlFor="name">Nom</label>
            <input id="name" className="w-2xs bg-amber-200" type="text"  value={userDetail?.name}disabled/>
            <label htmlFor="email">Email</label>
            <input id="email" className="w-2xs bg-amber-200" type="text" value={userDetail?.email} disabled/>
            
        </div>
    )
}