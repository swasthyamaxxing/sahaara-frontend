import { CheckCircle2, Moon, Pill, Plus, Sun } from 'lucide-react';

const medicinalSchedule = [
  {
    title: 'Paracetamol',
    dosage: '1 Tablet',
    note: 'Before Breakfast',
    status: 'Taken',
    statusClass: 'bg-emerald-900/10 text-emerald-900',
    buttonText: 'Taken',
    actionClass: 'hidden',
  },
  {
    title: 'Cough Syrup',
    dosage: '5ml',
    note: 'After Meal',
    status: 'Upcoming',
    statusClass: 'bg-amber-900/10 text-amber-900',
    buttonText: 'Mark as Taken',
    actionClass: 'inline-flex',
  },
  {
    title: 'Multi-Vitamin',
    dosage: '1 Capsule',
    note: 'Before Snacks',
    status: 'Scheduled',
    statusClass: 'bg-brand-red/10 text-brand-red',
    buttonText: 'Mark as Taken',
    actionClass: 'inline-flex',
  },
];

const MedicineCard = ({
  title,
  dosage,
  note,
  status,
  statusClass,
  buttonText,
  actionClass,
}: {
  title: string;
  dosage: string;
  note: string;
  status: string;
  statusClass: string;
  buttonText: string;
  actionClass: string;
}) => {
  return (
    <div className="relative rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-[0_20px_45px_rgba(104,78,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#3c2f24]">{title}</h3>
          <p className="mt-2 text-sm text-[#5b4c3f]">{dosage}</p>
        </div>
        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusClass}`}>{status}</span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-[#f7efe2] px-3 py-2 text-sm text-[#5b4c3f]">
          <Pill className="h-4 w-4 text-[#8c5e3e]" />
          {note}
        </div>
        <button
          type="button"
          className={`${actionClass} rounded-full bg-brand-red px-4 py-2.5 text-sm font-semibold text-[#D7C6A8] transition-colors hover:bg-[#7a1821]`}
        >
          {buttonText}
        </button>
      </div>

      <div className="absolute right-4 top-4 text-[#8a7460]">
        <CheckCircle2 className="h-5 w-5 opacity-0" />
      </div>
    </div>
  );
};

const MedicinalRecordsPage = () => {
  return (
    <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
      <div className="rounded-[2.5rem] border border-white/50 bg-[#E7D8C3] p-6 sm:p-8 shadow-[0_40px_90px_rgba(104,78,42,0.12)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-red sm:text-4xl">Medication Schedule</h1>
            <p className="mt-2 text-sm text-[#554240]">Track today’s prescriptions and dose timings for your patients.</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-4 py-3 text-sm font-semibold text-[#D7C6A8] transition-colors hover:bg-[#7a1821]">
            <Plus className="h-4 w-4" />
            Log Medicine
          </button>
        </div>

        <div className="mt-10 space-y-10">
          <section className="space-y-5 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5E6D3] text-[#B7761F] shadow-sm">
                <Sun className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-semibold text-[#3c2f24]">Morning</h2>
            </div>
            <div className="grid gap-5 xl:grid-cols-2">
              <MedicineCard {...medicinalSchedule[0]} />
              <MedicineCard {...medicinalSchedule[1]} />
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="space-y-5 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5E6D3] text-[#B7761F] shadow-sm">
                  <Sun className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-semibold text-[#3c2f24]">Afternoon</h2>
              </div>
              <MedicineCard {...medicinalSchedule[2]} />
            </section>

            <section className="rounded-[2rem] border-dashed border border-white/60 bg-white/70 p-6 text-center text-[#58493d] shadow-sm">
              <div className="flex items-center justify-center rounded-3xl bg-white/80 p-6 shadow-sm">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#F3E4D7] text-[#6d5c4e]">
                  <Moon className="h-7 w-7" />
                </span>
              </div>
              <p className="mt-6 text-lg font-semibold text-[#3c2f24]">Evening</p>
              <p className="mt-3 text-sm leading-6 text-[#6b594c]">No medications scheduled for this evening. Enjoy your rest.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MedicinalRecordsPage;