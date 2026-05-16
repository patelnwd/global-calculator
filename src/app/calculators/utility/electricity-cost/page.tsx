import ElectricityCostForm from "./form";
import ElectricityCostResult from "./result";

export default function ElectricityCostPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Electricity Cost Calculator</h1>
            <ElectricityCostForm />
            <ElectricityCostResult />
        </main>
    );
}
