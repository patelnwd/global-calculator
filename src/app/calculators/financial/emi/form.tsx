"use client";

import React from "react";

interface EMIFormProps {
    principal: number | "";
    setPrincipal: (v: number | "") => void;
    annualRate: number | "";
    setAnnualRate: (v: number | "") => void;
    tenureYears: number | "";
    setTenureYears: (v: number | "") => void;
    tenureMonths: number | "";
    setTenureMonths: (v: number | "") => void;
    showSchedule: boolean;
    setShowSchedule: (v: boolean) => void;
}

export default function EMIForm({
    principal,
    setPrincipal,
    annualRate,
    setAnnualRate,
    tenureYears,
    setTenureYears,
    tenureMonths,
    setTenureMonths,
    showSchedule,
    setShowSchedule,
}: EMIFormProps) {
    function updateNumber(rawValue: string, setter: (value: number | "") => void) {
        if (rawValue === "") {
            setter("");
            return;
        }

        const nextValue = Number(rawValue);

        if (Number.isFinite(nextValue)) {
            setter(nextValue);
        }
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700">
                Loan Amount (Principal)
            </label>
            <input
                type="number"
                value={principal}
                onChange={(e) => updateNumber(e.target.value, setPrincipal)}
                className="mt-2 w-full border rounded p-2"
                min={0}
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
                Annual Interest Rate (%)
            </label>
            <input
                type="number"
                step="0.01"
                value={annualRate}
                onChange={(e) => updateNumber(e.target.value, setAnnualRate)}
                className="mt-2 w-full border rounded p-2"
                min={0}
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
                Tenure
            </label>
            <div className="flex gap-3 mt-2">
                <input
                    type="number"
                    value={tenureYears}
                    onChange={(e) => updateNumber(e.target.value, setTenureYears)}
                    className="w-1/2 border rounded p-2"
                    min={0}
                    placeholder="Years"
                />
                <input
                    type="number"
                    value={tenureMonths}
                    onChange={(e) => updateNumber(e.target.value, setTenureMonths)}
                    className="w-1/2 border rounded p-2"
                    min={0}
                    max={11}
                    placeholder="Months"
                />
            </div>

            <div className="flex items-center gap-3 mt-6">
                <button
                    onClick={() => setShowSchedule(false)}
                    className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                >
                    Calculate
                </button>

                <button
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                    {showSchedule ? "Hide Schedule" : "Show Schedule"}
                </button>
            </div>
        </div>
    );
}
