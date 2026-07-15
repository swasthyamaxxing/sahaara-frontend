'use client'

import { CARE_TAKER_NAVBAR_CONSTANTS } from '@/constants/Navbar.constants';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';

const CareTakerNavbar = () => {
    return (
        <div className="flex h-16 w-full items-center rounded-full m-4 justify-between bg-brand-red px-10 text-white max-w-7xl mx-auto">
            <Home className="inline-block mr-2" size={30} />
            <div className="flex items-center gap-8 border border-white/50 rounded-full px-8 py-1">
                {
                    CARE_TAKER_NAVBAR_CONSTANTS.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="flex items-center gap-2 rounded-full p-2 hover:bg-brand-light-red transition-colors"
                        >
                            {item.title}
                        </Link>
                    ))
                }
            </div>
            <Search className="inline-block mr-2" size={30} />
        </div>
    )
}

export default CareTakerNavbar;