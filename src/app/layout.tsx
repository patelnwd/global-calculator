import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import AppNavigation from "@/components/layouts/app-navigation";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Global Calculator",
    description: "Accurate calculators for finance, health, travel, utility, and more.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    <CurrencyProvider>
                        <div className="flex min-h-screen flex-col">
                            <Header />
                            <AppNavigation />
                            <div className="flex-1">{children}</div>
                            <Footer />
                        </div>
                    </CurrencyProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
