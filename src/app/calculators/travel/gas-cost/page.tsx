import GasCostForm from "./form";
import GasCostResult from "./result";

export default function GasCostPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gas Cost Calculator</h1>
            <GasCostForm />
            <GasCostResult />
        </main>
    );
}
