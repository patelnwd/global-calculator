import AgeForm from "./form";
import AgeResult from "./result";

export default function AgePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Age Calculator</h1>
            <AgeForm />
            <AgeResult />
        </main>
    );
}
