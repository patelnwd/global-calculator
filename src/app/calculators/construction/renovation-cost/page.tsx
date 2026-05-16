import RenovationCostForm from "./form";
import RenovationCostResult from "./result";

export default function RenovationCostPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Renovation Cost Calculator</h1>
            <RenovationCostForm />
            <RenovationCostResult />
        </main>
    );
}
