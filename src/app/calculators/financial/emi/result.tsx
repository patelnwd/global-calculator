"use client";

import React from "react";

interface EMIResultsProps {
    emi: number;
    totalPayment: number;
    totalInterest: number;
    principal: number | "";
    annualRate: number | "";
    months: number;
    schedule: Array<{
        month: number;
        payment: number;
        principalPaid: number;
        interestPaid: number;
        balance: number;
    }>;
    showSchedule: boolean;
    formatAmount: (v: number) => string;
}

export default function EMIResults({
    emi,
    totalPayment,
    totalInterest,
    principal,
    annualRate,
    months,
    schedule,
    showSchedule,
    formatAmount,
}: EMIResultsProps) {
    return (
        <div className="glass-panel flex flex-col justify-between rounded-lg p-6">
            <div>
                <h3 className="text-sm text-slate-500">Monthly EMI</h3>
                <div className="mt-2 text-3xl font-bold text-cyan-700">
                    ₹ {formatAmount(emi)}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="text-slate-500">Total Payment</div>
                        <div className="font-medium">
                            ₹ {formatAmount(totalPayment)}
                        </div>
                    </div>
                    <div>
                        <div className="text-slate-500">Total Interest</div>
                        <div className="font-medium">
                            ₹ {formatAmount(totalInterest)}
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-sm text-slate-600">
                    <p>Loan Amount: ₹ {formatAmount(Number(principal) || 0)}</p>
                    <p>Rate (annual): {Number(annualRate) || 0}%</p>
                    <p>Tenure: {months} months</p>
                </div>
            </div>
            <div className="mt-6">
                <p className="text-xs text-slate-500">
                    * Results are approximate. Use for informational purposes only.
                </p>
            </div>
            {showSchedule && schedule.length > 0 && (
                <div className="mt-6">
                    <h4 className="mb-4 font-semibold">Amortization Schedule</h4>
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="border-b text-left text-xs text-slate-500">
                                <th className="py-2">Month</th>
                                <th>Payment</th>
                                <th>Principal</th>
                                <th>Interest</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((row) => (
                                <tr key={row.month} className="border-b">
                                    <td className="py-2">{row.month}</td>
                                    <td>₹ {formatAmount(row.payment)}</td>
                                    <td>₹ {formatAmount(row.principalPaid)}</td>
                                    <td>₹ {formatAmount(row.interestPaid)}</td>
                                    <td>₹ {formatAmount(row.balance)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
