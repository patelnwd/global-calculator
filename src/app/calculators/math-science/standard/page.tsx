import StandardForm from "./form";
import StandardResult from "./result";

export default function StandardPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Standard Calculator</h1>
            <StandardForm />
            <StandardResult />
        </main>
    );
}
