import NetWorthForm from "./form";
import NetWorthResult from "./result";

export default function NetWorthPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Net Worth Calculator</h1>
            <NetWorthForm />
            <NetWorthResult />
        </main>
    );
}
