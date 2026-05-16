import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Wallet, Home } from "lucide-react";

const calculators = [
    {
        title: "EMI Calculator",
        description: "Calculate monthly installments with ease.",
        link: "/calculators/financial/emi",
        icon: <Calculator className="w-6 h-6 text-violet-600" />,
    },
    {
        title: "Loan Calculator",
        description: "Plan your loan payments smartly.",
        link: "/calculators/financial/loan",
        icon: <Wallet className="w-6 h-6 text-violet-600" />,
    },
    {
        title: "Mortgage Calculator",
        description: "Estimate mortgage costs and repayments.",
        link: "/calculators/financial/mortgage",
        icon: <Home className="w-6 h-6 text-violet-600" />,
    },
];

export default function HomePage() {
    return (
        <main className="flex-1 max-w-6xl mx-auto p-6 space-y-16">
            {/* Hero Section */}
            <section className="text-center py-10">
                <h1 className="text-4xl font-bold text-violet-700 mb-4">
                    Smarter Calculations for Smarter Decisions
                </h1>
                <p className="text-gray-600 mb-6">
                    Explore our collection of financial calculators to plan your future
                    with confidence.
                </p>
                <Link
                    href="/calculators"
                    className="bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-700"
                >
                    Get Started
                </Link>
            </section>

            {/* Featured Calculators */}
            <section>
                <h2 className="text-2xl font-semibold text-violet-700 mb-6">
                    Featured Calculators
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {calculators.map((calc, i) => (
                        <Link key={i} href={calc.link}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader className="flex items-center gap-3">
                                    {calc.icon}
                                    <CardTitle className="text-violet-700">
                                        {calc.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{calc.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Finance Tip Section */}
            <section className="bg-violet-50 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-violet-700 mb-3">
                    💡 Did You Know?
                </h3>
                <p className="text-gray-700">
                    Paying just one extra EMI every year can reduce your loan tenure by
                    almost 1 year! Small steps make a big difference in financial
                    planning.
                </p>
            </section>

            {/* CTA Section */}
            <section className="text-center py-10">
                <h2 className="text-2xl font-bold text-violet-700 mb-4">
                    More Calculators Coming Soon!
                </h2>
                <p className="text-gray-600 mb-6">
                    Stay tuned as we expand into health, utility, and lifestyle
                    calculators.
                </p>
                <Link
                    href="/pages/about"
                    className="underline text-violet-700 font-medium"
                >
                    Learn More →
                </Link>
            </section>
        </main>
    );
}
