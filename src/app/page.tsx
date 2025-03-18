import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen ">
      <Header/>
    </div>
    
  );
}

function Header(){
  return(
    <div className="bg-black text-white px-30 py-10 flex text-2xl justify-between ">
      <Image src={"/vr-logo.png"} width={160} height={160} alt="vr tech info logo" />
      <ul className="flex    w-1/3">
        <div className="self-center flex justify-between w-full ">
          <li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2"><Link href={"/"}>Home</Link></li>
          <li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2"><Link href={"/"}>About Us</Link></li>
          <li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2"><Link href={"/"}>Services</Link></li>
          <li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2"><Link href={"/"}>Careers</Link></li>
        </div>
      </ul>

      <div className="self-center border-2 border-red-800 rounded-3xl hover:bg-red-800 px-5 py-1 shadow-inner"><Link href="">Contact Us</Link></div>
    </div>
  )
}


function Hero(){
   return(
    <div className="bg-black"></div>
   )
}