'use client';

import Image from 'next/image'
import dhaka from '@/assets/dhaka.png'
import landingBg from '@/assets/landing_hero.png'
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import tree from '@/assets/tree_no_bg.png'

export default function Home() {
  return (
    <>
      <main className="bg-[#e1d4be]">
        <section className="flex items-center justify-between">
          <div className="w-full h-screen flex flex-col justify-between p-8">
            <h3 className="text-6xl font-bold text-brand-red">Sahaara</h3>
            <div>
              <span className="border border-brand-red text-brand-red py-2 px-4 rounded-full text-xl hover:cursor-pointer hover:bg-brand-red-hover">
                Geriatric Care
              </span>
              <h1 className="text-4xl font-bold text-brand-red mt-4">
                THE HANDS THAT RAISED US <br /> DESERVE HANDS THAT CARE.
              </h1>
              <p className="text-2xl text-[#a08c74] mt-4">
                Aging is inevitable. Navigating it alone shouldn&apos;t be. Sahara helps families manage medications, appointments, and health records—so care feels less overwhelming and more human.
              </p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <div className="inline-flex flex-col gap-4 items-start">
                <div className="flex items-center gap-4 w-max">
                  <button className="bg-brand-red flex gap-2 items-center justify-center text-[#e1d4be] py-2 px-4 rounded-full text-xl hover:cursor-pointer hover:bg-brand-red-hover">
                    Get Started
                    <ArrowRight className="text-[#e1d4be]" size={20} />
                  </button>
                  <button className="border border-brand-red text-brand-red py-2 px-4 rounded-full text-xl hover:cursor-pointer hover:bg-brand-red-hover">
                    Learn More
                  </button>
                </div>
                <div className="flex flex-col items-center self-center">
                  <ArrowDown className="text-brand-red" size={32} />
                  <p className="text-center text-[#a08c74]">Scroll Down For More</p>
                </div>
              </div>
            </div>
          </div>
          <Image
            src={dhaka}
            alt="Dhaka"
            width={147}
            height={800}
            loading="eager"
          />
          <div className="w-full h-screen relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${landingBg.src})` }}
            />
            <div className="absolute inset-0 bg-[#e1d4be] opacity-60 mix-blend-multiply" />
            <div className="absolute top-4 right-4 flex items-center justify-center p-8 gap-6 z-10">
              {["Home", "Login"].map((item, idx) => (
                <Link
                  key={idx}
                  href={item == "Home" ? "/" : "/login"}
                  className="text-xl text-brand-red"
                >
                  {item}
                </Link>
              ))}
              <button className="border border-brand-red text-brand-red py-2 px-4 rounded-full text-xl hover:cursor-pointer hover:bg-brand-red-hover">
                Contact Us
              </button>
            </div>
          </div>
        </section>
        <section className="w-full h-screen relative flex flex-col gap-9 items-center justify-center">
          <Image
            src={tree}
            alt="Tree"
            width={530}
            height={530}
            className="absolute -top-23 -left-40 z-10"
            loading="eager"
          />
          <h2 className="text-3xl font-bold text-center text-[#60181e] uppercase z-20">
            It began with empathy
          </h2>
          <div className="flex flex-col items-center gap-25">
            {/* Top Card */}
            <div className="bg-white w-75 h-50"></div>

            {/* Bottom Two Cards */}
            <div className="flex gap-50">
              <div className="bg-white rotate-[-10deg] w-75 h-50"></div>
              <div className="bg-white rotate-10 w-75 h-50"></div>
            </div>
          </div>
          <Image
            src={tree}
            alt="Tree"
            width={530}
            height={530}
            className="absolute -bottom-23 -right-40 z-10 rotate-180"
            loading="eager"
          />
        </section>
      </main>
    </>
  );
}
