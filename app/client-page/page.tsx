"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1>Welcome to the Homepage</h1>
      <p>This is the main content of the homepage.</p>
      <Link href="/">Go to Main Page</Link>
    </div>
  );
}
