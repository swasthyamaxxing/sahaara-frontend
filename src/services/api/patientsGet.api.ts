import axiosInstance from "../axiosInstance";

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

export const getAllAppointments = async (patientId: string) => {
    const res = await axiosInstance.get(`/patients/${patientId}/appointments`);
    return res.data;
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