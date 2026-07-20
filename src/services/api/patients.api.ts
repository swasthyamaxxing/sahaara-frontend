import axiosInstance from "@/services/axiosInstance";
import { PatientsResponse } from '@/types/patient.types';

export const getPatients = async (): Promise<PatientsResponse> => {
  const res = await axiosInstance.get<PatientsResponse>("/patients");
  return res.data;
};