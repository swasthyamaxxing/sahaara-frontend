'use client';

import { getUserId } from '@/lib/utils';
import MedicalHistoryDetailView from '@/components/medical-history/MedicalHistoryDetailView';

const MedicalRecordsPage = () => {
  const patientId = getUserId();

  return (
    <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
      <div className="tracking-tight border-b-2 border-[#707070]/40 pb-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-brand-red">Medical History</h1>
        <p className="text-xs sm:text-sm text-[#554240] mt-1">
          Your health records and clinical history
        </p>
      </div>

      <div className="mt-6 sm:mt-8">
        {!patientId ? (
          <div className="rounded-3xl bg-red-50 p-8 text-center text-red-600 border-2 border-red-100">
            <p className="font-medium">Patient ID not available.</p>
          </div>
        ) : (
          <MedicalHistoryDetailView patientId={patientId} readOnly />
        )}
      </div>
    </main>
  );
};

export default MedicalRecordsPage;
