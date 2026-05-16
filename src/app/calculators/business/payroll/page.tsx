import PayrollForm from "./form";
import PayrollResult from "./result";

export default function PayrollPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Payroll Calculator</h1>
            <PayrollForm />
            <PayrollResult />
        </main>
    );
}
