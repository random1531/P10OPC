import { useProtected } from "../../app/context/ContextProvider";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import { MdDashboard } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function header() {
  const { userDetail, loading, error, refreshUserDetail } = useProtected();
  const pathname = usePathname();
  const Dash = pathname === "/dashboard";
  const Project = pathname === "/project";
  const router = useRouter();

  return (
    <header className="flex items-center justify-between h-24 w-full bg-white py-2 sm:px-24 px-2">
      <Image
        src={Logo}
        width={147}
        height={19}
        alt="logo"
        className="flex align-middle sm:w-36.75 w-28"
      />

      <div className="flex sm:flex-row flex-col items-center gap-4">
        <div
          className={
            "flex items-center gap-4 lg:w-60 md:w-auto w-auto lg:h-20 md:h-20 h-auto justify-center rounded-xl" +
            (Dash ? " bg-black text-white" : "bg-white text-orange-500")
          }
        >
          <MdDashboard />
          <span>
            <Link href="/dashboard">Tableau de bord</Link>
          </span>
        </div>
        <div
          className={
            "flex items-center gap-4 lg:w-60 md:w-auto w-auto lg:h-20 md:h-20 h-auto justify-center rounded-xl" +
            (Project ? " bg-black text-white" : "bg-white text-orange-500")
          }
        >
          <FaFolderOpen />
          <span>
            <Link href="/project">Projets</Link>
          </span>
        </div>
      </div>

      <p
        onClick={() => router.push("/setting")}
        className="lg:h-16 md:h-12 h-8 lg:w-16 md:w-12 w-8 rounded-full bg-amber-300 flex items-center justify-center text-black"
      >
        {userDetail?.name.substring(0, 2).toUpperCase()}
      </p>
    </header>
  );
}
