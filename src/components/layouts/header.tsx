"use client";

import Link from "next/link";
import { Calculator } from "lucide-react";
import {
    currencyOptions,
    useCurrency,
    type CurrencyCode,
} from "@/components/providers/currency-provider";

export default function Header() {
    const { currency, setCurrencyCode } = useCurrency();

    return (
        <header className="sticky top-0 z-40 w-full border-b border-white/45 bg-white/55 text-slate-900 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-semibold text-slate-950"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/60 bg-white/65 shadow-sm backdrop-blur-xl">
                        <Calculator className="h-5 w-5 text-cyan-700" />
                    </span>
                    Global Calculator
                </Link>

                <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700 md:gap-4">
                    <Link href="/" className="rounded-md px-3 py-2 hover:bg-white/55">
                        Home
                    </Link>
                    <Link
                        href="/calculators"
                        className="rounded-md px-3 py-2 hover:bg-white/55"
                    >
                        Calculators
                    </Link>
                    <Link
                        href="/pages/about"
                        className="rounded-md px-3 py-2 hover:bg-white/55"
                    >
                        About
                    </Link>
                    <label className="flex items-center gap-2">
                        <span className="text-slate-500">Currency</span>
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
                </nav>
            </div>
        </header>
    );
}
