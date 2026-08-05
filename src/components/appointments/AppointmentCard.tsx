'use client';

import React from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: {
    id: number;
    date_time: string;
    doctor_name: string;
    institution_name: string;
    presenting_problem: string;
    prescription: string;
    notes: string;
  };
  isUpcoming: boolean;
}

const AppointmentCard = ({ appointment, isUpcoming }: AppointmentCardProps) => {
  const date = new Date(appointment.date_time);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={cn(
      "group relative p-6 rounded-3xl sm:rounded-[48px] border border-white/50 bg-[#FFFFFF59] shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]",
      !isUpcoming && "opacity-80 grayscale-[0.2]"
    )}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-brand-red font-bold text-lg">
            <Calendar className="w-5 h-5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-[#554240] font-medium text-sm">
            <Clock className="w-4 h-4" />
            <span>{formattedTime}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#707070] text-xs font-semibold uppercase tracking-wider">
              <User className="w-3 h-3" />
              <span>Doctor</span>
            </div>
            <p className="text-[#554240] font-medium">{appointment.doctor_name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#707070] text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3 h-3" />
              <span>Institution</span>
            </div>
            <p className="text-[#554240] font-medium">{appointment.institution_name}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/30">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#707070] text-xs font-semibold uppercase tracking-wider">
              <span>Reason for Visit</span>
            </div>
            <p className="text-[#554240] text-sm leading-relaxed">
              {appointment.presenting_problem}
            </p>
          </div>
        </div>

        {appointment.prescription && (
          <div className="mt-2 p-3 rounded-2xl bg-brand-red/10 border border-brand-red/20">
            <div className="flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-wider mb-1">
              <span>Prescription</span>
            </div>
            <p className="text-[#554240] text-sm italic">
              {appointment.prescription}
            </p>
          </div>
        )}
      </div>

      <div className={cn(
        "absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter",
        isUpcoming
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-gray-100 text-gray-600 border border-gray-200"
      )}>
        {isUpcoming ? 'Upcoming' : 'Past'}
      </div>
    </div>
  );
};

export default AppointmentCard;
