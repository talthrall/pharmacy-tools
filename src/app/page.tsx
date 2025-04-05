"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      const isDark = storedTheme === "dark";
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 transition-colors">
      <div className="flex justify-end">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="mb-4 px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90"
        >
          Toggle {isDarkMode ? "Light" : "Dark"}
        </button>
      </div>

      <div className="max-w-xl mx-auto bg-card rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center">Pharmacy Tools</h1>
        <p className="text-lg text-center">Choose a calculator or tool to get started:</p>

        <div className="space-y-4">
          <Link href="/capsule-fill">
            <div className="block w-full p-3 bg-primary text-primary-foreground rounded hover:opacity-90 text-center">
              Capsule Fill Calculator
            </div>
          </Link>

          {/* Future links go here */}
        </div>
      </div>
    </div>
  );
}
