'use client'

import { CARE_TAKER_NAVBAR_CONSTANTS } from '@/constants/Navbar.constants';
import { Bell, Search } from 'lucide-react';
import Link from 'next/link';

const ACTIVE_CLASS = "border-b border-[#D7C6A8] pb-2"

const CareTakerNavbar = () => {
    return (
        <div className="flex h-16 w-full items-center rounded-full m-4 justify-between bg-brand-red px-10 text-white max-w-7xl mx-auto">
            <h2 className="font-bold text-[#D7C6A8] text-4xl leading-8">Sahaara</h2>
            <div className="flex gap-9 items-center justify-center">
                {
                    CARE_TAKER_NAVBAR_CONSTANTS.map((item)=>(
                        <Link className=" text-[#D7C6A8] text-xl" key={item.id} href={item.href}>
                            {item.title}
                        </Link>
                    ))
                }
            </div>
            <input 
                className="w-61 h-11 rounded-full bg-[#FFFFFF1A] border-[#FFFFFF33] border outline-none px-8 py-2"
                placeholder="Search Patients..."
            />
            <Search stroke="#FFFCFC" width={25} height={25} />
            <Bell width={25} height={25} />
            <div className="w-11 h-11 rounded-full bg-[#FFFCFC]" />
        </div>
    )
}

export default CareTakerNavbar;