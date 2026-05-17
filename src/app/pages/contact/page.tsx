// app/components/ContactForm.tsx
"use client";

import React, { useState } from "react";

const ContactForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Connect to backend API or email service
        console.log({ name, email, message });

        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div className="glass-panel mx-auto my-8 max-w-2xl rounded-lg p-6 text-slate-700 dark:text-slate-300">
            <h1 className="mb-6 text-center text-3xl font-bold text-slate-900 dark:text-white">
                Contact Us
            </h1>

            {submitted && (
                <div className="mb-6 rounded-md border border-sky-200/80 bg-sky-50/70 p-4 text-center text-sky-800 backdrop-blur-xl">
                    Thank you! Your message has been sent.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="mb-1 block font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="glass-input w-full rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="mb-1 block font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="glass-input w-full rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="mb-1 block font-medium">
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="glass-input w-full rounded-md px-3 py-2"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="glass-button w-full rounded-md py-2 font-semibold"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
