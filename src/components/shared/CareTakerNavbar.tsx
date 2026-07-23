'use client'

import { useState } from 'react';
import { CARE_TAKER_NAVBAR_CONSTANTS } from '@/constants/Navbar.constants';
import { Bell, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';

const CareTakerNavbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-3 sm:my-4">
            <div className="flex h-16 w-full items-center justify-between rounded-3xl md:rounded-full bg-brand-red px-5 sm:px-8 text-white shadow-md">
                <Link href="/care-taker/dashboard" className="font-bold text-[#D7C6A8] text-2xl sm:text-3xl lg:text-4xl leading-8 tracking-tight">
                    Sahaara
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex gap-6 lg:gap-9 items-center justify-center">
                    {CARE_TAKER_NAVBAR_CONSTANTS.map((item) => (
                        <Link className="text-[#D7C6A8] text-base lg:text-lg hover:text-white transition-colors" key={item.id} href={item.href}>
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Right items */}
                <div className="hidden md:flex items-center gap-3 lg:gap-4">
                    <div className="relative">
                        <input
                            className="w-48 lg:w-60 h-10 rounded-full bg-[#FFFFFF1A] border-[#FFFFFF33] border outline-none pl-4 pr-9 py-2 text-sm placeholder:text-white/70 text-white"
                            placeholder="Search Patients..."
                        />
                        <Search stroke="#FFFCFC" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <button type="button" aria-label="Notifications" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <Bell className="w-5 h-5 text-[#FFFCFC]" />
                    </button>
                    <div className="w-9 h-9 rounded-full bg-[#FFFCFC] flex-shrink-0" />
                </div>

                {/* Mobile Icons & Hamburger */}
                <div className="flex items-center gap-2 md:hidden">
                    <button type="button" aria-label="Notifications" className="p-2 rounded-full hover:bg-white/10">
                        <Bell className="w-5 h-5 text-[#FFFCFC]" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-full hover:bg-white/10 focus:outline-none"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6 text-[#D7C6A8]" /> : <Menu className="w-6 h-6 text-[#D7C6A8]" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-2 rounded-2xl bg-brand-red p-4 shadow-xl border border-white/10 flex flex-col gap-4 text-white">
                    <div className="relative w-full">
                        <input
                            className="w-full h-10 rounded-full bg-[#FFFFFF1A] border-[#FFFFFF33] border outline-none pl-4 pr-10 py-2 text-sm placeholder:text-white/70 text-white"
                            placeholder="Search Patients..."
                        />
                        <Search stroke="#FFFCFC" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <nav className="flex flex-col gap-2">
                        {CARE_TAKER_NAVBAR_CONSTANTS.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 text-[#D7C6A8] hover:text-white hover:bg-white/10 rounded-lg text-base transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default CareTakerNavbar;