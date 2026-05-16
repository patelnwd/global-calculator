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
        <div className="p-6 bg-white rounded-lg shadow flex flex-col justify-between">
            <div>
                <h3 className="text-sm text-gray-500">Monthly EMI</h3>
                <div className="text-3xl font-bold text-violet-700 mt-2">
                    ₹ {formatAmount(emi)}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="text-gray-500">Total Payment</div>
                        <div className="font-medium">
                            ₹ {formatAmount(totalPayment)}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500">Total Interest</div>
                        <div className="font-medium">
                            ₹ {formatAmount(totalInterest)}
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-sm text-gray-600">
                    <p>Loan Amount: ₹ {formatAmount(Number(principal) || 0)}</p>
                    <p>Rate (annual): {Number(annualRate) || 0}%</p>
                    <p>Tenure: {months} months</p>
                </div>
            </div>
            <div className="mt-6">
                <p className="text-xs text-gray-500">
                    * Results are approximate. Use for informational purposes only.
                </p>
            </div>
            {showSchedule && schedule.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold mb-4">Amortization Schedule</h4>
                    <table className="w-full text-sm table-auto">
                        <thead>
                            <tr className="text-left text-xs text-gray-500 border-b">
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
