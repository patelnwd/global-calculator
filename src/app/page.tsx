import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight,
    Bot,
    BrainCircuit,
    Calculator,
    Cpu,
    Home,
    Sparkles,
    Wallet,
} from "lucide-react";

const calculators = [
    {
        title: "EMI Calculator",
        description: "Calculate monthly installments with ease.",
        link: "/calculators/financial/emi",
        icon: <Calculator className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
    },
    {
        title: "Loan Calculator",
        description: "Plan your loan payments smartly.",
        link: "/calculators/financial/loan",
        icon: <Wallet className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
    },
    {
        title: "Mortgage Calculator",
        description: "Estimate mortgage costs and repayments.",
        link: "/calculators/financial/mortgage",
        icon: <Home className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
    },
];

export default function HomePage() {
    return (
        <main className="mx-auto max-w-6xl space-y-12 p-6">
            {/* Hero Section */}
            <section className="glass-panel ai-panel cyber-line grid gap-8 rounded-lg px-6 py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] md:px-10 md:py-12">
                <div className="flex flex-col justify-center">
                    <span className="ai-badge w-fit">
                        <Sparkles className="h-3.5 w-3.5" />
                        Neural calculator suite
                    </span>
                    <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
                        AI-assisted calculations with a robot-clean interface
                    </h1>
                    <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                        Explore calculators organized like an intelligent control panel,
                        with fast estimates for finance, health, travel, business, and
                        utility planning.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                            href="/calculators"
                            className="glass-button inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold"
                        >
                            Launch Calculators
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white/60 px-4 py-3 text-sm font-medium text-slate-700 backdrop-blur-xl dark:border-cyan-400/20 dark:bg-slate-950/50 dark:text-slate-300">
                            <BrainCircuit className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                            60+ logic modules
                        </span>
                    </div>
                </div>

                {/* Robot OS panel — always dark by design */}
                <div className="robot-core scan-line relative min-h-72 overflow-hidden rounded-lg p-6">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(rgba(14,165,233,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="relative flex h-full flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                                <span className="agent-dot" />
                                Robot OS
                            </span>
                            <Cpu className="h-5 w-5 text-lime-300" />
                        </div>
                        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/5 shadow-[0_0_80px_rgba(14,165,233,0.40)] backdrop-blur-xl">
                            <Bot className="h-16 w-16 text-cyan-200" />
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center text-xs">
                            <div className="rounded-md border border-cyan-400/20 bg-cyan-400/5 p-3">
                                <div className="neon-text text-lg font-bold">73</div>
                                <div className="text-cyan-200/70">routes</div>
                            </div>
                            <div className="rounded-md border border-cyan-400/20 bg-cyan-400/5 p-3">
                                <div className="neon-text text-lg font-bold">7</div>
                                <div className="text-cyan-200/70">domains</div>
                            </div>
                            <div className="rounded-md border border-cyan-400/20 bg-cyan-400/5 p-3">
                                <div className="neon-text text-lg font-bold">AI</div>
                                <div className="text-cyan-200/70">core</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Calculators */}
            <section>
                <h2 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
                    Featured Calculators
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {calculators.map((calc, i) => (
                        <Link key={i} href={calc.link}>
                            <Card className="glass-card glass-card-hover ai-card cursor-pointer rounded-lg">
                                <CardHeader className="flex items-center gap-3">
                                    {calc.icon}
                                    <CardTitle className="text-slate-900 dark:text-white">
                                        {calc.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {calc.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Finance Tip Section */}
            <section className="glass-panel cyber-line rounded-lg p-6">
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                    Did You Know?
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                    Paying just one extra EMI every year can reduce your loan tenure by
                    almost 1 year! Small steps make a big difference in financial
                    planning.
                </p>
            </section>

            {/* CTA Section */}
            <section className="py-8 text-center">
                <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                    More Calculators Coming Soon!
                </h2>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                    Stay tuned as we expand into health, utility, and lifestyle
                    calculators.
                </p>
                <Link
                    href="/pages/about"
                    className="font-medium text-cyan-700 underline dark:text-cyan-400"
                >
                    Learn More →
                </Link>
            </section>
        </main>
    );
}
