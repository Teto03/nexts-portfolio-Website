"use client";
import { Github, Mail, Linkedin, FileText } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
	{
		icon: <Linkedin size={20} />,
		href: "https://www.linkedin.com/in/francesco-bianchi-550130284/",
		label: "LinkedIn",
		handle: "Francesco Bianchi",
		external: true,
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:bianchif037@gmail.com",
		label: "Email",
		handle: "bianchif037@gmail.com",
		external: false,
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/Teto03",
		label: "GitHub",
		handle: "Teto03",
		external: true,
	},
	{
		icon: <FileText size={20} />,
		href: "/cv.pdf",
		label: "Curriculum Vitae",
		handle: "Open CV",
		external: true,
	},
];

export default function Contact() {
	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
			<Navigation />
			<div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto pt-32 pb-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 font-display">
						Get in touch
					</h1>
					<p className="mt-4 text-zinc-400 max-w-xl">
						Feel free to reach out for collaborations, opportunities, or just to say hi.
					</p>
				</div>
				<div className="grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12 max-w-6xl">
					{socials.map((s) => (
						<Card key={s.label}>
							<Link
								href={s.href}
								target={s.external ? "_blank" : undefined}
								rel={s.external ? "noopener noreferrer" : undefined}
								className="p-6 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-20 lg:pb-32 md:px-8"
							>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-400 via-zinc-500/50 to-transparent"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200">
									{s.icon}
								</span>
								<div className="z-10 flex flex-col items-center">
									<span className="text-base lg:text-lg font-medium duration-150 xl:text-xl text-zinc-200 group-hover:text-white font-display shrink-0 text-center break-all">
										{s.handle}
									</span>
									<span className="mt-2 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
										{s.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
