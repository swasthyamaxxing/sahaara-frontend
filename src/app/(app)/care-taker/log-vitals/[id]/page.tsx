'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Input } from '@/components/ui/input'
import { postVitals, getVitalsLables, VitalLabel } from '@/services/api/vitals.api'
import { toast } from 'sonner'

const fallbackVitalsOptions = [
  { label: 'Blood Pressure Systolic', value: 'blood-pressure-systolic' },
  { label: 'Blood Pressure Diastolic', value: 'blood-pressure-diastolic' },
  { label: 'Blood Sugar Level', value: 'blood-sugar-level' },
  { label: 'Heartbeat', value: 'heartbeat' },
]

interface VitalEntry {
  id: string
  vital: string
  value: string
  recordedAt: string
}

const createEntry = (): VitalEntry => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
  vital: '',
  value: '',
  recordedAt: '',
})

const formatDateTime = (date = new Date()) => {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const parsePatientId = (id: string | string[] | undefined): number => {
  if (!id) return 0
  const rawId = Array.isArray(id) ? id[0] : id
  const parsed = Number(rawId)
  return Number.isInteger(parsed) ? parsed : 0
}

const LogVitals = () => {
  const params = useParams()
  const patientId = parsePatientId(params?.id)
  const [entries, setEntries] = useState<VitalEntry[]>([createEntry()])
  const [vitalsOptions, setVitalsOptions] = useState(fallbackVitalsOptions)

  useEffect(() => {
    const loadVitalsLabels = async () => {
      try {
        const res = await getVitalsLables()
        if (res?.status && Array.isArray(res.data)) {
          setVitalsOptions(
            res.data.map((item: VitalLabel) => ({
              label: item.name,
              value: item.vital_label,
            })),
          )
        }
      } catch (error) {
        console.error('Failed to load vital labels:', error)
        setVitalsOptions(fallbackVitalsOptions)
      }
    }

    loadVitalsLabels()
  }, [])

  const addEntry = () => setEntries((current) => [...current, createEntry()])

  const removeLastEntry = () =>
    setEntries((current) => (current.length > 1 ? current.slice(0, -1) : current))

  const updateEntry = (id: string, updatedValues: Partial<VitalEntry>) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, ...updatedValues } : entry,
      ),
    )
  }

  const handleSubmit = async () => {
    const payload = {
      patient_id: patientId,
      user_id: 1, // Assuming user_id is 1 for now
      date: formatDateTime(),
      vitals: entries
        .filter((entry) => entry.vital && entry.value)
        .map((entry) => {
          const numericValue = Number(entry.value)
          return {
            label: entry.vital,
            value: Number.isNaN(numericValue) ? entry.value : numericValue,
          }
        }),
    }

    console.log('Submit payload:', payload)

    try {
      const res = await postVitals(payload) // Assuming user_id is 1 for now
      toast.success(res.message || 'Vitals submitted successfully!')
    } catch (error) {
      console.error('Failed to submit vitals:', error)
      toast.error('Failed to submit vitals.')
    }
  }

  return (
        <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#c9b998] p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
            <div className="tracking-tight leading-loose mb-5 border-b-2 border-[#707070] pb-4 sm:pb-5">
                <h1 className="text-2xl sm:text-4xl font-bold text-brand-red">Record New Vitals</h1>
            </div>
            <div className="w-full bg-[#FFFFFF80]/50 border border-white/60 rounded-2xl sm:rounded-4xl p-4 sm:p-8 lg:p-10 flex flex-col gap-6">
                <h2 className="text-xl sm:text-3xl font-bold text-brand-red">Biometric Data</h2>
                <hr className="border-white" />
                <div className="flex flex-col gap-6">
                  {entries.map((entry) => (
                    <div key={entry.id} className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between bg-white/30 sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none border sm:border-none border-white/40">
                      <div className="flex flex-col gap-2 flex-1 w-full">
                        <p className="text-xs sm:text-sm text-[#554240CC] font-medium">Select Vital</p>
                        <Combobox
                          items={vitalsOptions}
                          value={entry.vital}
                          onValueChange={(value) => updateEntry(entry.id, { vital: value ?? '' })}
                        >
                          <ComboboxInput className="bg-[#FFFFFF66] text-black w-full" placeholder="Select a vital sign" />
                          <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item.value} value={item.value}>
                                  {item.label}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </div>

                      <div className="flex flex-col gap-2 flex-1 w-full">
                        <p className="text-xs sm:text-sm text-[#554240CC] font-medium">Enter Value</p>
                        <Input
                          className="bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-black border-[#6B7280] w-full"
                          placeholder="eg: 118/76"
                          value={entry.value}
                          onChange={(event) => updateEntry(entry.id, { value: event.target.value })}
                        />
                      </div>

                      <div className="flex flex-col gap-2 flex-1 w-full">
                        <p className="text-xs sm:text-sm text-[#554240CC] font-medium">Recorded At</p>
                        <Input
                          className="bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-black border-[#6B7280] w-full"
                          placeholder="eg: 9 AM"
                          value={entry.recordedAt}
                          onChange={(event) => updateEntry(entry.id, { recordedAt: event.target.value })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
                    <button
                        type="button"
                        className="border border-dashed border-brand-red text-brand-red px-5 py-3 rounded-lg hover:bg-brand-red/5 font-medium transition-colors w-full sm:w-auto"
                        onClick={addEntry}
                    >
                        + Add Another Vitals
                    </button>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                            type="button"
                            className="bg-brand-red/10 text-brand-red hover:bg-brand-red/20 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
                            onClick={removeLastEntry}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="bg-brand-red hover:bg-[#7a1821] text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LogVitals