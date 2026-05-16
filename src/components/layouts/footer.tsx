"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-violet-700 text-white mt-12">
            <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Global Calculator</h3>
                    <p className="text-sm text-gray-200">
                        Smart financial calculators to simplify your planning.
                    </p>
                </div>

                {/* Important Links */}
                <div>
                    <h4 className="font-semibold mb-3">Important Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/pages/about" className="hover:underline">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/calculators" className="hover:underline">
                                Calculators
                            </Link>
                        </li>
                        <li>
                            <Link href="/pages/contact" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="font-semibold mb-3">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/pages/terms" className="hover:underline">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/pages/privacy" className="hover:underline">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex gap-4">
                        <Link
                            href="http://github.com/patelnwd"
                            target="_blank"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5 hover:text-gray-300" />
                        </Link>
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            aria-label="Twitter"
                        >
                            <Twitter className="w-5 h-5 hover:text-gray-300" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/patelnwd/"
                            target="_blank"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5 hover:text-gray-300" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-violet-600 text-center py-4 text-xs text-gray-200">
                © {new Date().getFullYear()} Global Calculator. All rights reserved.
            </div>
        </footer>
    );
}
