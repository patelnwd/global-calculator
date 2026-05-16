"use client";

import { useMemo, useState } from "react";
import {
    calculateCalculator,
    getCalculatorSchedule,
    getCalculatorDefinition,
    getDefaultValues,
    type CalculatorResult,
    type CalculatorScheduleColumn,
    type CalculatorValues,
} from "@/lib/calculators/definitions";
import { useCurrency } from "@/components/providers/currency-provider";

type GenericCalculatorProps = {
    id: string;
};

function formatResult(result: CalculatorResult, currencySymbol: string) {
    const prefix = result.prefix === "$" ? currencySymbol : (result.prefix ?? "");
    const value =
        typeof result.value === "number"
            ? result.value.toLocaleString(undefined, {
                  maximumFractionDigits: result.precision ?? 2,
                  minimumFractionDigits: result.precision ?? 0,
              })
            : result.value;

    return `${prefix}${value}${result.suffix ?? ""}`;
}

function formatScheduleValue(
    value: number | string,
    column: CalculatorScheduleColumn,
    currencySymbol: string
) {
    const prefix = column.prefix === "$" ? currencySymbol : (column.prefix ?? "");
    const formattedValue =
        typeof value === "number"
            ? value.toLocaleString(undefined, {
                  maximumFractionDigits: column.precision ?? 2,
                  minimumFractionDigits: column.precision ?? 0,
              })
            : value;

    return `${prefix}${formattedValue}${column.suffix ?? ""}`;
}

export default function GenericCalculator({ id }: GenericCalculatorProps) {
    const { currency } = useCurrency();
    const definition = useMemo(() => getCalculatorDefinition(id), [id]);
    const [values, setValues] = useState<CalculatorValues>(() =>
        getDefaultValues(definition)
    );

    const results = useMemo(
        () => calculateCalculator(definition.id, values),
        [definition.id, values]
    );
    const schedule = useMemo(
        () => getCalculatorSchedule(definition.id, values),
        [definition.id, values]
    );

    function updateValue(key: string, value: number | string) {
        setValues((current) => ({ ...current, [key]: value }));
    }

    function updateInputValue(key: string, rawValue: string, type?: string) {
        if (type === "date" || type === "time") {
            updateValue(key, rawValue);
            return;
        }
        if (rawValue === "") {
            updateValue(key, "");
            return;
        }
        const nextValue = Number(rawValue);
        if (Number.isFinite(nextValue)) {
            updateValue(key, nextValue);
        }
    }

    return (
        <section className="space-y-6">
            <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                {definition.description}
            </p>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
                {/* Input form */}
                <form className="glass-panel ai-panel grid gap-4 rounded-lg p-5">
                    {definition.fields.map((field) => (
                        <label
                            key={field.key}
                            className="grid gap-2 text-sm font-medium text-slate-800 dark:text-slate-200"
                        >
                            <span>{field.label}</span>
                            <div className="glass-input flex overflow-hidden rounded-md">
                                {field.type === "select" ? (
                                    <select
                                        value={String(values[field.key] ?? "")}
                                        onChange={(event) =>
                                            updateValue(field.key, event.target.value)
                                        }
                                        className="min-h-10 w-full bg-transparent px-3 py-2 outline-none"
                                    >
                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={
                                            field.type === "date" || field.type === "time"
                                                ? field.type
                                                : "number"
                                        }
                                        value={values[field.key] ?? ""}
                                        min={field.min}
                                        max={field.max}
                                        step={
                                            field.step ??
                                            (field.type === "date" || field.type === "time"
                                                ? undefined
                                                : "any")
                                        }
                                        onChange={(event) =>
                                            updateInputValue(
                                                field.key,
                                                event.target.value,
                                                field.type
                                            )
                                        }
                                        className="min-h-10 w-full bg-transparent px-3 py-2 outline-none"
                                    />
                                )}
                                {field.suffix && (
                                    <span className="flex min-w-12 items-center justify-center border-l border-slate-200/70 bg-slate-100/80 px-3 text-slate-500 dark:border-cyan-400/15 dark:bg-slate-900/50 dark:text-slate-400">
                                        {field.suffix}
                                    </span>
                                )}
                            </div>
                            {field.helperText && (
                                <span className="text-xs font-normal leading-5 text-slate-500">
                                    {field.helperText}
                                </span>
                            )}
                        </label>
                    ))}
                </form>

                {/* Results panel */}
                <aside className="glass-panel ai-panel cyber-line rounded-lg p-5">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">
                        Results
                    </h2>
                    <div className="mt-4 grid gap-3">
                        {results.map((result, index) => (
                            <div
                                key={`${result.label}-${index}`}
                                className="rounded-md border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-cyan-400/18 dark:bg-slate-900/50"
                            >
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                    {result.label}
                                </div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
                                    {formatResult(result, currency.symbol)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-slate-500">
                        Results are estimates for planning and educational use.
                    </p>
                </aside>
            </div>

            {/* Schedule / amortization table */}
            {schedule && schedule.rows.length > 0 && (
                <section className="glass-panel ai-panel rounded-lg p-5">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {schedule.title}
                        </h2>
                        {schedule.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                {schedule.description}
                            </p>
                        )}
                    </div>

                    <div className="mt-4 max-h-[32rem] overflow-auto rounded-md border border-slate-200/60 bg-white/40 backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-950/60">
                        <table className="w-full min-w-[720px] border-collapse text-sm">
                            <thead className="sticky top-0 bg-white/90 text-left text-xs uppercase tracking-wide text-slate-500 backdrop-blur-xl dark:bg-slate-900/90 dark:text-slate-400">
                                <tr>
                                    {schedule.columns.map((column) => (
                                        <th
                                            key={column.key}
                                            className="border-b border-slate-200/70 px-3 py-2 font-semibold dark:border-cyan-400/10"
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.rows.map((row, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 dark:border-cyan-400/8 dark:hover:bg-cyan-400/4"
                                    >
                                        {schedule.columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className="px-3 py-2 text-slate-700 dark:text-slate-200"
                                            >
                                                {formatScheduleValue(
                                                    row[column.key] ?? "",
                                                    column,
                                                    currency.symbol
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </section>
    );
}
