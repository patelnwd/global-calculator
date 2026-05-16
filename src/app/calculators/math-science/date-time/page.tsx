import DateTimeForm from "./form";
import DateTimeResult from "./result";

export default function DateTimePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Date Time Calculator</h1>
            <DateTimeForm />
            <DateTimeResult />
        </main>
    );
}
