'use client'

import { useEffect, useMemo, useState } from 'react';
import PatientVitalsCard from "@/components/vitals/PatientVitalsCard";
import { getUserId } from '@/lib/utils';
import { getVitalLabels, getVitals } from '@/services/api/patientsGet.api';

const getUnitForLabel = (vitalLabel: string) => {
    if (vitalLabel.includes('blood-pressure')) return 'mmHg';
    if (vitalLabel.includes('blood-sugar')) return 'mg/dL';
    if (vitalLabel.includes('heartbeat')) return 'bpm';
    return '';
};

const getStatusForValue = (value: string | number) => {
    if (value === '—' || value === '' || value === null || value === undefined) {
        return 'No Data';
    }

    return 'Normal';
};

type VitalLabel = {
    id: number;
    name: string;
    vital_label: string;
};

type VitalValueItem = {
    id: number;
    caretaker_id: number;
    patient_id: number;
    vital_label: string;
    vital_value: string;
    vital_status: string;
    recorded_at: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
};

type VitalChartPoint = {
    timestamp: string;
    value: number;
};

type VitalValuesByLabel = Record<string, VitalValueItem[]>;

const PatientDashboardPage = () => {
    const [vitalLabels, setVitalLabels] = useState<VitalLabel[]>([]);
    const [vitalValues, setVitalValues] = useState<VitalValuesByLabel>({});

    useEffect(() => {
        const fetchVitalsData = async () => {
            const patientId = getUserId();

            if (!patientId) {
                console.error('Patient ID not available for vital data fetch.');
                return;
            }

            try {
                const [labelsResponse, vitalsResponse] = await Promise.all([
                    getVitalLabels(),
                    getVitals(patientId),
                ]);

                console.log('Vital labels response:', labelsResponse);
                console.log('Vitals response:', vitalsResponse);

                setVitalLabels(labelsResponse?.data ?? []);
                setVitalValues(vitalsResponse?.data ?? {});
            } catch (error) {
                console.error('Error fetching vital labels or vitals:', error);
            }
        };

        fetchVitalsData();
    }, []);

    const vitalsToRender = useMemo(() => {
        const valueMap = new Map<string, { value: string | number; status: string; history: VitalChartPoint[] }>();

        Object.entries(vitalValues).forEach(([label, items]) => {
            if (items.length > 0) {
                const latest = items[items.length - 1];
                const history = items
                    .slice(-3)
                    .map((item) => {
                        const numericValue = parseFloat(String(item.vital_value));
                        if (Number.isNaN(numericValue)) {
                            return null;
                        }
                        return {
                            timestamp: item.recorded_at,
                            value: numericValue,
                        };
                    })
                    .filter((point): point is VitalChartPoint => point !== null);

                valueMap.set(label, { value: latest.vital_value, status: latest.vital_status, history });
            }
        });

        return vitalLabels.map((label) => {
            const stored = valueMap.get(label.vital_label);
            const chartData = stored?.history ?? [];
            return {
                title: label.name,
                value: stored?.value ?? '—',
                unit: getUnitForLabel(label.vital_label),
                status: stored?.status ?? 'No Data',
                chartData,
            };
        });
    }, [vitalLabels, vitalValues]);

    return (
        <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
            <div className="tracking-tight border-b-2 border-[#707070]/40 pb-4">
                <h1 className="text-2xl sm:text-4xl font-bold text-brand-red">Health Vitals</h1>
                <p className="text-xs sm:text-sm text-[#554240] mt-1">Monitoring the health of our loved ones with care</p>
            </div>
            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center sm:justify-items-stretch">
                {vitalsToRender.length > 0 ? (
                    vitalsToRender.map((item) => (
                        <PatientVitalsCard
                            key={item.title}
                            title={item.title}
                            value={String(item.value)}
                            unit={item.unit}
                            status={item.status}
                            chartData={item.chartData}
                        />
                    ))
                ) : (
                    <div className="col-span-full rounded-3xl bg-white/70 p-8 text-center text-[#554240]">
                        Loading vitals or no data available.
                    </div>
                )}
            </div>
        </main>
    );
};

export default PatientDashboardPage;