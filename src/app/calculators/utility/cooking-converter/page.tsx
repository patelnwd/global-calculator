import CookingConverterForm from "./form";
import CookingConverterResult from "./result";

export default function CookingConverterPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Cooking Converter Calculator</h1>
            <CookingConverterForm />
            <CookingConverterResult />
        </main>
    );
}
