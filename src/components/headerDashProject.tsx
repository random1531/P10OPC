import { usePathname } from "next/navigation";

export default function HeaderDashProject({ useName,open }: { useName: string | undefined,open: ()=> void }) {
    const pathname = usePathname();
    const Dash = pathname === '/dashboard';
    const Project = pathname === '/project';

    if (!Dash && !Project) return null;

    return (
        <div className="flex justify-between w-full">
            <div className="">
                <h2 className="font-sans font-semibold text-2xl text-[#1F1F1F]">
                    {Dash ? "Tableau de bord" : "Mes projets"}
                </h2>
                <p className="font-sans font-normal text-lg text-black">
                    {Dash
                        ? `Bonjour ${useName} voici un aperçu de vos projets et tâches`
                        : "Gérez vos projets"}
                </p>
            </div>
            <div className="">
                <button onClick={open} className="flex gap-2.5 text-white rounded-[10px] pt-[13px] pr-[74px] pb-[13px] pl-[74px] bg-gray-800 cursor-pointer">
                    + Créer un projet
                </button>
            </div>
        </div>
    );
}