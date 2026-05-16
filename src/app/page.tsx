import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calculator, Home, Wallet } from "lucide-react";

const calculators = [
    {
        title: "EMI Calculator",
        description: "Calculate monthly installments with ease.",
        link: "/calculators/financial/emi",
        icon: <Calculator className="h-6 w-6 text-cyan-700" />,
    },
    {
        title: "Loan Calculator",
        description: "Plan your loan payments smartly.",
        link: "/calculators/financial/loan",
        icon: <Wallet className="h-6 w-6 text-cyan-700" />,
    },
    {
        title: "Mortgage Calculator",
        description: "Estimate mortgage costs and repayments.",
        link: "/calculators/financial/mortgage",
        icon: <Home className="h-6 w-6 text-cyan-700" />,
    },
];

export default function HomePage() {
    return (
        <main className="mx-auto max-w-6xl space-y-12 p-6">
            {/* Hero Section */}
            <section className="glass-panel rounded-lg px-6 py-12 text-center md:px-12">
                <h1 className="mx-auto max-w-3xl text-4xl font-bold text-slate-950 md:text-5xl">
                    Smarter Calculations for Smarter Decisions
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                    Explore our collection of financial calculators to plan your future
                    with confidence.
                </p>
                <Link
                    href="/calculators"
                    className="glass-button mt-7 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold"
                >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </section>

            {/* Featured Calculators */}
            <section>
                <h2 className="mb-6 text-2xl font-semibold text-slate-950">
                    Featured Calculators
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {calculators.map((calc, i) => (
                        <Link key={i} href={calc.link}>
                            <Card className="glass-card glass-card-hover cursor-pointer rounded-lg">
                                <CardHeader className="flex items-center gap-3">
                                    {calc.icon}
                                    <CardTitle className="text-slate-950">
                                        {calc.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600">{calc.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Finance Tip Section */}
            <section className="glass-panel rounded-lg p-6">
                <h3 className="mb-3 text-xl font-semibold text-slate-950">
                    Did You Know?
                </h3>
                <p className="text-slate-700">
                    Paying just one extra EMI every year can reduce your loan tenure by
                    almost 1 year! Small steps make a big difference in financial
                    planning.
                </p>
            </section>

            {/* CTA Section */}
            <section className="py-8 text-center">
                <h2 className="mb-4 text-2xl font-bold text-slate-950">
                    More Calculators Coming Soon!
                </h2>
                <p className="mb-6 text-slate-600">
                    Stay tuned as we expand into health, utility, and lifestyle
                    calculators.
                </p>
                <Link
                    href="/pages/about"
                    className="font-medium text-cyan-700 underline"
                >
                    Learn More →
                </Link>
            </section>
        </main>
    );
}
