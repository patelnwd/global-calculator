import RetirementPlanningForm from "./form";
import RetirementPlanningResult from "./result";

export default function RetirementPlanningPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Retirement Planning Calculator</h1>
            <RetirementPlanningForm />
            <RetirementPlanningResult />
        </main>
    );
}
