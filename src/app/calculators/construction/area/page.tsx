import AreaForm from "./form";
import AreaResult from "./result";

export default function AreaPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Area Calculator</h1>
            <AreaForm />
            <AreaResult />
        </main>
    );
}
