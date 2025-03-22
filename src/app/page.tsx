import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="h-full w-full">
			<Header />
			<Hero />
			<Features />
			<Services />
		</div>
	);
}

function Header() {
	return (
		<div className="bg-black  text-white px-20  flex text-2xl justify-between fixed top-0 left-0 right-0">
			<div className="pl-10">
				<Image
					src={"/vr-logo.png"}
					width={146}
					height={146}
					alt="vr tech info logo"
				/>
			</div>
			<ul className="flex w-1/3">
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
		<div className="bg-black text-white pt-80 pb-30">
			<div className="flex justify-center pt-30 pb-10">
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
				<div className="border-1 border-red-800 rounded-xl bg-red-800 px-5 py-1 shadow-inner ">
					<Link href={"/"}>Learn more</Link>
				</div>
				<div className="border-1 border-white rounded-xl  px-5 py-1 shadow-inner text-gray-200">
					<Link href={"/"}>Our Services</Link>
				</div>
			</div>
		</div>
	);
}

function Features() {
	return (
		<div className="bg-[url(/features-bg.png)] h-[691px] w-full bg-cover bg-center text-white ">
			<div className="flex justify-center ">
				<h1 className="text-[66px] text-[#E2E2E2] pt-11 pl-2 font-normal self-center">
					Features
				</h1>
			</div>

			<div className="flex justify-center gap-40 pt-25">
				<div className="">
					<div className="flex items-center justify-center">
						<Image src={"/Award.png"} width={59} height={59} alt="" />
					</div>
					<h1 className="text-3xl text-center pt-5">Qualified Team</h1>
					<div className="text-[20px] font-light  text-center pt-10">
						<p>Expert designers and developers with </p>
						<p>experience in top brand websites and</p>
						<p>apps.</p>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-center">
						<Image src={"/Award.png"} width={59} height={59} alt="" />
					</div>
					<h1 className="text-3xl text-center pt-5">Smart Solutions</h1>
					<div className="text-[20px] font-light text-center pt-10">
						<p>We’re a leading website design and </p>
						<p> development agency, providing expert</p>
						<p>solutions with personalized projects.</p>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-center">
						<Image src={"/Award.png"} width={59} height={59} alt="" />
					</div>
					<h1 className="text-3xl text-center pt-5">Dedicated support</h1>
					<div className="text-[20px] font-light text-center pt-10">
						<p>We provide timely support via emails,</p>
						<p> calls, and in-person visits, going the </p>
						<p>extra mile to meet your needs.</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function Services() {
	return (
		<div className="text-[20px]">
			<h1
				className="text-center pt-30 pb-20 text-6xl font-semibold 
          [text-shadow:_2px_2px_4px_rgba(0,0,0,0.4)]"
			>
				Our Services
			</h1>
			<div className="pt-10 flex justify-center">
				<div className="grid grid-cols-3">
					{/* First Row */}
					<div className="text-center border-r border-b p-10">
						<Image
							src="/computer.png"
							width={253}
							height={213}
							alt="Software Development"
							className="mx-auto"
						/>
						<h1 className="text-[#0F3775] text-3xl font-semibold">
							Software Development
						</h1>
						<p>End-to-end custom software</p>
						<p>solutions for businesses, including</p>
						<p>web and mobile app development</p>
					</div>
					<div className="text-center border-r border-b p-10">
						<Image
							src="/it-consulting.png"
							width={266}
							height={210}
							alt="IT Consulting"
							className="mx-auto"
						/>
						<h1 className="text-[#0F3775] text-3xl font-semibold">
							IT Consulting
						</h1>
						<p>Expert guidance on digital</p>
						<p>transformation, cloud solutions,</p>
						<p>and IT infrastructure.</p>
					</div>
					<div className="text-center border-b p-10">
						<Image
							src="/training.png"
							width={309}
							height={214}
							alt="Training & Development"
							className="mx-auto"
						/>
						<h1 className="text-[#0F3775] text-3xl font-semibold">
							Training & Development
						</h1>
						<p>Professional courses in software</p>
						<p>development, cloud computing,</p>
						<p>and DevOps.</p>
					</div>
					{/* Second Row */}
					<div className="text-center border-r p-10">
						<Image
							src="/support.png"
							width={281}
							height={213}
							alt="Support & Maintenance"
							className="mx-auto"
						/>
						<h1 className="text-[#0F3775] text-3xl font-semibold">
							Support & Maintenance
						</h1>
						<p>24/7 technical support and system</p>
						<p>maintenance to ensure seamless</p>
						<p>operations.</p>
					</div>
					<div className="text-center border-r p-10">
						<Image
							src="/analytics.png"
							width={308}
							height={218}
							alt="Data Analytics"
							className="mx-auto"
						/>
						<h1 className="text-[#0F3775] text-3xl font-semibold">
							Data Analytics
						</h1>
						<p>Advanced data solutions to help</p>
						<p>businesses make data-driven</p>
						<p>decisions.</p>
					</div>
					<div className="p-10">
						<div className="flex flex-col items-center justify-center text-center min-h-[350px]">
							<Image
								src="/cybersecurity.png"
								width={320}
								height={190}
								alt="CyberSecurity Solutions"
								className="mx-auto"
							/>
							<h1 className="text-[#0F3775] text-3xl font-semibold">
								CyberSecurity Solutions
							</h1>
							<p>Robust security strategies to</p>
							<p>protect businesses from digital</p>
							<p>threats.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
