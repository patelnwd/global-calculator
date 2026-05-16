import SavingsGoalForm from "./form";
import SavingsGoalResult from "./result";

export default function SavingsGoalPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Savings Goal Calculator</h1>
            <SavingsGoalForm />
            <SavingsGoalResult />
        </main>
    );
}
