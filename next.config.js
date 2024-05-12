/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Dev Image Origin
        protocol: "https",
        hostname: "pub-5bde1ae25a174b0582630043fa783879.r2.dev",
        port: "",
        pathname: "/**",
      },
      // {
        // Prod Image Origin
      //   protocol: "https",
      //   // hostname: "pub-aab205bc4ae24bca977e05a1c5b36628.r2.dev",
      //   port: "",
      //   pathname: "/**",
      // },
    ],
  },
};

module.exports = nextConfig;
