"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mx-auto mt-14 w-full max-w-6xl px-4 pb-6 text-slate-700">
            <div className="glass-panel grid grid-cols-1 gap-8 rounded-lg px-6 py-10 md:grid-cols-4">
                <div>
                    <h3 className="mb-3 text-lg font-semibold text-slate-950">
                        Global Calculator
                    </h3>
                    <p className="text-sm leading-6 text-slate-600">
                        Clear, accessible calculators for everyday planning.
                    </p>
                </div>

                <div>
                    <h4 className="mb-3 font-semibold text-slate-950">
                        Important Links
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/pages/about" className="hover:text-cyan-700">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/calculators" className="hover:text-cyan-700">
                                Calculators
                            </Link>
                        </li>
                        <li>
                            <Link href="/pages/contact" className="hover:text-cyan-700">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-3 font-semibold text-slate-950">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/pages/terms" className="hover:text-cyan-700">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/pages/privacy" className="hover:text-cyan-700">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-3 font-semibold text-slate-950">Follow Us</h4>
                    <div className="flex gap-3">
                        <Link
                            href="http://github.com/patelnwd"
                            target="_blank"
                            aria-label="GitHub"
                            className="rounded-md border border-white/60 bg-white/50 p-2 hover:text-cyan-700"
                        >
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            aria-label="Twitter"
                            className="rounded-md border border-white/60 bg-white/50 p-2 hover:text-cyan-700"
                        >
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/patelnwd/"
                            target="_blank"
                            aria-label="LinkedIn"
                            className="rounded-md border border-white/60 bg-white/50 p-2 hover:text-cyan-700"
                        >
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="py-4 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} Global Calculator. All rights reserved.
            </div>
        </footer>
    );
}
