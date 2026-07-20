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
    <main className="bg-[#c9b998] max-w-7xl mx-auto min-h-screen rounded-4xl m-4 p-9">
      <div className="flex items-center justify-between tracking-tight leading-loose">
        <div>
          <h1 className="text-5xl font-bold text-brand-red">Patient Registry</h1>
          <p className="text-sm text-[#554240] mt-2">{count} patient{count === 1 ? '' : 's'} found</p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-[#FFFFFF4D] flex gap-2 items-center justify-center text-brand-red py-2 px-4 rounded-lg">
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.25 9V7.5H8.25V9H5.25ZM2.25 5.25V3.75H11.25V5.25H2.25ZM0 1.5V0H13.5V1.5H0Z" fill="#641E21" />
            </svg>
            Filter
          </button>
          <button className="bg-brand-red flex gap-2 items-center justify-center text-white py-2 px-4 rounded-lg hover:bg-brand-red-hover">
            <UserPlusIcon className="w-5 h-5" />
            Add Patient
          </button>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="rounded-3xl bg-white/70 p-12 text-center text-[#554240]">Loading patients...</div>
        ) : showEmptyState ? (
          <div className="rounded-3xl bg-white/70 p-12 text-center text-[#554240]">
            {message || 'No patients available. Please add a patient or try again later.'}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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