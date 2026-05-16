import PregnancyDueDateForm from "./form";
import PregnancyDueDateResult from "./result";

export default function PregnancyDueDatePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Pregnancy Due Date Calculator</h1>
            <PregnancyDueDateForm />
            <PregnancyDueDateResult />
        </main>
    );
}
