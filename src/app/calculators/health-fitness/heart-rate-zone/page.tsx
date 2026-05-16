import HeartRateZoneForm from "./form";
import HeartRateZoneResult from "./result";

export default function HeartRateZonePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Heart Rate Zone Calculator</h1>
            <HeartRateZoneForm />
            <HeartRateZoneResult />
        </main>
    );
}
