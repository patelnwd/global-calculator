"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export const currencyOptions = [
    { code: "USD", label: "USD", symbol: "$" },
    { code: "EUR", label: "EUR", symbol: "€" },
    { code: "GBP", label: "GBP", symbol: "£" },
    { code: "INR", label: "INR", symbol: "₹" },
    { code: "JPY", label: "JPY", symbol: "¥" },
] as const;

export type CurrencyCode = (typeof currencyOptions)[number]["code"];

type CurrencyContextValue = {
    currency: (typeof currencyOptions)[number];
    setCurrencyCode: (code: CurrencyCode) => void;
};

const storageKey = "global-calculator-currency";
const defaultCurrency =
    currencyOptions.find((item) => item.code === "INR") ?? currencyOptions[0];

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function findCurrency(code: string | null) {
    return currencyOptions.find((item) => item.code === code) ?? defaultCurrency;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>(
        defaultCurrency.code
    );

    useEffect(() => {
        setCurrencyCodeState(
            findCurrency(window.localStorage.getItem(storageKey)).code
        );
    }, []);

    const value = useMemo<CurrencyContextValue>(() => {
        return {
            currency: findCurrency(currencyCode),
            setCurrencyCode(code) {
                const nextCurrency = findCurrency(code);
                window.localStorage.setItem(storageKey, nextCurrency.code);
                setCurrencyCodeState(nextCurrency.code);
            },
        };
    }, [currencyCode]);

    return (
        <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);

    if (!context) {
        throw new Error("useCurrency must be used within CurrencyProvider");
    }

    return context;
}
