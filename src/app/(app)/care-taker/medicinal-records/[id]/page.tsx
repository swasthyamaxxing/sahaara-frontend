'use client';

import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import MedicationScheduleView from '@/components/medications/MedicationScheduleView';
import { parsePatientIdParam } from '@/lib/apiHelpers';
import Link from 'next/link';

const MedicinalRecordsPage = () => {
  const params = useParams<{ id: string }>();
  const patientId = parsePatientIdParam(params?.id);

  if (!patientId) {
    return (
      <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
        <div className="rounded-3xl bg-red-50 p-8 text-center text-red-600 border-2 border-red-100">
          <p className="font-medium">Patient ID is missing.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
      <div className="rounded-[2.5rem] border border-white/50 bg-[#E7D8C3] p-6 sm:p-8 shadow-[0_40px_90px_rgba(104,78,42,0.12)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-red sm:text-4xl">Medication Schedule</h1>
            <p className="mt-2 text-sm text-[#554240]">
              Track today&apos;s prescriptions and dose timings for your patients.
            </p>
          </div>
          <Link href={`/care-taker/medicinal-records?patientId=${patientId}`}>
            <button
              type="button"
              className="inline-flex hover:cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-red px-4 py-3 text-sm font-semibold text-[#D7C6A8] transition-colors hover:bg-[#7a1821]"
            >
              <Plus className="h-4 w-4" />
              Log Medicine
            </button>
          </Link>
        </div>

        <MedicationScheduleView patientId={patientId} />
      </div>
    </main>
  );
};

export default MedicinalRecordsPage;
