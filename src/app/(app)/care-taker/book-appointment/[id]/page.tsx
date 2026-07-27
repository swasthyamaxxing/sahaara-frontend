'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { Bell, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react'
import { toast } from 'sonner'
import {
    getAppointments,
    storeAppointment,
    updateAppointment,
} from '@/services/api/appointments.api'
import { Appointment } from '@/types/appointment.types'

const appointmentTimes = ['09:00 AM', '10:30 AM', '11:15 AM', '01:45 PM', '03:00 PM', '04:30 PM']

const inputClassName =
    'mt-2 h-11 sm:h-12 w-full rounded-full border border-white/55 bg-white/15 px-4 sm:px-5 text-sm sm:text-base text-[#554240] outline-none placeholder:text-[#554240]/50 focus:border-brand-red'

const textareaClassName =
    'mt-2 w-full rounded-2xl border border-white/55 bg-white/15 px-4 sm:px-5 py-3 text-sm sm:text-base text-[#554240] outline-none placeholder:text-[#554240]/50 focus:border-brand-red resize-none'

const parsePatientId = (id: string | string[] | undefined): number => {
    if (!id) return 0
    const rawId = Array.isArray(id) ? id[0] : id
    const parsed = Number(rawId)
    return Number.isInteger(parsed) ? parsed : 0
}

const parseTimeTo24Hour = (time: string): string => {
    if (/^\d{2}:\d{2}$/.test(time)) {
        return `${time}:00`
    }

    const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
    if (!match) return '09:00:00'

    let hours = Number(match[1])
    const minutes = match[2]
    const period = match[3].toUpperCase()

    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0

    return `${String(hours).padStart(2, '0')}:${minutes}:00`
}

const formatDateTimeForApi = (year: number, month: number, day: number, time: string): string => {
    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return `${date} ${parseTimeTo24Hour(time)}`
}

const formatDisplayDate = (dateTime: string): string => {
    return new Date(dateTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

const formatDisplayTime = (dateTime: string): string => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    })
}

const formatSelectedDateLabel = (year: number, month: number, day: number): string => {
    return new Date(year, month - 1, day).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

const getCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1).getDay()
    const daysInMonth = new Date(year, month, 0).getDate()
    const daysInPrevMonth = new Date(year, month - 1, 0).getDate()

    const leadingDays = Array.from({ length: firstDay }, (_, index) => ({
        day: daysInPrevMonth - firstDay + index + 1,
        muted: true,
    }))

    const currentDays = Array.from({ length: daysInMonth }, (_, index) => ({
        day: index + 1,
        muted: false,
    }))

    return [...leadingDays, ...currentDays]
}

const getInitialFormState = () => ({
    institutionName: '',
    doctorName: '',
    presentingProblem: '',
    prescription: '',
    notes: '',
})

