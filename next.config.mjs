const securityHeaders = [
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
	},
	{
		key: "Content-Security-Policy",
		value: [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' https://beamanalytics.b-cdn.net",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: blob: https:",
			"font-src 'self' data:",
			"connect-src 'self' https://beamanalytics.b-cdn.net https://beamanalytics.io https://api.beamanalytics.io",
			"frame-ancestors 'none'",
			"base-uri 'self'",
			"form-action 'self'",
			"object-src 'none'",
			"upgrade-insecure-requests",
		].join("; "),
	},
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	async headers() {
		return [{ source: "/:path*", headers: securityHeaders }];
	},
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

export default nextConfig;
