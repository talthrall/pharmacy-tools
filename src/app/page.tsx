"use client";

import Button from "@/components/ui/Button";
import { FlaskConical, Pill } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-foreground p-6 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[30rem] h-[30rem] bg-sky-200 rounded-full blur-3xl opacity-20" />
      </div>

      <section className="w-full max-w-xl bg-card rounded-2xl shadow-xl p-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-center tracking-tight leading-tight text-blue-900">
            Pharmacy Tools
          </h1>
          <p className="text-lg text-center text-gray-600">
            Choose a calculator or tool to get started:
          </p>
        </header>

        <div className="space-y-4">
          <Button href="/capsule-fill">
            <div className="flex items-center justify-center gap-2">
              <Pill className="w-5 h-5" />
              Capsule Fill Calculator
            </div>
          </Button>

          <Button href="/compound-check">
            <div className="flex items-center justify-center gap-2">
              <FlaskConical className="w-5 h-5" />
              Compound Strength Verifier
            </div>
          </Button>
        </div>
      </section>
    </main>
  );
}