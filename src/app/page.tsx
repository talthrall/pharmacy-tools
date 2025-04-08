"use client";

import Button from "@/components/ui/Button";
import { FlaskConical, Pill } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-50 text-foreground p-6 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[30rem] h-[30rem] bg-teal-50 rounded-full blur-3xl opacity-20" />
      </div>

      <nav className="absolute top-4 right-6 space-x-4 text-sm text-teal-700 underline hover:text-teal-900 transition">
        <a href="#top">Back to Top</a>
        <a href="/about">About</a>
      </nav>

      <section className="w-full max-w-xl bg-card rounded-2xl shadow-xl p-8 space-y-6" id="top">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-center tracking-tight leading-tight text-teal-800">
            Pharmacy Tools
          </h1>
          <p className="text-lg text-center text-teal-700">
            Choose a calculator or tool to get started:
          </p>
        </header>

        <div className="space-y-4">
          <Button href="/capsule-fill">
            <div className="flex items-center justify-center gap-2 bg-teal-600 text-white rounded-full">
              <Pill className="w-5 h-5" />
              Capsule Fill Calculator
            </div>
          </Button>

          <Button href="/compound-check">
            <div className="flex items-center justify-center gap-2 bg-teal-600 text-white rounded-full">
              <FlaskConical className="w-5 h-5" />
              Compound Strength Verifier
            </div>
          </Button>
        </div>
      </section>
    </main>
  );
}
