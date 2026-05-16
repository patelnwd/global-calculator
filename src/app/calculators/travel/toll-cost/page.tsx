import TollCostForm from "./form";
import TollCostResult from "./result";

export default function TollCostPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Toll Cost Calculator</h1>
            <TollCostForm />
            <TollCostResult />
        </main>
    );
}
