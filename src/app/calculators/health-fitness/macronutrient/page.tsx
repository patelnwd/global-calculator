import MacronutrientForm from "./form";
import MacronutrientResult from "./result";

export default function MacronutrientPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Macronutrient Calculator</h1>
            <MacronutrientForm />
            <MacronutrientResult />
        </main>
    );
}
