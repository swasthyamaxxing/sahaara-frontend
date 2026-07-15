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
        <main className="bg-[#c9b998] max-w-7xl border mx-auto h-auto rounded-4xl m-4 p-9">
            <div className="tracking-tight leading-loose mb-5 border-b-2 border-[#707070] pb-5">
                <h1 className="text-4xl font-bold text-brand-red">Record New Vitals</h1>
            </div>
            <div className="w-full h-auto bg-[#FFFFFF80]/50 border rounded-4xl p-10 flex flex-col gap-6">
                <h2 className="text-[32px] font-bold text-brand-red">Biometric Data</h2>
                <hr className="border-white" />
                <div className="flex flex-col gap-6">
                  {entries.map((entry) => (
                    <div key={entry.id} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex flex-col gap-2 flex-1 min-w-45">
                        <p className="text-[#554240CC]">Select Vital</p>
                        <Combobox
                          items={vitalsOptions}
                          value={entry.vital}
                          onValueChange={(value) => updateEntry(entry.id, { vital: value ?? '' })}
                        >
                          <ComboboxInput className="bg-[#FFFFFF66] text-black" placeholder="Select a vital sign" />
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

                      <div className="flex flex-col gap-2 flex-1 min-w-45">
                        <p className="text-[#554240CC]">Enter Value</p>
                        <Input
                          className="bg-white px-5 py-3 text-black border-[#6B7280]"
                          placeholder="eg: 118/76"
                          value={entry.value}
                          onChange={(event) => updateEntry(entry.id, { value: event.target.value })}
                        />
                      </div>

                      <div className="flex flex-col gap-2 flex-1 min-w-45">
                        <p className="text-[#554240CC]">Recorded At</p>
                        <Input
                          className="bg-white px-5 py-3 text-black border-[#6B7280]"
                          placeholder="eg: 9 AM"
                          value={entry.recordedAt}
                          onChange={(event) => updateEntry(entry.id, { recordedAt: event.target.value })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        className="border border-dashed border-brand-red text-brand-red px-5 py-3 rounded-lg"
                        onClick={addEntry}
                    >
                        + Add Another Vitals
                    </button>
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            className="bg-brand-red text-white px-6 py-3 rounded-lg"
                            onClick={removeLastEntry}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="bg-brand-red text-white px-6 py-3 rounded-lg"
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