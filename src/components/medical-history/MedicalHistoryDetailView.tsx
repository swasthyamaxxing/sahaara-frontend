'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  getMedicalHistory,
  getMedicalHistoryById,
} from '@/services/api/medicalHistory.api';
import { extractApiData, extractApiItem, formatDisplayDate } from '@/lib/apiHelpers';
import type { MedicalHistoryRecord } from '@/types/medicalHistory.type';

interface MedicalHistoryDetailViewProps {
  patientId: string;
  readOnly?: boolean;
}

const MedicalHistoryDetailView = ({
  patientId,
  readOnly = false,
}: MedicalHistoryDetailViewProps) => {
  const [records, setRecords] = useState<MedicalHistoryRecord[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<MedicalHistoryRecord | null>(null);
  const [showDetail, setShowDetail] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getMedicalHistory(patientId);
      const data = extractApiData<MedicalHistoryRecord>(response);
      setRecords(data);
      setSelectedId(data[0]?.id ?? null);
    } catch (err) {
      console.error('Failed to load medical history:', err);
      setError('Failed to load medical history. Please try again later.');
      setRecords([]);
      setSelectedId(null);
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  useEffect(() => {
    if (!selectedId) {
      setSelectedRecord(null);
      return;
    }

    const fetchRecordDetails = async () => {
      setIsDetailLoading(true);

      try {
        const response = await getMedicalHistoryById(patientId, String(selectedId));
        const record = extractApiItem<MedicalHistoryRecord>(response);

        if (record) {
          setSelectedRecord(record);
          return;
        }

        const fallback = records.find((item) => item.id === selectedId) ?? null;
        setSelectedRecord(fallback);
      } catch (err) {
        console.error('Failed to load medical history details:', err);
        toast.error('Failed to load record details.');
        const fallback = records.find((item) => item.id === selectedId) ?? null;
        setSelectedRecord(fallback);
      } finally {
        setIsDetailLoading(false);
      }
    };

    fetchRecordDetails();
  }, [patientId, selectedId, records]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#554240] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-brand-red" />
        <p className="font-medium">Loading medical history...</p>
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

  if (records.length === 0) {
    return (
      <div className="rounded-3xl bg-white/70 p-12 text-center text-[#554240] border-2 border-dashed border-white/50">
        <p className="text-lg font-medium">No medical records found.</p>
        <p className="text-sm text-[#707070] mt-2">
          {readOnly
            ? 'Your clinical history will appear here once added by your caretaker.'
            : 'Add a new record to start documenting this patient\'s history.'}
        </p>
      </div>
    );
  }

  const activeRecord =
    selectedRecord ?? records.find((record) => record.id === selectedId) ?? records[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
      <section className="flex flex-col gap-3">
        {records.map((record, index) => {
          const isSelected = record.id === selectedId;
          const isLatest = index === 0;

          return (
            <button
              key={record.id}
              type="button"
              onClick={() => {
                setSelectedId(record.id);
                setShowDetail(true);
              }}
              className={`relative w-full rounded-[1.45rem] border p-4 sm:p-5 text-left transition-all shadow-[0_10px_25px_rgba(104,78,42,0.08)] ${
                isSelected
                  ? 'border-white/70 bg-white/45'
                  : 'border-white/55 bg-white/25 hover:bg-white/35'
              }`}
            >
              {isLatest && (
                <span className="inline-block rounded-md bg-brand-red px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                  LATEST SESSION
                </span>
              )}

              <div className={`flex items-start justify-between gap-2 ${isLatest ? 'mt-3' : ''}`}>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-[#554240]/80 sm:text-sm">
                    {formatDisplayDate(record.diagnosis_date)}
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-brand-red sm:text-xl">
                    {record.condition_name}
                  </h2>
                  {!isLatest && (
                    <p className="mt-1 truncate text-xs text-[#554240]/75 sm:text-sm">
                      {record.diagnosed_by} • {record.severity}
                    </p>
                  )}
                </div>
              </div>

              {isLatest && (
                <div className="mt-4 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red">
                      {record.status}
                    </span>
                    <span className="rounded-full bg-white/50 px-3 py-1 text-xs font-semibold text-[#554240]">
                      {record.severity}
                    </span>
                  </div>
                  {record.notes && (
                    <p className="line-clamp-2 text-sm text-[#554240]">{record.notes}</p>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </section>

      {showDetail && activeRecord && (
        <section className="relative flex flex-col rounded-[1.45rem] border border-white/55 bg-white/45 p-5 sm:p-7 lg:p-8 shadow-[0_10px_25px_rgba(104,78,42,0.08)]">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-block rounded-md bg-brand-red px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
              DETAILED RECORD
            </span>
            <button
              type="button"
              aria-label="Close detailed record"
              onClick={() => setShowDetail(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/55 bg-white/35 text-[#554240] transition-colors hover:bg-white/55"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {isDetailLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#554240] gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
              <p className="text-sm font-medium">Loading record details...</p>
            </div>
          ) : (
            <>
              <h2 className="mt-4 text-2xl font-bold text-brand-red sm:text-3xl">
                {activeRecord.condition_name}
              </h2>
              <p className="mt-1 text-sm font-medium text-brand-red sm:text-base">
                {formatDisplayDate(activeRecord.diagnosis_date)} • {activeRecord.diagnosed_by}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailField label="Status" value={activeRecord.status} />
                <DetailField label="Severity" value={activeRecord.severity} />
                <DetailField label="Review Date" value={formatDisplayDate(activeRecord.review_date)} />
                <DetailField
                  label="End Date"
                  value={
                    activeRecord.end_date
                      ? formatDisplayDate(activeRecord.end_date)
                      : 'Ongoing'
                  }
                />
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-bold tracking-wide text-[#554240]">NOTES</h3>
                <div className="mt-3 rounded-2xl border border-white/55 bg-white/35 p-4 sm:p-5">
                  <p className="text-sm leading-relaxed text-[#554240] sm:text-base">
                    {activeRecord.notes || 'No notes recorded.'}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-bold tracking-wide text-[#554240]">ACTION TAKEN</h3>
                <div className="mt-3 rounded-2xl border border-white/55 bg-white/35 p-4 sm:p-5">
                  <p className="text-sm leading-relaxed text-[#554240] sm:text-base">
                    {activeRecord.action_taken || 'No action recorded.'}
                  </p>
                </div>
              </div>

              {!readOnly && (
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-sm font-bold text-[#D7C6A8] transition-colors hover:bg-[#7a1821]"
                  >
                    Edit Record
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
};

const DetailField = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/55 bg-white/35 p-4">
    <p className="text-xs font-bold tracking-wide text-[#554240]">{label}</p>
    <p className="mt-1 text-sm font-semibold text-brand-red">{value}</p>
  </div>
);

export default MedicalHistoryDetailView;
