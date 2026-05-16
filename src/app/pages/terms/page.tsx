// app/components/Terms.tsx
"use client";

import React from "react";

const Terms: React.FC = () => {
    return (
        <div className="glass-panel mx-auto my-8 max-w-4xl space-y-6 rounded-lg p-6 text-slate-700">
            <h1 className="text-center text-3xl font-bold text-slate-950">
                Terms and Conditions
            </h1>

            <p>
                These Terms and Conditions govern your use of our website and services.
                By accessing or using our services, you agree to comply with these
                terms.
            </p>

            <section>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                    Use of Services
                </h2>
                <p>
                    You agree to use our services only for lawful purposes and in a way
                    that does not infringe the rights of others or restrict their use of
                    the services.
                </p>
            </section>

            <section>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                    Intellectual Property
                </h2>
                <p>
                    All content, features, and functionality provided on the website are
                    the exclusive property of our company and are protected by
                    applicable intellectual property laws.
                </p>
            </section>

            <section>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                    User Accounts
                </h2>
                <p>
                    If you create an account, you are responsible for maintaining the
                    confidentiality of your account information and for all activities
                    that occur under your account.
                </p>
            </section>

            <section>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                    Limitation of Liability
                </h2>
                <p>
                    We are not responsible for any direct, indirect, incidental, or
                    consequential damages resulting from the use or inability to use our
                    services. Use at your own risk.
                </p>
            </section>

            <section>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                    Termination
                </h2>
                <p>
                    We may suspend or terminate your access to our services at any time
                    without prior notice for violations of these terms or for any other
                    reason.
                </p>
            </section>

            <section>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                    Changes to Terms
                </h2>
                <p>
                    We may update these Terms and Conditions periodically. Changes will
                    be posted on this page with an updated effective date.
                </p>
            </section>

            <section>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                    Governing Law
                </h2>
                <p>
                    These terms are governed by and construed in accordance with the
                    laws of the jurisdiction in which our company is registered, without
                    regard to conflict of law principles.
                </p>
            </section>

            <section>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                    Contact Us
                </h2>
                <p>
                    If you have any questions regarding these Terms and Conditions, you
                    may contact us at:{" "}
                    <a
                        href="mailto:info@example.com"
                        className="font-medium text-cyan-700 underline"
                    >
                        info@example.com
                    </a>
                </p>
            </section>
        </div>
    );
};

export default Terms;
