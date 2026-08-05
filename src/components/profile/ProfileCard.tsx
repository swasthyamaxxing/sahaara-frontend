'use client';

import React from 'react';
import { User, Mail, Calendar, VenusAndMars, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfile {
  fullName: string;
  email: string;
  age: number;
  gender: string;
  role: string;
}

interface ProfileCardProps {
  user: UserProfile;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="group relative p-6 sm:p-10 rounded-3xl sm:rounded-[48px] border border-white/50 bg-[#FFFFFF59] shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-24 h-24 rounded-full bg-brand-red flex items-center justify-center text-white text-3xl font-bold shadow-inner">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-red">{user.fullName}</h2>
            <p className="text-[#707070] text-sm font-medium uppercase tracking-widest">{user.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/30 border border-white/20 transition-colors group-hover:bg-white/50">
            <div className="p-2 rounded-xl bg-brand-red/10 text-brand-red">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider">Email Address</span>
              <span className="text-[#554240] font-medium">{user.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/30 border border-white/20 transition-colors group-hover:bg-white/50">
            <div className="p-2 rounded-xl bg-brand-red/10 text-brand-red">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider">Age</span>
              <span className="text-[#554240] font-medium">{user.age} years</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/30 border border-white/20 transition-colors group-hover:bg-white/50">
            <div className="p-2 rounded-xl bg-brand-red/10 text-brand-red">
              <VenusAndMars className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider">Gender</span>
              <span className="text-[#554240] font-medium capitalize">{user.gender}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/30 border border-white/20 transition-colors group-hover:bg-white/50">
            <div className="p-2 rounded-xl bg-brand-red/10 text-brand-red">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#707070] uppercase tracking-wider">User Role</span>
              <span className="text-[#554240] font-medium capitalize">{user.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
