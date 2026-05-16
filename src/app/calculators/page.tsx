"use client";

import { useState } from "react";
import { Bot, Cpu } from "lucide-react";
import { capitalizeWords } from "@/lib/utils/string";
import { calculatorGroups, getCalculatorNote } from "@/lib/constants/calculators";

const allCalculators = Object.entries(calculatorGroups).flatMap(
    ([, items]) =>
        items.calculators.map((calc) => ({
            ...calc,
            groupKey: items.key,
            note: getCalculatorNote(calc.path),
        }))
);

function toAppPath(path: string) {
    return path.replace(/^\./, "");
}

export default function CalculatorPage() {
    const [category, setCategory] = useState("all");
    const [search, setSearch] = useState("");

    const filtered = allCalculators.filter((calc) => {
        const matchesCategory = category === "all" || calc.groupKey === category;
        const matchesSearch = calc.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="glass-panel ai-panel cyber-line mx-auto mb-8 max-w-3xl rounded-lg p-6 text-center">
                <span className="ai-badge">
                    <Bot className="h-3.5 w-3.5" />
                    Calculator command center
                </span>
                <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
                    Global Calculator
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Search every calculator across finance, health, travel, utility,
                    math, and construction.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="mx-auto mb-8 flex max-w-3xl flex-col justify-center gap-4 md:flex-row">
                <input
                    type="text"
                    placeholder="Search calculator..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="glass-input min-h-11 w-full rounded-lg px-4 py-2 md:w-1/2"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="glass-input min-h-11 w-full rounded-lg px-4 py-2 md:w-1/3"
                >
                    <option value="all">All Categories</option>
                    {Object.values(calculatorGroups).map((cat) => (
                        <option key={cat.key} value={cat.key}>
                            {cat.key.replace("-", " ").toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {filtered.map((calc, idx) => (
                    <a
                        key={idx}
                        href={toAppPath(calc.path)}
                        className="glass-card glass-card-hover ai-card block rounded-lg p-6"
                    >
                        <Cpu className="mb-4 h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {calc.name}
                        </h2>
                        <p className="mt-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
                            {capitalizeWords(calc.groupKey.split("-").join(" "))}
                        </p>
                        {calc.note && (
                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                {calc.note}
                            </p>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}
