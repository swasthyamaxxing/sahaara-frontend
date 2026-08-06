import axiosInstance from "../axiosInstance";
import type { Appointment } from '@/types/appointment.types';

const normalizeAppointments = (payload: unknown): Appointment[] => {
    if (Array.isArray(payload)) {
        return payload as Appointment[];
    }

    if (payload && typeof payload === 'object') {
        const record = payload as Record<string, unknown>;

        if (Array.isArray(record.data)) {
            return record.data as Appointment[];
        }

        if (record.data && typeof record.data === 'object') {
            return normalizeAppointments(record.data);
        }
    }

    return [];
};

export const getProfile = async () =>{
    const res = await axiosInstance.get(`/user/me`);
    return res.data;
}

export const getVitalLabels = async () =>{
    const res = await axiosInstance.get("/vitals/labels");
    return res.data;
}

export const getVitals = async (patientId: string) =>{
    const res = await axiosInstance.get(`/vitals/${patientId}`);
    return res.data;
}

export const getAllAppointments = async (patientId: string): Promise<Appointment[]> => {
    const res = await axiosInstance.get<unknown>(`/patients/${patientId}/appointments`);
    return normalizeAppointments(res.data);
}

export const getAppointmentById = async (patientId: string, appointmentId: string) => {
    const res = await axiosInstance.get(`/patients/${patientId}/appointments/${appointmentId}`);
    return res.data;
}

export const getAllMedicalHistory = async (patientId: string) => {
    const res = await axiosInstance.get(`/patients/${patientId}/medical-history`);
    return res.data;
}

export const getMedicalHistoryById = async (patientId: string, medicalHistoryId: string) => {
    const res = await axiosInstance.get(`/patients/${patientId}/medical-history/${medicalHistoryId}`);
    return res.data;
}