import PercentageForm from "./form";
import PercentageResult from "./result";

export default function PercentagePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Percentage Calculator</h1>
            <PercentageForm />
            <PercentageResult />
        </main>
    );
}
