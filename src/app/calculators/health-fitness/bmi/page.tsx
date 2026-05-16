import BmiForm from "./form";
import BmiResult from "./result";

export default function BmiPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bmi Calculator</h1>
            <BmiForm />
            <BmiResult />
        </main>
    );
}
