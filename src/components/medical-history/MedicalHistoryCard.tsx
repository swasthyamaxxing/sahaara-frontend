'use client';

import React from 'react';
import { FileText, Calendar, User, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MedicalHistoryCardProps {
  record: {
    id: number;
    date: string;
    diagnosis: string;
    treatment: string;
    physician: string;
    prescription?: string;
  };
}

const MedicalHistoryCard = ({ record }: MedicalHistoryCardProps) => {
  const date = new Date(record.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="group relative p-6 rounded-3xl sm:rounded-[48px] border border-white/50 bg-[#FFFFFF59] shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-brand-red font-bold text-lg">
            <FileText className="w-5 h-5" />
            <span>Medical Record</span>
          </div>
          <div className="flex items-center gap-2 text-[#554240] font-medium text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-center gap-2 text-[#707070] text-xs font-semibold uppercase tracking-wider mb-1">
            <span>Diagnosis</span>
          </div>
          <p className="text-[#554240] font-bold text-lg">{record.diagnosis}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#707070] text-xs font-semibold uppercase tracking-wider">
              <User className="w-3 h-3" />
              <span>Physician</span>
            </div>
            <p className="text-[#554240] font-medium">{record.physician}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#707070] text-xs font-semibold uppercase tracking-wider">
              <Pill className="w-3 h-3" />
              <span>Treatment</span>
            </div>
            <p className="text-[#554240] font-medium line-clamp-2">{record.treatment}</p>
          </div>
        </div>

        {record.prescription && (
          <div className="mt-4 pt-4 border-t border-white/30">
            <div className="flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-wider mb-2">
              <Pill className="w-3 h-3" />
              <span>Prescription</span>
            </div>
            <p className="text-[#554240] text-sm italic bg-white/30 p-3 rounded-2xl">
              {record.prescription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistoryCard;
