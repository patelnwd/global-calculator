import InvestmentReturnForm from "./form";
import InvestmentReturnResult from "./result";

export default function InvestmentReturnPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Investment Return Calculator</h1>
            <InvestmentReturnForm />
            <InvestmentReturnResult />
        </main>
    );
}
