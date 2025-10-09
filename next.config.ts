import type { NextConfig } from "next";

const baseURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://" +
      (process.env.VERCEL_ENV === "production"
        ? process.env.VERCEL_PROJECT_PRODUCTION_URL
        : process.env.VERCEL_BRANCH_URL);

console.log("baseurl", baseURL);
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.VERCEL_ENV", process.env.VERCEL_ENV);
console.log(
  "process.env.VERCEL_PROJECT_PRODUCTION_URL",
  process.env.VERCEL_PROJECT_PRODUCTION_URL
);
console.log("process.env.VERCEL_BRANCH_URL", process.env.VERCEL_BRANCH_URL);
const nextConfig: NextConfig = {
  assetPrefix: baseURL,
};

export default nextConfig;
