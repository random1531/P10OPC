import InputFunction from "@/components/ui/form/input";
import { UpdateUser } from "@/features/auth/api";
import { useEffect, useState } from "react";
import { useProtected } from "@/app/context/ContextProvider";
import Button from "../button/button";
import ModalCreateTask from "../modal/ModalProps";
import ChangePassword from "./changePassword";
export default function userChange() {
  const { userDetail, loading, error } = useProtected();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userDetail) {
      setEmail(userDetail?.email);
      setName(userDetail?.name);
    }
  }, [userDetail]);

  return (<>
  {isOpen && ( <ModalCreateTask onClose={()=>setIsOpen(false)}>
    <ChangePassword close={()=>setIsOpen(false)}/>
  </ModalCreateTask>)}
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

      </div>
      <Button
        onclick={() => {
          "";
        }}
        textBtn="Modifier les informations"
      />
    </form>
        <div>
          {isOpen===false &&  ( <Button textBtn="Modifier Mot de passe" onclick={()=>setIsOpen(true)}/>) }
         
          {isOpen && (
          <form>
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
              <Button textBtn="Enregistrer"/>
            </form>
          )}
        </div>
        </>
  );
}
