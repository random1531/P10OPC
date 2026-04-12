import InputFunction from "@/components/ui/form/input";
import { UpdateUser } from "@/features/auth/api";
import { useEffect, useState } from "react";
import { useProtected } from "@/app/context/ContextProvider";
import Button from "../button/button";
export default function userChange() {
  const { userDetail, loading, error, refreshUserDetail } = useProtected();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (userDetail) {
      setEmail(userDetail?.email);
      setName(userDetail?.name);
    }
  }, [userDetail]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await UpdateUser({ name, email });
      }}
      className="flex flex-col gap-3 w-full"
      action=""
    >
      <div className="flex flex-col gap-3">
        <InputFunction
          valueInput={name}
          type="text"
          idvalue="name"
          labelText="Nom"
          onchange={(e) => setName(e.target.value)}
        />

        <div className="flex flex-col gap-3">
          <label htmlFor="prenom">Prénom</label>
          <input
            id="prenom"
            className="h-14 rounded-sm pt-5 pb-5 pr-4 pl-4 border border-gray-400 bg-white"
            type="text"
          />
        </div>
        <InputFunction
          valueInput={email}
          type="text"
          idvalue="email"
          labelText="Email"
          onchange={(e) => setEmail(e.target.value)}
        />

        <InputFunction
          type="password"
          idvalue="password"
          labelText="old Password"
        />
        <InputFunction
          type="password"
          idvalue="password"
          labelText="new Password"
        />
      </div>
      <Button onclick={()=>{""}} textBtn="Modifier les informations"/>
  
    </form>
  );
}
