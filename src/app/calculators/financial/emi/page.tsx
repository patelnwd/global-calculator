"use client";

import React, { useCallback, useState, useMemo } from "react";
import EMIForm from "./form";
import EMIResults from "./result";

export default function EMICalculatorPage() {
    const [principal, setPrincipal] = useState<number | "">(1000000);
    const [annualRate, setAnnualRate] = useState<number | "">(7.5);
    const [tenureYears, setTenureYears] = useState<number | "">(5);
    const [tenureMonths, setTenureMonths] = useState<number | "">(0);
    const [showSchedule, setShowSchedule] = useState(false);

    const months = useMemo(() => {
        const y = Number(tenureYears) || 0;
        const m = Number(tenureMonths) || 0;
        return y * 12 + m;
    }, [tenureYears, tenureMonths]);

    const monthlyRate = useMemo(() => {
        const r = Number(annualRate) || 0;
        return r / 12 / 100;
    }, [annualRate]);

    const emi = useMemo(() => {
        const P = Number(principal) || 0;
        const n = months;
        const r = monthlyRate;
        if (P <= 0 || n <= 0) return 0;
        if (r === 0) return P / n;
        const numerator = P * r * Math.pow(1 + r, n);
        const denominator = Math.pow(1 + r, n) - 1;
        return numerator / denominator;
    }, [principal, months, monthlyRate]);

    const totalPayment = useMemo(() => emi * months, [emi, months]);
    const totalInterest = useMemo(
        () => totalPayment - (Number(principal) || 0),
        [totalPayment, principal]
    );

    function formatAmount(v: number) {
        return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }

    const generateSchedule = useCallback(() => {
        const P = Number(principal) || 0;
        const r = monthlyRate;
        const n = months;
        const schedule: Array<{
            month: number;
            payment: number;
            principalPaid: number;
            interestPaid: number;
            balance: number;
        }> = [];
        if (P <= 0 || n <= 0) return schedule;
        let balance = P;
        const mEmi = emi;
        for (let i = 1; i <= n; i++) {
            const interest = balance * r;
            const principalPaid = Math.min(mEmi - interest, balance);
            balance = Math.max(0, balance - principalPaid);
            schedule.push({
                month: i,
                payment: Number(mEmi.toFixed(2)),
                principalPaid: Number(principalPaid.toFixed(2)),
                interestPaid: Number(interest.toFixed(2)),
                balance: Number(balance.toFixed(2)),
            });
            if (balance <= 0) break;
        }
        return schedule;
    }, [emi, monthlyRate, months, principal]);

    const schedule = useMemo(
        () => (showSchedule ? generateSchedule() : []),
        [showSchedule, generateSchedule]
    );

    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-violet-700 mb-4">
                    EMI Calculator
                </h1>
                <p className="text-gray-600 mb-6">
                    Quickly calculate EMI, total interest and payment schedule.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <EMIForm
                        principal={principal}
                        setPrincipal={setPrincipal}
                        annualRate={annualRate}
                        setAnnualRate={setAnnualRate}
                        tenureYears={tenureYears}
                        setTenureYears={setTenureYears}
                        tenureMonths={tenureMonths}
                        setTenureMonths={setTenureMonths}
                        showSchedule={showSchedule}
                        setShowSchedule={setShowSchedule}
                    />

                    <EMIResults
                        emi={emi}
                        totalPayment={totalPayment}
                        totalInterest={totalInterest}
                        principal={principal}
                        annualRate={annualRate}
                        months={months}
                        schedule={schedule}
                        showSchedule={showSchedule}
                        formatAmount={formatAmount}
                    />
                </div>
            </div>
        </div>
    );
}
