import type { User, ProjectMember } from "./user";

export type Project = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  owner: User;
  members: ProjectMember[];
  createdAt: string;
  updatedAt: string;
};
