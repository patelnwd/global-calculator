import TaxIncomeTaxForm from "./form";
import TaxIncomeTaxResult from "./result";

export default function TaxIncomeTaxPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Tax Income Tax Calculator</h1>
            <TaxIncomeTaxForm />
            <TaxIncomeTaxResult />
        </main>
    );
}
