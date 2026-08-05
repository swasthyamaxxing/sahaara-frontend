'use client';

import React from 'react';
import MedicalHistoryCard from './MedicalHistoryCard';
import { FileText } from 'lucide-react';

interface MedicalHistoryListProps {
  records: any[];
}

const MedicalHistoryList = ({ records }: MedicalHistoryListProps) => {
  if (records.length === 0) {
    return (
      <div className="col-span-full rounded-3xl bg-white/70 p-12 text-center text-[#554240] border-2 border-dashed border-white/50">
        <div className="flex flex-col items-center gap-3">
          <FileText className="w-12 h-12 text-brand-red/50" />
          <p className="text-lg font-medium">No medical records found.</p>
          <p className="text-sm text-[#707070]">Your clinical history will be listed here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {records.map((record) => (
        <MedicalHistoryCard key={record.id} record={record} />
      ))}
    </div>
  );
};

export default MedicalHistoryList;
