import FlooringForm from "./form";
import FlooringResult from "./result";

export default function FlooringPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Flooring Calculator</h1>
            <FlooringForm />
            <FlooringResult />
        </main>
    );
}
