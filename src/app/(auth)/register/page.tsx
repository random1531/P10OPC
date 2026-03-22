import pic from "../../../../public/aze.jpg"
import logo from "../../../../public/logo.png"
import Image from "next/image"
import RegisterForm from "./form"
export default function Register(){
    return(
   <div className="h-fit flex  justify-start w-full relative">
      <div className="flex flex-col items-center min-h-screen bg-white justify-between w-lg z-20 pt-14 pb-14">
        <Image src={logo} alt="logo" width={252} height={32} />
        <RegisterForm />
        <p className="text-black">Pas encore de compte ?</p>
      </div>
      <Image src={pic} alt="aze" width={500} height={100} className="absolute z-10 object-cover w-full h-full" />

      <div className="left">

      </div>

    </div>
    )
}