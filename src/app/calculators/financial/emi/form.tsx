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
        <div className="glass-panel rounded-lg p-6">
            <label className="block text-sm font-medium text-slate-700">
                Loan Amount (Principal)
            </label>
            <input
                type="number"
                value={principal}
                onChange={(e) => updateNumber(e.target.value, setPrincipal)}
                className="glass-input mt-2 w-full rounded-md p-2"
                min={0}
            />

            <label className="mt-4 block text-sm font-medium text-slate-700">
                Annual Interest Rate (%)
            </label>
            <input
                type="number"
                step="0.01"
                value={annualRate}
                onChange={(e) => updateNumber(e.target.value, setAnnualRate)}
                className="glass-input mt-2 w-full rounded-md p-2"
                min={0}
            />

            <label className="mt-4 block text-sm font-medium text-slate-700">
                Tenure
            </label>
            <div className="mt-2 flex gap-3">
                <input
                    type="number"
                    value={tenureYears}
                    onChange={(e) => updateNumber(e.target.value, setTenureYears)}
                    className="glass-input w-1/2 rounded-md p-2"
                    min={0}
                    placeholder="Years"
                />
                <input
                    type="number"
                    value={tenureMonths}
                    onChange={(e) => updateNumber(e.target.value, setTenureMonths)}
                    className="glass-input w-1/2 rounded-md p-2"
                    min={0}
                    max={11}
                    placeholder="Months"
                />
            </div>

            <div className="mt-6 flex items-center gap-3">
                <button
                    onClick={() => setShowSchedule(false)}
                    className="glass-button rounded-md px-4 py-2"
                >
                    Calculate
                </button>

                <button
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="rounded-md border border-white/65 bg-white/45 px-4 py-2 text-slate-700 shadow-sm backdrop-blur-xl hover:bg-white/70"
                >
                    {showSchedule ? "Hide Schedule" : "Show Schedule"}
                </button>
            </div>
        </div>
    );
}
