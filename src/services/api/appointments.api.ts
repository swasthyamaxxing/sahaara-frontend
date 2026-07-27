import axiosInstance from '@/services/axiosInstance';
import {
  AppointmentPayload,
  AppointmentsResponse,
  StoreAppointmentResponse,
  UpdateAppointmentResponse,
} from '@/types/appointment.types';

export const getAppointments = async (patientId: number): Promise<AppointmentsResponse> => {
  const res = await axiosInstance.get<AppointmentsResponse>(`/appointments/${patientId}/all`);
  return res.data;
};

export const storeAppointment = async (
  payload: AppointmentPayload,
): Promise<StoreAppointmentResponse> => {
  const res = await axiosInstance.post<StoreAppointmentResponse>('/appointments/store', payload);
  return res.data;
};

export const updateAppointment = async (
  appointmentId: number,
  payload: AppointmentPayload,
): Promise<UpdateAppointmentResponse> => {
  const res = await axiosInstance.put<UpdateAppointmentResponse>(
    `/appointments/${appointmentId}`,
    payload,
  );
  return res.data;
};
