import MileageForm from "./form";
import MileageResult from "./result";

export default function MileagePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Mileage Calculator</h1>
            <MileageForm />
            <MileageResult />
        </main>
    );
}
