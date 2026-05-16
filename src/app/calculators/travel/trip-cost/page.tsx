import TripCostForm from "./form";
import TripCostResult from "./result";

export default function TripCostPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Trip Cost Calculator</h1>
            <TripCostForm />
            <TripCostResult />
        </main>
    );
}
