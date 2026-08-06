export interface MedicationPayload {
  name: string,
  description: string,
  dosage: string,
  appointment_id: number,
  medical_history_id: number,
  schedules: [
    {
      taken_at: string,
      time_for_reminder: string
    },
  ]
}