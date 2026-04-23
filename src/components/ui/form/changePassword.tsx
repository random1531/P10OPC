import { useState } from "react";
import Button from "../button/button";
import InputFunction from "./input";
import { resetPassword } from "@/features/auth/api";

export default function ChangePassword({close}:{close: ()=>void}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({ currentPassword: oldPassword, newPassword: newPassword });
  
      setOldPassword("");
      setNewPassword("");
      close()
    } catch (err) {

    }
  };
console.log(oldPassword)
  return (
    <form onSubmit={handleChangePassword}>
      <InputFunction
        type="password"
        idvalue="oldPassword"
        labelText="Old password"
        onchange={(e) => setOldPassword(e.target.value)}
        valueInput={oldPassword}
      />
      <InputFunction
        type="password"
        idvalue="newPassword"
        labelText="New password"
        onchange={(e) => setNewPassword(e.target.value)}
        valueInput={newPassword}
      />
      <Button textBtn="Enregistrer" />
    </form>
  );
}
