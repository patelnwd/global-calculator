import RoofPitchForm from "./form";
import RoofPitchResult from "./result";

export default function RoofPitchPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Roof Pitch Calculator</h1>
            <RoofPitchForm />
            <RoofPitchResult />
        </main>
    );
}
