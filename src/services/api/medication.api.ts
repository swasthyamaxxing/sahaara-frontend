import axiosInstance from "../axiosInstance";
import { MedicationPayload } from '@/types/medication.types';

export const getMedications = async (patientId: string) => {
    const res = await axiosInstance.get(`/patients/${patientId}/medications`);
    return res.data;
}

export const getMedicationForDay = async (patientId: string) => {
    const res = await axiosInstance.get(`/patients/${patientId}/medication-schedules`)
    return res.data;
}

export const postMedication = async (patientId: string, payload: MedicationPayload) => {
    const res = await axiosInstance.post(`/patients/${patientId}/medications`, payload);
    return res.data;
}

export const getMedicationById = async (patientId: string, medicationId: string) => {
    const res = await axiosInstance.get(`/patients/${patientId}/medications/${medicationId}`);
    return res.data;
}

export const updateMedication = async (patientId: string, medicationId: string, payload: MedicationPayload) => {
    const res = await axiosInstance.put(`/patients/${patientId}/medications/${medicationId}`, payload);
    return res.data;
}

export const toggleMedicationStatus = async (patientId: string, medicationId: string) => {
    const res = await axiosInstance.patch(`/patients/${patientId}/medications/${medicationId}/toggle`);
    return res.data;
}