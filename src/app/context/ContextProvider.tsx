"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


type Myproject = {

}

type UserDetail = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type Assignee = {
  id: string;
  userId: string;
  taskId: string;
  user: User;
  assignedAt: string;
};

type TaskComment = {
  id: string;
  content: string;
  taskId: string;
  authorId: string;
  author: User;
  createdAt: string;
  updatedAt: string;
};

type ProjectMember = {
  id: string;
  role: string;
  user: User;
  joinedAt: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  owner: User;
  members: ProjectMember[];
  createdAt: string;
  updatedAt: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  project: Project
  dueDate: string;
  projectId: string;
  creatorId: string;
  assignees: Assignee[];
  comments: TaskComment[];
  createdAt: string;
  updatedAt: string;
};
type ProtectedContextType = {
  tasks: Task[];
  userDetail: UserDetail | null;
  projects: Project[];
  loading: boolean;
  error: string | null;
  refreshAssignedTasks: () => Promise<void>;
  refreshUserDetail: () => Promise<void>;
  refreshProjects: () => Promise<void>;
};

const ProtectedContext = createContext<ProtectedContextType | undefined>(
  undefined
);

export function ProtectedProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userDetail, SetUserDetail] = useState<UserDetail | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refreshProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token introuvable");
        setProjects([]);
        return;
      }
      const response = await fetch("http://localhost:8000/projects", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la récupération");
      }
      setProjects(result.data.projects || []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };


  const refreshUserDetail = async () => {
    try {
      setLoading(true);
      setError(null)
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token introuvable");
        setTasks([]);
        return;
      }
      const reponse = await fetch("http://localhost:8000/auth/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      const result = await reponse.json();
      if (!reponse) {
        throw new Error(result.message || "Erreur lors de la récupération")
      }
      SetUserDetail(result.data.user)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshAssignedTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token introuvable");
        setTasks([]);
        return;
      }

      const response = await fetch(
        "http://localhost:8000/dashboard/assigned-tasks",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erreur lors de la récupération");
      }

      setTasks(result.data.tasks || []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAssignedTasks();
    refreshUserDetail();
    refreshProjects();
  }, []);

  return (
    <ProtectedContext.Provider
      value={{
        tasks,
        loading,
        error,
        userDetail,
        projects,
        refreshUserDetail,
        refreshAssignedTasks,
        refreshProjects,
      }}
    >
      {children}
    </ProtectedContext.Provider>
  );
}

export function useProtected() {
  const context = useContext(ProtectedContext);

  if (!context) {
    throw new Error("useProtected must be used inside ProtectedProvider");
  }

  return context;
}