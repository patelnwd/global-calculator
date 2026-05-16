import VatSalesTaxForm from "./form";
import VatSalesTaxResult from "./result";

export default function VatSalesTaxPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Vat Sales Tax Calculator</h1>
            <VatSalesTaxForm />
            <VatSalesTaxResult />
        </main>
    );
}
