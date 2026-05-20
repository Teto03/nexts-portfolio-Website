import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "CV", href: "/cv.pdf", external: true },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black px-4 py-16">
      <nav className="my-12 sm:my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4 sm:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-sm duration-500 text-zinc-400 hover:text-zinc-100"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={60}
      />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-8xl bg-clip-text text-center px-2 leading-none">
        BIANCHI FRANCESCO
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-12 sm:my-16 text-center animate-fade-in max-w-2xl">
        <h2 className="text-sm sm:text-base text-zinc-400 text-balance leading-relaxed">
          Master&rsquo;s student in Computer Science at the University of Trento, passionate about technology and cybersecurity, driven to solve problems and create innovative solutions.
        </h2>
      </div>
    </div>
  );
}
