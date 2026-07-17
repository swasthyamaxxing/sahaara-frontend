'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const vitalsData = [
  { day: 'Mon', value: 118 },
  { day: 'Tue', value: 122 },
  { day: 'Wed', value: 121 },
  { day: 'Thu', value: 119 },
  { day: 'Fri', value: 120 },
  { day: 'Sat', value: 123 },
  { day: 'Sun', value: 120 },
]

const PatientVitalsCard = () => {
  return (
    <div className="bg-[#FFFFFF59] rounded-[48px] w-full max-w-[360px] min-h-[480px] p-6 border-[#FFFFFF4D] shadow-lg shadow-black/5">
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 mb-6">
        <span className="text-brand-red text-2xl font-semibold">Blood Pressure</span>
        <span className="rounded-full bg-[#DCFCE7] px-4 py-1.5 text-sm font-semibold text-[#15803D]">
          Normal
        </span>
      </div>

      <div className="grid gap-5">
        <div>
          <h2 className="text-brand-red font-bold text-[3.25rem] leading-none">
            118/76
          </h2>
          <p className="mt-3 text-sm text-slate-700/80">mmHg</p>
        </div>

        <div className="rounded-[32px] bg-[#F2F8EE] p-4">
          <div className="h-[240px] w-full rounded-[28px] bg-white/80 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d9e4d8" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis hide domain={[110, 130]} />
                <Tooltip cursor={false} contentStyle={{ borderRadius: 12, border: 'none', backgroundColor: '#fff' }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#9F1239"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#9F1239' }}
                  activeDot={{ r: 5, fill: '#9F1239' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientVitalsCard
