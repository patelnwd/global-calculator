import CreditCardPayoffForm from "./form";
import CreditCardPayoffResult from "./result";

export default function CreditCardPayoffPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Credit Card Payoff Calculator</h1>
            <CreditCardPayoffForm />
            <CreditCardPayoffResult />
        </main>
    );
}
