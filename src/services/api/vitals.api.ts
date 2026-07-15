import axiosInstance from '../axiosInstance'

interface VitalsPayload {
    patient_id: number
    user_id: number
    date: string
    vitals: { label: string; value: number | string }[]
}

export interface VitalLabel {
    id: number
    name: string
    vital_label: string
    deleted_at: string | null
    created_at: string
    updated_at: string
}

interface VitalsLabelsResponse {
    status: boolean
    data: VitalLabel[]
}

export const postVitals = async (payload: VitalsPayload) => {
    const res = await axiosInstance.post('/vitals/store', payload)
    return res.data
}

export const getVitalsLables = async (): Promise<VitalsLabelsResponse> => {
    const res = await axiosInstance.get('/vitals/labels')
    return res.data
}