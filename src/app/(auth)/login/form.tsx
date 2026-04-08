"use client";
import { LoginFunction } from "../function";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

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
      <div>
        <label className="text-black" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-black border border-gray-300 p-2 w-full rounded-xs"
        />
      </div>
      <div>
        <label className="text-black" htmlFor="password">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black border-2 border-gray-300 rounded-xs p-2 w-full"
        />
      </div>
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
