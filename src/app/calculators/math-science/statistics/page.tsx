import StatisticsForm from "./form";
import StatisticsResult from "./result";

export default function StatisticsPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Statistics Calculator</h1>
            <StatisticsForm />
            <StatisticsResult />
        </main>
    );
}
