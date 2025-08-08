/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async rewrites() {
    // Ensure the environment variable is defined and starts with a valid protocol
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl || !/^https?:\/\//.test(apiUrl)) {
      throw new Error(
        "NEXT_PUBLIC_API_URL environment variable must be defined and start with 'http://' or 'https://'"
      );
    }
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
