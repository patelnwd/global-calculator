import WaterIntakeForm from "./form";
import WaterIntakeResult from "./result";

export default function WaterIntakePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Water Intake Calculator</h1>
            <WaterIntakeForm />
            <WaterIntakeResult />
        </main>
    );
}
