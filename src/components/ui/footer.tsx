import Image from "next/image"
import LogoBlack from "../../../public/logoBlack.png"
export default function Footer(){
    return(
        <footer className="h-16 bg-white flex items-center p-4 justify-between w-full">
            <Image src={LogoBlack} alt="logoblack" width={300} height={300} className="w-25 h-3.25"/>
            <p>Abricot 2025</p>
        </footer>
    )
}