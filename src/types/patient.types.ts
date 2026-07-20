export interface Patient {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  assigned_at: string;
}

export interface PatientsResponse {
  status: boolean;
  message: string;
  count: number;
  data: Patient[];
}
