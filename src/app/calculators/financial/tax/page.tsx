import Link from "next/link";

const taxCalculators = [
    {
        title: "Income Tax Calculator",
        description: "Estimate taxable income, tax due, and after-tax income.",
        href: "/calculators/financial/tax/income-tax",
    },
    {
        title: "Property Tax Calculator",
        description: "Estimate annual and monthly property tax from assessed value.",
        href: "/calculators/financial/tax/property-tax",
    },
];

export default function TaxCalculatorPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <section className="glass-panel rounded-lg p-6">
                <h1 className="mb-3 text-3xl font-bold text-slate-950">
                    Tax Calculator
                </h1>
                <p className="mb-6 max-w-2xl text-slate-600">
                    Choose the tax calculator that matches the estimate you need.
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                    {taxCalculators.map((calculator) => (
                        <Link
                            key={calculator.href}
                            href={calculator.href}
                            className="glass-card glass-card-hover block rounded-lg p-6"
                        >
                            <h2 className="text-lg font-semibold text-slate-950">
                                {calculator.title}
                            </h2>
                            <p className="mt-2 text-sm text-slate-600">
                                {calculator.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
