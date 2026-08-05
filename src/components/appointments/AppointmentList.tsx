'use client';

import React from 'react';
import AppointmentCard from './AppointmentCard';
import { CalendarDays } from 'lucide-react';

interface AppointmentListProps {
  appointments: any[];
}

const AppointmentList = ({ appointments }: AppointmentListProps) => {
  const now = new Date();

  const upcomingAppointments = appointments.filter(app => new Date(app.date_time) >= now);
  const pastAppointments = appointments.filter(app => new Date(app.date_time) < now);

  if (appointments.length === 0) {
    return (
      <div className="col-span-full rounded-3xl bg-white/70 p-12 text-center text-[#554240] border-2 border-dashed border-white/50">
        <div className="flex flex-col items-center gap-3">
          <CalendarDays className="w-12 h-12 text-brand-red/50" />
          <p className="text-lg font-medium">No appointments found.</p>
          <p className="text-sm text-[#707070]">Your scheduled visits will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {upcomingAppointments.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-brand-red rounded-full" />
            <h2 className="text-xl font-bold text-brand-red">Upcoming Appointments</h2>
          </div>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {upcomingAppointments.map((app) => (
              <AppointmentCard key={app.id} appointment={app} isUpcoming={true} />
            ))}
          </div>
        </section>
      )}

      {pastAppointments.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-[#707070] rounded-full" />
            <h2 className="text-xl font-bold text-[#554240]">Past Visits</h2>
          </div>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {pastAppointments.map((app) => (
              <AppointmentCard key={app.id} appointment={app} isUpcoming={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AppointmentList;
