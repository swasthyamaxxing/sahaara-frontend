import axiosInstance from '../axiosInstance';

type AuthUser = {
    id: number;
    email: string;
    email_verified_at: string | null;
    role: string;
    age: string;
    gender: string;
    created_at: string;
    updated_at: string;
    fullName: string;
};

type AuthApiResponse = {
    status: boolean;
    message: string;
    access_token: string;
    token_type: string;
    user: AuthUser;
};

const normalizeAuthResponse = (payload: AuthApiResponse) => ({
    ...payload,
    accessToken: payload.access_token,
    tokenType: payload.token_type,
    user: payload.user,
    role: payload.user?.role,
});

export const loginApi = async (email: string, password: string) => {
    const res = await axiosInstance.post('/login', { email, password });
    return normalizeAuthResponse(res.data as AuthApiResponse);
};

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
    });

    return normalizeAuthResponse(res.data as AuthApiResponse);
};