const BookAppointment = () => {
    const params = useParams<{ id: string }>()
    const patientId = parsePatientId(params?.id)

    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1)
    const [currentYear, setCurrentYear] = useState(today.getFullYear())
    const [selectedDate, setSelectedDate] = useState(today.getDate())
    const [selectedTime, setSelectedTime] = useState('11:15 AM')
    const [customTime, setCustomTime] = useState('')

    const [form, setForm] = useState(getInitialFormState)
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loadingAppointments, setLoadingAppointments] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null)

    const calendarDays = useMemo(
        () => getCalendarDays(currentYear, currentMonth),
        [currentYear, currentMonth],
    )

    const monthLabel = useMemo(
        () => new Date(currentYear, currentMonth - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        [currentMonth, currentYear],
    )

    const loadAppointments = useCallback(async () => {
        if (!patientId) {
            setAppointments([])
            setLoadingAppointments(false)
            return
        }

        setLoadingAppointments(true)
        try {
            const response = await getAppointments(patientId)
            setAppointments(response.data ?? [])
        } catch (error) {
            console.error('Failed to load appointments:', error)
            setAppointments([])
            toast.error('Failed to load appointments.')
        } finally {
            setLoadingAppointments(false)
        }
    }, [patientId])

    useEffect(() => {
        loadAppointments()
    }, [loadAppointments])

    const updateForm = (field: keyof typeof form, value: string) => {
        setForm((current) => ({ ...current, [field]: value }))
    }

    const resetForm = () => {
        setForm(getInitialFormState())
        setEditingAppointmentId(null)
        setCustomTime('')
        setSelectedTime('11:15 AM')
    }

    const handleSelectAppointment = (appointment: Appointment) => {
        const appointmentDate = new Date(appointment.date_time)

        setEditingAppointmentId(appointment.id)
        setCurrentMonth(appointmentDate.getMonth() + 1)
        setCurrentYear(appointmentDate.getFullYear())
        setSelectedDate(appointmentDate.getDate())
        setSelectedTime(formatDisplayTime(appointment.date_time))
        setCustomTime('')
        setForm({
            institutionName: appointment.institution_name,
            doctorName: appointment.doctor_name,
            presentingProblem: appointment.presenting_problem,
            prescription: appointment.prescription,
            notes: appointment.notes,
        })
    }

    const handlePreviousMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12)
            setCurrentYear((year) => year - 1)
            return
        }
        setCurrentMonth((month) => month - 1)
    }

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1)
            setCurrentYear((year) => year + 1)
            return
        }
        setCurrentMonth((month) => month + 1)
    }

    const handleSubmit = async () => {
        if (!patientId) {
            toast.error('Invalid patient ID.')
            return
        }

        if (!form.institutionName.trim() || !form.doctorName.trim() || !form.presentingProblem.trim()) {
            toast.error('Institution, doctor, and presenting problem are required.')
            return
        }

        const payload = {
            patient_id: patientId,
            institution_name: form.institutionName.trim(),
            doctor_name: form.doctorName.trim(),
            date_time: formatDateTimeForApi(currentYear, currentMonth, selectedDate, selectedTime),
            presenting_problem: form.presentingProblem.trim(),
            prescription: form.prescription.trim(),
            notes: form.notes.trim(),
        }

        setSubmitting(true)
        try {
            const response = editingAppointmentId
                ? await updateAppointment(editingAppointmentId, payload)
                : await storeAppointment(payload)

            toast.success(response.message || (editingAppointmentId ? 'Appointment updated successfully.' : 'Appointment created successfully.'))
            resetForm()
            await loadAppointments()
        } catch (error) {
            console.error('Failed to save appointment:', error)
            toast.error(editingAppointmentId ? 'Failed to update appointment.' : 'Failed to create appointment.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-screen rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
            <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                <section className="flex flex-col rounded-[1.45rem] border border-white/55 bg-white/25 p-5 sm:p-8 lg:p-10 shadow-[0_10px_25px_rgba(104,78,42,0.08)]">
                    <h1 className="text-2xl font-bold text-brand-red sm:text-[2rem]">
                        {editingAppointmentId ? 'Edit Appointment' : 'Appointment Details'}
                    </h1>

                    <label className="mt-6 sm:mt-8 text-sm sm:text-base font-bold tracking-wide text-[#554240]" htmlFor="institution">
                        INSTITUTION
                    </label>
                    <input
                        id="institution"
                        className={inputClassName}
                        placeholder="e.g. Metro Health Medical Center"
                        value={form.institutionName}
                        onChange={(event) => updateForm('institutionName', event.target.value)}
                    />

                    <label className="mt-6 text-sm sm:text-base font-bold tracking-wide text-[#554240]" htmlFor="doctor">
                        DOCTOR
                    </label>
                    <input
                        id="doctor"
                        className={inputClassName}
                        placeholder="e.g. Dr. Marcus Vance"
                        value={form.doctorName}
                        onChange={(event) => updateForm('doctorName', event.target.value)}
                    />

                    <label className="mt-6 text-sm sm:text-base font-bold tracking-wide text-[#554240]" htmlFor="presenting-problem">
                        PRESENTING PROBLEM
                    </label>
                    <textarea
                        id="presenting-problem"
                        rows={3}
                        className={textareaClassName}
                        placeholder="Describe the patient's presenting problem..."
                        value={form.presentingProblem}
                        onChange={(event) => updateForm('presentingProblem', event.target.value)}
                    />

                    <label className="mt-6 text-sm sm:text-base font-bold tracking-wide text-[#554240]" htmlFor="prescription">
                        PRESCRIPTION
                    </label>
                    <textarea
                        id="prescription"
                        rows={3}
                        className={textareaClassName}
                        placeholder="Enter prescription details..."
                        value={form.prescription}
                        onChange={(event) => updateForm('prescription', event.target.value)}
                    />

                    <label className="mt-6 text-sm sm:text-base font-bold tracking-wide text-[#554240]" htmlFor="notes">
                        NOTES
                    </label>
                    <textarea
                        id="notes"
                        rows={3}
                        className={textareaClassName}
                        placeholder="Additional notes or follow-up instructions..."
                        value={form.notes}
                        onChange={(event) => updateForm('notes', event.target.value)}
                    />

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

                    <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row">
                        {editingAppointmentId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="flex h-14 sm:h-16 flex-1 items-center justify-center rounded-2xl border border-brand-red bg-white/25 px-5 text-lg font-bold text-brand-red transition-colors hover:bg-white/40"
                            >
                                Cancel Edit
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="flex h-14 sm:h-16 flex-1 items-center justify-center gap-3 rounded-2xl bg-brand-red px-5 text-lg sm:text-xl font-bold text-[#D7C6A8] transition-colors hover:bg-[#7a1821] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {submitting
                                ? 'Saving...'
                                : editingAppointmentId
                                    ? 'Update Appointment'
                                    : 'Book Appointment'}
                            <Bell className="h-5 w-5" />
                        </button>
                    </div>
                </section>

                <div className="flex flex-col gap-5">
                    <section className="rounded-[1.45rem] border border-white/55 bg-white/25 p-5 sm:p-8 shadow-[0_10px_25px_rgba(104,78,42,0.08)]">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-brand-red">Select Date</h2>
                            <div className="flex items-center gap-2 text-[#3b3428]">
                                <span className="rounded-full bg-white/45 px-3 py-1 text-xs font-bold">{monthLabel}</span>
                                <button type="button" aria-label="Previous month" onClick={handlePreviousMonth} className="hover:text-brand-red p-1">
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button type="button" aria-label="Next month" onClick={handleNextMonth} className="hover:text-brand-red p-1">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-5 sm:mt-7 grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#554240] sm:gap-2">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                                <span key={day} className="py-1">{day}</span>
                            ))}
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
                            <p>
                                <span className="mr-2 text-brand-red">•</span>
                                Selected date:
                                <strong className="ml-1 text-brand-red">
                                    {formatSelectedDateLabel(currentYear, currentMonth, selectedDate)}
                                </strong>
                            </p>
                        </div>
                    </section>

                    <section className="rounded-[1.45rem] border border-white/55 bg-white/25 p-5 sm:p-7 shadow-[0_10px_25px_rgba(104,78,42,0.08)]">
                        <h2 className="flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide text-brand-red">
                            <Clock3 className="h-4 w-4" /> RECENTLY SCHEDULED
                        </h2>

                        {loadingAppointments ? (
                            <div className="mt-3 rounded-2xl bg-white/35 px-4 py-6 text-center text-sm text-[#554240]">
                                Loading appointments...
                            </div>
                        ) : appointments.length === 0 ? (
                            <div className="mt-3 rounded-2xl bg-white/35 px-4 py-6 text-center text-sm text-[#554240]">
                                No appointments found for this patient.
                            </div>
                        ) : (
                            <div className="mt-3 flex flex-col gap-3">
                                {appointments.map((appointment) => {
                                    const isEditing = editingAppointmentId === appointment.id

                                    return (
                                        <button
                                            key={appointment.id}
                                            type="button"
                                            onClick={() => handleSelectAppointment(appointment)}
                                            className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl px-4 py-3 text-left text-[#554240] gap-2 transition-colors ${isEditing
                                                ? 'border border-brand-red bg-white/55'
                                                : 'bg-white/35 hover:bg-white/45'}`}
                                        >
                                            <div className="min-w-0">
                                                <p className="font-bold text-brand-red text-sm sm:text-base truncate">
                                                    {appointment.institution_name}
                                                </p>
                                                <p className="text-xs sm:text-sm text-[#554240] truncate">
                                                    {appointment.doctor_name} • {formatDisplayDate(appointment.date_time)}
                                                </p>
                                                <p className="mt-1 text-xs text-[#554240]/80 line-clamp-2">
                                                    {appointment.presenting_problem}
                                                </p>
                                            </div>
                                            <span className="self-start sm:self-auto shrink-0 rounded-full bg-white/55 px-3 py-1 text-[10px] font-bold text-brand-red">
                                                {isEditing ? 'EDITING' : 'SCHEDULED'}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}

export default BookAppointment
