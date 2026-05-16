import InterestForm from "./form";
import InterestResult from "./result";

export default function InterestPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Interest Calculator</h1>
            <InterestForm />
            <InterestResult />
        </main>
    );
}
