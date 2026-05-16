import DiscountForm from "./form";
import DiscountResult from "./result";

export default function DiscountPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Discount Calculator</h1>
            <DiscountForm />
            <DiscountResult />
        </main>
    );
}
