import UnitConverterForm from "./form";
import UnitConverterResult from "./result";

export default function UnitConverterPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Unit Converter Calculator</h1>
            <UnitConverterForm />
            <UnitConverterResult />
        </main>
    );
}
