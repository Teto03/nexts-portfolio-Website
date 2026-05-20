import "../global.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://bianchifrancesco.dev"),
  title: {
    default: "Francesco Bianchi — bianchifrancesco.dev",
    template: "%s | bianchifrancesco.dev",
  },
  description:
    "Master's student in Computer Science at the University of Trento. Passionate about cybersecurity, machine learning and software engineering.",
  openGraph: {
    title: "Francesco Bianchi — bianchifrancesco.dev",
    description:
      "Master's student in Computer Science at the University of Trento. Passionate about cybersecurity, machine learning and software engineering.",
    url: "https://bianchifrancesco.dev",
    siteName: "bianchifrancesco.dev",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Francesco Bianchi",
    description:
      "Master's student in Computer Science at the University of Trento. Passionate about cybersecurity, machine learning and software engineering.",
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[inter.variable, calSans.variable, jetbrainsMono.variable].join(
        " ",
      )}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
