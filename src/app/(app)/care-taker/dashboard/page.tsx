import React from 'react';
import Link from 'next/link';
import { Users, Activity, Calendar, ArrowRight, UserPlus, FileText, HeartPulse } from 'lucide-react';

const CareTakerDashboard = () => {
  const quickActions = [
    {
      title: 'Patient Records',
      description: 'View and manage patient profiles and histories',
      icon: Users,
      href: '/care-taker/patient-records',
      color: 'bg-amber-100 text-amber-900 border-amber-200',
    },
    {
      title: 'Log Vitals',
      description: 'Record real-time biometric and health vitals',
      icon: HeartPulse,
      href: '/care-taker/log-vitals/1',
      color: 'bg-rose-100 text-rose-900 border-rose-200',
    },
    {
      title: 'Book Appointment',
      description: 'Schedule follow-ups and specialist consultations',
      icon: Calendar,
      href: '/care-taker/book-appointment/1',
      color: 'bg-blue-100 text-blue-900 border-blue-200',
    },
  ];

  const stats = [
    { label: 'Active Patients', value: '24', icon: Users, change: '+2 this week' },
    { label: 'Pending Vitals', value: '5', icon: Activity, change: '3 urgent' },
    { label: 'Appointments Today', value: '8', icon: Calendar, change: 'Next at 11:15 AM' },
  ];

  return (
    <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#c9b998] p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#707070]/40 pb-5 gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-brand-red tracking-tight">Caretaker Dashboard</h1>
          <p className="text-xs sm:text-sm text-[#554240] mt-1">Overview of patient care schedule, vitals, and actions</p>
        </div>
        <Link
          href="/care-taker/patient-records"
          className="inline-flex items-center justify-center gap-2 bg-brand-red text-white font-medium px-4 py-2.5 rounded-xl hover:bg-[#7a1821] transition-colors text-sm w-full sm:w-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Patient Registry</span>
        </Link>
      </div>

      {/* Stats Overview Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white/40 border border-white/60 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-[#554240] font-medium">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-brand-red mt-1">{stat.value}</p>
                <p className="text-xs text-[#554240CC] mt-1">{stat.change}</p>
              </div>
              <div className="p-3 bg-brand-red/10 rounded-2xl text-brand-red">
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Cards */}
      <div className="mt-8">
        <h2 className="text-lg sm:text-xl font-bold text-[#554240] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                href={action.href}
                className="group bg-white/40 hover:bg-white/60 border border-white/60 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl border ${action.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#554240] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-red mt-4">{action.title}</h3>
                  <p className="text-sm text-[#554240] mt-1 leading-snug">{action.description}</p>
                </div>
                <span className="mt-5 inline-block text-xs font-semibold text-brand-red group-hover:underline">
                  Launch Task &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CareTakerDashboard;