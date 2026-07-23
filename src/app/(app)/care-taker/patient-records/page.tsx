'use client';

import { useEffect, useState } from 'react';
import PatientCard from '@/components/patients/PatientCard';
import { UserPlusIcon } from 'lucide-react';
import { getPatients } from '@/services/api/patients.api';
import usePatientsStore from '@/store/patientsStore';

const PatientRecords = () => {
  const { patients, status, message, count, setPatients, clearPatients } = usePatientsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response.data ?? [], response.status, response.message, response.count);
      } catch (error) {
        clearPatients();
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, [setPatients, clearPatients]);

  const showEmptyState = !loading && (!status || count === 0 || patients.length === 0);

  return (
    <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#c9b998] p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#707070]/40 pb-5 gap-4 tracking-tight">
        <div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-brand-red">Patient Registry</h1>
          <p className="text-xs sm:text-sm text-[#554240] mt-1">{count} patient{count === 1 ? '' : 's'} found</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button className="bg-[#FFFFFF4D] flex-1 sm:flex-initial flex gap-2 items-center justify-center text-brand-red py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-white/60 transition-colors">
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.25 9V7.5H8.25V9H5.25ZM2.25 5.25V3.75H11.25V5.25H2.25ZM0 1.5V0H13.5V1.5H0Z" fill="#641E21" />
            </svg>
            Filter
          </button>
          <button className="bg-brand-red flex-1 sm:flex-initial flex gap-2 items-center justify-center text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-[#7a1821] transition-colors">
            <UserPlusIcon className="w-4 h-4" />
            Add Patient
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        {loading ? (
          <div className="rounded-3xl bg-white/70 p-8 sm:p-12 text-center text-[#554240] text-sm sm:text-base">Loading patients...</div>
        ) : showEmptyState ? (
          <div className="rounded-3xl bg-white/70 p-8 sm:p-12 text-center text-[#554240] text-sm sm:text-base">
            {message || 'No patients available. Please add a patient or try again later.'}
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default PatientRecords;