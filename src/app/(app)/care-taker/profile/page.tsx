'use client';

import { useEffect, useState } from 'react';
import { getProfile } from '@/services/api/patientsGet.api';
import ProfileCard from '@/components/profile/ProfileCard';
import { Loader2 } from 'lucide-react';

const CareTakerProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const data = response?.data || response;
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <main className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] rounded-3xl sm:rounded-4xl bg-[#D7C6A8] border p-4 sm:p-6 lg:p-9 my-4 shadow-xl">
      <div className="tracking-tight border-b-2 border-[#707070]/40 pb-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-brand-red">My Profile</h1>
        <p className="text-xs sm:text-sm text-[#554240] mt-1">Manage your personal information and account details</p>
      </div>

      <div className="mt-6 sm:mt-8 flex justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#554240] gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-brand-red" />
            <p className="font-medium">Loading your profile...</p>
          </div>
        ) : error ? (
          <div className="col-span-full rounded-3xl bg-red-50 p-8 text-center text-red-600 border-2 border-red-100">
            <p className="font-medium">{error}</p>
          </div>
        ) : profile ? (
          <div className="w-full max-w-2xl">
            <ProfileCard user={profile} />
          </div>
        ) : (
          <div className="col-span-full rounded-3xl bg-white/70 p-8 text-center text-[#554240]">
            No profile data available.
          </div>
        )}
      </div>
    </main>
  );
};

export default CareTakerProfilePage;
