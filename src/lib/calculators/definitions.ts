export type CalculatorField = {
    key: string;
    label: string;
    type?: "number" | "select" | "date" | "time";
    defaultValue: number | string;
    min?: number;
    max?: number;
    step?: number;
    suffix?: string;
    helperText?: string;
    options?: Array<{ label: string; value: string }>;
};

export type CalculatorResult = {
    label: string;
    value: number | string;
    suffix?: string;
    prefix?: string;
    precision?: number;
};

export type CalculatorScheduleColumn = {
    key: string;
    label: string;
    prefix?: string;
    suffix?: string;
    precision?: number;
};

export type CalculatorSchedule = {
    title: string;
    description?: string;
    columns: CalculatorScheduleColumn[];
    rows: CalculatorScheduleRow[];
};

export type CalculatorScheduleRow = Record<string, number | string>;

export type CalculatorDefinition = {
    id: string;
    title: string;
    description: string;
    fields: CalculatorField[];
    calculate: (values: CalculatorValues) => CalculatorResult[];
    getSchedule?: (values: CalculatorValues) => CalculatorSchedule | null;
};

export type CalculatorValues = Record<string, number | string>;

const currency = "$";

function num(values: CalculatorValues, key: string) {
    const value = Number(values[key]);
    return Number.isFinite(value) ? value : 0;
}

function str(values: CalculatorValues, key: string) {
    return String(values[key] ?? "");
}

function money(label: string, value: number): CalculatorResult {
    return { label, value, prefix: currency, precision: 2 };
}

function pct(label: string, value: number): CalculatorResult {
    return { label, value, suffix: "%", precision: 2 };
}

function applyCap(value: number, cap: number) {
    return Math.min(Math.max(0, value), cap);
}

function calculateProgressiveTax(
    taxableIncome: number,
    slabs: Array<{ limit: number; rate: number }>
) {
    let tax = 0;
    let lowerLimit = 0;

    for (const slab of slabs) {
        if (taxableIncome <= lowerLimit) break;

        const taxableAtSlab = Math.min(taxableIncome, slab.limit) - lowerLimit;
        tax += taxableAtSlab * slab.rate;
        lowerLimit = slab.limit;
    }

    return tax;
}

function oldRegimeSlabs(ageCategory: string) {
    if (ageCategory === "superSenior") {
        return [
            { limit: 500000, rate: 0 },
            { limit: 1000000, rate: 0.2 },
            { limit: Number.POSITIVE_INFINITY, rate: 0.3 },
        ];
    }

    if (ageCategory === "senior") {
        return [
            { limit: 300000, rate: 0 },
            { limit: 500000, rate: 0.05 },
            { limit: 1000000, rate: 0.2 },
            { limit: Number.POSITIVE_INFINITY, rate: 0.3 },
        ];
    }

    return [
        { limit: 250000, rate: 0 },
        { limit: 500000, rate: 0.05 },
        { limit: 1000000, rate: 0.2 },
        { limit: Number.POSITIVE_INFINITY, rate: 0.3 },
    ];
}

const newRegimeSlabs = [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.1 },
    { limit: 1600000, rate: 0.15 },
    { limit: 2000000, rate: 0.2 },
    { limit: 2400000, rate: 0.25 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.3 },
];

function disabilityDeduction(value: string) {
    if (value === "severe") return 125000;
    if (value === "disability") return 75000;
    return 0;
}

function daysBetween(start: string, end: string) {
    const startDate = new Date(`${start}T00:00:00Z`);
    const endDate = new Date(`${end}T00:00:00Z`);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return 0;
    }
    return Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000);
}

function dateBreakdownBetween(start: string, end: string) {
    const startDate = new Date(`${start}T00:00:00Z`);
    const endDate = new Date(`${end}T00:00:00Z`);

    if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime()) ||
        endDate < startDate
    ) {
        return { years: 0, months: 0, days: 0 };
    }

    let years = endDate.getUTCFullYear() - startDate.getUTCFullYear();
    let months = endDate.getUTCMonth() - startDate.getUTCMonth();
    let days = endDate.getUTCDate() - startDate.getUTCDate();

    if (days < 0) {
        const daysInPreviousMonth = new Date(
            Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), 0)
        ).getUTCDate();
        days += daysInPreviousMonth;
        months -= 1;
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months, days };
}

function minutesBetweenDateTimes(
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string
) {
    const start = new Date(`${startDate}T${startTime || "00:00"}:00Z`);
    const end = new Date(`${endDate}T${endTime || "00:00"}:00Z`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return 0;
    }

    return Math.round((end.getTime() - start.getTime()) / 60_000);
}

function addDays(date: string, days: number) {
    const value = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(value.getTime())) return "";
    value.setUTCDate(value.getUTCDate() + days);
    return value.toISOString().slice(0, 10);
}

function monthlyPayment(principal: number, annualRate: number, months: number) {
    if (principal <= 0 || months <= 0) return 0;
    const monthlyRate = annualRate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    const factor = Math.pow(1 + monthlyRate, months);
    return (principal * monthlyRate * factor) / (factor - 1);
}

function clampScheduleMonths(months: number) {
    return Math.min(600, Math.max(0, Math.floor(months)));
}

function createAmortizationSchedule({
    principal,
    annualRate,
    months,
    payment,
    extraPayment = 0,
    fixedMonthlyAddOn = 0,
}: {
    principal: number;
    annualRate: number;
    months: number;
    payment: number;
    extraPayment?: number;
    fixedMonthlyAddOn?: number;
}): CalculatorScheduleRow[] {
    const rows: CalculatorScheduleRow[] = [];
    const monthlyRate = annualRate / 100 / 12;
    let balance = Math.max(0, principal);
    const maxMonths = clampScheduleMonths(months);

    for (let month = 1; month <= maxMonths && balance > 0; month += 1) {
        const interest = balance * monthlyRate;
        const principalPaid = Math.min(
            balance,
            Math.max(0, payment + extraPayment - interest)
        );
        const totalPayment = principalPaid + interest + fixedMonthlyAddOn;
        balance = Math.max(0, balance - principalPaid);

        rows.push({
            month,
            payment: round(totalPayment),
            principalPaid: round(principalPaid),
            interest: round(interest),
            balance: round(balance),
        });

        if (principalPaid <= 0) break;
    }

    return rows;
}

function createInvestmentSchedule({
    initial,
    monthly,
    annualRate,
    months,
}: {
    initial: number;
    monthly: number;
    annualRate: number;
    months: number;
}): CalculatorScheduleRow[] {
    const rows: CalculatorScheduleRow[] = [];
    const monthlyRate = annualRate / 100 / 12;
    let balance = Math.max(0, initial);
    let contributions = Math.max(0, initial);

    for (let month = 1; month <= clampScheduleMonths(months); month += 1) {
        const contribution = Math.max(0, monthly);
        const growth = (balance + contribution) * monthlyRate;
        balance += contribution + growth;
        contributions += contribution;

        rows.push({
            month,
            contribution: round(contribution),
            growth: round(growth),
            totalContributions: round(contributions),
            balance: round(balance),
        });
    }

    return rows;
}

function round(value: number, precision = 2) {
    const factor = 10 ** precision;
    return Math.round((value + Number.EPSILON) * factor) / factor;
}

function def(definition: CalculatorDefinition) {
    return definition;
}

