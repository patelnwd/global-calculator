import ProfitMarginForm from "./form";
import ProfitMarginResult from "./result";

export default function ProfitMarginPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Profit Margin Calculator</h1>
            <ProfitMarginForm />
            <ProfitMarginResult />
        </main>
    );
}
