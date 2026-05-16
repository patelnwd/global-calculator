import HomeAffordabilityForm from "./form";
import HomeAffordabilityResult from "./result";

export default function HomeAffordabilityPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Home Affordability Calculator</h1>
            <HomeAffordabilityForm />
            <HomeAffordabilityResult />
        </main>
    );
}
