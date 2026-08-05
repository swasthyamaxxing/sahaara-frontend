import axiosInstance from "@/services/axiosInstance";
import { PatientsResponse } from '@/types/patient.types';

export const getPatients = async (caretakerId: string): Promise<PatientsResponse> => {
  const res = await axiosInstance.get<PatientsResponse>(`caretaker/${caretakerId}/patients`);
  return res.data;
};

//eslint-disable-next-line
export const postPatient = async (patientData: any, caretakerId: string): Promise<any> => {
  const res = await axiosInstance.post(`caretaker/${caretakerId}/patients`, patientData);
  return res.data;
}