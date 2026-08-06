export interface MedicationSchedulePayload {
  taken_at: string;
  time_for_reminder: string;
}

export interface MedicationPayload {
  name: string;
  description: string;
  dosage: string;
  appointment_id: number;
  medical_history_id: number;
  schedules: MedicationSchedulePayload[];
}

export interface Medication extends Omit<MedicationPayload, 'schedules'> {
  id: number;
  patient_id?: number;
  is_active?: boolean;
  schedules?: MedicationSchedulePayload[];
  created_at?: string;
  updated_at?: string;
}

export interface MedicationScheduleEntry {
  id: number;
  medication_id: number;
  name: string;
  dosage: string;
  description?: string;
  time_for_reminder: string;
  taken_at: string | null;
  status?: string;
  is_taken?: boolean;
}

export type MedicationTimeSlot = 'morning' | 'afternoon' | 'evening';