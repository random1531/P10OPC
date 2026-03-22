"use client"
import {RegisterFunction} from "../function"
import React,{ useState } from "react"
import { useRouter } from "next/navigation";

export default function FormRegister(){
    const router = useRouter();
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const [message,setMessage]=useState("")

  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();
    setMessage("");
    const result = await RegisterFunction({email,password,name});
    if(result && result.success){
      router.push("/login");
    } else if(result && result.message) {
      setMessage(result.message);
    } else {
      setMessage("Une erreur est survenue lors de l'inscription.");
    }
  };
    
    return(
    <form onSubmit={handleSubmit}>
      <div>
        <label className="text-black" htmlFor="email">Email</label>
        <input 
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-black border border-gray-300 p-2 w-full rounded-xs"
        />
      </div>
      <div>
        <label className="text-black" htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black border-2 border-gray-300 rounded-xs p-2 w-full"
        />
      </div>
      <div>
        <label className="text-black" htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black border-2 border-gray-300 rounded-xs p-2 w-full"
        />
      </div>
      <p>{message}</p>
      <button className="text-white cursor-pointer bg-black w-full h-12 rounded-b-lg rounded-t-lg" type="submit">S'inscrire</button>
    </form>    
    )
}