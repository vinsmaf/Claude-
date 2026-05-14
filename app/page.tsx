import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Hello from Ruflo + Next.js
      </h1>
      <p className="max-w-md text-center text-lg text-gray-500">
        A production-ready Next.js 14 App Router starter with TypeScript and
        Tailwind CSS, scaffolded by Ruflo.
      </p>
      <Link
        href="/api/hello"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
      >
        Try /api/hello
      </Link>
    </main>
  );
}
