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

interface PatientVitalsCardProps {
  title?: string
  value?: string
  unit?: string
  status?: string
}

const PatientVitalsCard = ({
  title = 'Blood Pressure',
  value = '118/76',
  unit = 'mmHg',
  status = 'Normal',
}: PatientVitalsCardProps) => {
  return (
    <div className="bg-[#FFFFFF59] rounded-3xl sm:rounded-[48px] w-full p-4 sm:p-6 border border-white/50 shadow-lg shadow-black/5 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
        <span className="text-brand-red text-lg sm:text-2xl font-semibold truncate">{title}</span>
        <span className="shrink-0 rounded-full bg-[#DCFCE7] px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold text-[#15803D]">
          {status}
        </span>
      </div>

      <div className="grid gap-4 sm:gap-5">
        <div>
          <h2 className="text-brand-red font-bold text-3xl sm:text-[3.25rem] leading-none tracking-tight">
            {value}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-700/80 font-medium">{unit}</p>
        </div>

        <div className="rounded-2xl sm:rounded-[32px] bg-[#F2F8EE] p-3 sm:p-4">
          <div className="h-48 sm:h-60 w-full rounded-xl sm:rounded-[28px] bg-white/80 p-2 sm:p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d9e4d8" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
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
