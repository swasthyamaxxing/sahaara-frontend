import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

type UserRole = 'caretaker' | 'patient'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setAccessToken = (token: string, role?: UserRole): void => {
  try {
    setCookie('access_token', token, {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    if (role) {
      setCookie('user_role', role, {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    console.log('Access token set');
  } catch (error) {
    console.error('Error setting access token:', error);
  }
};

export const clearAccessToken = (): void => {
  try {
    deleteCookie('access_token', {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    deleteCookie('user_role', {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    console.log('Access token cleared');
  } catch (error) {
    console.error('Error clearing access token:', error);
  }
};

export const getAccessToken = (): string | null => {
  try {
    return getCookie('access_token') as string || null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const hasAccessToken = (): boolean => {
  try {
    const token = getCookie('access_token');
    return !!token;
  } catch (error) {
    console.error('Error checking access token:', error);
    return false;
  }
};