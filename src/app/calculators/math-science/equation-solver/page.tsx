import EquationSolverForm from "./form";
import EquationSolverResult from "./result";

export default function EquationSolverPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Equation Solver Calculator</h1>
            <EquationSolverForm />
            <EquationSolverResult />
        </main>
    );
}
