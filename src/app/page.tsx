import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="h-screen w-screen ">
			<Header />
			<Hero />
		</div>
	);
}

function Header() {
	return (
		<div className="bg-black text-white px-30 py-10 flex text-2xl justify-between ">
			<Image
				src={"/vr-logo.png"}
				width={160}
				height={160}
				alt="vr tech info logo"
			/>
			<ul className="flex    w-1/3">
				<div className="self-center flex justify-between w-full ">
					<li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
						<Link href={"/"}>Home</Link>
					</li>
					<li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
						<Link href={"/"}>About Us</Link>
					</li>
					<li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
						<Link href={"/"}>Services</Link>
					</li>
					<li className=" hover:underline underline-offset-10 decoration-red-800 decoration-4 pb-2">
						<Link href={"/"}>Careers</Link>
					</li>
				</div>
			</ul>

			<div className="self-center border-2 border-red-800 rounded-3xl hover:bg-red-800 px-5 py-1 shadow-inner">
				<Link href="">Contact Us</Link>
			</div>
		</div>
	);
}

function Hero() {
	return (
		<div className="bg-black text-white w-full">
			<div className="flex justify-center pt-30 pb-20">
				<h1 className="text-8xl font-bold">
					<span className="text-red-800">I</span>nnovate!
				</h1>
			</div>
			<div className="font-medium">
        <div className="flex justify-center  text-3xl pb-2">
          <p className="">
            Empowering Your Business with Cutting-Edge Software, Expert{" "}
          </p>
        </div>
        <div className="flex justify-center  text-3xl pb-2">
          <p className="">
            {" "}
            IT Consulting, Comprehensive Training, and Reliable Support{" "}
          </p>
        </div>
        <div className="flex justify-center  text-3xl ">
          <p className=""> – All Under One Roof.</p>
        </div>
      </div>

      <div className="flex justify-center py-20 gap-5 ">
        <div className="border-2 border-red-800 rounded-xl bg-red-800 px-5 py-1 shadow-inner "><Link href={"/"}>Learn more</Link></div>
        <div className="border-2 border-white rounded-xl  px-5 py-1 shadow-inner text-gray-200"><Link href={"/"}>Our Services</Link></div>
      </div>
		</div>
	);
}
