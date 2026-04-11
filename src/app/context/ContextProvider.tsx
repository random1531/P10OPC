"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type UserDetail = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type ProtectedContextType = {
  userDetail: UserDetail | null;
  loading: boolean;
  error: string | null;
  refreshUserDetail: () => Promise<void>;
};

const ProtectedContext = createContext<ProtectedContextType | undefined>(
  undefined,
);

export function ProtectedProvider({ children }: { children: ReactNode }) {
  const [userDetail, SetUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUserDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token introuvable");
        return;
      }
      const reponse = await fetch("http://localhost:8000/auth/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await reponse.json();
      if (!reponse.ok) {
        throw new Error(result.message || "Erreur lors de la récupération");
      }
      SetUserDetail(result.data.user);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUserDetail();
  }, []);

  return (
    <ProtectedContext.Provider
      value={{
        loading,
        error,
        userDetail,
        refreshUserDetail,
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
