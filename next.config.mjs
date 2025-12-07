import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'bianchifrancesco.dev',
			},
			{
				protocol: 'https',
				hostname: 'nextjs-portfolio-onoxn7nmz-francesco-bianchis-projects.vercel.app',
			},
		],
	},
	turbopack: {},
};

export default withContentlayer(nextConfig);
