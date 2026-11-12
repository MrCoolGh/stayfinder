"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
    variant?: "floating" | "menu";
};

export default function ThemeToggle({
                                        variant = "floating",
                                    }: ThemeToggleProps) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    function toggleTheme() {
        setTheme(isDark ? "light" : "dark");
    }

    if (variant === "menu") {
        return (
            <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={isDark}
                className="mt-1 flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
        <span className="flex items-center gap-3">
          {isDark ? <Moon size={21} /> : <Sun size={21} />}
            <span>{isDark ? "Dark mode" : "Light mode"}</span>
        </span>

                <span className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 border-yellow-500 bg-yellow-400">
          <span
              className="h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300"
              style={{
                  transform: isDark
                      ? "translateX(20px)"
                      : "translateX(2px)",
              }}
          />
        </span>
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
                backgroundColor: isDark ? "#ffffff" : "#111827",
                color: isDark ? "#111827" : "#ffffff",
            }}
            className="fixed bottom-5 right-5 z-50 hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md transition hover:scale-105 hover:opacity-90 md:flex"
        >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
    );
}