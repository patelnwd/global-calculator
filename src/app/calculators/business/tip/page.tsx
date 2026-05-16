import TipForm from "./form";
import TipResult from "./result";

export default function TipPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Tip Calculator</h1>
            <TipForm />
            <TipResult />
        </main>
    );
}
