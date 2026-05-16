"use client";

import { useState } from "react";
import { capitalizeWords } from "@/lib/utils/string";
import { calculatorGroups, getCalculatorNote } from "@/lib/constants/calculators";

// Calculator list grouped by category
// const calculators = {
//   business: [
//     { name: "Break-even Calculator", path: "/business/break-even" },
//     { name: "Profit Margin Calculator", path: "/business/profit-margin" },
//     { name: "ROI Calculator", path: "/business/roi" },
//   ],
//   financial: [
//     { name: "EMI Calculator", path: "/financial/emi" },
//     { name: "Loan Calculator", path: "/financial/loan" },
//     { name: "Mortgage Calculator", path: "/financial/mortgage" },
//   ],
// };

// Flatten list
const allCalculators = Object.entries(calculatorGroups).flatMap(
    ([, items]) =>
        items.calculators.map((calc) => ({
            ...calc,
            groupKey: items.key,
            note: getCalculatorNote(calc.path),
        }))
    // console.log(...items.calculators)
    // console.log([index, items]);
);

function toAppPath(path: string) {
    return path.replace(/^\./, "");
}

// console.log(allCalculators);

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
            <div className="mx-auto mb-8 max-w-3xl text-center">
                <h1 className="text-3xl font-bold text-slate-950">Global Calculator</h1>
                <p className="mt-3 text-sm leading-6 text-slate-600">
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
                        className="glass-card glass-card-hover block rounded-lg p-6"
                    >
                        <h2 className="text-lg font-semibold text-slate-950">
                            {calc.name}
                        </h2>
                        <p className="mt-2 text-sm font-medium text-cyan-700">
                            {capitalizeWords(calc.groupKey.split("-").join(" "))}
                        </p>
                        {calc.note && (
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                {calc.note}
                            </p>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}
