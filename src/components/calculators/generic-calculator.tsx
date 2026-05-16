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
            <p className="text-sm text-gray-600">{definition.description}</p>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
                <form className="grid gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                    {definition.fields.map((field) => (
                        <label
                            key={field.key}
                            className="grid gap-2 text-sm font-medium text-gray-800"
                        >
                            <span>{field.label}</span>
                            <div className="flex overflow-hidden rounded-md border border-gray-300 bg-white focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
                                {field.type === "select" ? (
                                    <select
                                        value={String(values[field.key] ?? "")}
                                        onChange={(event) =>
                                            updateValue(field.key, event.target.value)
                                        }
                                        className="min-h-10 w-full bg-transparent px-3 py-2 outline-none"
                                    >
                                        {field.options?.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={
                                            field.type === "date" ||
                                            field.type === "time"
                                                ? field.type
                                                : "number"
                                        }
                                        value={values[field.key] ?? ""}
                                        min={field.min}
                                        max={field.max}
                                        step={
                                            field.step ??
                                            (field.type === "date" ||
                                            field.type === "time"
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
                                    <span className="flex min-w-12 items-center justify-center border-l border-gray-200 bg-gray-50 px-3 text-gray-500">
                                        {field.suffix}
                                    </span>
                                )}
                            </div>
                            {field.helperText && (
                                <span className="text-xs font-normal leading-5 text-gray-500">
                                    {field.helperText}
                                </span>
                            )}
                        </label>
                    ))}
                </form>

                <aside className="rounded-lg border border-violet-100 bg-violet-50 p-5">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-violet-700">
                        Results
                    </h2>
                    <div className="mt-4 grid gap-3">
                        {results.map((result, index) => (
                            <div
                                key={`${result.label}-${index}`}
                                className="rounded-md border border-violet-100 bg-white p-4"
                            >
                                <div className="text-sm text-gray-500">
                                    {result.label}
                                </div>
                                <div className="mt-1 text-2xl font-semibold text-gray-950">
                                    {formatResult(result, currency.symbol)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                        Results are estimates for planning and educational use.
                    </p>
                </aside>
            </div>

            {schedule && schedule.rows.length > 0 && (
                <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-semibold text-gray-950">
                            {schedule.title}
                        </h2>
                        {schedule.description && (
                            <p className="text-sm text-gray-600">
                                {schedule.description}
                            </p>
                        )}
                    </div>

                    <div className="mt-4 max-h-[32rem] overflow-auto rounded-md border border-gray-200">
                        <table className="w-full min-w-[720px] border-collapse text-sm">
                            <thead className="sticky top-0 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                                <tr>
                                    {schedule.columns.map((column) => (
                                        <th
                                            key={column.key}
                                            className="border-b px-3 py-2 font-semibold"
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
                                        className="border-b last:border-b-0"
                                    >
                                        {schedule.columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className="px-3 py-2 text-gray-800"
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
