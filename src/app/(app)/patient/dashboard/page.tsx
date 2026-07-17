import PatientVitalsCard from "@/components/vitals/PatientVitalsCard";

const PatientDashboardPage = () => {
    return (
        <>
            <main className="bg-[#c9b998] max-w-7xl mx-auto min-h-screen rounded-4xl m-4 p-9">
                <div className="tracking-tight leading-loose border-b-2 pb-2">
                    <h1 className="text-4xl font-bold text-brand-red">Health Vitals</h1>
                    <span>Monitoring the health of our loved ones with care</span>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <PatientVitalsCard />
                    <PatientVitalsCard />
                    <PatientVitalsCard />
                </div>
            </main>
        </>
    );
};

export default PatientDashboardPage;