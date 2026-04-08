import { useEffect, useState } from "react";
import InputFunction from "./input";
import Button from "../button/button";
import { useProjectStore } from "@/store/useProjectStore";
import type { Project } from "@/types/project";

export default function ProjetModif({ ids }: { ids: string }) {
  const { modifProject, projects, fetchProjects } = useProjectStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined,
  );

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (ids && projects.length > 0) {
      const foundProject = projects.find((project) => project.id === ids);
      setCurrentProject(foundProject);

      if (foundProject) {
        setTitle(foundProject.name || "");
        setDescription(foundProject.description || "");
      }
    }
  }, [ids, projects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && ids) {
      await modifProject(title, description, ids);
    }
    fetchProjects();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputFunction
        idvalue="title"
        type="text"
        onchange={(e) => setTitle(e.target.value)}
        labelText="Titre"
        valueInput={title}
      />
      <InputFunction
        idvalue="description"
        type="text"
        onchange={(e) => setDescription(e.target.value)}
        labelText="Description"
        valueInput={description}
      />
      <Button
        onclick={() =>
          handleSubmit({ preventDefault: () => {} } as React.FormEvent)
        }
        textBtn="Enregistrer"
        disabled={!title.trim() || !description.trim()}
      />
    </form>
  );
}
