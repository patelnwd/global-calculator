"use client";

import Link from "next/link";
import { Bot, Cpu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
    currencyOptions,
    useCurrency,
    type CurrencyCode,
} from "@/components/providers/currency-provider";

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="h-9 w-9 rounded-md border border-slate-200 bg-white/60 dark:border-cyan-400/20 dark:bg-slate-950/50" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200/80 bg-white/60 text-slate-600 shadow-sm transition hover:border-cyan-400/50 hover:bg-cyan-50 hover:text-cyan-700 dark:border-cyan-400/20 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:bg-cyan-400/8 dark:hover:text-cyan-300"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
        >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
}

export default function Header() {
    const { currency, setCurrencyCode } = useCurrency();

    return (
        <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-cyan-400/18 dark:bg-slate-950/60 dark:shadow-[0_12px_40px_rgba(0,0,0,0.40),0_0_30px_rgba(14,165,233,0.04)]">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-3 text-xl font-semibold text-slate-900 dark:text-white"
                >
                    <span className="robot-core flex h-10 w-10 items-center justify-center rounded-lg">
                        <Bot className="h-5 w-5" />
                    </span>
                    <span>Global Calculator</span>
                    <span className="hidden rounded-full border border-cyan-300/50 bg-cyan-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 sm:inline-flex dark:border-lime-300/40 dark:bg-lime-300/10 dark:text-lime-200">
                        AI Core
                    </span>
                </Link>

                <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 md:gap-4 dark:text-slate-200">
                    <Link
                        href="/"
                        className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                        Home
                    </Link>
                    <Link
                        href="/calculators"
                        className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                        Calculators
                    </Link>
                    <Link
                        href="/pages/about"
                        className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                        About
                    </Link>
                    <label className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                        <span className="text-slate-500 dark:text-slate-400">Currency</span>
                        <select
                            value={currency.code}
                            onChange={(event) =>
                                setCurrencyCode(event.target.value as CurrencyCode)
                            }
                            className="glass-input h-9 rounded-md px-2"
                            aria-label="Choose currency"
                        >
                            {currencyOptions.map((option) => (
                                <option key={option.code} value={option.code}>
                                    {option.label} {option.symbol}
                                </option>
                            ))}
                        </select>
                    </label>

                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
