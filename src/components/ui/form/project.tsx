import { useState } from "react";
import InputForm from "./input";
import SearchUser from "../userShearch/usershearch";
import { useProjectStore } from "@/store/useProjectStore";
import UserAddToProject from "../userShearch/userAddToTask/userAddToProject";

export default function CreatProject({ onClose }: { onClose: () => void }) {
  const { addProject } = useProjectStore();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addProject(title, description, users);
    if (success) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
      <h2 className="font-manrope font-semibold text-[24px]">
        Créer un projet
      </h2>
      <InputForm
        idvalue="titre"
        type="text"
        onchange={(e) => setTitle(e.target.value)}
        labelText="Titre*"
        valueInput={title}
      />
      <InputForm
        idvalue="description"
        type="text"
        onchange={(e) => setDescription(e.target.value)}
        labelText="Description*"
        valueInput={description}
      />
      <label>Contributeur</label>

      <UserAddToProject onSelectionChange={(ids) => setUsers(ids)} />
      <button
        className="flex gap-2.5 rounded-[10px] py-3.25 px-18.5 bg-black text-white "
        type="submit"
      >
        Ajouter un projet
      </button>
    </form>
  );
}
