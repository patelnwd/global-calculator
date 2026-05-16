import BreakEvenForm from "./form";
import BreakEvenResult from "./result";

export default function BreakEvenPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Break Even Calculator</h1>
            <BreakEvenForm />
            <BreakEvenResult />
        </main>
    );
}
