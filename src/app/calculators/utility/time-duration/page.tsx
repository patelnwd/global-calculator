import TimeDurationForm from "./form";
import TimeDurationResult from "./result";

export default function TimeDurationPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Time Duration Calculator</h1>
            <TimeDurationForm />
            <TimeDurationResult />
        </main>
    );
}
