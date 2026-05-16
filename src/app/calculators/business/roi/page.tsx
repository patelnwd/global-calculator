import RoiForm from "./form";
import RoiResult from "./result";

export default function RoiPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Roi Calculator</h1>
            <RoiForm />
            <RoiResult />
        </main>
    );
}
