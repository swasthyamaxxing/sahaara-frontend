'use client'

import { useState } from 'react';
import { PATIENT_NAVBAR_CONSTANTS } from '@/constants/Navbar.constants';
import { Home, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';

const PatientNavbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-3 sm:my-4">
            <div className="flex h-16 w-full items-center justify-between rounded-3xl md:rounded-full bg-brand-red px-5 sm:px-8 text-white shadow-md">
                <Link href="/patient/dashboard" className="flex items-center gap-2 font-bold text-[#D7C6A8] text-xl sm:text-2xl hover:text-white transition-colors">
                    <Home className="w-6 h-6 sm:w-7 sm:h-7" />
                    <span>Sahaara</span>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-4 lg:gap-8 border border-white/40 rounded-full px-6 py-1.5 bg-white/5">
                    {PATIENT_NAVBAR_CONSTANTS.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="px-3 py-1 text-sm lg:text-base font-medium rounded-full hover:bg-white/10 transition-colors text-[#D7C6A8] hover:text-white"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <button type="button" aria-label="Search" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFCFC]" />
                    </button>
                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-full hover:bg-white/10 md:hidden focus:outline-none"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6 text-[#D7C6A8]" /> : <Menu className="w-6 h-6 text-[#D7C6A8]" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-2 rounded-2xl bg-brand-red p-4 shadow-xl border border-white/10 flex flex-col gap-2 text-white">
                    <nav className="flex flex-col gap-1">
                        {PATIENT_NAVBAR_CONSTANTS.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-2.5 text-[#D7C6A8] hover:text-white hover:bg-white/10 rounded-lg text-base transition-colors"
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

export default PatientNavbar;