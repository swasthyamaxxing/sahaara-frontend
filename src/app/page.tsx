'use client';

import Image from 'next/image'
import dhaka from '@/assets/dhaka.png'
import landingBg from '@/assets/landing_hero.png'
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import tree from '@/assets/tree_no_bg.png'
import first from '@/assets/first.png'
import second from '@/assets/second.png'
import third from '@/assets/third.png'

export default function Home() {
  return (
    <>
      <main className="bg-[#e1d4be] overflow-x-hidden">
        <section className="flex flex-col lg:flex-row items-center justify-between overflow-hidden">
          <div className="flex-1 min-w-0 h-screen flex flex-col justify-between p-8">
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
            width={0}
            height={0}
            sizes="100vw"
            className="hidden xl:block h-screen w-auto object-cover"
            loading="eager"
          />
          <div className="flex-1 min-w-0 h-screen relative overflow-hidden">
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
        <section className="w-full min-h-screen relative flex flex-col gap-16 items-center justify-center overflow-hidden py-16">
          <Image
            src={tree}
            alt="Tree"
            width={530}
            height={530}
            className="absolute -top-24 -left-40 z-10"
            loading="eager"
          />
          <h2 className="text-3xl font-bold text-center text-[#60181e] uppercase z-20">
            It began with empathy
          </h2>

          <div className="flex items-center justify-center gap-6 z-20">
            {/* Left card */}
            <div className="flex flex-col items-center mt-16">
              <div className="bg-white p-3 pb-4 shadow-lg">
                <Image
                  src={first}
                  alt="First"
                  width={300}
                  height={220}
                  className="w-[280px] h-[200px] object-cover"
                  loading="eager"
                />
              </div>
              <p className="mt-3 text-center text-sm italic text-[#6b4a3a] max-w-[240px]">
                &quot;Keeping track of medicines has become harder than taking them.&quot;
              </p>
            </div>

            {/* Middle card */}
            <div className="flex flex-col items-center z-10">
              <div className="bg-white p-3 pb-4 shadow-lg">
                <Image
                  src={second}
                  alt="Second"
                  width={300}
                  height={220}
                  className="w-[280px] h-[200px] object-cover"
                  loading="eager"
                />
              </div>
              <p className="mt-3 text-center text-sm italic text-[#6b4a3a] max-w-[240px]">
                &quot;I worry everytime I forget something important.&quot;
              </p>
            </div>

            {/* Right card */}
            <div className="flex flex-col items-center mt-16">
              <div className="bg-white p-3 pb-4 shadow-lg">
                <Image
                  src={third}
                  alt="Third"
                  width={300}
                  height={220}
                  className="w-[280px] h-[200px] object-cover"
                  loading="eager"
                />
              </div>
              <p className="mt-3 text-center text-sm italic text-[#6b4a3a] max-w-[240px]">
                &quot;I miss having someone around to share the little moments with.&quot;
              </p>
            </div>
          </div>

          <Image
            src={tree}
            alt="Tree"
            width={530}
            height={530}
            className="absolute -bottom-24 -right-40 z-10 rotate-180"
            loading="eager"
          />
        </section>
      </main>
    </>
  );
}
