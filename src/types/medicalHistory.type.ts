export interface MedicalHistoryPayload {
  condition_name: string;
  diagnosis_date: string;
  end_date: string | null;
  status: string;
  severity: string;
  notes: string;
  action_taken: string;
  diagnosed_by: string;
  review_date: string;
}

export interface MedicalHistoryRecord extends MedicalHistoryPayload {
  id: number;
  patient_id?: number;
  created_at?: string;
  updated_at?: string;
}