import CalorieForm from "./form";
import CalorieResult from "./result";

export default function CaloriePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Calorie Calculator</h1>
            <CalorieForm />
            <CalorieResult />
        </main>
    );
}
