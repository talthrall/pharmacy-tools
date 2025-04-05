'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-xl mx-auto bg-card rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-3xl font-bold">Pharmacy Tools</h1>
        <p className="text-lg">Choose a calculator or tool to get started:</p>

        <div className="space-y-2">
          <Link
            href="/capsule-fill"
            className="block w-full p-3 bg-primary text-primary-foreground rounded hover:opacity-90 text-center"
          >
            Capsule Fill Calculator
          </Link>

          {/* Future links can go here, like: */}
          {/* <Link href="/troche-calculator" className="block ...">Troche Calculator</Link> */}
        </div>
      </div>
    </div>
  );
}
