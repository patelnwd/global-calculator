import IdealWeightForm from "./form";
import IdealWeightResult from "./result";

export default function IdealWeightPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Ideal Weight Calculator</h1>
            <IdealWeightForm />
            <IdealWeightResult />
        </main>
    );
}
