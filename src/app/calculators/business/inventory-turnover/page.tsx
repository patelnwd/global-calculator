import InventoryTurnoverForm from "./form";
import InventoryTurnoverResult from "./result";

export default function InventoryTurnoverPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Inventory Turnover Calculator</h1>
            <InventoryTurnoverForm />
            <InventoryTurnoverResult />
        </main>
    );
}
