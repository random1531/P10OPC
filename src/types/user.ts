export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectMember = {
  id: string;
  role: string;
  user: User;
  joinedAt: string;
};
