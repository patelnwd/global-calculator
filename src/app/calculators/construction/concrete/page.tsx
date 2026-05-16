import ConcreteForm from "./form";
import ConcreteResult from "./result";

export default function ConcretePage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Concrete Calculator</h1>
            <ConcreteForm />
            <ConcreteResult />
        </main>
    );
}
