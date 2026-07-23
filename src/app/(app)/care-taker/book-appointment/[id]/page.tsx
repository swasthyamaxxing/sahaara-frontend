'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Bell, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react'
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox'

const appointmentTypes = ['Consultation', 'Follow-up', 'Therapy', 'Emergency']
const appointmentTimes = ['09:00 AM', '10:30 AM', '11:15 AM', '01:45 PM', '03:00 PM', '04:30 PM']
const doctors = [
    { label: 'Aarav Sharma', value: 'aarav-sharma' },
    { label: 'Dr. Meera Chen', value: 'meera-chen' },
    { label: 'Dr. Rohan Kapoor', value: 'rohan-kapoor' },
]
const calendarDays = [
    { day: 27, muted: true },
    { day: 28, muted: true },
    { day: 29, muted: true },
    { day: 30, muted: true },
    ...Array.from({ length: 31 }, (_, index) => ({ day: index + 1, muted: false })),
]

const BookAppointment = () => {
    const params = useParams<{ id: string }>()
    const [appointmentType, setAppointmentType] = useState('Consultation')
    const [selectedTime, setSelectedTime] = useState('11:15 AM')
    const [customTime, setCustomTime] = useState('')
    const [selectedDate, setSelectedDate] = useState(9)
    const [selectedDoctor, setSelectedDoctor] = useState('aarav-sharma')
    const [otherCareType, setOtherCareType] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = () => {
        const payload = {
            patient_id: params?.id,
            doctor: selectedDoctor,
            appointment_type: appointmentType,
            other_care_type: otherCareType || null,
            date: `2026-10-${String(selectedDate).padStart(2, '0')}`,
            time: selectedTime,
        }

        console.log('Set reminder payload:', payload)
        setSubmitted(true)
    }

    return (
        <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-screen rounded-3xl sm:rounded-4xl bg-[#c9b998] p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
            <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                <section className="flex flex-col rounded-[1.45rem] border border-white/55 bg-white/25 p-5 sm:p-8 lg:p-10 shadow-[0_10px_25px_rgba(104,78,42,0.08)]">
                    <h1 className="text-2xl font-bold text-brand-red sm:text-[2rem]">Reminder Details</h1>

                    <label className="mt-6 sm:mt-8 text-sm sm:text-base font-bold tracking-wide text-[#554240]" htmlFor="doctor">
                        DOCTOR
                    </label>
                    <Combobox
                        items={doctors}
                        value={selectedDoctor}
                        onValueChange={(value) => setSelectedDoctor(value ?? '')}
                    >
                        <ComboboxInput
                            id="doctor"
                            className="mt-2 h-11 sm:h-12 w-full rounded-full border-white/50 bg-white/35 px-4 sm:px-5 text-sm sm:text-base text-[#3b3428]"
                            placeholder="Select a doctor"
                        />
                        <ComboboxContent>
                            <ComboboxEmpty>No doctors found.</ComboboxEmpty>
                            <ComboboxList>
                                {(doctor) => (
                                    <ComboboxItem key={doctor.value} value={doctor.value}>
                                        {doctor.label}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>

                    <fieldset className="mt-6">
                        <legend className="text-sm sm:text-base font-bold tracking-wide text-[#554240]">APPOINTMENT TYPE</legend>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {appointmentTypes.map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setAppointmentType(type)}
                                    className={`h-10 sm:h-11 rounded-full border px-2 sm:px-3 text-xs sm:text-base transition-colors ${appointmentType === type
                                        ? 'border-brand-red bg-white/25 font-bold text-brand-red'
                                        : 'border-white/55 bg-white/15 text-[#554240] hover:bg-white/35'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <input
                            className="mt-3 h-10 sm:h-11 w-full rounded-full border border-white/55 bg-white/15 px-4 sm:px-5 text-sm sm:text-base text-[#554240] outline-none placeholder:text-[#554240]/50 focus:border-brand-red"
                            placeholder="Other care type..."
                            aria-label="Other care type"
                            value={otherCareType}
                            onChange={(event) => setOtherCareType(event.target.value)}
                        />
                    </fieldset>

                    <fieldset className="mt-6">
                        <legend className="text-sm sm:text-base font-bold tracking-wide text-[#554240]">PREFERRED TIME</legend>
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {appointmentTimes.map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => {
                                        setSelectedTime(time)
                                        setCustomTime('')
                                    }}
                                    className={`h-9 rounded-full border text-xs sm:text-sm transition-colors ${selectedTime === time
                                        ? 'border-brand-red bg-brand-red font-bold text-white'
                                        : 'border-white/55 bg-white/15 text-[#3b3428] hover:bg-white/35'}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <input
                            type="time"
                            aria-label="Custom appointment time"
                            value={customTime}
                            onChange={(event) => {
                                setCustomTime(event.target.value)
                                setSelectedTime(event.target.value)
                            }}
                            className="mt-3 h-10 sm:h-11 w-full rounded-full border border-white/55 bg-white/15 px-4 sm:px-5 text-sm sm:text-base text-[#554240] outline-none focus:border-brand-red"
                        />
                    </fieldset>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-6 sm:mt-8 flex h-14 sm:h-16 w-full items-center justify-center gap-3 rounded-2xl bg-brand-red px-5 text-lg sm:text-xl font-bold text-[#D7C6A8] transition-colors hover:bg-[#7a1821]"
                    >
                        {submitted ? 'Reminder Set' : 'Set Reminder'}
                        <Bell className="h-5 w-5" />
                    </button>
                </section>

                <div className="flex flex-col gap-5">
                    <section className="rounded-[1.45rem] border border-white/55 bg-white/25 p-5 sm:p-8 shadow-[0_10px_25px_rgba(104,78,42,0.08)]">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-brand-red">Select Date</h2>
                            <div className="flex items-center gap-2 text-[#3b3428]">
                                <span className="rounded-full bg-white/45 px-3 py-1 text-xs font-bold">October 2026</span>
                                <button type="button" aria-label="Previous month" className="hover:text-brand-red p-1"><ChevronLeft className="h-4 w-4" /></button>
                                <button type="button" aria-label="Next month" className="hover:text-brand-red p-1"><ChevronRight className="h-4 w-4" /></button>
                            </div>
                        </div>

                        <div className="mt-5 sm:mt-7 grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#554240] sm:gap-2">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => <span key={day} className="py-1">{day}</span>)}
                            {calendarDays.map(({ day, muted }, index) => (
                                <button
                                    key={`${day}-${index}`}
                                    type="button"
                                    disabled={muted}
                                    onClick={() => setSelectedDate(day)}
                                    className={`aspect-square rounded-xl sm:rounded-2xl border text-xs sm:text-sm transition-colors flex items-center justify-center ${muted
                                        ? 'border-transparent text-[#554240]/25'
                                        : selectedDate === day
                                            ? 'border-brand-red bg-brand-red font-bold text-white shadow-[0_7px_12px_rgba(99,13,22,0.18)]'
                                            : 'border-white/25 bg-white/10 text-[#554240] hover:bg-white/40'}`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        <div className="mt-5 sm:mt-7 border-t border-white/35 pt-4 text-xs sm:text-sm text-[#554240]">
                            <p><span className="mr-2 text-brand-red">•</span>Selected date: <strong className="ml-1 text-brand-red">Friday, Oct {selectedDate}, 2026</strong></p>
                        </div>
                    </section>

                    <section className="rounded-[1.45rem] border border-white/55 bg-white/25 p-5 sm:p-7 shadow-[0_10px_25px_rgba(104,78,42,0.08)]">
                        <h2 className="flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide text-brand-red"><Clock3 className="h-4 w-4" /> RECENTLY SCHEDULED</h2>
                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl bg-white/35 px-4 py-3 text-[#554240] gap-2">
                            <div>
                                <p className="font-bold text-brand-red text-sm sm:text-base">Leila Gupta</p>
                                <p className="text-xs sm:text-sm text-[#554240]">Follow-up with Dr. Chen • Oct 4</p>
                            </div>
                            <span className="self-start sm:self-auto rounded-full bg-white/55 px-3 py-1 text-[10px] font-bold text-brand-red">CONFIRMED</span>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default BookAppointment