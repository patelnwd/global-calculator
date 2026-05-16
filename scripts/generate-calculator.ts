import fs from "fs";
import path from "path";

// Root where calculator groups live
const baseDir = path.join(process.cwd(), "src/app/calculators");

function formatName(dir: string) {
    return dir
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

type Calculator = { name: string; path: string };
type CalculatorGroup = {
    key: string;
    name: string;
    path: string;
    calculators: Calculator[];
};

const groups: CalculatorGroup[] = [];

// Discover all group folders dynamically
const groupDirs = fs
    .readdirSync(baseDir)
    .filter((f) => fs.statSync(path.join(baseDir, f)).isDirectory());
console.log(groupDirs);

for (const group of groupDirs) {
    const groupDir = path.join(baseDir, group);

    const subDirs = fs
        .readdirSync(groupDir)
        .filter((f) => fs.statSync(path.join(groupDir, f)).isDirectory());

    const calculators: Calculator[] = subDirs.map((calc) => ({
        name: `${formatName(calc)} Calculator`,
        path: `./calculators/${group}/${calc}`, // landing page route
    }));

    groups.push({
        key: group.toLowerCase(),
        name: `${formatName(group)} Calculators`,
        path: `./${group}`, // group page route
        calculators,
    });
}

// ✅ Ensure constants folder exists
const constantsDir = path.join(process.cwd(), "src/lib/constants");
if (!fs.existsSync(constantsDir)) {
    fs.mkdirSync(constantsDir, { recursive: true });
}

// ✅ Write output file
const outPath = path.join(constantsDir, "calculators.ts");
fs.writeFileSync(
    outPath,
    `export const calculatorGroups = ${JSON.stringify(groups, null, 2)} as const;\n`
);

console.log("✅ src/lib/constants/calculators.ts generated!");
