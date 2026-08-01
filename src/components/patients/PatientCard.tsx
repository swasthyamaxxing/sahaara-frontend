'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Patient } from '@/types/patient.types';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative bg-[#FFFFFF40] border border-white/60 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 rounded-2xl bg-brand-red shrink-0" />
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-base sm:text-lg text-brand-red truncate">{patient.name}</h2>
          <p className="text-xs sm:text-sm text-[#554240]">Age: {patient.age}</p>
        </div>
        <div className="shrink-0 rounded-full bg-[#FFF9D7] border border-[#FDE68A] px-2.5 py-1 text-xs font-bold text-[#065F46]">
          Stable
        </div>
      </div>

      <div className="my-3">
        <div className="flex items-center border-b border-white/40 py-3 justify-between gap-2 text-xs sm:text-sm">
          <span className="text-[#554240] shrink-0">Email</span>
          <span className="font-semibold text-[#1F1B16] truncate text-right">{patient.email}</span>
        </div>
        <div className="flex items-center py-3 justify-between gap-2 text-xs sm:text-sm">
          <span className="text-[#554240] shrink-0">Assigned</span>
          <span className="font-semibold text-[#641E21] truncate text-right">{patient.assigned_at}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="bg-[#e1cdaa] hover:bg-[#d5be98] text-brand-red w-full font-bold text-base sm:text-lg py-2.5 px-4 rounded-full transition-colors"
        >
          More
        </button>

        {isMenuOpen && (
          <div className="absolute left-4 right-4 bottom-[4.5rem] z-10 rounded-3xl border border-white/60 bg-white/95 shadow-lg p-3">
            <Link
              href={`/care-taker/log-vitals/${patient.id}`}
              className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#641E21] hover:bg-[#FDE8D6]"
              onClick={() => setIsMenuOpen(false)}
            >
              Log Vitals
            </Link>
            <Link
              href={`/care-taker/book-appointment/${patient.id}`}
              className="mt-2 block rounded-2xl px-4 py-3 text-sm font-semibold text-[#1F1B16] hover:bg-[#F3F1E8]"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;