import InputForm from "./input";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoginFunction } from "@/features/auth/api"

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await LoginFunction({ email, password });
    if (result && result.success) {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <h1 className="text-4xl text-orange-500 align-text-center font-medium w-full flex align-middle justify-center">
        Connexion
      </h1>
      <InputForm
        idvalue="email"
        type="text"
        onchange={(e) => setEmail(e.target.value)}
        labelText="email"
        valueInput={email}
      />
      <InputForm
        idvalue="password"
        type="text"
        onchange={(e) => setPassword(e.target.value)}
        labelText="password"
        valueInput={password}
      />
      <button
        className="text-white cursor-pointer bg-black w-full h-12 rounded-b-lg rounded-t-lg"
        type="submit"
      >
        Se connecter
      </button>
      <p className="w-full flex align-middle justify-center text-orange-400 underline">
        Mot de passe oublié?
      </p>
    </form>
  );
}
