// app/components/About.tsx
"use client";

import React from "react";

const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center">About Us</h1>

            <p>
                Welcome to our platform! We are dedicated to providing high-quality,
                user-friendly calculators to help you make informed financial and
                business decisions. Our goal is to simplify complex calculations and
                provide actionable insights for everyone.
            </p>

            <section>
                <h2 className="text-2xl font-semibold mt-4">Our Mission</h2>
                <p>
                    Our mission is to empower users with reliable and accurate tools
                    that save time, enhance understanding, and support smarter decisions
                    in finance, business, and beyond.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-4">Our Vision</h2>
                <p>
                    We envision a world where anyone can access easy-to-use, intuitive
                    tools to manage their finances and business calculations
                    efficiently, without the need for complex software or expertise.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-4">Why Choose Us</h2>
                <ul className="list-disc list-inside ml-4">
                    <li>Accurate and reliable calculators</li>
                    <li>Simple and intuitive user interface</li>
                    <li>Continuous updates and improvements</li>
                    <li>Free and accessible to everyone</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-4">Contact</h2>
                <p>
                    Have questions or feedback? We would love to hear from you! Reach
                    out at:{" "}
                    <a
                        href="mailto:info@example.com"
                        className="text-blue-600 underline"
                    >
                        info@example.com
                    </a>
                </p>
            </section>
        </div>
    );
};

export default About;
