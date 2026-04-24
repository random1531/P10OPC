import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputFunction from "./input";
import Button from "../button/button";
import { useProjectStore } from "@/store/useProjectStore";
import type { Project } from "@/types/project";

export default function ProjetModif({ ids }: { ids: string }) {
  const router = useRouter();
  const {
    modifProject,
    projects,
    fetchProjects,
    removeContributor,
    addContributor,
    deleteProject,
  } = useProjectStore();
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

  const handleDeleteProject = async () => {
    try {
      const success = await deleteProject(ids);
      if (success) {
        router.push("/project");
      }
    } catch (error) {}
  };

  const handleDeleteContributor = async ({
    idPorject,
    iduser,
  }: {
    idPorject: string;
    iduser: string;
  }) => {
    currentProject?.members.forEach((member, index) => {
    });

    const success = await removeContributor(idPorject, iduser);

    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await fetchProjects();
      const updatedProject = projects.find((p) => p.id === idPorject);
  
      setCurrentProject(updatedProject);
    }
   
  };
  return (
    <>
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
        <div className="flex flex-wrap w-full gap-1.5">
          {currentProject?.members.map((p) => (
            <p
              onClick={(e) =>
                handleDeleteContributor({
                  idPorject: currentProject.id,
                  iduser: p.user.id,
                })
              }
              className="p-1 bg-gray-200 rounded-xl cursor-pointer"
              key={p.id}
            >
              {p.user.name}
            </p>
          ))}
        </div>
        <Button
          onclick={handleDeleteProject}
          textBtn="Supprimer"
          disabled={false}
        />
      </form>
    </>
  );
}
