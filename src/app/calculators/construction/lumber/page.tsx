import LumberForm from "./form";
import LumberResult from "./result";

export default function LumberPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Lumber Calculator</h1>
            <LumberForm />
            <LumberResult />
        </main>
    );
}
