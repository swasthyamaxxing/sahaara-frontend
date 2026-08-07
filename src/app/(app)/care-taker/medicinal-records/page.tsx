'use client';

import { FormEvent, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { postMedication } from '@/services/api/medication.api';
import type { MedicationPayload } from '@/types/medication.types';

type FoodRelation = 'before' | 'after';

type TimeOfDay = 'morning' | 'afternoon' | 'evening';

interface SelectedMeals {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

const initialForm = {
  patientId: '',
  name: '',
  dosage: '',
  appointmentId: '',
  medicalHistoryId: '',
  timeHour: '08',
  timeMinute: '30',
  timePeriod: 'AM' as 'AM' | 'PM',
  foodRelation: 'before' as FoodRelation,
  selectedMeals: {
    breakfast: false,
    lunch: false,
    dinner: false,
  } as SelectedMeals,
  timeOfDay: 'morning' as TimeOfDay,
};

const AddMedicine = () => {
  const searchParams = useSearchParams();
  const queryPatientId = searchParams.get('patientId');
  const [form, setForm] = useState(() => ({
    ...initialForm,
    patientId: queryPatientId ?? '',
  }));
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field: keyof typeof initialForm, value: string | SelectedMeals) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMealToggle = (meal: keyof SelectedMeals) => {
    setForm((prev) => ({
      ...prev,
      selectedMeals: {
        ...prev.selectedMeals,
        [meal]: !prev.selectedMeals[meal],
      },
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const patientId = form.patientId.trim();

    if (!patientId) {
      toast.error('Patient ID is required to add medication.');
      setIsLoading(false);
      return;
    }

    if (!form.name.trim() || !form.dosage.trim()) {
      toast.error('Please enter both medicine name and dosage.');
      setIsLoading(false);
      return;
    }

    const selectedMeals = Object.entries(form.selectedMeals)
      .filter(([, checked]) => checked)
      .map(([meal]) => meal.charAt(0).toUpperCase() + meal.slice(1));

    const description = [
      form.foodRelation === 'before' ? 'Before meal' : 'After meal',
      selectedMeals.length > 0 ? selectedMeals.join(', ') : 'Any meal',
      form.timeOfDay.charAt(0).toUpperCase() + form.timeOfDay.slice(1),
    ].join(' · ');

    const hour = Number(form.timeHour) % 12;
    const convertedHour = form.timePeriod === 'PM' ? hour + 12 : hour;
    const formattedHour = String(convertedHour).padStart(2, '0');
    const formattedMinute = String(form.timeMinute).padStart(2, '0');
    const formattedTime = `${formattedHour}:${formattedMinute}:00`;

    const payload: MedicationPayload = {
      name: form.name.trim(),
      dosage: form.dosage.trim(),
      description,
      appointment_id: Number(form.appointmentId) || 0,
      medical_history_id: Number(form.medicalHistoryId) || 0,
      schedules: [
        {
          taken_at: formattedTime,
          time_for_reminder: formattedTime,
        },
      ],
    };

    try {
      await postMedication(patientId, payload);
      toast.success('Medication added successfully.');
      setForm((prev) => ({
        ...initialForm,
        patientId: prev.patientId,
      })); //eslint-disable-next-line
    } catch (error: any) {
      console.error('Add medication failed:', error);
      toast.error(error?.response?.data?.message || 'Failed to add medication.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm((prev) => ({
      ...initialForm,
      patientId: prev.patientId,
    }));
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/70 bg-[#E7D8C3] p-6 shadow-[0_35px_90px_rgba(104,78,42,0.18)] sm:p-8">
        <div className="rounded-[2rem] border border-white/60 bg-[#F1E4D1] p-6 sm:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-brand-red">Medication Details</h1>
              <p className="mt-2 text-sm text-[#554240]">
                Add a new prescription reminder for your patient with exact timing and meal relation.
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                <label htmlFor="patientId" className="text-sm font-semibold text-[#5E4637]">
                  Patient ID
                </label>
                <input
                  id="patientId"
                  value={form.patientId}
                  onChange={(event) => handleFieldChange('patientId', event.target.value)}
                  placeholder="Enter patient ID"
                  className="w-full rounded-3xl border border-[#d8ccb0] bg-[#efe6d2] px-4 py-3 text-sm text-[#3a2f28] outline-none focus:border-brand-red"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="name" className="text-sm font-semibold text-[#5E4637]">
                  Medicine Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(event) => handleFieldChange('name', event.target.value)}
                  placeholder="e.g. Lisinopril"
                  className="w-full rounded-3xl border border-[#d8ccb0] bg-[#efe6d2] px-4 py-3 text-sm text-[#3a2f28] outline-none focus:border-brand-red"
                />
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                <label htmlFor="dosage" className="text-sm font-semibold text-[#5E4637]">
                  Dosage
                </label>
                <input
                  id="dosage"
                  value={form.dosage}
                  onChange={(event) => handleFieldChange('dosage', event.target.value)}
                  placeholder="e.g. 10mg / 1 tablet"
                  className="w-full rounded-3xl border border-[#d8ccb0] bg-[#efe6d2] px-4 py-3 text-sm text-[#3a2f28] outline-none focus:border-brand-red"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-[#5E4637]">Food Relation</label>
                <div className="flex gap-3">
                  {(['before', 'after'] as FoodRelation[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleFieldChange('foodRelation', option)}
                      className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
                        form.foodRelation === option
                          ? 'bg-brand-red text-[#D7C6A8] shadow-lg'
                          : 'bg-[#efe6d2] text-[#5E4637] hover:bg-[#f3e4cf]'
                      }`}
                    >
                      {option === 'before' ? 'Before Meal' : 'After Meal'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-[#5E4637]">Select Specific Meals</label>
                <div className="flex flex-wrap gap-3">
                  {(['breakfast', 'lunch', 'dinner'] as Array<keyof SelectedMeals>).map((meal) => (
                    <button
                      key={meal}
                      type="button"
                      onClick={() => handleMealToggle(meal)}
                      className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                        form.selectedMeals[meal]
                          ? 'bg-brand-red text-[#D7C6A8]'
                          : 'bg-[#efe6d2] text-[#5E4637] hover:bg-[#f3e4cf]'
                      }`}
                    >
                      {meal.charAt(0).toUpperCase() + meal.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-[#5E4637]">Time of Day</label>
                <div className="flex gap-3">
                  {(['morning', 'afternoon', 'evening'] as TimeOfDay[]).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleFieldChange('timeOfDay', slot)}
                      className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
                        form.timeOfDay === slot
                          ? 'bg-brand-red text-[#D7C6A8] shadow-lg'
                          : 'bg-[#efe6d2] text-[#5E4637] hover:bg-[#f3e4cf]'
                      }`}
                    >
                      {slot.charAt(0).toUpperCase() + slot.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#5E4637]">Exact Alarm Time</label>
              <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-[#d8ccb0] bg-[#efe6d2] p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={form.timeHour}
                    onChange={(event) => handleFieldChange('timeHour', event.target.value)}
                    className="w-20 rounded-2xl border border-[#d8ccb0] bg-white px-3 py-2 text-center text-sm text-[#3a2f28] outline-none"
                  />
                  <span className="text-xl font-bold text-[#5E4637]">:</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={form.timeMinute}
                    onChange={(event) => handleFieldChange('timeMinute', event.target.value)}
                    className="w-20 rounded-2xl border border-[#d8ccb0] bg-white px-3 py-2 text-center text-sm text-[#3a2f28] outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  {(['AM', 'PM'] as Array<'AM' | 'PM'>).map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => handleFieldChange('timePeriod', period)}
                      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                        form.timePeriod === period
                          ? 'bg-brand-red text-[#D7C6A8]'
                          : 'bg-white text-[#5E4637] hover:bg-[#f3e4cf]'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-full border border-[#b19774] bg-[#d8c9ae] px-6 py-3 text-sm font-semibold text-[#5E4637] transition hover:bg-[#cbb893] sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-[#D7C6A8] transition hover:bg-[#7a1821] disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
              >
                {isLoading ? 'Saving...' : 'Save Medication'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

const AddMedicinePage = () => {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <AddMedicine />
    </Suspense>
  )
}

export default AddMedicinePage;
