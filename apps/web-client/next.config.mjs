/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    externalDir: true,
  },

  // fixes text focus issue at https://stackoverflow.com/questions/70575301/why-does-react-number-format-input-field-lose-focus-in-nextjs-on-production-buil
  swcMinify: true,
};

export default nextConfig;
