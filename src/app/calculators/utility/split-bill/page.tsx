import SplitBillForm from "./form";
import SplitBillResult from "./result";

export default function SplitBillPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Split Bill Calculator</h1>
            <SplitBillForm />
            <SplitBillResult />
        </main>
    );
}
