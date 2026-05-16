"use client";

import Link from "next/link";

function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
    );
}

function XIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function LinkedInIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="mx-auto mt-14 w-full max-w-6xl px-4 pb-6">
            <div className="glass-panel ai-panel cyber-line grid grid-cols-1 gap-8 rounded-lg px-6 py-10 md:grid-cols-4">
                <div>
                    <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                        Global Calculator
                    </h3>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                        Clear, accessible calculators for everyday planning.
                    </p>
                </div>

                <div>
                    <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                        Important Links
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>
                            <Link href="/pages/about" className="hover:text-cyan-700 dark:hover:text-cyan-400">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/calculators" className="hover:text-cyan-700 dark:hover:text-cyan-400">
                                Calculators
                            </Link>
                        </li>
                        <li>
                            <Link href="/pages/contact" className="hover:text-cyan-700 dark:hover:text-cyan-400">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                        Legal
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>
                            <Link href="/pages/terms" className="hover:text-cyan-700 dark:hover:text-cyan-400">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/pages/privacy" className="hover:text-cyan-700 dark:hover:text-cyan-400">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                        Follow Us
                    </h4>
                    <div className="flex gap-3">
                        <Link
                            href="http://github.com/patelnwd"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="rounded-md border border-slate-200/80 bg-white/60 p-2 text-slate-600 transition hover:border-cyan-400/50 hover:text-cyan-700 dark:border-cyan-400/20 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:text-cyan-400"
                        >
                            <GitHubIcon className="h-5 w-5" />
                        </Link>
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                            className="rounded-md border border-slate-200/80 bg-white/60 p-2 text-slate-600 transition hover:border-cyan-400/50 hover:text-cyan-700 dark:border-cyan-400/20 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:text-cyan-400"
                        >
                            <XIcon className="h-5 w-5" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/patelnwd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="rounded-md border border-slate-200/80 bg-white/60 p-2 text-slate-600 transition hover:border-cyan-400/50 hover:text-cyan-700 dark:border-cyan-400/20 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:text-cyan-400"
                        >
                            <LinkedInIcon className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="py-4 text-center text-xs text-slate-400 dark:text-slate-600">
                © {new Date().getFullYear()} Global Calculator. All rights reserved.
            </div>
        </footer>
    );
}
