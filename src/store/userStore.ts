import { create } from 'zustand';


interface UserState {
  user: any;
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<any>;
}

export const useUserStore = create<UserState>((set) => {
 
  let initialToken: string | null = null;
  if (typeof window !== 'undefined') {
    initialToken = localStorage.getItem('token');
  }
  return {
    user: null,
    token: initialToken,
    setUser: (user) => set({ user }),
    setToken: (token) => {
      if (typeof window !== 'undefined') {
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      }
      set({ token });
    },
    login: async (email, password) => {
      const formData = { email, password };
      try {
        const res = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return null;
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", data.data.token);
        }
        set({ user: data.data.user, token: data.data.token });
        return data;
        
      } catch (error) {
        console.log("Erreur lors de la connexion:", error);
        return null;
      }
    },
  };
});
