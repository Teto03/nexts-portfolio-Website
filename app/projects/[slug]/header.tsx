"use client";
import { ArrowLeft, Eye, Github, ExternalLink, Linkedin } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
		tags?: string[];
		date?: string;
	};

	views: number;
};
export const Header: React.FC<Props> = ({ project, views }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string; icon: React.ReactNode }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
			icon: <Github className="w-4 h-4" />,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
			icon: <ExternalLink className="w-4 h-4" />,
		});
	}
	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/80 border-zinc-800"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between items-center gap-6">
						<span
							title="View counter for this page"
							className="duration-200 flex items-center gap-1 text-zinc-400 hover:text-zinc-100"
						>
							<Eye className="w-5 h-5" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(
								views,
							)}
						</span>
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.linkedin.com/in/francesco-bianchi-550130284/"
							aria-label="LinkedIn"
						>
							<Linkedin className="w-6 h-6 duration-200 text-zinc-400 hover:text-zinc-100" />
						</Link>
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/Teto03"
							aria-label="GitHub"
						>
							<Github className="w-6 h-6 duration-200 text-zinc-400 hover:text-zinc-100" />
						</Link>
					</div>

					<Link
						href="/projects"
						aria-label="Back to projects"
						className="duration-200 text-zinc-400 hover:text-zinc-100"
					>
						<ArrowLeft className="w-6 h-6" />
					</Link>
				</div>
			</div>
			<div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-32">
				<div className="mx-auto max-w-3xl px-6 lg:px-8 flex flex-col items-center text-center">
					{project.date ? (
						<time
							dateTime={new Date(project.date).toISOString()}
							className="text-sm text-zinc-400"
						>
							{Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
								new Date(project.date),
							)}
						</time>
					) : null}
					<h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl font-display text-balance">
						{project.title}
					</h1>
					<p className="mt-6 text-lg leading-8 text-zinc-300 text-balance">
						{project.description}
					</p>

					{project.tags && project.tags.length > 0 ? (
						<ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
							{project.tags.map((tag) => (
								<li
									key={tag}
									className="px-3 py-1 text-xs bg-zinc-800/80 border border-zinc-700 rounded-md text-zinc-300"
								>
									{tag}
								</li>
							))}
						</ul>
					) : null}

					{links.length > 0 ? (
						<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
							{links.map((link) => (
								<Link
									target="_blank"
									rel="noopener noreferrer"
									key={link.label}
									href={link.href}
									className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 rounded-md text-zinc-100 transition-colors duration-200"
								>
									{link.icon}
									{link.label}
								</Link>
							))}
						</div>
					) : null}
				</div>
			</div>
		</header>
	);
};
