import CurrencyConverterForm from "./form";
import CurrencyConverterResult from "./result";

export default function CurrencyConverterPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Currency Converter Calculator</h1>
            <CurrencyConverterForm />
            <CurrencyConverterResult />
        </main>
    );
}
