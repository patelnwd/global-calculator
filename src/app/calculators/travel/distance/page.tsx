import DistanceForm from "./form";
import DistanceResult from "./result";

export default function DistancePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Distance Calculator</h1>
            <DistanceForm />
            <DistanceResult />
        </main>
    );
}
