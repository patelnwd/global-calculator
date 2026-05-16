import FlightTimeForm from "./form";
import FlightTimeResult from "./result";

export default function FlightTimePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Flight Time Calculator</h1>
            <FlightTimeForm />
            <FlightTimeResult />
        </main>
    );
}
