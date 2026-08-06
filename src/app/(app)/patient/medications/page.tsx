'use client';

import { getUserId } from '@/lib/utils';
import MedicationScheduleView from '@/components/medications/MedicationScheduleView';

const MedicationsPage = () => {
  const patientId = getUserId();

  return (
    <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
      <div className="rounded-[2.5rem] border border-white/50 bg-[#E7D8C3] p-6 sm:p-8 shadow-[0_40px_90px_rgba(104,78,42,0.12)]">
        <div className="tracking-tight border-b border-[#707070]/30 pb-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-brand-red">My Medications</h1>
          <p className="text-xs sm:text-sm text-[#554240] mt-1">
            View and track your daily medication schedule
          </p>
        </div>

        {!patientId ? (
          <div className="mt-6 rounded-3xl bg-red-50 p-8 text-center text-red-600 border-2 border-red-100">
            <p className="font-medium">Patient ID not available.</p>
          </div>
        ) : (
          <MedicationScheduleView patientId={patientId} />
        )}
      </div>
    </main>
  );
};

export default MedicationsPage;
