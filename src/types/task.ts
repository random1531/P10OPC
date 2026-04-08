import type { User } from "./user";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: string;
  projectId: string;
  creatorId: string;
  assignees: TaskAssignee[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

export type TaskAssignee = {
  id: string;
  userId: string;
  taskId: string;
  user: User;
  assignedAt: string;
};

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  taskId: string;
  author: User;
  createdAt: string;
  updatedAt: string;
};
