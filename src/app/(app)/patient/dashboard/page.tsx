import PatientVitalsCard from "@/components/vitals/PatientVitalsCard";

const PatientDashboardPage = () => {
    return (
        <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#c9b998] p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
            <div className="tracking-tight border-b-2 border-[#707070]/40 pb-4">
                <h1 className="text-2xl sm:text-4xl font-bold text-brand-red">Health Vitals</h1>
                <p className="text-xs sm:text-sm text-[#554240] mt-1">Monitoring the health of our loved ones with care</p>
            </div>
            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center sm:justify-items-stretch">
                <PatientVitalsCard title="Blood Pressure" value="118/76" unit="mmHg" status="Normal" />
                <PatientVitalsCard title="Heart Rate" value="72" unit="bpm" status="Normal" />
                <PatientVitalsCard title="Blood Sugar" value="95" unit="mg/dL" status="Normal" />
            </div>
        </main>
    );
};

export default PatientDashboardPage;