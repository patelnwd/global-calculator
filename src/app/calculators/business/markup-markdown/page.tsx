import MarkupMarkdownForm from "./form";
import MarkupMarkdownResult from "./result";

export default function MarkupMarkdownPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Markup Markdown Calculator</h1>
            <MarkupMarkdownForm />
            <MarkupMarkdownResult />
        </main>
    );
}
