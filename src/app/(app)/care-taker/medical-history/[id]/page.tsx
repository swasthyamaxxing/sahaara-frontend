'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
    Download,
    Eye,
    FileText,
    MoreVertical,
    Plus,
    X,
} from 'lucide-react'

type GalleryItem = {
    id: string
    label: string
    type: 'image' | 'document'
}

type MedicalRecord = {
    id: string
    date: string
    title: string
    doctor: string
    notes: string
    attachment?: string
    gallery: GalleryItem[]
    extraGalleryCount?: number
    subtitle?: string
}

const medicalRecords: MedicalRecord[] = [
    {
        id: '1',
        date: 'October 24, 2026',
        title: 'Annual General Checkup',
        doctor: 'Dr. Diya Khadka',
        notes:
            'Patient reports mild fatigue and recurring headaches. Hypertension is well controlled on current medication. Vitamin D levels are improving but still below target. Follow-up scheduled for 3 months.',
        attachment: 'Blood_Work_Results.pdf',
        extraGalleryCount: 3,
        gallery: [
            { id: 'g1', label: 'Cervical Spine', type: 'image' },
            { id: 'g2', label: 'Chest PA', type: 'image' },
            { id: 'g3', label: 'Lab Results.pdf', type: 'document' },
        ],
    },
    {
        id: '2',
        date: 'August 12, 2026',
        title: 'Dermatology Consultation',
        doctor: 'Dr. Abisha Aryal',
        subtitle: 'Dr. Abisha Aryal • Skin Sensitivity...',
        notes:
            'Mild eczema flare-up observed on forearms. Prescribed topical moisturizer and recommended fragrance-free products.',
        gallery: [],
    },
    {
        id: '3',
        date: 'June 05, 2026',
        title: 'Cardiology Follow-up',
        doctor: 'Dr. Rohan Mehta',
        subtitle: 'Dr. Rohan Mehta • Blood Pressure...',
        notes:
            'Blood pressure readings stable. Continue current dosage. ECG within normal limits.',
        gallery: [],
    },
    {
        id: '4',
        date: 'March 18, 2026',
        title: 'Orthopedic Assessment',
        doctor: 'Dr. Suman Thapa',
        subtitle: 'Dr. Suman Thapa • Knee Pain...',
        notes:
            'Patient reports reduced knee pain after physiotherapy. Recommended continued exercises and follow-up in 6 weeks.',
        gallery: [],
    },
]

function GalleryThumbnail({
    label,
    type,
    size = 'sm',
}: {
    label: string
    type: 'image' | 'document'
    size?: 'sm' | 'lg'
}) {
    const isLarge = size === 'lg'

    if (type === 'document') {
        return (
            <div className={`flex flex-col items-center justify-center gap-2 ${isLarge ? 'h-full min-h-[7.5rem]' : 'h-14 w-14'}`}>
                <div
                    className={`flex items-center justify-center rounded-xl border border-white/55 bg-white/35 text-brand-red ${isLarge ? 'h-24 w-full' : 'h-full w-full'}`}
                >
                    <FileText className={isLarge ? 'h-8 w-8' : 'h-5 w-5'} />
                </div>
                {isLarge && (
                    <span className="text-center text-xs font-medium text-[#554240]">{label}</span>
                )}
            </div>
        )
    }

    return (
        <div className={`flex flex-col gap-2 ${isLarge ? 'h-full' : ''}`}>
            <div
                className={`overflow-hidden rounded-xl border border-white/55 bg-gradient-to-br from-[#e8dfd0] via-[#d9cfc0] to-[#c8b9a6] ${isLarge ? 'aspect-square w-full' : 'h-14 w-14'}`}
            >
                <div className="flex h-full w-full items-center justify-center">
                    <div className="h-[70%] w-[55%] rounded-sm bg-white/25" />
                </div>
            </div>
            {isLarge && (
                <span className="text-center text-xs font-medium text-[#554240]">{label}</span>
            )}
        </div>
    )
}

