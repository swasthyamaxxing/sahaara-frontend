export interface Appointment {
  id: number;
  patient_id: number;
  institution_name: string;
  doctor_name: string;
  date_time: string;
  presenting_problem: string;
  prescription: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AppointmentsResponse {
  status: boolean;
  data: Appointment[];
}

export interface AppointmentPayload {
  patient_id: number;
  institution_name: string;
  doctor_name: string;
  date_time: string;
  presenting_problem: string;
  prescription: string;
  notes: string;
}

export interface StoreAppointmentResponse {
  status: boolean;
  message: string;
  data: Appointment;
}

export interface UpdateAppointmentResponse {
  status: boolean;
  message: string;
  data: Appointment;
}
