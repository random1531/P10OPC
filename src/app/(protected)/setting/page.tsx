"use client";
import { useProtected } from "../../context/ContextProvider";
import UserChangeForm from "@/components/ui/form/userChange";
import Button from "@/components/ui/button/button";

export default function setting() {
  const { userDetail, loading, error, refreshUserDetail } = useProtected();
  

  return (
    <div className="flex flex-col gap-3 w-full items-center mt-14">
      <div className="flex flex-col gap-11 w-5/6 bg-white pt-10 pb-10 pr-14 pl-14 rounded-xl border-2 border-gray-200">
        <div className="flex flex-col">
          <p>Mon compte</p>
          <p>{userDetail?.name}</p>
        </div>
        <UserChangeForm />
     
      </div>
        <Button onclick={() => localStorage.clear()} textBtn="Déconnexion"/>
    </div>
  );
}
