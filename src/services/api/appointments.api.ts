import axiosInstance from '@/services/axiosInstance';
import type {
  Appointment,
  AppointmentPayload,
  StoreAppointmentResponse,
  UpdateAppointmentResponse,
} from '@/types/appointment.types';

export const getAppointments = async (patientId: number): Promise<Appointment[]> => {
  const res = await axiosInstance.get<unknown>(`/patients/${patientId}/appointments`);
  const payload = res.data as Record<string, unknown> | Appointment[] | undefined;

  if (Array.isArray(payload)) {
    return payload as Appointment[];
  }

  if (payload && typeof payload === 'object') {
    const nestedData = payload.data;

    if (Array.isArray(nestedData)) {
      return nestedData as Appointment[];
    }

    if (nestedData && typeof nestedData === 'object') {
      const nestedCollection = (nestedData as Record<string, unknown>).data;
      if (Array.isArray(nestedCollection)) {
        return nestedCollection as Appointment[];
      }
    }
  }

  return [];
};

export const storeAppointment = async (
  payload: AppointmentPayload,
  patient_id: string
): Promise<StoreAppointmentResponse> => {
  const res = await axiosInstance.post<StoreAppointmentResponse>(`patients/${patient_id}/appointments`, payload);
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