const MedicalHistoryPage = () => {
    const params = useParams<{ id: string }>()
    const [selectedId, setSelectedId] = useState(medicalRecords[0].id)
    const [showDetail, setShowDetail] = useState(true)

    const selectedRecord =
        medicalRecords.find((record) => record.id === selectedId) ?? medicalRecords[0]

    return (
        <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-screen rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-brand-red sm:text-[2rem] lg:text-4xl">
                        Medical History
                    </h1>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-[#D7C6A8] transition-colors hover:bg-[#7a1821] sm:px-6 sm:py-3 sm:text-base"
                    >
                        <Plus className="h-4 w-4" />
                        New Record
                    </button>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
                    <section className="flex flex-col gap-3">
                        {medicalRecords.map((record, index) => {
                            const isSelected = record.id === selectedId
                            const isLatest = index === 0

                            return (
                                <button
                                    key={record.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedId(record.id)
                                        setShowDetail(true)
                                    }}
                                    className={`relative w-full rounded-[1.45rem] border p-4 sm:p-5 text-left transition-all shadow-[0_10px_25px_rgba(104,78,42,0.08)] ${isSelected
                                        ? 'border-white/70 bg-white/45'
                                        : 'border-white/55 bg-white/25 hover:bg-white/35'
                                        }`}
                                >
                                    {isLatest && (
                                        <span className="inline-block rounded-md bg-brand-red px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                                            LATEST SESSION
                                        </span>
                                    )}

                                    <div className={`flex items-start justify-between gap-2 ${isLatest ? 'mt-3' : ''}`}>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-medium text-[#554240]/80 sm:text-sm">
                                                {record.date}
                                            </p>
                                            <h2 className="mt-1 text-lg font-bold text-brand-red sm:text-xl">
                                                {record.title}
                                            </h2>
                                            {!isLatest && record.subtitle && (
                                                <p className="mt-1 truncate text-xs text-[#554240]/75 sm:text-sm">
                                                    {record.subtitle}
                                                </p>
                                            )}
                                        </div>
                                        {isLatest && (
                                            <span className="rounded-full p-1 text-[#554240]/60 hover:bg-white/40">
                                                <MoreVertical className="h-4 w-4" />
                                            </span>
                                        )}
                                    </div>

                                    {isLatest && (
                                        <div className="mt-4">
                                            <div className="flex items-center gap-2">
                                                {record.gallery.slice(0, 2).map((item) => (
                                                    <GalleryThumbnail
                                                        key={item.id}
                                                        label={item.label}
                                                        type={item.type}
                                                        size="sm"
                                                    />
                                                ))}
                                                {record.extraGalleryCount && (
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/55 bg-white/35 text-sm font-bold text-brand-red">
                                                        +{record.extraGalleryCount}
                                                    </div>
                                                )}
                                            </div>
                                            {record.attachment && (
                                                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-red">
                                                    <FileText className="h-4 w-4 shrink-0" />
                                                    <span className="truncate">{record.attachment}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </section>

                    {showDetail && (
                        <section className="relative flex flex-col rounded-[1.45rem] border border-white/55 bg-white/45 p-5 sm:p-7 lg:p-8 shadow-[0_10px_25px_rgba(104,78,42,0.08)]">
                            <div className="flex items-start justify-between gap-3">
                                <span className="inline-block rounded-md bg-brand-red px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                                    DETAILED RECORD
                                </span>
                                <button
                                    type="button"
                                    aria-label="Close detailed record"
                                    onClick={() => setShowDetail(false)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/55 bg-white/35 text-[#554240] transition-colors hover:bg-white/55"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <h2 className="mt-4 text-2xl font-bold text-brand-red sm:text-3xl">
                                {selectedRecord.title}
                            </h2>
                            <p className="mt-1 text-sm font-medium text-brand-red sm:text-base">
                                {selectedRecord.date} • {selectedRecord.doctor}
                            </p>

                            <div className="mt-6">
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className="text-xs font-bold tracking-wide text-[#554240]">
                                        RECORD GALLERY
                                    </h3>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:underline"
                                    >
                                        <Eye className="h-3.5 w-3.5" />
                                        VIEW ALL
                                    </button>
                                </div>

                                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {selectedRecord.gallery.map((item) => (
                                        <GalleryThumbnail
                                            key={item.id}
                                            label={item.label}
                                            type={item.type}
                                            size="lg"
                                        />
                                    ))}
                                    <button
                                        type="button"
                                        className="flex min-h-[7.5rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-brand-red/40 bg-white/25 text-brand-red transition-colors hover:bg-white/40"
                                    >
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-red/30 bg-white/35">
                                            <Plus className="h-5 w-5" />
                                        </span>
                                        <span className="text-xs font-medium text-[#554240]">Add More</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-xs font-bold tracking-wide text-[#554240]">NOTES</h3>
                                <div className="mt-3 rounded-2xl border border-white/55 bg-white/35 p-4 sm:p-5">
                                    <p className="text-sm leading-relaxed text-[#554240] sm:text-base">
                                        {selectedRecord.notes}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-red bg-white/35 px-6 py-2.5 text-sm font-bold text-brand-red transition-colors hover:bg-white/55"
                                >
                                    <Download className="h-4 w-4" />
                                    Download PDF
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-sm font-bold text-[#D7C6A8] transition-colors hover:bg-[#7a1821]"
                                >
                                    Edit Record
                                </button>
                            </div>

                            <span className="sr-only">Patient ID: {params?.id}</span>
                        </section>
                    )}
                </div>
            </div>
        </main>
    )
}

export default MedicalHistoryPage
