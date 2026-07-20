import { create } from 'zustand';
import { Patient } from '@/types/patient.types';

interface PatientsState {
  patients: Patient[];
  status: boolean;
  message: string;
  count: number;
  setPatients: (patients: Patient[], status: boolean, message: string, count: number) => void;
  clearPatients: () => void;
}

const usePatientsStore = create<PatientsState>((set) => ({
  patients: [],
  status: false,
  message: '',
  count: 0,
  setPatients: (patients, status, message, count) =>
    set(() => ({ patients, status, message, count })),
  clearPatients: () =>
    set(() => ({ patients: [], status: false, message: '', count: 0 })),
}));

export default usePatientsStore;
