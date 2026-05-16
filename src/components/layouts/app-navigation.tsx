"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Compass, Search, X } from "lucide-react";
import { calculatorGroups, getCalculatorNote } from "@/lib/constants/calculators";

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type NavigationItem = {
    label: string;
    href: string;
    group: string;
    note?: string;
    keywords: string;
};

const pageLinks = [
    { label: "Home", href: "/" },
    { label: "Calculators", href: "/calculators" },
    { label: "About", href: "/pages/about" },
    { label: "Contact", href: "/pages/contact" },
    { label: "Privacy", href: "/pages/privacy" },
    { label: "Terms", href: "/pages/terms" },
];

const calculatorLinks = calculatorGroups.flatMap((group) =>
    group.calculators.map((calculator) => ({
        groupKey: group.key,
        groupName: group.name,
        label: calculator.name,
        href: calculator.path.replace(/^\./, ""),
        note: getCalculatorNote(calculator.path),
    }))
);

const taxFeatureLinks = [
    {
        groupKey: "financial",
        groupName: "Financial Calculators",
        label: "Income Tax Calculator",
        href: "/calculators/financial/tax/income-tax",
        note: getCalculatorNote("./calculators/financial/tax/income-tax"),
    },
    {
        groupKey: "financial",
        groupName: "Financial Calculators",
        label: "Property Tax Calculator",
        href: "/calculators/financial/tax/property-tax",
        note: getCalculatorNote("./calculators/financial/tax/property-tax"),
    },
];

const featureLinks = [...calculatorLinks, ...taxFeatureLinks];

const navigationItems: NavigationItem[] = [
    ...pageLinks.map((item) => ({
        ...item,
        group: "Pages",
        keywords: `${item.label} ${item.href}`.toLowerCase(),
    })),
    ...featureLinks.map((item) => ({
        label: item.label,
        href: item.href,
        group: item.groupName,
        note: item.note,
        keywords:
            `${item.label} ${item.groupName} ${item.groupKey} ${item.href} ${item.note ?? ""}`
                .replace(/-/g, " ")
                .toLowerCase(),
    })),
];

function titleFromSegment(segment: string) {
    return segment
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
    const calculator = calculatorLinks.find((item) => item.href === pathname);

    if (calculator) {
        return [
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: calculator.groupName },
            { label: calculator.label },
        ];
    }

    const page = pageLinks.find((item) => item.href === pathname);

    if (page) {
        return page.href === "/"
            ? [{ label: "Home" }]
            : [{ label: "Home", href: "/" }, { label: page.label }];
    }

    const segments = pathname.split("/").filter(Boolean);

    return [
        { label: "Home", href: "/" },
        ...segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join("/")}`;
            const isLast = index === segments.length - 1;

            return {
                label: titleFromSegment(segment),
                href: isLast ? undefined : href,
            };
        }),
    ];
}

export default function AppNavigation() {
    const pathname = usePathname();
    const router = useRouter();
    const pickerRef = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState("");
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const breadcrumbs = getBreadcrumbs(pathname);
    const currentItem = navigationItems.find((item) => item.href === pathname);
    const filteredItems = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return navigationItems;
        }

        return navigationItems.filter((item) =>
            item.keywords.includes(normalizedQuery)
        );
    }, [query]);

    useEffect(() => {
        function closePicker(event: MouseEvent) {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node)
            ) {
                setIsPickerOpen(false);
            }
        }

        document.addEventListener("mousedown", closePicker);
        return () => document.removeEventListener("mousedown", closePicker);
    }, []);

    function navigateTo(value: string) {
        if (value && value !== pathname) {
            router.push(value);
        }

        setQuery("");
        setIsPickerOpen(false);
    }

    return (
        <div className="border-b border-white/35 bg-white/35 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/60 bg-white/50 text-slate-700 shadow-sm hover:bg-white/75"
                        aria-label="Go back"
                        title="Go back"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>

                    <nav aria-label="Breadcrumb" className="min-w-0">
                        <ol className="flex min-w-0 flex-wrap items-center gap-1 text-sm text-slate-500">
                            {breadcrumbs.map((item, index) => {
                                const isLast = index === breadcrumbs.length - 1;

                                return (
                                    <li
                                        key={`${item.label}-${index}`}
                                        className="flex items-center gap-1"
                                    >
                                        {index > 0 && (
                                            <ChevronRight className="h-3.5 w-3.5" />
                                        )}
                                        {item.href && !isLast ? (
                                            <Link
                                                href={item.href}
                                                className="rounded px-1.5 py-1 hover:bg-white/60 hover:text-slate-950"
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <span className="px-1.5 py-1 font-medium text-slate-950">
                                                {item.label}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>
                </div>

                <div ref={pickerRef} className="relative w-full md:w-80">
                    <label className="sr-only" htmlFor="global-feature-search">
                        Search all features
                    </label>
                    <div className="glass-input flex h-10 items-center gap-2 rounded-md px-3 text-sm">
                        <Search className="h-4 w-4 shrink-0 text-cyan-700" />
                        <input
                            id="global-feature-search"
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setIsPickerOpen(true);
                            }}
                            onFocus={() => setIsPickerOpen(true)}
                            placeholder={
                                currentItem
                                    ? `Search features... (${currentItem.label})`
                                    : "Search all features..."
                            }
                            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400"
                            autoComplete="off"
                        />
                        {query ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery("");
                                    setIsPickerOpen(true);
                                }}
                                className="rounded p-1 text-slate-500 hover:bg-white/70 hover:text-slate-950"
                                aria-label="Clear feature search"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        ) : (
                            <Compass className="h-4 w-4 shrink-0 text-slate-400" />
                        )}
                    </div>

                    {isPickerOpen && (
                        <div className="glass-panel absolute right-0 z-30 mt-2 max-h-96 w-full overflow-hidden rounded-lg">
                            <div className="max-h-96 overflow-y-auto py-2">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
                                        <button
                                            key={item.href}
                                            type="button"
                                            onClick={() => navigateTo(item.href)}
                                            className="block w-full px-3 py-2 text-left hover:bg-white/55"
                                        >
                                            <span className="block text-sm font-medium text-slate-950">
                                                {item.label}
                                            </span>
                                            <span className="block text-xs text-cyan-700">
                                                {item.group}
                                            </span>
                                            {item.note && (
                                                <span className="mt-1 block text-xs leading-5 text-slate-600">
                                                    {item.note}
                                                </span>
                                            )}
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-3 py-6 text-center text-sm text-slate-500">
                                        No matching features
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
