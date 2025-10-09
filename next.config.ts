import type { NextConfig } from "next";
import { baseURL } from "./baseUrl";

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
