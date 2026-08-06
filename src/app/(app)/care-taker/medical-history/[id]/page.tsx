'use client';

import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import MedicalHistoryDetailView from '@/components/medical-history/MedicalHistoryDetailView';
import { parsePatientIdParam } from '@/lib/apiHelpers';

const MedicalHistoryPage = () => {
  const params = useParams<{ id: string }>();
  const patientId = parsePatientIdParam(params?.id);

  if (!patientId) {
    return (
      <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-screen rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
        <div className="rounded-3xl bg-red-50 p-8 text-center text-red-600 border-2 border-red-100">
          <p className="font-medium">Patient ID is missing.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-screen rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-brand-red sm:text-[2rem] lg:text-4xl">
            Medical History
          </h1>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-[#D7C6A8] transition-colors hover:bg-[#7a1821] sm:px-6 sm:py-3 sm:text-base"
          >
            <Plus className="h-4 w-4" />
            New Record
          </button>
        </div>

        <div className="mt-6">
          <MedicalHistoryDetailView patientId={patientId} />
        </div>
      </div>
    </main>
  );
};

export default MedicalHistoryPage;
