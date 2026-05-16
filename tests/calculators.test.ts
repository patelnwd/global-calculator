import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";
import {
    calculateCalculator,
    calculatorDefinitions,
    getCalculatorDefinition,
    getCalculatorSchedule,
} from "../src/lib/calculators/definitions.ts";
import { calculatorGroups } from "../src/lib/constants/calculators.ts";

const projectRoot = process.cwd();
const calculatorsRoot = join(projectRoot, "src/app/calculators");

function walk(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const fullPath = join(dir, entry.name);
        return entry.isDirectory() ? walk(fullPath) : [fullPath];
    });
}

function appPagePath(route: string) {
    const normalizedRoute = route.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    return normalizedRoute === "/"
        ? join(projectRoot, "src/app/page.tsx")
        : join(projectRoot, `src/app${normalizedRoute}/page.tsx`);
}

function internalLinksFromSource(source: string) {
    const links = new Set<string>();
    const patterns = [
        /href="(\/[^"#?]*)"/g,
        /href:\s*"(\/[^"#?]*)"/g,
        /link:\s*"(\/[^"#?]*)"/g,
    ];

    for (const pattern of patterns) {
        for (const match of source.matchAll(pattern)) {
            links.add(match[1]);
        }
    }

    return [...links];
}

test("every generic calculator form has a matching formula definition", () => {
    const formIds = walk(calculatorsRoot)
        .filter((file) => file.endsWith("/form.tsx"))
        .map((file) => readFileSync(file, "utf8").match(/id="([^"]+)"/)?.[1])
        .filter((id): id is string => Boolean(id));

    assert.equal(formIds.length, 61);

    for (const id of formIds) {
        assert.doesNotThrow(() => getCalculatorDefinition(id));
    }
});

test("generated calculator placeholders have been replaced", () => {
    const placeholders = walk(calculatorsRoot)
        .filter((file) => file.endsWith(".tsx"))
        .filter((file) => readFileSync(file, "utf8").includes("[Form fields for"))
        .map((file) => relative(projectRoot, file));

    assert.deepEqual(placeholders, []);
});

test("formula registry exposes unique calculator ids", () => {
    const ids = calculatorDefinitions.map((definition) => definition.id);
    assert.equal(new Set(ids).size, ids.length);
});

test("calculator index links resolve to implemented pages", () => {
    const missingRoutes = calculatorGroups.flatMap((group) =>
        group.calculators
            .map((calculator) => calculator.path.replace(/^\.\//, "src/app/"))
            .filter(
                (routePath) => !existsSync(join(projectRoot, `${routePath}/page.tsx`))
            )
    );

    assert.deepEqual(missingRoutes, []);
});

test("calculator definitions resolve to implemented pages", () => {
    const missingRoutes = calculatorDefinitions
        .map((definition) => `/calculators/${definition.id}`)
        .filter((route) => !existsSync(appPagePath(route)));

    assert.deepEqual(missingRoutes, []);
});

test("static internal links resolve to implemented pages", () => {
    const missingLinks = walk(join(projectRoot, "src"))
        .filter((file) => /\.(ts|tsx)$/.test(file))
        .flatMap((file) =>
            internalLinksFromSource(readFileSync(file, "utf8")).map((link) => ({
                file: relative(projectRoot, file),
                link,
            }))
        )
        .filter(({ link }) => !existsSync(appPagePath(link)));

    assert.deepEqual(missingLinks, []);
});

test("business break-even calculates units and revenue", () => {
    const results = calculateCalculator("business/break-even", {
        fixedCosts: 10000,
        price: 50,
        variableCost: 30,
    });

    assert.equal(results[0].value, 500);
    assert.equal(results[1].value, 25000);
});

test("loan calculator handles amortized monthly payments", () => {
    const results = calculateCalculator("financial/loan", {
        principal: 250000,
        rate: 6.5,
        years: 30,
    });

    assert.equal(Math.round(Number(results[0].value)), 1580);
    assert.equal(Math.round(Number(results[2].value)), 318861);
});

test("health BMI returns the expected category", () => {
    const results = calculateCalculator("health-fitness/bmi", {
        weight: 70,
        height: 175,
    });

    assert.equal(Number(results[0].value).toFixed(1), "22.9");
    assert.equal(results[1].value, "Healthy weight");
});

test("concrete calculator converts slab volume to cubic yards", () => {
    const results = calculateCalculator("construction/concrete", {
        length: 10,
        width: 10,
        thickness: 4,
    });

    assert.equal(Number(results[0].value).toFixed(2), "1.23");
});

test("date time calculator handles date and time duration", () => {
    const results = calculateCalculator("math-science/date-time", {
        start: "2026-05-15",
        startTime: "09:00",
        end: "2026-05-15",
        endTime: "17:30",
    });

    assert.equal(results[0].value, 510);
    assert.equal(results[1].value, 8.5);
    assert.equal(results[4].value, "End is after start");
});

test("income tax calculator compares old and new Indian regimes", () => {
    const results = calculateCalculator("financial/tax/income-tax", {
        regime: "compare",
        ageCategory: "below60",
        salaryIncome: 1500000,
        otherIncome: 0,
        standardDeductionOld: 50000,
        standardDeductionNew: 75000,
        employerType: "other",
        tdsPaid: 0,
    });

    assert.equal(results[0].value, "New");
    assert.equal(results[3].value, 1450000);
    assert.equal(results[6].value, 1425000);
    assert.equal(Math.round(Number(results[7].value)), 97500);
});

test("age calculator returns years, total days, and calendar breakdown", () => {
    const results = calculateCalculator("utility/age", {
        birthDate: "1990-01-01",
        asOfDate: "2026-05-15",
    });

    assert.equal(results[0].value, 36);
    assert.equal(results[1].value, 13283);
    assert.equal(results[2].value, "36 years, 4 months, 14 days");
});

test("loan calculator exposes a month-wise repayment schedule", () => {
    const schedule = getCalculatorSchedule("financial/loan", {
        principal: 12000,
        rate: 12,
        years: 1,
    });

    assert.ok(schedule);
    assert.equal(schedule.rows.length, 12);
    assert.equal(
        schedule.columns.map((column) => column.key).join(","),
        "month,payment,principalPaid,interest,balance"
    );
    assert.equal(schedule.rows[0].month, 1);
    assert.equal(schedule.rows.at(-1)?.balance, 0);
});

test("savings goal exposes a month-wise deposit schedule", () => {
    const schedule = getCalculatorSchedule("financial/savings-goal", {
        goal: 1200,
        current: 0,
        months: 12,
    });

    assert.ok(schedule);
    assert.equal(schedule.rows.length, 12);
    assert.equal(schedule.rows[0].contribution, 100);
    assert.equal(schedule.rows.at(-1)?.balance, 1200);
});

test("investment return exposes a month-wise projection schedule", () => {
    const schedule = getCalculatorSchedule("financial/investment-return", {
        initial: 1000,
        monthly: 100,
        rate: 12,
        years: 1,
    });

    assert.ok(schedule);
    assert.equal(schedule.rows.length, 12);
    assert.equal(schedule.rows[0].contribution, 100);
    assert.ok(Number(schedule.rows.at(-1)?.balance) > 2200);
});
