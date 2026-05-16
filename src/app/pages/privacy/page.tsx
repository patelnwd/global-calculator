// app/components/PrivacyPolicy.tsx
"use client";

import React from "react";

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>

            <p>
                Your privacy is important to us. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you visit
                our website or use our services.
            </p>

            <section>
                <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2>
                <p>
                    We may collect personal information such as your name, email
                    address, and other details you provide when using our services. We
                    also collect non-personal information like browser type, device
                    information, and usage data to improve our website.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-4">
                    How We Use Your Information
                </h2>
                <p>We use the collected information to:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Provide and maintain our services</li>
                    <li>Improve user experience</li>
                    <li>Send administrative information and updates</li>
                    <li>Analyze usage and trends to improve our offerings</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-4">Information Sharing</h2>
                <p>
                    We do not sell, trade, or otherwise transfer your personal
                    information to outside parties except as necessary to provide our
                    services or comply with the law.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-4">Cookies and Tracking</h2>
                <p>
                    We may use cookies, web beacons, and other tracking technologies to
                    monitor activity and improve our services. You can manage your
                    preferences through your browser settings.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-4">Your Privacy Rights</h2>
                <p>
                    You can request access to, correction, or deletion of your personal
                    information. Please contact us using the information provided below.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-4">Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. Any changes
                    will be posted on this page with an updated effective date.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
                <p>
                    If you have questions or concerns about this Privacy Policy, you can
                    contact us at:{" "}
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

export default PrivacyPolicy;
