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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-violet-700 text-center mb-6">
                Global Calculator
            </h1>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
                <input
                    type="text"
                    placeholder="Search calculator..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-xl"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full md:w-1/4 px-4 py-2 border rounded-xl"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map((calc, idx) => (
                    <a
                        key={idx}
                        href={toAppPath(calc.path)}
                        className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
                    >
                        <h2 className="text-lg font-semibold text-violet-700">
                            {calc.name}
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            {capitalizeWords(calc.groupKey.split("-").join(" "))}
                        </p>
                        {calc.note && (
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                {calc.note}
                            </p>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}
