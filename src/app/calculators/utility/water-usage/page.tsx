import WaterUsageForm from "./form";
import WaterUsageResult from "./result";

export default function WaterUsagePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Water Usage Calculator</h1>
            <WaterUsageForm />
            <WaterUsageResult />
        </main>
    );
}
