'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Loader2, Moon, Pill, Sun } from 'lucide-react';
import { toast } from 'sonner';
import {
  getMedicationForDay,
  toggleMedicationStatus,
} from '@/services/api/medication.api';
import { extractApiData } from '@/lib/apiHelpers';
import type {
  MedicationScheduleEntry,
  MedicationTimeSlot,
} from '@/types/medication.types';

interface MedicationScheduleViewProps {
  patientId: string;
  readOnly?: boolean;
}

const getTimeSlot = (timeValue: string): MedicationTimeSlot => {
  const date = new Date(timeValue);

  if (Number.isNaN(date.getTime())) {
    const match = timeValue.match(/(\d{1,2})/);
    const hour = match ? Number(match[1]) : 12;

    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  }

  const hour = date.getHours();

  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

const getScheduleStatus = (entry: MedicationScheduleEntry): string => {
  if (entry.status) {
    return entry.status;
  }

  if (entry.is_taken || entry.taken_at) {
    return 'Taken';
  }

  const reminderTime = new Date(entry.time_for_reminder);

  if (Number.isNaN(reminderTime.getTime())) {
    return 'Scheduled';
  }

  return reminderTime.getTime() <= Date.now() ? 'Upcoming' : 'Scheduled';
};

const getStatusClass = (status: string): string => {
  if (status.toLowerCase() === 'taken') {
    return 'bg-emerald-900/10 text-emerald-900';
  }

  if (status.toLowerCase() === 'upcoming') {
    return 'bg-amber-900/10 text-amber-900';
  }

  return 'bg-brand-red/10 text-brand-red';
};

const normalizeScheduleEntry = (item: Record<string, unknown>): MedicationScheduleEntry => {
  const medication = item.medication as Record<string, unknown> | undefined;

  return {
    id: Number(item.id ?? item.schedule_id ?? item.medication_id ?? 0),
    medication_id: Number(item.medication_id ?? medication?.id ?? item.id ?? 0),
    name: String(item.name ?? medication?.name ?? 'Medication'),
    dosage: String(item.dosage ?? medication?.dosage ?? '—'),
    description: String(item.description ?? medication?.description ?? ''),
    time_for_reminder: String(item.time_for_reminder ?? item.taken_at ?? ''),
    taken_at: item.taken_at ? String(item.taken_at) : null,
    status: item.status ? String(item.status) : undefined,
    is_taken: Boolean(item.is_taken ?? item.taken_at),
  };
};

const MedicationScheduleView = ({
  patientId,
  readOnly = false,
}: MedicationScheduleViewProps) => {
  const [schedules, setSchedules] = useState<MedicationScheduleEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const loadSchedules = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getMedicationForDay(patientId);
      const rawEntries = extractApiData<Record<string, unknown>>(response).map(
        normalizeScheduleEntry,
      );
      setSchedules(rawEntries);
    } catch (err) {
      console.error('Failed to load medication schedules:', err);
      setError('Failed to load medication schedule. Please try again later.');
      setSchedules([]);
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const groupedSchedules = useMemo(() => {
    const groups: Record<MedicationTimeSlot, MedicationScheduleEntry[]> = {
      morning: [],
      afternoon: [],
      evening: [],
    };

    schedules.forEach((entry) => {
      const slot = getTimeSlot(entry.time_for_reminder);
      groups[slot].push(entry);
    });

    return groups;
  }, [schedules]);

  const handleToggleStatus = async (entry: MedicationScheduleEntry) => {
    if (readOnly || getScheduleStatus(entry).toLowerCase() === 'taken') {
      return;
    }

    setTogglingId(entry.medication_id);

    try {
      await toggleMedicationStatus(patientId, String(entry.medication_id));
      toast.success('Medication marked as taken.');
      await loadSchedules();
    } catch (err) {
      console.error('Failed to update medication status:', err);
      toast.error('Failed to update medication status.');
    } finally {
      setTogglingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#554240] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-brand-red" />
        <p className="font-medium">Loading medication schedule...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 p-8 text-center text-red-600 border-2 border-red-100">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-10">
      <ScheduleSection
        title="Morning"
        icon={Sun}
        entries={groupedSchedules.morning}
        emptyMessage="No morning medications scheduled."
        readOnly={readOnly}
        togglingId={togglingId}
        onToggle={handleToggleStatus}
      />

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <ScheduleSection
          title="Afternoon"
          icon={Sun}
          entries={groupedSchedules.afternoon}
          emptyMessage="No afternoon medications scheduled."
          readOnly={readOnly}
          togglingId={togglingId}
          onToggle={handleToggleStatus}
        />

        <ScheduleSection
          title="Evening"
          icon={Moon}
          entries={groupedSchedules.evening}
          emptyMessage="No medications scheduled for this evening. Enjoy your rest."
          readOnly={readOnly}
          togglingId={togglingId}
          onToggle={handleToggleStatus}
          compactEmpty
        />
      </div>
    </div>
  );
};

const ScheduleSection = ({
  title,
  icon: Icon,
  entries,
  emptyMessage,
  readOnly,
  togglingId,
  onToggle,
  compactEmpty = false,
}: {
  title: string;
  icon: typeof Sun;
  entries: MedicationScheduleEntry[];
  emptyMessage: string;
  readOnly: boolean;
  togglingId: number | null;
  onToggle: (entry: MedicationScheduleEntry) => void;
  compactEmpty?: boolean;
}) => (
  <section className="space-y-5 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm">
    <div className="flex items-center gap-3">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5E6D3] text-[#B7761F] shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="text-xl font-semibold text-[#3c2f24]">{title}</h2>
    </div>

    {entries.length > 0 ? (
      <div className="grid gap-5 xl:grid-cols-2">
        {entries.map((entry) => (
          <MedicineCard
            key={`${entry.id}-${entry.medication_id}-${entry.time_for_reminder}`}
            entry={entry}
            readOnly={readOnly}
            isToggling={togglingId === entry.medication_id}
            onToggle={() => onToggle(entry)}
          />
        ))}
      </div>
    ) : compactEmpty ? (
      <div className="rounded-[2rem] border border-dashed border-white/60 bg-white/70 p-6 text-center text-[#58493d] shadow-sm">
        <div className="flex items-center justify-center rounded-3xl bg-white/80 p-6 shadow-sm">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#F3E4D7] text-[#6d5c4e]">
            <Moon className="h-7 w-7" />
          </span>
        </div>
        <p className="mt-6 text-lg font-semibold text-[#3c2f24]">{title}</p>
        <p className="mt-3 text-sm leading-6 text-[#6b594c]">{emptyMessage}</p>
      </div>
    ) : (
      <div className="rounded-2xl border border-dashed border-white/60 bg-white/50 p-6 text-center text-sm text-[#6b594c]">
        {emptyMessage}
      </div>
    )}
  </section>
);

const MedicineCard = ({
  entry,
  readOnly,
  isToggling,
  onToggle,
}: {
  entry: MedicationScheduleEntry;
  readOnly: boolean;
  isToggling: boolean;
  onToggle: () => void;
}) => {
  const status = getScheduleStatus(entry);
  const isTaken = status.toLowerCase() === 'taken';

  return (
    <div className="relative rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-[0_20px_45px_rgba(104,78,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#3c2f24]">{entry.name}</h3>
          <p className="mt-2 text-sm text-[#5b4c3f]">{entry.dosage}</p>
        </div>
        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(status)}`}>
          {status}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-[#f7efe2] px-3 py-2 text-sm text-[#5b4c3f]">
          <Pill className="h-4 w-4 text-[#8c5e3e]" />
          {entry.description || 'Scheduled dose'}
        </div>

        {!readOnly && (
          <button
            type="button"
            disabled={isTaken || isToggling}
            onClick={onToggle}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              isTaken
                ? 'hidden'
                : 'bg-brand-red text-[#D7C6A8] hover:bg-[#7a1821] disabled:opacity-60'
            }`}
          >
            {isToggling ? 'Updating...' : isTaken ? 'Taken' : 'Mark as Taken'}
          </button>
        )}
      </div>

      <div className="absolute right-4 top-4 text-[#8a7460]">
        <CheckCircle2 className={`h-5 w-5 ${isTaken ? 'opacity-100 text-emerald-700' : 'opacity-0'}`} />
      </div>
    </div>
  );
};

export default MedicationScheduleView;
