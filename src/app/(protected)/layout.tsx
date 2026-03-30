"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../ui/header"
import { ProtectedProvider } from "../context/ContextProvider"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return <>
    <ProtectedProvider>
      <Header />

      {children}
    </ProtectedProvider>
  </>;
}