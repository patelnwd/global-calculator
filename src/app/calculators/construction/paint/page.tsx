import PaintForm from "./form";
import PaintResult from "./result";

export default function PaintPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Paint Calculator</h1>
            <PaintForm />
            <PaintResult />
        </main>
    );
}
