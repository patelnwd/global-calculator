import BodyFatForm from "./form";
import BodyFatResult from "./result";

export default function BodyFatPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Body Fat Calculator</h1>
            <BodyFatForm />
            <BodyFatResult />
        </main>
    );
}
