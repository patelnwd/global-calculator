import CarbonFootprintForm from "./form";
import CarbonFootprintResult from "./result";

export default function CarbonFootprintPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Carbon Footprint Calculator</h1>
            <CarbonFootprintForm />
            <CarbonFootprintResult />
        </main>
    );
}
