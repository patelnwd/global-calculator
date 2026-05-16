import TimezoneConverterForm from "./form";
import TimezoneConverterResult from "./result";

export default function TimezoneConverterPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Timezone Converter Calculator</h1>
            <TimezoneConverterForm />
            <TimezoneConverterResult />
        </main>
    );
}