export const calculatorDefinitions = [
    def({
        id: "business/break-even",
        title: "Break Even Calculator",
        description: "Find the sales volume needed to cover fixed and variable costs.",
        fields: [
            {
                key: "fixedCosts",
                label: "Fixed costs",
                defaultValue: 10000,
                min: 0,
                step: 100,
            },
            {
                key: "price",
                label: "Selling price per unit",
                defaultValue: 50,
                min: 0,
                step: 0.01,
            },
            {
                key: "variableCost",
                label: "Variable cost per unit",
                defaultValue: 30,
                min: 0,
                step: 0.01,
            },
        ],
        calculate(values) {
            const contribution = num(values, "price") - num(values, "variableCost");
            const units =
                contribution > 0 ? num(values, "fixedCosts") / contribution : 0;
            return [
                { label: "Break-even units", value: Math.ceil(units), precision: 0 },
                money("Break-even revenue", units * num(values, "price")),
                money("Contribution margin per unit", contribution),
            ];
        },
    }),
    def({
        id: "business/discount",
        title: "Business Discount Calculator",
        description:
            "Calculate sale price, discount value, and gross margin after a discount.",
        fields: [
            {
                key: "listPrice",
                label: "List price",
                defaultValue: 1000,
                min: 0,
                step: 0.01,
            },
            {
                key: "discountRate",
                label: "Discount",
                defaultValue: 15,
                min: 0,
                max: 100,
                step: 0.1,
                suffix: "%",
            },
            { key: "cost", label: "Cost", defaultValue: 650, min: 0, step: 0.01 },
        ],
        calculate(values) {
            const discount =
                (num(values, "listPrice") * num(values, "discountRate")) / 100;
            const salePrice = num(values, "listPrice") - discount;
            return [
                money("Discount amount", discount),
                money("Sale price", salePrice),
                pct(
                    "Margin after discount",
                    salePrice
                        ? ((salePrice - num(values, "cost")) / salePrice) * 100
                        : 0
                ),
            ];
        },
    }),
    def({
        id: "business/inventory-turnover",
        title: "Inventory Turnover Calculator",
        description: "Measure how often inventory is sold and replaced in a period.",
        fields: [
            {
                key: "cogs",
                label: "Cost of goods sold",
                defaultValue: 250000,
                min: 0,
                step: 100,
            },
            {
                key: "beginningInventory",
                label: "Beginning inventory",
                defaultValue: 50000,
                min: 0,
                step: 100,
            },
            {
                key: "endingInventory",
                label: "Ending inventory",
                defaultValue: 70000,
                min: 0,
                step: 100,
            },
        ],
        calculate(values) {
            const averageInventory =
                (num(values, "beginningInventory") + num(values, "endingInventory")) /
                2;
            const turnover = averageInventory
                ? num(values, "cogs") / averageInventory
                : 0;
            return [
                {
                    label: "Inventory turnover",
                    value: turnover,
                    suffix: "x",
                    precision: 2,
                },
                {
                    label: "Days inventory outstanding",
                    value: turnover ? 365 / turnover : 0,
                    suffix: " days",
                    precision: 1,
                },
                money("Average inventory", averageInventory),
            ];
        },
    }),
    def({
        id: "business/markup-markdown",
        title: "Markup Markdown Calculator",
        description: "Calculate markup from cost and markdown from original price.",
        fields: [
            { key: "cost", label: "Cost", defaultValue: 80, min: 0, step: 0.01 },
            {
                key: "sellingPrice",
                label: "Selling price",
                defaultValue: 120,
                min: 0,
                step: 0.01,
            },
            {
                key: "originalPrice",
                label: "Original price",
                defaultValue: 150,
                min: 0,
                step: 0.01,
            },
        ],
        calculate(values) {
            const cost = num(values, "cost");
            const sellingPrice = num(values, "sellingPrice");
            const originalPrice = num(values, "originalPrice");
            return [
                pct("Markup on cost", cost ? ((sellingPrice - cost) / cost) * 100 : 0),
                pct(
                    "Gross margin",
                    sellingPrice ? ((sellingPrice - cost) / sellingPrice) * 100 : 0
                ),
                pct(
                    "Markdown from original",
                    originalPrice
                        ? ((originalPrice - sellingPrice) / originalPrice) * 100
                        : 0
                ),
            ];
        },
    }),
    def({
        id: "business/payroll",
        title: "Payroll Calculator",
        description: "Estimate gross pay, payroll deductions, and net pay.",
        fields: [
            {
                key: "hours",
                label: "Hours worked",
                defaultValue: 40,
                min: 0,
                step: 0.25,
            },
            { key: "rate", label: "Hourly rate", defaultValue: 25, min: 0, step: 0.01 },
            {
                key: "taxRate",
                label: "Deduction rate",
                defaultValue: 18,
                min: 0,
                max: 100,
                step: 0.1,
                suffix: "%",
            },
        ],
        calculate(values) {
            const gross = num(values, "hours") * num(values, "rate");
            const deductions = (gross * num(values, "taxRate")) / 100;
            return [
                money("Gross pay", gross),
                money("Deductions", deductions),
                money("Net pay", gross - deductions),
            ];
        },
    }),
    def({
        id: "business/profit-margin",
        title: "Profit Margin Calculator",
        description: "Calculate profit, margin, and markup from revenue and cost.",
        fields: [
            {
                key: "revenue",
                label: "Revenue",
                defaultValue: 50000,
                min: 0,
                step: 100,
            },
            {
                key: "cost",
                label: "Total cost",
                defaultValue: 32000,
                min: 0,
                step: 100,
            },
        ],
        calculate(values) {
            const profit = num(values, "revenue") - num(values, "cost");
            return [
                money("Profit", profit),
                pct(
                    "Profit margin",
                    num(values, "revenue") ? (profit / num(values, "revenue")) * 100 : 0
                ),
                pct(
                    "Markup",
                    num(values, "cost") ? (profit / num(values, "cost")) * 100 : 0
                ),
            ];
        },
    }),
    def({
        id: "business/roi",
        title: "ROI Calculator",
        description: "Measure return on investment from gain and initial cost.",
        fields: [
            {
                key: "gain",
                label: "Final value or gain",
                defaultValue: 15000,
                min: 0,
                step: 100,
            },
            {
                key: "cost",
                label: "Investment cost",
                defaultValue: 10000,
                min: 0,
                step: 100,
            },
        ],
        calculate(values) {
            const net = num(values, "gain") - num(values, "cost");
            return [
                money("Net return", net),
                pct("ROI", num(values, "cost") ? (net / num(values, "cost")) * 100 : 0),
            ];
        },
    }),
    def({
        id: "business/tip",
        title: "Business Tip Calculator",
        description: "Split a bill with a tip between multiple people.",
        fields: [
            {
                key: "bill",
                label: "Bill amount",
                defaultValue: 120,
                min: 0,
                step: 0.01,
            },
            {
                key: "tipRate",
                label: "Tip",
                defaultValue: 18,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            { key: "people", label: "People", defaultValue: 4, min: 1, step: 1 },
        ],
        calculate(values) {
            const tip = (num(values, "bill") * num(values, "tipRate")) / 100;
            const total = num(values, "bill") + tip;
            return [
                money("Tip amount", tip),
                money("Total", total),
                money("Per person", total / Math.max(1, num(values, "people"))),
            ];
        },
    }),
    def({
        id: "business/vat-sales-tax",
        title: "VAT Sales Tax Calculator",
        description: "Add or extract VAT and sales tax from a price.",
        fields: [
            { key: "amount", label: "Amount", defaultValue: 100, min: 0, step: 0.01 },
            {
                key: "taxRate",
                label: "Tax rate",
                defaultValue: 8.5,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            {
                key: "mode",
                label: "Mode",
                type: "select",
                defaultValue: "add",
                options: [
                    { label: "Add tax", value: "add" },
                    { label: "Amount includes tax", value: "included" },
                ],
            },
        ],
        calculate(values) {
            const amount = num(values, "amount");
            const rate = num(values, "taxRate") / 100;
            const tax =
                str(values, "mode") === "included"
                    ? amount - amount / (1 + rate)
                    : amount * rate;
            const net = str(values, "mode") === "included" ? amount - tax : amount;
            return [
                money("Tax amount", tax),
                money("Net amount", net),
                money("Total amount", net + tax),
            ];
        },
    }),
    def({
        id: "construction/area",
        title: "Area Calculator",
        description:
            "Calculate rectangular area and convert square feet to square yards.",
        fields: [
            {
                key: "length",
                label: "Length",
                defaultValue: 20,
                min: 0,
                step: 0.01,
                suffix: "ft",
            },
            {
                key: "width",
                label: "Width",
                defaultValue: 12,
                min: 0,
                step: 0.01,
                suffix: "ft",
            },
        ],
        calculate(values) {
            const area = num(values, "length") * num(values, "width");
            return [
                { label: "Area", value: area, suffix: " sq ft", precision: 2 },
                { label: "Area", value: area / 9, suffix: " sq yd", precision: 2 },
            ];
        },
    }),
    def({
        id: "construction/concrete",
        title: "Concrete Calculator",
        description: "Estimate concrete volume for a slab.",
        fields: [
            {
                key: "length",
                label: "Length",
                defaultValue: 10,
                min: 0,
                step: 0.01,
                suffix: "ft",
            },
            {
                key: "width",
                label: "Width",
                defaultValue: 10,
                min: 0,
                step: 0.01,
                suffix: "ft",
            },
            {
                key: "thickness",
                label: "Thickness",
                defaultValue: 4,
                min: 0,
                step: 0.1,
                suffix: "in",
            },
        ],
        calculate(values) {
            const cubicFeet =
                num(values, "length") *
                num(values, "width") *
                (num(values, "thickness") / 12);
            return [
                {
                    label: "Concrete volume",
                    value: cubicFeet / 27,
                    suffix: " cu yd",
                    precision: 2,
                },
                {
                    label: "Concrete volume",
                    value: cubicFeet,
                    suffix: " cu ft",
                    precision: 2,
                },
            ];
        },
    }),
    def({
        id: "construction/flooring",
        title: "Flooring Calculator",
        description: "Estimate flooring material and cost with waste allowance.",
        fields: [
            {
                key: "area",
                label: "Floor area",
                defaultValue: 500,
                min: 0,
                step: 1,
                suffix: "sq ft",
            },
            {
                key: "waste",
                label: "Waste allowance",
                defaultValue: 10,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            {
                key: "price",
                label: "Price per sq ft",
                defaultValue: 4.5,
                min: 0,
                step: 0.01,
            },
        ],
        calculate(values) {
            const material = num(values, "area") * (1 + num(values, "waste") / 100);
            return [
                {
                    label: "Material needed",
                    value: material,
                    suffix: " sq ft",
                    precision: 1,
                },
                money("Estimated cost", material * num(values, "price")),
            ];
        },
    }),
    def({
        id: "construction/home-affordability",
        title: "Home Affordability Calculator",
        description:
            "Estimate affordable home price from income, debts, and down payment.",
        fields: [
            {
                key: "income",
                label: "Annual income",
                defaultValue: 90000,
                min: 0,
                step: 1000,
            },
            {
                key: "monthlyDebt",
                label: "Monthly debt",
                defaultValue: 500,
                min: 0,
                step: 50,
            },
            {
                key: "downPayment",
                label: "Down payment",
                defaultValue: 40000,
                min: 0,
                step: 1000,
            },
            {
                key: "dti",
                label: "Target debt-to-income",
                defaultValue: 36,
                min: 0,
                max: 100,
                step: 0.1,
                suffix: "%",
            },
        ],
        calculate(values) {
            const availablePayment = Math.max(
                0,
                ((num(values, "income") / 12) * num(values, "dti")) / 100 -
                    num(values, "monthlyDebt")
            );
            const loanEstimate = availablePayment * 12 * 4;
            return [
                money("Estimated monthly housing budget", availablePayment),
                money("Estimated loan capacity", loanEstimate),
                money(
                    "Estimated home price",
                    loanEstimate + num(values, "downPayment")
                ),
            ];
        },
    }),
    def({
        id: "construction/lumber",
        title: "Lumber Calculator",
        description: "Estimate board feet and lumber cost.",
        fields: [
            {
                key: "thickness",
                label: "Thickness",
                defaultValue: 2,
                min: 0,
                step: 0.25,
                suffix: "in",
            },
            {
                key: "width",
                label: "Width",
                defaultValue: 4,
                min: 0,
                step: 0.25,
                suffix: "in",
            },
            {
                key: "length",
                label: "Length",
                defaultValue: 8,
                min: 0,
                step: 0.25,
                suffix: "ft",
            },
            { key: "quantity", label: "Quantity", defaultValue: 10, min: 0, step: 1 },
            {
                key: "price",
                label: "Price per board foot",
                defaultValue: 3.25,
                min: 0,
                step: 0.01,
            },
        ],
        calculate(values) {
            const boardFeet =
                (num(values, "thickness") *
                    num(values, "width") *
                    num(values, "length") *
                    num(values, "quantity")) /
                12;
            return [
                {
                    label: "Board feet",
                    value: boardFeet,
                    suffix: " bd ft",
                    precision: 2,
                },
                money("Estimated cost", boardFeet * num(values, "price")),
            ];
        },
    }),
    def({
        id: "construction/paint",
        title: "Paint Calculator",
        description: "Estimate paint gallons required for walls.",
        fields: [
            {
                key: "area",
                label: "Wall area",
                defaultValue: 800,
                min: 0,
                step: 1,
                suffix: "sq ft",
            },
            { key: "coats", label: "Coats", defaultValue: 2, min: 1, step: 1 },
            {
                key: "coverage",
                label: "Coverage per gallon",
                defaultValue: 350,
                min: 1,
                step: 1,
                suffix: "sq ft",
            },
        ],
        calculate(values) {
            const gallons =
                (num(values, "area") * num(values, "coats")) /
                Math.max(1, num(values, "coverage"));
            return [
                {
                    label: "Paint needed",
                    value: Math.ceil(gallons),
                    suffix: " gal",
                    precision: 0,
                },
                { label: "Exact amount", value: gallons, suffix: " gal", precision: 2 },
            ];
        },
    }),
    def({
        id: "construction/renovation-cost",
        title: "Renovation Cost Calculator",
        description: "Estimate renovation budget with contingency.",
        fields: [
            {
                key: "area",
                label: "Area",
                defaultValue: 600,
                min: 0,
                step: 1,
                suffix: "sq ft",
            },
            {
                key: "costPerSqFt",
                label: "Cost per sq ft",
                defaultValue: 80,
                min: 0,
                step: 1,
            },
            {
                key: "contingency",
                label: "Contingency",
                defaultValue: 12,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
        ],
        calculate(values) {
            const base = num(values, "area") * num(values, "costPerSqFt");
            return [
                money("Base estimate", base),
                money("Contingency", (base * num(values, "contingency")) / 100),
                money("Total estimate", base * (1 + num(values, "contingency") / 100)),
            ];
        },
    }),
    def({
        id: "construction/roof-pitch",
        title: "Roof Pitch Calculator",
        description: "Convert roof rise and run into pitch, angle, and slope factor.",
        fields: [
            {
                key: "rise",
                label: "Rise",
                defaultValue: 6,
                min: 0,
                step: 0.1,
                suffix: "in",
            },
            {
                key: "run",
                label: "Run",
                defaultValue: 12,
                min: 0.1,
                step: 0.1,
                suffix: "in",
            },
        ],
        calculate(values) {
            const ratio = num(values, "rise") / Math.max(0.1, num(values, "run"));
            return [
                { label: "Pitch", value: `${round(ratio * 12, 2)} / 12` },
                {
                    label: "Angle",
                    value: (Math.atan(ratio) * 180) / Math.PI,
                    suffix: "deg",
                    precision: 2,
                },
                {
                    label: "Slope factor",
                    value: Math.sqrt(1 + ratio ** 2),
                    precision: 3,
                },
            ];
        },
    }),
    def({
        id: "financial/credit-card-payoff",
        title: "Credit Card Payoff Calculator",
        description: "Estimate payoff time and interest for a fixed monthly payment.",
        fields: [
            { key: "balance", label: "Balance", defaultValue: 5000, min: 0, step: 100 },
            {
                key: "apr",
                label: "APR",
                defaultValue: 21,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            {
                key: "payment",
                label: "Monthly payment",
                defaultValue: 250,
                min: 0,
                step: 10,
            },
        ],
        calculate(values) {
            let balance = num(values, "balance");
            const rate = num(values, "apr") / 100 / 12;
            const payment = num(values, "payment");
            let months = 0;
            let interest = 0;
            while (balance > 0 && months < 600 && payment > balance * rate) {
                const monthInterest = balance * rate;
                interest += monthInterest;
                balance = Math.max(0, balance + monthInterest - payment);
                months += 1;
            }
            return [
                {
                    label: "Payoff time",
                    value: months >= 600 ? "Payment too low" : months,
                    suffix: months >= 600 ? "" : " months",
                    precision: 0,
                },
                money("Total interest", months >= 600 ? 0 : interest),
                money(
                    "Total paid",
                    months >= 600 ? 0 : num(values, "balance") + interest
                ),
            ];
        },
        getSchedule(values) {
            const balance = num(values, "balance");
            const payment = num(values, "payment");

            if (balance <= 0 || payment <= 0) return null;

            const rows = createAmortizationSchedule({
                principal: balance,
                annualRate: num(values, "apr"),
                months: 600,
                payment,
            });

            return {
                title: "Month-wise payoff plan",
                description:
                    "Shows how each card payment reduces interest and balance.",
                columns: [
                    { key: "month", label: "Month", precision: 0 },
                    {
                        key: "payment",
                        label: "Payment",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "principalPaid",
                        label: "Principal",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "interest",
                        label: "Interest",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "balance",
                        label: "Balance",
                        prefix: currency,
                        precision: 2,
                    },
                ],
                rows,
            };
        },
    }),
    def({
        id: "financial/currency-converter",
        title: "Currency Converter",
        description: "Convert currency using your entered exchange rate.",
        fields: [
            { key: "amount", label: "Amount", defaultValue: 100, min: 0, step: 0.01 },
            {
                key: "rate",
                label: "Exchange rate",
                defaultValue: 83,
                min: 0,
                step: 0.0001,
            },
        ],
        calculate(values) {
            return [
                {
                    label: "Converted amount",
                    value: num(values, "amount") * num(values, "rate"),
                    precision: 2,
                },
                {
                    label: "Inverse rate",
                    value: num(values, "rate") ? 1 / num(values, "rate") : 0,
                    precision: 6,
                },
            ];
        },
    }),
    def({
        id: "financial/interest",
        title: "Interest Calculator",
        description: "Calculate simple and compound interest.",
        fields: [
            {
                key: "principal",
                label: "Principal",
                defaultValue: 10000,
                min: 0,
                step: 100,
            },
            {
                key: "rate",
                label: "Annual rate",
                defaultValue: 6,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            { key: "years", label: "Years", defaultValue: 5, min: 0, step: 0.25 },
            {
                key: "compounds",
                label: "Compounds per year",
                defaultValue: 12,
                min: 1,
                step: 1,
            },
        ],
        calculate(values) {
            const principal = num(values, "principal");
            const simple =
                principal * (1 + (num(values, "rate") / 100) * num(values, "years"));
            const compound =
                principal *
                Math.pow(
                    1 +
                        num(values, "rate") /
                            100 /
                            Math.max(1, num(values, "compounds")),
                    num(values, "compounds") * num(values, "years")
                );
            return [
                money("Simple interest total", simple),
                money("Compound interest total", compound),
                money("Compound interest earned", compound - principal),
            ];
        },
        getSchedule(values) {
            const months = clampScheduleMonths(num(values, "years") * 12);
            const compounds = Math.max(1, num(values, "compounds"));
            const principal = num(values, "principal");
            const annualRate = num(values, "rate") / 100;
            const rows: CalculatorScheduleRow[] = [];

            if (principal <= 0 || months <= 0) return null;

            for (let month = 1; month <= months; month += 1) {
                const yearsElapsed = month / 12;
                const balance =
                    principal *
                    Math.pow(1 + annualRate / compounds, compounds * yearsElapsed);

                rows.push({
                    month,
                    interest: round(balance - principal),
                    balance: round(balance),
                });
            }

            return {
                title: "Month-wise compound growth",
                description: "Shows projected balance and earned interest by month.",
                columns: [
                    { key: "month", label: "Month", precision: 0 },
                    {
                        key: "interest",
                        label: "Interest",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "balance",
                        label: "Balance",
                        prefix: currency,
                        precision: 2,
                    },
                ],
                rows,
            };
        },
    }),
    def({
        id: "financial/investment-return",
        title: "Investment Return Calculator",
        description: "Project investment growth with recurring contributions.",
        fields: [
            {
                key: "initial",
                label: "Initial investment",
                defaultValue: 10000,
                min: 0,
                step: 100,
            },
            {
                key: "monthly",
                label: "Monthly contribution",
                defaultValue: 250,
                min: 0,
                step: 10,
            },
            {
                key: "rate",
                label: "Annual return",
                defaultValue: 7,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            { key: "years", label: "Years", defaultValue: 10, min: 0, step: 1 },
        ],
        calculate(values) {
            const months = num(values, "years") * 12;
            const rate = num(values, "rate") / 100 / 12;
            const futureInitial = num(values, "initial") * Math.pow(1 + rate, months);
            const futureContrib = rate
                ? num(values, "monthly") * ((Math.pow(1 + rate, months) - 1) / rate)
                : num(values, "monthly") * months;
            const contributed =
                num(values, "initial") + num(values, "monthly") * months;
            return [
                money("Future value", futureInitial + futureContrib),
                money("Total contributions", contributed),
                money("Estimated growth", futureInitial + futureContrib - contributed),
            ];
        },
        getSchedule(values) {
            const months = num(values, "years") * 12;
            const rows = createInvestmentSchedule({
                initial: num(values, "initial"),
                monthly: num(values, "monthly"),
                annualRate: num(values, "rate"),
                months,
            });

            if (rows.length === 0) return null;

            return {
                title: "Month-wise investment plan",
                description:
                    "Shows contributions, estimated growth, and projected balance.",
                columns: [
                    { key: "month", label: "Month", precision: 0 },
                    {
                        key: "contribution",
                        label: "Contribution",
                        prefix: currency,
                        precision: 2,
                    },
                    { key: "growth", label: "Growth", prefix: currency, precision: 2 },
                    {
                        key: "totalContributions",
                        label: "Total contributed",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "balance",
                        label: "Balance",
                        prefix: currency,
                        precision: 2,
                    },
                ],
                rows,
            };
        },
    }),
    def({
        id: "financial/loan",
        title: "Loan Calculator",
        description:
            "Calculate monthly payment, total payment, and interest for a loan.",
        fields: [
            {
                key: "principal",
                label: "Loan amount",
                defaultValue: 250000,
                min: 0,
                step: 1000,
            },
            {
                key: "rate",
                label: "Annual interest rate",
                defaultValue: 6.5,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            {
                key: "years",
                label: "Loan term",
                defaultValue: 30,
                min: 0,
                step: 1,
                suffix: "years",
            },
        ],
        calculate(values) {
            const months = num(values, "years") * 12;
            const payment = monthlyPayment(
                num(values, "principal"),
                num(values, "rate"),
                months
            );
            return [
                money("Monthly payment", payment),
                money("Total payment", payment * months),
                money("Total interest", payment * months - num(values, "principal")),
            ];
        },
        getSchedule(values) {
            const months = num(values, "years") * 12;
            const payment = monthlyPayment(
                num(values, "principal"),
                num(values, "rate"),
                months
            );
            const rows = createAmortizationSchedule({
                principal: num(values, "principal"),
                annualRate: num(values, "rate"),
                months,
                payment,
            });

            if (rows.length === 0) return null;

            return {
                title: "Month-wise repayment plan",
                description:
                    "Shows payment split between principal, interest, and balance.",
                columns: [
                    { key: "month", label: "Month", precision: 0 },
                    {
                        key: "payment",
                        label: "Payment",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "principalPaid",
                        label: "Principal",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "interest",
                        label: "Interest",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "balance",
                        label: "Balance",
                        prefix: currency,
                        precision: 2,
                    },
                ],
                rows,
            };
        },
    }),
    def({
        id: "financial/mortgage",
        title: "Mortgage Calculator",
        description: "Estimate mortgage payment including tax and insurance.",
        fields: [
            {
                key: "homePrice",
                label: "Home price",
                defaultValue: 400000,
                min: 0,
                step: 1000,
            },
            {
                key: "downPayment",
                label: "Down payment",
                defaultValue: 80000,
                min: 0,
                step: 1000,
            },
            {
                key: "rate",
                label: "Interest rate",
                defaultValue: 6.75,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            {
                key: "years",
                label: "Term",
                defaultValue: 30,
                min: 0,
                step: 1,
                suffix: "years",
            },
            {
                key: "taxInsurance",
                label: "Monthly tax and insurance",
                defaultValue: 450,
                min: 0,
                step: 10,
            },
        ],
        calculate(values) {
            const loan = Math.max(
                0,
                num(values, "homePrice") - num(values, "downPayment")
            );
            const principalInterest = monthlyPayment(
                loan,
                num(values, "rate"),
                num(values, "years") * 12
            );
            return [
                money("Principal and interest", principalInterest),
                money(
                    "Total monthly payment",
                    principalInterest + num(values, "taxInsurance")
                ),
                money("Loan amount", loan),
            ];
        },
        getSchedule(values) {
            const loan = Math.max(
                0,
                num(values, "homePrice") - num(values, "downPayment")
            );
            const months = num(values, "years") * 12;
            const principalInterest = monthlyPayment(loan, num(values, "rate"), months);
            const rows = createAmortizationSchedule({
                principal: loan,
                annualRate: num(values, "rate"),
                months,
                payment: principalInterest,
                fixedMonthlyAddOn: num(values, "taxInsurance"),
            });

            if (rows.length === 0) return null;

            return {
                title: "Month-wise mortgage plan",
                description:
                    "Shows principal, interest, estimated tax and insurance, and balance.",
                columns: [
                    { key: "month", label: "Month", precision: 0 },
                    {
                        key: "payment",
                        label: "Payment",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "principalPaid",
                        label: "Principal",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "interest",
                        label: "Interest",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "balance",
                        label: "Balance",
                        prefix: currency,
                        precision: 2,
                    },
                ],
                rows,
            };
        },
    }),
    def({
        id: "financial/net-worth",
        title: "Net Worth Calculator",
        description: "Calculate assets minus liabilities.",
        fields: [
            {
                key: "cash",
                label: "Cash and investments",
                defaultValue: 50000,
                min: 0,
                step: 100,
            },
            {
                key: "property",
                label: "Property and vehicles",
                defaultValue: 300000,
                min: 0,
                step: 1000,
            },
            {
                key: "debt",
                label: "Debts and loans",
                defaultValue: 180000,
                min: 0,
                step: 1000,
            },
        ],
        calculate(values) {
            const assets = num(values, "cash") + num(values, "property");
            return [
                money("Total assets", assets),
                money("Total liabilities", num(values, "debt")),
                money("Net worth", assets - num(values, "debt")),
            ];
        },
    }),
    def({
        id: "financial/retirement-planning",
        title: "Retirement Planning Calculator",
        description:
            "Project retirement savings from current balance and contributions.",
        fields: [
            {
                key: "currentAge",
                label: "Current age",
                defaultValue: 35,
                min: 0,
                step: 1,
            },
            {
                key: "retirementAge",
                label: "Retirement age",
                defaultValue: 65,
                min: 0,
                step: 1,
            },
            {
                key: "savings",
                label: "Current savings",
                defaultValue: 50000,
                min: 0,
                step: 1000,
            },
            {
                key: "monthly",
                label: "Monthly contribution",
                defaultValue: 500,
                min: 0,
                step: 10,
            },
            {
                key: "returnRate",
                label: "Annual return",
                defaultValue: 6,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
        ],
        calculate(values) {
            const years = Math.max(
                0,
                num(values, "retirementAge") - num(values, "currentAge")
            );
            return getCalculatorDefinition("financial/investment-return").calculate({
                initial: num(values, "savings"),
                monthly: num(values, "monthly"),
                rate: num(values, "returnRate"),
                years,
            });
        },
        getSchedule(values) {
            const years = Math.max(
                0,
                num(values, "retirementAge") - num(values, "currentAge")
            );
            const rows = createInvestmentSchedule({
                initial: num(values, "savings"),
                monthly: num(values, "monthly"),
                annualRate: num(values, "returnRate"),
                months: years * 12,
            });

            if (rows.length === 0) return null;

            return {
                title: "Month-wise retirement plan",
                description:
                    "Shows monthly contributions, projected growth, and retirement balance.",
                columns: [
                    { key: "month", label: "Month", precision: 0 },
                    {
                        key: "contribution",
                        label: "Contribution",
                        prefix: currency,
                        precision: 2,
                    },
                    { key: "growth", label: "Growth", prefix: currency, precision: 2 },
                    {
                        key: "totalContributions",
                        label: "Total contributed",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "balance",
                        label: "Balance",
                        prefix: currency,
                        precision: 2,
                    },
                ],
                rows,
            };
        },
    }),
    def({
        id: "financial/savings-goal",
        title: "Savings Goal Calculator",
        description: "Calculate the monthly amount needed to reach a savings goal.",
        fields: [
            {
                key: "goal",
                label: "Savings goal",
                defaultValue: 20000,
                min: 0,
                step: 100,
            },
            {
                key: "current",
                label: "Current savings",
                defaultValue: 5000,
                min: 0,
                step: 100,
            },
            { key: "months", label: "Months", defaultValue: 24, min: 1, step: 1 },
        ],
        calculate(values) {
            const remaining = Math.max(0, num(values, "goal") - num(values, "current"));
            return [
                money("Remaining amount", remaining),
                money(
                    "Monthly savings needed",
                    remaining / Math.max(1, num(values, "months"))
                ),
            ];
        },
        getSchedule(values) {
            const months = Math.max(1, num(values, "months"));
            const remaining = Math.max(0, num(values, "goal") - num(values, "current"));
            const monthly = remaining / months;
            const rows: CalculatorScheduleRow[] = [];
            let balance = num(values, "current");

            for (let month = 1; month <= clampScheduleMonths(months); month += 1) {
                const contribution = Math.min(
                    monthly,
                    Math.max(0, num(values, "goal") - balance)
                );
                balance = Math.min(num(values, "goal"), balance + contribution);

                rows.push({
                    month,
                    contribution: round(contribution),
                    balance: round(balance),
                    remaining: round(Math.max(0, num(values, "goal") - balance)),
                });
            }

            if (rows.length === 0) return null;

            return {
                title: "Month-wise savings plan",
                description: "Shows the monthly amount needed to reach the goal.",
                columns: [
                    { key: "month", label: "Month", precision: 0 },
                    {
                        key: "contribution",
                        label: "Deposit",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "balance",
                        label: "Balance",
                        prefix: currency,
                        precision: 2,
                    },
                    {
                        key: "remaining",
                        label: "Remaining",
                        prefix: currency,
                        precision: 2,
                    },
                ],
                rows,
            };
        },
    }),
    def({
        id: "financial/tax/income-tax",
        title: "Income Tax Calculator",
        description:
            "Estimate Indian income tax for AY 2026-27 under the new regime, old regime, or both.",
        fields: [
            {
                key: "regime",
                label: "Tax regime",
                type: "select",
                defaultValue: "compare",
                helperText:
                    "New regime is the default regime; compare mode calculates both and highlights the lower estimate.",
                options: [
                    { label: "Compare both regimes", value: "compare" },
                    { label: "New regime", value: "new" },
                    { label: "Old regime", value: "old" },
                ],
            },
            {
                key: "ageCategory",
                label: "Age category",
                type: "select",
                defaultValue: "below60",
                helperText:
                    "Old-regime basic exemption changes by age. New-regime slabs are the same across age categories.",
                options: [
                    { label: "Below 60 years", value: "below60" },
                    { label: "Senior citizen: 60 to 79", value: "senior" },
                    { label: "Super senior citizen: 80+", value: "superSenior" },
                ],
            },
            {
                key: "salaryIncome",
                label: "Salary / pension income",
                defaultValue: 1500000,
                min: 0,
                step: 1000,
                helperText:
                    "Annual salary or pension before standard deduction and exemptions.",
            },
            {
                key: "otherIncome",
                label: "Other taxable income",
                defaultValue: 0,
                min: 0,
                step: 1000,
                helperText:
                    "Interest, rent, freelance income, or other regular-rate income. Special-rate capital gains are not modeled.",
            },
            {
                key: "standardDeductionOld",
                label: "Standard deduction - old regime",
                defaultValue: 50000,
                min: 0,
                max: 50000,
                step: 1000,
                helperText:
                    "For salaried/pension income. Auto-filled at the usual old-regime cap; limited to salary income in calculation.",
            },
            {
                key: "standardDeductionNew",
                label: "Standard deduction - new regime",
                defaultValue: 75000,
                min: 0,
                max: 75000,
                step: 1000,
                helperText:
                    "For salaried/pension income. Auto-filled at the common new-regime cap; limited to salary income in calculation.",
            },
            {
                key: "hraExemption",
                label: "HRA exemption - old regime",
                defaultValue: 0,
                min: 0,
                step: 1000,
                helperText:
                    "Old regime only. Enter eligible HRA exemption based on salary, HRA received, rent paid, and city.",
            },
            {
                key: "ltaExemption",
                label: "LTA exemption - old regime",
                defaultValue: 0,
                min: 0,
                step: 1000,
                helperText:
                    "Old regime only. Enter eligible leave travel allowance for permitted domestic travel claims.",
            },
            {
                key: "homeLoanSelfOccupied",
                label: "Section 24(b) home loan interest - self occupied",
                defaultValue: 200000,
                min: 0,
                max: 200000,
                step: 1000,
                helperText:
                    "Old regime: interest on housing loan for self-occupied property. Max generally Rs 2,00,000 for eligible purchase/construction.",
            },
            {
                key: "section80C",
                label: "80C / 80CCC / 80CCD(1)",
                defaultValue: 150000,
                min: 0,
                max: 150000,
                step: 1000,
                helperText:
                    "Old regime: LIC premium, PF/PPF/EPF, ELSS, tuition fees, NSC, housing-loan principal, annuity plans, employee NPS. Combined cap Rs 1,50,000.",
            },
            {
                key: "nps80CCD1B",
                label: "80CCD(1B) additional NPS",
                defaultValue: 50000,
                min: 0,
                max: 50000,
                step: 1000,
                helperText:
                    "Old regime: additional employee NPS contribution over 80C, with PRAN details. Max Rs 50,000.",
            },
            {
                key: "employerType",
                label: "Employer type for 80CCD(2)",
                type: "select",
                defaultValue: "other",
                helperText:
                    "Used to cap employer NPS contribution. New regime allows 14% of salary; old regime is generally 10% for private/PSU and 14% for government.",
                options: [
                    { label: "Private / PSU / other", value: "other" },
                    { label: "Central or State Government", value: "government" },
                ],
            },
            {
                key: "employerNps80CCD2",
                label: "80CCD(2) employer NPS",
                defaultValue: 0,
                min: 0,
                step: 1000,
                helperText:
                    "Old and new regimes: employer contribution to NPS. Enter actual employer contribution; calculator applies salary-based cap.",
            },
            {
                key: "agniveer80CCH",
                label: "80CCH Agniveer Corpus Fund",
                defaultValue: 0,
                min: 0,
                step: 1000,
                helperText:
                    "Old and new regimes: contribution to Agniveer Corpus Fund for eligible Agnipath Scheme subscribers.",
            },
            {
                key: "healthSelf80D",
                label: "80D health premium - self/family",
                defaultValue: 25000,
                min: 0,
                max: 50000,
                step: 1000,
                helperText:
                    "Old regime: health insurance and preventive check-up for self, spouse, and dependent children. Use up to Rs 50,000 if senior citizen applies.",
            },
            {
                key: "healthParents80D",
                label: "80D health premium - parents",
                defaultValue: 50000,
                min: 0,
                max: 50000,
                step: 1000,
                helperText:
                    "Old regime: parents' health insurance or medical expenditure where applicable. Auto-filled at senior-parent cap Rs 50,000.",
            },
            {
                key: "disabledDependent80DD",
                label: "80DD disabled dependent",
                type: "select",
                defaultValue: "severe",
                helperText:
                    "Old regime: flat deduction for maintenance/medical treatment of disabled dependent. Needs disability details/Form 10-IA where applicable.",
                options: [
                    { label: "Severe disability - Rs 1,25,000", value: "severe" },
                    { label: "Disability - Rs 75,000", value: "disability" },
                    { label: "Not applicable", value: "none" },
                ],
            },
            {
                key: "medical80DDB",
                label: "80DDB specified disease treatment",
                defaultValue: 100000,
                min: 0,
                max: 100000,
                step: 1000,
                helperText:
                    "Old regime: specified disease treatment for self/dependent. Cap Rs 40,000, or Rs 1,00,000 for senior citizen cases.",
            },
            {
                key: "educationLoan80E",
                label: "80E education loan interest",
                defaultValue: 0,
                min: 0,
                step: 1000,
                helperText:
                    "Old regime: interest paid on higher-education loan for self or relative. No fixed rupee cap in this estimator.",
            },
            {
                key: "homeLoan80EE",
                label: "80EE first home loan interest",
                defaultValue: 50000,
                min: 0,
                max: 50000,
                step: 1000,
                helperText:
                    "Old regime: additional interest deduction for eligible home loans sanctioned in the specified 2016-17 window. Max Rs 50,000.",
            },
            {
                key: "homeLoan80EEA",
                label: "80EEA affordable housing interest",
                defaultValue: 150000,
                min: 0,
                max: 150000,
                step: 1000,
                helperText:
                    "Old regime: first-time affordable-housing loan interest for eligible sanction period. Max Rs 1,50,000; cannot overlap with 80EE.",
            },
            {
                key: "evLoan80EEB",
                label: "80EEB electric vehicle loan interest",
                defaultValue: 150000,
                min: 0,
                max: 150000,
                step: 1000,
                helperText:
                    "Old regime: electric-vehicle loan interest for eligible sanction period. Max Rs 1,50,000.",
            },
            {
                key: "donations80G",
                label: "80G eligible donations",
                defaultValue: 0,
                min: 0,
                step: 1000,
                helperText:
                    "Old regime: eligible donations to prescribed funds/institutions. Some categories are 50%/100% and some have qualifying limits; cash above Rs 2,000 is not eligible.",
            },
            {
                key: "rent80GG",
                label: "80GG rent paid",
                defaultValue: 60000,
                min: 0,
                max: 60000,
                step: 1000,
                helperText:
                    "Old regime: rent deduction when HRA is not part of salary. Simplified cap used here: Rs 5,000/month; actual deduction is least of rule-based amounts.",
            },
            {
                key: "donations80GGA",
                label: "80GGA scientific/rural development donation",
                defaultValue: 0,
                min: 0,
                step: 1000,
                helperText:
                    "Old regime: donations for scientific research or rural development. Cash above Rs 2,000 is not eligible; business-income cases have restrictions.",
            },
            {
                key: "political80GGC",
                label: "80GGC political contribution",
                defaultValue: 0,
                min: 0,
                step: 1000,
                helperText:
                    "Old regime: non-cash contribution to political party or electoral trust. Cash contribution is not eligible.",
            },
            {
                key: "savingsInterest80TTA",
                label: "80TTA savings account interest",
                defaultValue: 10000,
                min: 0,
                max: 10000,
                step: 1000,
                helperText:
                    "Old regime: savings-bank interest for non-senior citizens. Max Rs 10,000.",
            },
            {
                key: "seniorInterest80TTB",
                label: "80TTB senior citizen deposit interest",
                defaultValue: 50000,
                min: 0,
                max: 50000,
                step: 1000,
                helperText:
                    "Old regime: bank/post-office/co-operative deposit interest for resident senior citizens. Max Rs 50,000.",
            },
            {
                key: "selfDisability80U",
                label: "80U self disability",
                type: "select",
                defaultValue: "severe",
                helperText:
                    "Old regime: flat deduction for resident individual with disability. Requires disability details/Form 10-IA where applicable.",
                options: [
                    { label: "Severe disability - Rs 1,25,000", value: "severe" },
                    { label: "Disability - Rs 75,000", value: "disability" },
                    { label: "Not applicable", value: "none" },
                ],
            },
            {
                key: "tdsPaid",
                label: "TDS / advance tax already paid",
                defaultValue: 0,
                min: 0,
                step: 100,
                helperText:
                    "Optional. Used only to estimate net payable/refund after computing tax plus cess. Surcharge and special-rate income are not modeled.",
            },
        ],
        calculate(values) {
            const salary = num(values, "salaryIncome");
            const grossIncome = salary + num(values, "otherIncome");
            const ageCategory = str(values, "ageCategory");
            const employerNpsCapOld =
                salary * (str(values, "employerType") === "government" ? 0.14 : 0.1);
            const employerNpsCapNew = salary * 0.14;
            const oldDeductions =
                Math.min(salary, applyCap(num(values, "standardDeductionOld"), 50000)) +
                num(values, "hraExemption") +
                num(values, "ltaExemption") +
                applyCap(num(values, "homeLoanSelfOccupied"), 200000) +
                applyCap(num(values, "section80C"), 150000) +
                applyCap(num(values, "nps80CCD1B"), 50000) +
                applyCap(num(values, "employerNps80CCD2"), employerNpsCapOld) +
                num(values, "agniveer80CCH") +
                applyCap(num(values, "healthSelf80D"), 50000) +
                applyCap(num(values, "healthParents80D"), 50000) +
                disabilityDeduction(str(values, "disabledDependent80DD")) +
                applyCap(
                    num(values, "medical80DDB"),
                    ageCategory === "below60" ? 40000 : 100000
                ) +
                num(values, "educationLoan80E") +
                applyCap(num(values, "homeLoan80EE"), 50000) +
                applyCap(num(values, "homeLoan80EEA"), 150000) +
                applyCap(num(values, "evLoan80EEB"), 150000) +
                num(values, "donations80G") +
                applyCap(num(values, "rent80GG"), 60000) +
                num(values, "donations80GGA") +
                num(values, "political80GGC") +
                (ageCategory === "below60"
                    ? applyCap(num(values, "savingsInterest80TTA"), 10000)
                    : 0) +
                (ageCategory === "below60"
                    ? 0
                    : applyCap(num(values, "seniorInterest80TTB"), 50000)) +
                disabilityDeduction(str(values, "selfDisability80U"));
            const newDeductions =
                Math.min(salary, applyCap(num(values, "standardDeductionNew"), 75000)) +
                applyCap(num(values, "employerNps80CCD2"), employerNpsCapNew) +
                num(values, "agniveer80CCH");
            const oldTaxable = Math.max(0, grossIncome - oldDeductions);
            const newTaxable = Math.max(0, grossIncome - newDeductions);
            const oldTaxBeforeRebate = calculateProgressiveTax(
                oldTaxable,
                oldRegimeSlabs(ageCategory)
            );
            const newTaxBeforeRebate = calculateProgressiveTax(
                newTaxable,
                newRegimeSlabs
            );
            const oldTaxAfterRebate =
                oldTaxable <= 500000
                    ? Math.max(0, oldTaxBeforeRebate - 12500)
                    : oldTaxBeforeRebate;
            const newTaxAfterRebate =
                newTaxable <= 1200000
                    ? Math.max(0, newTaxBeforeRebate - 60000)
                    : newTaxBeforeRebate;
            const oldTaxWithCess = oldTaxAfterRebate * 1.04;
            const newTaxWithCess = newTaxAfterRebate * 1.04;
            const tdsPaid = num(values, "tdsPaid");
            const regime = str(values, "regime");
            const betterRegime = newTaxWithCess <= oldTaxWithCess ? "New" : "Old";
            const selectedTax =
                regime === "old"
                    ? oldTaxWithCess
                    : regime === "new"
                      ? newTaxWithCess
                      : Math.min(oldTaxWithCess, newTaxWithCess);

            return [
                { label: "Lower estimated regime", value: betterRegime },
                money("Gross income", grossIncome),
                money("Old regime deductions", oldDeductions),
                money("Old regime taxable income", oldTaxable),
                money("Old regime tax plus 4% cess", oldTaxWithCess),
                money("New regime deductions", newDeductions),
                money("New regime taxable income", newTaxable),
                money("New regime tax plus 4% cess", newTaxWithCess),
                money("Selected / lower tax estimate", selectedTax),
                money("Net payable after TDS", selectedTax - tdsPaid),
                {
                    label: "Assumption",
                    value: "Surcharge, marginal relief, special-rate capital gains, AMT, and detailed 80G/HRA/80GG formulas are not modeled.",
                },
            ];
        },
    }),
    def({
        id: "financial/tax/property-tax",
        title: "Property Tax Calculator",
        description: "Estimate annual and monthly property tax.",
        fields: [
            {
                key: "assessedValue",
                label: "Assessed value",
                defaultValue: 350000,
                min: 0,
                step: 1000,
            },
            {
                key: "taxRate",
                label: "Tax rate",
                defaultValue: 1.2,
                min: 0,
                step: 0.01,
                suffix: "%",
            },
        ],
        calculate(values) {
            const annual =
                (num(values, "assessedValue") * num(values, "taxRate")) / 100;
            return [
                money("Annual property tax", annual),
                money("Monthly property tax", annual / 12),
            ];
        },
    }),
    def({
        id: "health-fitness/bmi",
        title: "BMI Calculator",
        description: "Calculate body mass index from height and weight.",
        fields: [
            {
                key: "weight",
                label: "Weight",
                defaultValue: 70,
                min: 0,
                step: 0.1,
                suffix: "kg",
            },
            {
                key: "height",
                label: "Height",
                defaultValue: 175,
                min: 1,
                step: 0.1,
                suffix: "cm",
            },
        ],
        calculate(values) {
            const bmi = num(values, "weight") / (num(values, "height") / 100) ** 2;
            const category =
                bmi < 18.5
                    ? "Underweight"
                    : bmi < 25
                      ? "Healthy weight"
                      : bmi < 30
                        ? "Overweight"
                        : "Obesity range";
            return [
                { label: "BMI", value: bmi, precision: 1 },
                { label: "Category", value: category },
            ];
        },
    }),
    def({
        id: "health-fitness/bmr",
        title: "BMR Calculator",
        description: "Estimate basal metabolic rate using Mifflin-St Jeor.",
        fields: [
            {
                key: "sex",
                label: "Sex",
                type: "select",
                defaultValue: "male",
                options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                ],
            },
            {
                key: "weight",
                label: "Weight",
                defaultValue: 70,
                min: 0,
                step: 0.1,
                suffix: "kg",
            },
            {
                key: "height",
                label: "Height",
                defaultValue: 175,
                min: 0,
                step: 0.1,
                suffix: "cm",
            },
            { key: "age", label: "Age", defaultValue: 30, min: 0, step: 1 },
        ],
        calculate(values) {
            const base =
                10 * num(values, "weight") +
                6.25 * num(values, "height") -
                5 * num(values, "age");
            return [
                {
                    label: "BMR",
                    value: base + (str(values, "sex") === "male" ? 5 : -161),
                    suffix: " kcal/day",
                    precision: 0,
                },
            ];
        },
    }),
    def({
        id: "health-fitness/body-fat",
        title: "Body Fat Calculator",
        description: "Estimate body fat percentage using BMI, age, and sex.",
        fields: [
            {
                key: "sex",
                label: "Sex",
                type: "select",
                defaultValue: "male",
                options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                ],
            },
            {
                key: "weight",
                label: "Weight",
                defaultValue: 70,
                min: 0,
                step: 0.1,
                suffix: "kg",
            },
            {
                key: "height",
                label: "Height",
                defaultValue: 175,
                min: 0,
                step: 0.1,
                suffix: "cm",
            },
            { key: "age", label: "Age", defaultValue: 30, min: 0, step: 1 },
        ],
        calculate(values) {
            const bmi = num(values, "weight") / (num(values, "height") / 100) ** 2;
            const fat =
                1.2 * bmi +
                0.23 * num(values, "age") -
                (str(values, "sex") === "male" ? 16.2 : 5.4);
            return [
                pct("Estimated body fat", fat),
                { label: "BMI", value: bmi, precision: 1 },
            ];
        },
    }),
    def({
        id: "health-fitness/calorie",
        title: "Calorie Calculator",
        description: "Estimate daily calorie needs from BMR and activity level.",
        fields: [
            {
                key: "bmr",
                label: "BMR",
                defaultValue: 1650,
                min: 0,
                step: 10,
                suffix: "kcal",
            },
            {
                key: "activity",
                label: "Activity multiplier",
                defaultValue: 1.55,
                min: 1,
                step: 0.01,
            },
        ],
        calculate(values) {
            const maintenance = num(values, "bmr") * num(values, "activity");
            return [
                {
                    label: "Maintenance calories",
                    value: maintenance,
                    suffix: " kcal/day",
                    precision: 0,
                },
                {
                    label: "Weight loss target",
                    value: maintenance - 500,
                    suffix: " kcal/day",
                    precision: 0,
                },
            ];
        },
    }),
    def({
        id: "health-fitness/heart-rate-zone",
        title: "Heart Rate Zone Calculator",
        description: "Estimate training zones from age and resting heart rate.",
        fields: [
            { key: "age", label: "Age", defaultValue: 35, min: 0, step: 1 },
            {
                key: "resting",
                label: "Resting heart rate",
                defaultValue: 60,
                min: 0,
                step: 1,
                suffix: "bpm",
            },
        ],
        calculate(values) {
            const max = 220 - num(values, "age");
            const reserve = max - num(values, "resting");
            return [
                { label: "Max heart rate", value: max, suffix: " bpm", precision: 0 },
                {
                    label: "Moderate zone",
                    value: `${round(num(values, "resting") + reserve * 0.5, 0)}-${round(num(values, "resting") + reserve * 0.7, 0)} bpm`,
                },
                {
                    label: "Vigorous zone",
                    value: `${round(num(values, "resting") + reserve * 0.7, 0)}-${round(num(values, "resting") + reserve * 0.85, 0)} bpm`,
                },
            ];
        },
    }),
    def({
        id: "health-fitness/ideal-weight",
        title: "Ideal Weight Calculator",
        description: "Estimate ideal body weight using the Devine formula.",
        fields: [
            {
                key: "sex",
                label: "Sex",
                type: "select",
                defaultValue: "male",
                options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                ],
            },
            {
                key: "height",
                label: "Height",
                defaultValue: 175,
                min: 0,
                step: 0.1,
                suffix: "cm",
            },
        ],
        calculate(values) {
            const inchesOverFiveFeet = Math.max(0, num(values, "height") / 2.54 - 60);
            const ideal =
                (str(values, "sex") === "male" ? 50 : 45.5) + 2.3 * inchesOverFiveFeet;
            return [
                { label: "Ideal weight", value: ideal, suffix: " kg", precision: 1 },
            ];
        },
    }),
    def({
        id: "health-fitness/macronutrient",
        title: "Macronutrient Calculator",
        description: "Split daily calories across protein, carbohydrates, and fat.",
        fields: [
            {
                key: "calories",
                label: "Daily calories",
                defaultValue: 2200,
                min: 0,
                step: 10,
            },
            {
                key: "protein",
                label: "Protein",
                defaultValue: 30,
                min: 0,
                max: 100,
                step: 1,
                suffix: "%",
            },
            {
                key: "carbs",
                label: "Carbohydrates",
                defaultValue: 40,
                min: 0,
                max: 100,
                step: 1,
                suffix: "%",
            },
        ],
        calculate(values) {
            const calories = num(values, "calories");
            const proteinCalories = (calories * num(values, "protein")) / 100;
            const carbCalories = (calories * num(values, "carbs")) / 100;
            const fatCalories = Math.max(0, calories - proteinCalories - carbCalories);
            return [
                {
                    label: "Protein",
                    value: proteinCalories / 4,
                    suffix: " g",
                    precision: 0,
                },
                {
                    label: "Carbohydrates",
                    value: carbCalories / 4,
                    suffix: " g",
                    precision: 0,
                },
                { label: "Fat", value: fatCalories / 9, suffix: " g", precision: 0 },
            ];
        },
    }),
    def({
        id: "health-fitness/pregnancy-due-date",
        title: "Pregnancy Due Date Calculator",
        description:
            "Estimate due date from the first day of the last menstrual period.",
        fields: [
            {
                key: "lmp",
                label: "Last menstrual period",
                type: "date",
                defaultValue: "2026-01-01",
            },
        ],
        calculate(values) {
            return [
                {
                    label: "Estimated due date",
                    value: addDays(str(values, "lmp"), 280),
                },
                {
                    label: "Estimated conception date",
                    value: addDays(str(values, "lmp"), 14),
                },
            ];
        },
    }),
    def({
        id: "health-fitness/water-intake",
        title: "Water Intake Calculator",
        description: "Estimate daily water intake from weight and activity.",
        fields: [
            {
                key: "weight",
                label: "Weight",
                defaultValue: 70,
                min: 0,
                step: 0.1,
                suffix: "kg",
            },
            {
                key: "activityMinutes",
                label: "Activity",
                defaultValue: 30,
                min: 0,
                step: 5,
                suffix: "min",
            },
        ],
        calculate(values) {
            const liters =
                num(values, "weight") * 0.033 + num(values, "activityMinutes") * 0.012;
            return [
                {
                    label: "Daily water target",
                    value: liters,
                    suffix: " L",
                    precision: 2,
                },
                { label: "Cups", value: liters / 0.237, precision: 1 },
            ];
        },
    }),
    def({
        id: "math-science/date-time",
        title: "Date Time Calculator",
        description: "Find the duration between two dates and times.",
        fields: [
            {
                key: "start",
                label: "Start date",
                type: "date",
                defaultValue: "2026-01-01",
            },
            {
                key: "startTime",
                label: "Start time",
                type: "time",
                defaultValue: "09:00",
            },
            { key: "end", label: "End date", type: "date", defaultValue: "2026-12-31" },
            {
                key: "endTime",
                label: "End time",
                type: "time",
                defaultValue: "17:30",
            },
        ],
        calculate(values) {
            const minutes = minutesBetweenDateTimes(
                str(values, "start"),
                str(values, "startTime"),
                str(values, "end"),
                str(values, "endTime")
            );
            const absoluteMinutes = Math.abs(minutes);
            const days = absoluteMinutes / 1_440;
            return [
                {
                    label: "Duration",
                    value: absoluteMinutes,
                    suffix: " minutes",
                    precision: 0,
                },
                {
                    label: "Duration",
                    value: absoluteMinutes / 60,
                    suffix: " hours",
                    precision: 2,
                },
                { label: "Duration", value: days, suffix: " days", precision: 2 },
                {
                    label: "Duration",
                    value: days / 7,
                    suffix: " weeks",
                    precision: 2,
                },
                {
                    label: "Direction",
                    value: minutes < 0 ? "End is before start" : "End is after start",
                },
            ];
        },
    }),
    def({
        id: "math-science/equation-solver",
        title: "Equation Solver",
        description: "Solve linear equations in the form ax + b = c.",
        fields: [
            { key: "a", label: "a", defaultValue: 2, step: 0.01 },
            { key: "b", label: "b", defaultValue: 4, step: 0.01 },
            { key: "c", label: "c", defaultValue: 10, step: 0.01 },
        ],
        calculate(values) {
            const a = num(values, "a");
            return [
                {
                    label: "x",
                    value:
                        a === 0
                            ? "No single solution"
                            : (num(values, "c") - num(values, "b")) / a,
                    precision: 4,
                },
            ];
        },
    }),
    def({
        id: "math-science/fraction",
        title: "Fraction Calculator",
        description: "Add two fractions and show the decimal value.",
        fields: [
            { key: "n1", label: "First numerator", defaultValue: 1, step: 1 },
            { key: "d1", label: "First denominator", defaultValue: 2, min: 1, step: 1 },
            { key: "n2", label: "Second numerator", defaultValue: 1, step: 1 },
            {
                key: "d2",
                label: "Second denominator",
                defaultValue: 3,
                min: 1,
                step: 1,
            },
        ],
        calculate(values) {
            const denominator =
                Math.max(1, num(values, "d1")) * Math.max(1, num(values, "d2"));
            const numerator =
                num(values, "n1") * Math.max(1, num(values, "d2")) +
                num(values, "n2") * Math.max(1, num(values, "d1"));
            return [
                { label: "Sum", value: `${numerator}/${denominator}` },
                { label: "Decimal", value: numerator / denominator, precision: 4 },
            ];
        },
    }),
    def({
        id: "math-science/percentage",
        title: "Percentage Calculator",
        description: "Calculate percentage, percentage change, and remaining value.",
        fields: [
            { key: "value", label: "Value", defaultValue: 25, step: 0.01 },
            { key: "base", label: "Base", defaultValue: 200, step: 0.01 },
        ],
        calculate(values) {
            return [
                pct(
                    "Value as percentage of base",
                    num(values, "base")
                        ? (num(values, "value") / num(values, "base")) * 100
                        : 0
                ),
                {
                    label: "Base minus value",
                    value: num(values, "base") - num(values, "value"),
                    precision: 2,
                },
            ];
        },
    }),
    def({
        id: "math-science/scientific",
        title: "Scientific Calculator",
        description: "Run common scientific operations on one value.",
        fields: [
            { key: "value", label: "Value", defaultValue: 9, step: 0.01 },
            {
                key: "operation",
                label: "Operation",
                type: "select",
                defaultValue: "sqrt",
                options: [
                    { label: "Square root", value: "sqrt" },
                    { label: "Square", value: "square" },
                    { label: "Sine", value: "sin" },
                    { label: "Natural log", value: "ln" },
                ],
            },
        ],
        calculate(values) {
            const value = num(values, "value");
            const operation = str(values, "operation");
            const result =
                operation === "square"
                    ? value ** 2
                    : operation === "sin"
                      ? Math.sin(value)
                      : operation === "ln"
                        ? Math.log(value)
                        : Math.sqrt(value);
            return [
                {
                    label: "Result",
                    value: Number.isFinite(result) ? result : "Undefined",
                    precision: 6,
                },
            ];
        },
    }),
    def({
        id: "math-science/standard",
        title: "Standard Calculator",
        description: "Calculate with two numbers and a basic operator.",
        fields: [
            { key: "a", label: "First number", defaultValue: 12, step: 0.01 },
            {
                key: "operation",
                label: "Operation",
                type: "select",
                defaultValue: "add",
                options: [
                    { label: "Add", value: "add" },
                    { label: "Subtract", value: "subtract" },
                    { label: "Multiply", value: "multiply" },
                    { label: "Divide", value: "divide" },
                ],
            },
            { key: "b", label: "Second number", defaultValue: 4, step: 0.01 },
        ],
        calculate(values) {
            const a = num(values, "a");
            const b = num(values, "b");
            const operation = str(values, "operation");
            const result =
                operation === "subtract"
                    ? a - b
                    : operation === "multiply"
                      ? a * b
                      : operation === "divide"
                        ? b
                            ? a / b
                            : "Undefined"
                        : a + b;
            return [{ label: "Result", value: result, precision: 6 }];
        },
    }),
    def({
        id: "math-science/statistics",
        title: "Statistics Calculator",
        description: "Calculate mean and sample spread for three values.",
        fields: [
            { key: "a", label: "Value 1", defaultValue: 10, step: 0.01 },
            { key: "b", label: "Value 2", defaultValue: 20, step: 0.01 },
            { key: "c", label: "Value 3", defaultValue: 30, step: 0.01 },
        ],
        calculate(values) {
            const items = [num(values, "a"), num(values, "b"), num(values, "c")];
            const mean = items.reduce((sum, item) => sum + item, 0) / items.length;
            const variance =
                items.reduce((sum, item) => sum + (item - mean) ** 2, 0) / items.length;
            return [
                { label: "Mean", value: mean, precision: 2 },
                { label: "Minimum", value: Math.min(...items), precision: 2 },
                { label: "Maximum", value: Math.max(...items), precision: 2 },
                {
                    label: "Standard deviation",
                    value: Math.sqrt(variance),
                    precision: 2,
                },
            ];
        },
    }),
    def({
        id: "math-science/unit-converter",
        title: "Unit Converter",
        description: "Convert common length units.",
        fields: [
            { key: "value", label: "Value", defaultValue: 10, step: 0.01 },
            {
                key: "conversion",
                label: "Conversion",
                type: "select",
                defaultValue: "m-ft",
                options: [
                    { label: "Meters to feet", value: "m-ft" },
                    { label: "Feet to meters", value: "ft-m" },
                    { label: "Kilometers to miles", value: "km-mi" },
                    { label: "Miles to kilometers", value: "mi-km" },
                ],
            },
        ],
        calculate(values) {
            const factors: Record<string, number> = {
                "m-ft": 3.28084,
                "ft-m": 0.3048,
                "km-mi": 0.621371,
                "mi-km": 1.60934,
            };
            return [
                {
                    label: "Converted value",
                    value:
                        num(values, "value") *
                        (factors[str(values, "conversion")] ?? 1),
                    precision: 4,
                },
            ];
        },
    }),
    def({
        id: "travel/distance",
        title: "Distance Calculator",
        description: "Calculate distance from speed and travel time.",
        fields: [
            {
                key: "speed",
                label: "Average speed",
                defaultValue: 60,
                min: 0,
                step: 0.1,
                suffix: "mph",
            },
            {
                key: "hours",
                label: "Time",
                defaultValue: 3,
                min: 0,
                step: 0.1,
                suffix: "hours",
            },
        ],
        calculate(values) {
            return [
                {
                    label: "Distance",
                    value: num(values, "speed") * num(values, "hours"),
                    suffix: " miles",
                    precision: 2,
                },
            ];
        },
    }),
    def({
        id: "travel/flight-time",
        title: "Flight Time Calculator",
        description: "Estimate total trip time including taxi and layover time.",
        fields: [
            {
                key: "distance",
                label: "Flight distance",
                defaultValue: 1200,
                min: 0,
                step: 1,
                suffix: "miles",
            },
            {
                key: "speed",
                label: "Cruise speed",
                defaultValue: 500,
                min: 1,
                step: 1,
                suffix: "mph",
            },
            {
                key: "extra",
                label: "Taxi and buffer",
                defaultValue: 45,
                min: 0,
                step: 5,
                suffix: "min",
            },
        ],
        calculate(values) {
            const minutes =
                (num(values, "distance") / Math.max(1, num(values, "speed"))) * 60 +
                num(values, "extra");
            return [
                {
                    label: "Estimated flight time",
                    value: minutes / 60,
                    suffix: " hours",
                    precision: 2,
                },
                {
                    label: "Estimated minutes",
                    value: minutes,
                    suffix: " min",
                    precision: 0,
                },
            ];
        },
    }),
    def({
        id: "travel/gas-cost",
        title: "Gas Cost Calculator",
        description: "Estimate fuel cost for a trip.",
        fields: [
            {
                key: "distance",
                label: "Distance",
                defaultValue: 300,
                min: 0,
                step: 1,
                suffix: "miles",
            },
            {
                key: "mpg",
                label: "Fuel economy",
                defaultValue: 28,
                min: 1,
                step: 0.1,
                suffix: "mpg",
            },
            {
                key: "price",
                label: "Fuel price",
                defaultValue: 3.5,
                min: 0,
                step: 0.01,
            },
        ],
        calculate(values) {
            const gallons = num(values, "distance") / Math.max(1, num(values, "mpg"));
            return [
                { label: "Fuel needed", value: gallons, suffix: " gal", precision: 2 },
                money("Fuel cost", gallons * num(values, "price")),
            ];
        },
    }),
    def({
        id: "travel/mileage",
        title: "Mileage Calculator",
        description: "Calculate fuel mileage from miles driven and fuel used.",
        fields: [
            { key: "miles", label: "Miles driven", defaultValue: 350, min: 0, step: 1 },
            {
                key: "gallons",
                label: "Fuel used",
                defaultValue: 12,
                min: 0.1,
                step: 0.1,
                suffix: "gal",
            },
        ],
        calculate(values) {
            return [
                {
                    label: "Mileage",
                    value: num(values, "miles") / Math.max(0.1, num(values, "gallons")),
                    suffix: " mpg",
                    precision: 2,
                },
            ];
        },
    }),
    def({
        id: "travel/timezone-converter",
        title: "Timezone Converter",
        description: "Convert an hour between two UTC offsets.",
        fields: [
            {
                key: "hour",
                label: "Hour at origin",
                defaultValue: 9,
                min: 0,
                max: 23,
                step: 1,
            },
            {
                key: "fromOffset",
                label: "Origin UTC offset",
                defaultValue: -5,
                min: -12,
                max: 14,
                step: 0.5,
            },
            {
                key: "toOffset",
                label: "Destination UTC offset",
                defaultValue: 1,
                min: -12,
                max: 14,
                step: 0.5,
            },
        ],
        calculate(values) {
            const converted =
                (num(values, "hour") -
                    num(values, "fromOffset") +
                    num(values, "toOffset") +
                    24) %
                24;
            return [
                {
                    label: "Destination time",
                    value: `${String(Math.floor(converted)).padStart(2, "0")}:${converted % 1 ? "30" : "00"}`,
                },
            ];
        },
    }),
    def({
        id: "travel/toll-cost",
        title: "Toll Cost Calculator",
        description: "Estimate total toll cost for repeated tolls.",
        fields: [
            {
                key: "tolls",
                label: "Number of tolls",
                defaultValue: 4,
                min: 0,
                step: 1,
            },
            {
                key: "averageCost",
                label: "Average toll",
                defaultValue: 3.75,
                min: 0,
                step: 0.01,
            },
        ],
        calculate(values) {
            return [
                money(
                    "Total toll cost",
                    num(values, "tolls") * num(values, "averageCost")
                ),
            ];
        },
    }),
    def({
        id: "travel/trip-cost",
        title: "Trip Cost Calculator",
        description: "Estimate total trip cost across fuel, lodging, food, and tolls.",
        fields: [
            { key: "fuel", label: "Fuel cost", defaultValue: 120, min: 0, step: 1 },
            { key: "lodging", label: "Lodging", defaultValue: 300, min: 0, step: 1 },
            { key: "food", label: "Food", defaultValue: 180, min: 0, step: 1 },
            {
                key: "tolls",
                label: "Tolls and parking",
                defaultValue: 45,
                min: 0,
                step: 1,
            },
            { key: "people", label: "People", defaultValue: 2, min: 1, step: 1 },
        ],
        calculate(values) {
            const total =
                num(values, "fuel") +
                num(values, "lodging") +
                num(values, "food") +
                num(values, "tolls");
            return [
                money("Total trip cost", total),
                money("Cost per person", total / Math.max(1, num(values, "people"))),
            ];
        },
    }),
    def({
        id: "utility/age",
        title: "Age Calculator",
        description: "Calculate age from birth date to a target date.",
        fields: [
            {
                key: "birthDate",
                label: "Birth date",
                type: "date",
                defaultValue: "1990-01-01",
            },
            {
                key: "asOfDate",
                label: "As of date",
                type: "date",
                defaultValue: "2026-05-15",
            },
        ],
        calculate(values) {
            const days = Math.max(
                0,
                daysBetween(str(values, "birthDate"), str(values, "asOfDate"))
            );
            const breakdown = dateBreakdownBetween(
                str(values, "birthDate"),
                str(values, "asOfDate")
            );
            return [
                {
                    label: "Age in years",
                    value: breakdown.years,
                    suffix: " years",
                    precision: 0,
                },
                { label: "Total days", value: days, suffix: " days", precision: 0 },
                {
                    label: "Years, months, days",
                    value: `${breakdown.years} years, ${breakdown.months} months, ${breakdown.days} days`,
                },
            ];
        },
    }),
    def({
        id: "utility/carbon-footprint",
        title: "Carbon Footprint Calculator",
        description: "Estimate annual transport emissions from mileage and efficiency.",
        fields: [
            {
                key: "miles",
                label: "Miles per year",
                defaultValue: 12000,
                min: 0,
                step: 100,
            },
            { key: "mpg", label: "Vehicle mpg", defaultValue: 28, min: 1, step: 0.1 },
        ],
        calculate(values) {
            const kg = (num(values, "miles") / Math.max(1, num(values, "mpg"))) * 8.887;
            return [
                {
                    label: "Annual emissions",
                    value: kg,
                    suffix: " kg CO2e",
                    precision: 0,
                },
                {
                    label: "Annual emissions",
                    value: kg / 1000,
                    suffix: " metric tons",
                    precision: 2,
                },
            ];
        },
    }),
    def({
        id: "utility/cooking-converter",
        title: "Cooking Converter",
        description: "Convert cups, tablespoons, and milliliters.",
        fields: [
            { key: "value", label: "Value", defaultValue: 1, min: 0, step: 0.01 },
            {
                key: "conversion",
                label: "Conversion",
                type: "select",
                defaultValue: "cup-ml",
                options: [
                    { label: "Cups to mL", value: "cup-ml" },
                    { label: "mL to cups", value: "ml-cup" },
                    { label: "Tablespoons to mL", value: "tbsp-ml" },
                    { label: "mL to tablespoons", value: "ml-tbsp" },
                ],
            },
        ],
        calculate(values) {
            const factors: Record<string, number> = {
                "cup-ml": 236.588,
                "ml-cup": 1 / 236.588,
                "tbsp-ml": 14.787,
                "ml-tbsp": 1 / 14.787,
            };
            return [
                {
                    label: "Converted amount",
                    value:
                        num(values, "value") *
                        (factors[str(values, "conversion")] ?? 1),
                    precision: 3,
                },
            ];
        },
    }),
    def({
        id: "utility/discount",
        title: "Discount Calculator",
        description: "Calculate sale price and savings.",
        fields: [
            {
                key: "price",
                label: "Original price",
                defaultValue: 100,
                min: 0,
                step: 0.01,
            },
            {
                key: "discount",
                label: "Discount",
                defaultValue: 20,
                min: 0,
                max: 100,
                step: 0.1,
                suffix: "%",
            },
        ],
        calculate(values) {
            const savings = (num(values, "price") * num(values, "discount")) / 100;
            return [
                money("You save", savings),
                money("Sale price", num(values, "price") - savings),
            ];
        },
    }),
    def({
        id: "utility/electricity-cost",
        title: "Electricity Cost Calculator",
        description: "Estimate energy use and cost for an appliance.",
        fields: [
            {
                key: "watts",
                label: "Power",
                defaultValue: 1000,
                min: 0,
                step: 1,
                suffix: "W",
            },
            {
                key: "hours",
                label: "Hours per day",
                defaultValue: 3,
                min: 0,
                step: 0.1,
            },
            {
                key: "rate",
                label: "Electricity rate",
                defaultValue: 0.16,
                min: 0,
                step: 0.01,
            },
            { key: "days", label: "Days", defaultValue: 30, min: 1, step: 1 },
        ],
        calculate(values) {
            const kwh =
                (num(values, "watts") / 1000) *
                num(values, "hours") *
                num(values, "days");
            return [
                { label: "Energy used", value: kwh, suffix: " kWh", precision: 2 },
                money("Estimated cost", kwh * num(values, "rate")),
            ];
        },
    }),
    def({
        id: "utility/split-bill",
        title: "Split Bill Calculator",
        description: "Split a bill after tax and tip.",
        fields: [
            {
                key: "subtotal",
                label: "Subtotal",
                defaultValue: 95,
                min: 0,
                step: 0.01,
            },
            {
                key: "tax",
                label: "Tax",
                defaultValue: 8,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            {
                key: "tip",
                label: "Tip",
                defaultValue: 18,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            { key: "people", label: "People", defaultValue: 3, min: 1, step: 1 },
        ],
        calculate(values) {
            const total =
                num(values, "subtotal") *
                (1 + num(values, "tax") / 100 + num(values, "tip") / 100);
            return [
                money("Total bill", total),
                money("Each person pays", total / Math.max(1, num(values, "people"))),
            ];
        },
    }),
    def({
        id: "utility/time-duration",
        title: "Time Duration Calculator",
        description: "Calculate duration between two times on the same day.",
        fields: [
            {
                key: "startHour",
                label: "Start hour",
                defaultValue: 9,
                min: 0,
                max: 23,
                step: 1,
            },
            {
                key: "startMinute",
                label: "Start minute",
                defaultValue: 0,
                min: 0,
                max: 59,
                step: 1,
            },
            {
                key: "endHour",
                label: "End hour",
                defaultValue: 17,
                min: 0,
                max: 23,
                step: 1,
            },
            {
                key: "endMinute",
                label: "End minute",
                defaultValue: 30,
                min: 0,
                max: 59,
                step: 1,
            },
        ],
        calculate(values) {
            const start = num(values, "startHour") * 60 + num(values, "startMinute");
            const end = num(values, "endHour") * 60 + num(values, "endMinute");
            const minutes = (end - start + 1440) % 1440;
            return [
                { label: "Duration", value: minutes, suffix: " min", precision: 0 },
                {
                    label: "Duration",
                    value: minutes / 60,
                    suffix: " hours",
                    precision: 2,
                },
            ];
        },
    }),
    def({
        id: "utility/tip",
        title: "Tip Calculator",
        description: "Calculate tip and per-person total.",
        fields: [
            { key: "bill", label: "Bill", defaultValue: 80, min: 0, step: 0.01 },
            {
                key: "tip",
                label: "Tip",
                defaultValue: 20,
                min: 0,
                step: 0.1,
                suffix: "%",
            },
            { key: "people", label: "People", defaultValue: 2, min: 1, step: 1 },
        ],
        calculate(values) {
            return getCalculatorDefinition("business/tip").calculate({
                bill: num(values, "bill"),
                tipRate: num(values, "tip"),
                people: num(values, "people"),
            });
        },
    }),
    def({
        id: "utility/water-usage",
        title: "Water Usage Calculator",
        description: "Estimate household water use.",
        fields: [
            { key: "people", label: "People", defaultValue: 4, min: 1, step: 1 },
            {
                key: "gallonsPerPerson",
                label: "Gallons per person per day",
                defaultValue: 80,
                min: 0,
                step: 1,
            },
            { key: "days", label: "Days", defaultValue: 30, min: 1, step: 1 },
        ],
        calculate(values) {
            const gallons =
                num(values, "people") *
                num(values, "gallonsPerPerson") *
                num(values, "days");
            return [
                { label: "Water usage", value: gallons, suffix: " gal", precision: 0 },
                {
                    label: "Water usage",
                    value: gallons * 3.78541,
                    suffix: " L",
                    precision: 0,
                },
            ];
        },
    }),
] as const satisfies readonly CalculatorDefinition[];

export type CalculatorId = (typeof calculatorDefinitions)[number]["id"];

export function getCalculatorDefinition(id: string): CalculatorDefinition {
    const definition = calculatorDefinitions.find((item) => item.id === id);
    if (!definition) {
        throw new Error(`Unknown calculator: ${id}`);
    }
    return definition;
}

export function getDefaultValues(definition: CalculatorDefinition): CalculatorValues {
    return Object.fromEntries(
        definition.fields.map((field) => [field.key, field.defaultValue])
    );
}

export function calculateCalculator(
    id: string,
    values: CalculatorValues
): CalculatorResult[] {
    return getCalculatorDefinition(id)
        .calculate(values)
        .map((result) => ({
            ...result,
            value:
                typeof result.value === "number" && Number.isFinite(result.value)
                    ? result.value
                    : result.value,
        }));
}

export function getCalculatorSchedule(
    id: string,
    values: CalculatorValues
): CalculatorSchedule | null {
    return getCalculatorDefinition(id).getSchedule?.(values) ?? null;
}
