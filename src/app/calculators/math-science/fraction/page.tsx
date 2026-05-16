import FractionForm from "./form";
import FractionResult from "./result";

export default function FractionPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Fraction Calculator</h1>
            <FractionForm />
            <FractionResult />
        </main>
    );
}
