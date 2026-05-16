import LoanForm from "./form";
import LoanResult from "./result";

export default function LoanPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Loan Calculator</h1>
            <LoanForm />
            <LoanResult />
        </main>
    );
}
