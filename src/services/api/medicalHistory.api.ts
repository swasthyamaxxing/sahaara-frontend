import axiosInstance from '../axiosInstance';
import type { MedicalHistoryPayload } from '@/types/medicalHistory.type'

export const getMedicalHistory = async (patientId: string) => {
    const res = await axiosInstance.get(`/patients/${patientId}/medical-history`);
    return res.data;
}

export const postMedicalHistory = async (patientId: string, payload: MedicalHistoryPayload) => {
    const res = await axiosInstance.post(`/patients/${patientId}/medical-history`, payload);
    return res.data;
}

export const updateMedicalHistory = async (patientId: string, medicalHistoryId: string, payload: MedicalHistoryPayload) => {
    const res = await axiosInstance.put(`/patients/${patientId}/medical-history/${medicalHistoryId}`, payload);
    return res.data;
}

export const deleteMedicalHistory = async (patientId: string, medicalHistoryId: string) => {
    const res = await axiosInstance.delete(`/patients/${patientId}/medical-history/${medicalHistoryId}`);
    return res.data;
}

export const getMedicalHistoryById = async (patientId: string, medicalHistoryId: string) => {
    const res = await axiosInstance.get(`/patients/${patientId}/medical-history/${medicalHistoryId}`);
    return res.data;
}