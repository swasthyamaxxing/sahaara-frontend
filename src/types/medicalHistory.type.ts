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