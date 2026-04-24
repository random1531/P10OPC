"use client"
import Button from "@/components/ui/button/button";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function NotFound() {
    const router = useRouter()
  return (
    <div className="text-center mt-24 w-full h-full flex flex-col gap-25 items-center justify-center">
      <Image src="/logo.png"  width={400} height={200} alt="logo"/>      
      <h1>404 - Page introuvable</h1>
      <p>La page que vous cherchez n'existe pas.</p>
      <Button textBtn="Accueil" onclick={()=>router.replace("/")}/>
    </div>
  );
}