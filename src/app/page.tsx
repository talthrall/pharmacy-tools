"use client";

import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
      <section className="w-full max-w-xl bg-card rounded-2xl shadow-xl p-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold text-center tracking-tight">Pharmacy Tools</h1>
          <p className="text-lg text-center text-muted-foreground">
            Choose a calculator or tool to get started:
          </p>
        </header>

        <div className="space-y-4">
          <Button href="/capsule-fill">Capsule Fill Calculator</Button>
          <Button href="/compound-check">Compound Strength Verifier</Button>
        </div>
      </section>
    </main>
  );
}