# Project TODO: Swasthya Maxxing

## 🛠️ Infrastructure & Global
- [ ] **Implement `proxy.ts`**: Create a request/response interceptor for centralized authentication handling and API base URL management.
- [ ] **Navbar Updates**: 
    - [ ] Update `CareTakerNavbar.tsx` with links to all caretaker modules (Patients, Vitals, Appointments, History, Medications, Assessments).
    - [ ] Update `PatientNavbar.tsx` with links to patient-facing views (Dashboard, My Appointments, My History).
- [ ] **Profile Management**: Create pages for users to update their personal information and manage account settings.
- [ ] **Notification System**: Implement a toast-based or in-app notification center for upcoming appointments and critical alerts.

## 👩‍⚕️ Caretaker Module Enhancements
- [ ] **Medication CRUD**: Convert the static medication records page into a dynamic system where caretakers can add, edit, and remove medications.
- [ ] **Medical Report Generator**: Add functionality to compile patient data into a shareable summary or PDF report.
- [ ] **Critical Alerting**: Implement logic to flag and notify caretakers when a patient's logged vitals fall outside of safe ranges.

## 🤒 Patient Experience (The "Patient Gap")
- [ ] **Dynamic Dashboard**: Replace hardcoded vitals cards with real-time data fetched from the API.
- [ ] **Appointment Viewer**: Allow patients to see their scheduled and past appointments.
- [ ] **Medical Record Access**: Provide a read-only view for patients to see their medical history and prescriptions.
- [ ] **Health Trends**: Implement visual progress trackers (charts) so patients can see their health metrics over time.

## 📈 Clinical Logic & Analytics
- [ ] **Data Visualization**: Integrate a charting library (e.g., Recharts) to visualize vital sign trends (BP, Heart Rate, Glucose).
- [ ] **Trend Analysis**: Add logic to calculate "health improvement" or "decline" based on historical vital data.

## 🏗️ Technical Debt & Refactoring
- [ ] **Componentization**: Extract large logic blocks from `page.tsx` files into the `src/components` directory.
    - [ ] Extract `AppointmentCalendar` from `book-appointment/[id]/page.tsx`.
    - [ ] Extract `VitalsForm` from `log-vitals/[id]/page.tsx`.
    - [ ] Extract `PatientRegistry` from `patient-records/page.tsx`.
- [ ] **Type Safety**: Audit `types/` folder to ensure all API responses are fully typed and `any` is removed.
- [ ] **Loading/Error States**: Standardize the "Loading..." and "Error occurred" UI across all dynamic pages for a consistent UX.
