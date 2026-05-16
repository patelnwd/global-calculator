import BmrForm from "./form";
import BmrResult from "./result";

export default function BmrPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bmr Calculator</h1>
            <BmrForm />
            <BmrResult />
        </main>
    );
}
