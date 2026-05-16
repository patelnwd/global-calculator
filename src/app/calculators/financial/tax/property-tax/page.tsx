import TaxPropertyTaxForm from "./form";
import TaxPropertyTaxResult from "./result";

export default function TaxPropertyTaxPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Tax Property Tax Calculator</h1>
            <TaxPropertyTaxForm />
            <TaxPropertyTaxResult />
        </main>
    );
}
