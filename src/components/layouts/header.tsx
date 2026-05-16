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
        <header className="w-full bg-violet-600 text-white shadow-md">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-semibold"
                >
                    <Calculator className="w-6 h-6" />
                    Global Calculator
                </Link>

                <nav className="flex flex-wrap items-center gap-4 text-sm md:gap-6">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <Link href="/calculators" className="hover:underline">
                        Calculators
                    </Link>
                    <Link href="/pages/about" className="hover:underline">
                        About
                    </Link>
                    <label className="flex items-center gap-2">
                        <span className="text-violet-100">Currency</span>
                        <select
                            value={currency.code}
                            onChange={(event) =>
                                setCurrencyCode(event.target.value as CurrencyCode)
                            }
                            className="h-9 rounded-md border border-violet-300 bg-violet-700 px-2 text-white outline-none focus:border-white focus:ring-2 focus:ring-white/30"
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
