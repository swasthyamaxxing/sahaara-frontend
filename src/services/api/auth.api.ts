import axiosInstance from '../axiosInstance';

export const loginApi = async (email: string, password: string) => {
    const res = await axiosInstance.post('/login', { email, password });
    return res.data;
}

export const signupApi = async (
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    gender: string,
    age: string,
    role: string
) => {
    const res = await axiosInstance.post('/signup', {
        email,
        password,
        confirmPassword,
        fullName,
        gender,
        age,
        role
    })
    return res.data;
}