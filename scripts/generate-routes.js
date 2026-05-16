// scripts/generate-routes.js
import fs from "fs";
import path from "path";

const basePath = path.join(process.cwd(), "src", "app", "calculators");

const structure = {
    financial: [
        "emi",
        "loan",
        "mortgage",
        "interest",
        "tax/income-tax",
        "tax/property-tax",
        "investment-return",
        "retirement-planning",
        "currency-converter",
        "savings-goal",
        "credit-card-payoff",
        "net-worth",
    ],
    "health-fitness": [
        "bmi",
        "bmr",
        "calorie",
        "pregnancy-due-date",
        "body-fat",
        "ideal-weight",
        "water-intake",
        "macronutrient",
        "heart-rate-zone",
    ],
    travel: [
        "mileage",
        "trip-cost",
        "distance",
        "flight-time",
        "timezone-converter",
        "gas-cost",
        "toll-cost",
    ],
    construction: [
        "area",
        "paint",
        "flooring",
        "concrete",
        "roof-pitch",
        "lumber",
        "home-affordability",
        "renovation-cost",
    ],
    "math-science": [
        "standard",
        "scientific",
        "unit-converter",
        "date-time",
        "percentage",
        "fraction",
        "statistics",
        "equation-solver",
    ],
    business: [
        "profit-margin",
        "markup-markdown",
        "payroll",
        "tip",
        "discount",
        "inventory-turnover",
        "break-even",
        "roi",
        "vat-sales-tax",
    ],
    utility: [
        "age",
        "time-duration",
        "split-bill",
        "electricity-cost",
        "water-usage",
        "carbon-footprint",
        "cooking-converter",
        "tip",
        "discount",
    ],
};

// Generate routes with page.tsx, Form.tsx, Result.tsx
function createRoutes() {
    Object.entries(structure).forEach(([category, calculators]) => {
        calculators.forEach((calc) => {
            const folderPath = path.join(basePath, category, calc);
            fs.mkdirSync(folderPath, { recursive: true });

            // Generate page.tsx
            const pagePath = path.join(folderPath, "page.tsx");
            if (!fs.existsSync(pagePath)) {
                fs.writeFileSync(
                    pagePath,
                    `import ${toPascalCase(calc)}Form from "./form";
import ${toPascalCase(calc)}Result from "./result";

export default function ${toPascalCase(calc)}Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">${toTitleCase(calc)} Calculator</h1>
      <${toPascalCase(calc)}Form />
      <${toPascalCase(calc)}Result />
    </main>
  );
}
`
                );
            }

            // Generate Form.tsx
            const formPath = path.join(folderPath, "form.tsx");
            if (!fs.existsSync(formPath)) {
                fs.writeFileSync(
                    formPath,
                    `export default function ${toPascalCase(calc)}Form() {
  return (
    <form className="space-y-4">
      <p className="text-gray-600">[Form fields for ${toTitleCase(
          calc
      )} will go here]</p>
    </form>
  );
}
`
                );
            }

            // Generate Result.tsx
            const resultPath = path.join(folderPath, "result.tsx");
            if (!fs.existsSync(resultPath)) {
                fs.writeFileSync(
                    resultPath,
                    `export default function ${toPascalCase(calc)}Result() {
  return (
    <section className="mt-4 p-4 border rounded bg-gray-50">
      <p className="text-gray-600">[Result for ${toTitleCase(
          calc
      )} will be shown here]</p>
    </section>
  );
}
`
                );
            }
        });
    });

    console.log(
        "✅ All calculator routes (with Form & Result) generated successfully!"
    );
}

// Helpers
function toPascalCase(str) {
    return str
        .replace(/[-/](.)/g, (_, c) => c.toUpperCase())
        .replace(/^(.)/, (_, c) => c.toUpperCase());
}

function toTitleCase(str) {
    return str.replace(/[-/]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Run
createRoutes();
