import ScientificForm from "./form";
import ScientificResult from "./result";

export default function ScientificPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Scientific Calculator</h1>
            <ScientificForm />
            <ScientificResult />
        </main>
    );
}
