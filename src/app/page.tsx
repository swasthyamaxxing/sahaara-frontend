'use client';

import Image from 'next/image'
import dhaka from '@/assets/dhaka.png'
import landingBg from '@/assets/landing_hero.png'
import Link from 'next/link';
import tree from '@/assets/tree_no_bg.png'
import first from '@/assets/first.png'
import second from '@/assets/second.png'
import { useState } from 'react';
import third from '@/assets/third.png'
import background from '@/assets/b.png'
import { BookOpen, Users, NotebookPen, Lightbulb, Heart, Menu, Pill, CalendarCheck, Folder, Home as HomeIcon } from "lucide-react";
import dhakaBG from '@/assets/dhakaBG.png'
import hands from '@/assets/hands_nobg.png'
import logo from '@/assets/logos/app_logo_no_bg.jpg'

const journeySteps = [
  {
    label: "Research",
    icon: BookOpen,
    paragraph:
      "We started by listening — studying the everyday struggles families face while caring for aging parents.",
  },
  {
    label: "Real stories",
    icon: Users,
    paragraph:
      "We spoke to real caregivers and elders to understand what care actually feels like, not just what it looks like on paper.",
  },
  {
    label: "Solution Design",
    icon: NotebookPen,
    paragraph:
      "Every insight was translated into a thoughtful, human-centered design for how Sahaara should work.",
  },
  {
    label: "Innovation",
    icon: Lightbulb,
    paragraph:
      "We built features that make medication tracking, appointments, and health records simple instead of stressful.",
  },
  {
    label: "SAHARA",
    icon: Heart,
    paragraph:
      "The result: a platform built with empathy, for the people who raised us.",
  },
];

const features = [
  { icon: Pill, label: "Medication reminder" },
  { icon: CalendarCheck, label: "Appointment tracking" },
  { icon: Folder, label: "Health record in one place" },
  { icon: Heart, label: "Family collaboration" },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(journeySteps.length - 1);
  return (
    <>
      <main className="bg-[#ecdfc8] overflow-x-hidden">
        <section className="flex flex-col lg:flex-row items-center justify-between overflow-hidden">
          <div className="flex-1 min-w-0 h-screen flex flex-col gap-4 justify-between p-8">
            <Image
              src={logo}
              alt="App logo"
              width={150}
              height={150}
            />
            <div>
              <span className="border border-brand-red text-brand-red py-2 px-4 rounded-full text-xl hover:cursor-pointer hover:bg-brand-red-hover">
                Geriatric Care
              </span>
              <h1 className="text-4xl font-bold text-brand-red mt-4">
                THE HANDS THAT RAISED US <br /> DESERVE HANDS THAT CARE.
              </h1>
              <p className="text-2xl text-[#a08c74] mt-4 max-w-2xl leading-relaxed tracking-tight">
                Aging is inevitable. Navigating it alone shouldn&apos;t be. Sahara helps families manage medications, appointments, and health records—so care feels less overwhelming and more human.
              </p>
            </div>
            <div className="flex flex-col gap-4 pb-10 items-start">
              <div className="inline-flex flex-col gap-4 items-start">
                <div className="flex items-center gap-4 w-max">
                  <Link href={`/login`}>
                    <button className="bg-brand-red flex gap-2 items-center justify-center text-[#e1d4be] py-2 px-4 rounded-full text-xl hover:cursor-pointer hover:bg-brand-red-hover">
                      Get Started
                    </button>
                  </Link>
                  <Link href={`#about`}>
                    <button className="border border-brand-red text-brand-red py-2 px-4 rounded-full text-xl hover:cursor-pointer hover:bg-brand-red-hover">
                      Learn More
                    </button>
                  </Link>
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
              {["Home", "Contact Us"].map((item, idx) => (
                <Link
                  key={idx}
                  href={item == "Home" ? "/" : "/contact-us"}
                  className="text-xl text-brand-red"
                >
                  {item}
                </Link>
              ))}
              <Link href={`/login`}>
                <button className="border border-brand-red text-brand-red py-2 px-4 rounded-full text-xl hover:cursor-pointer hover:bg-brand-red-hover">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section aria-label="#about" className="w-full min-h-screen relative flex flex-col gap-16 items-center justify-center overflow-hidden py-16">
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
                  className="w-70 h-50 object-cover"
                  loading="eager"
                />
              </div>
              <p className="mt-3 text-center text-sm italic text-[#6b4a3a] max-w-60">
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
                  className="w-70 h-50 object-cover"
                  loading="eager"
                />
              </div>
              <p className="mt-3 text-center text-sm italic text-[#6b4a3a] max-w-60">
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
                  className="w-70 h-50 object-cover"
                  loading="eager"
                />
              </div>
              <p className="mt-3 text-center text-sm italic text-[#6b4a3a] max-w-60">
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
        <section className="w-full min-h-105 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${background.src})` }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center gap-12 py-16 px-6">
            <h2 className="text-2xl font-bold tracking-widest text-[#60181e] uppercase">
              Our Journey
            </h2>

            <div className="flex items-start justify-center gap-4 md:gap-10 w-full max-w-4xl">
              {journeySteps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx === activeIndex;

                return (
                  <div key={step.label} className="flex items-center flex-1">
                    <button
                      onClick={() => setActiveIndex(idx)}
                      className="flex flex-col items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${isActive
                          ? "bg-[#60181e]"
                          : "bg-[#a08c74] group-hover:bg-[#8f7b64]"
                          }`}
                      >
                        <Icon
                          className={isActive ? "text-white" : "text-[#f3e9d8]"}
                          size={34}
                        />
                      </div>
                      <span
                        className={`text-base md:text-lg whitespace-nowrap font-bold ${isActive
                          ? "text-[#60181e]"
                          : "text-[#8a5a3c]"
                          }`}
                      >
                        {step.label}
                      </span>
                    </button>

                    {idx < journeySteps.length - 1 && (
                      <div className="flex-1 h-px border-t border-dashed border-[#8a5a3c] mx-2 self-center" />
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-center text-[#6b4a3a] max-w-xl text-xl font-bold">
              {journeySteps[activeIndex].paragraph}
            </p>
          </div>
        </section>
        <section className="w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">
          {/* Left - Dhaka background + phone mockup */}
          <div className="relative flex-1 min-h-[500px] lg:min-h-screen flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${dhakaBG.src})` }}
            />
            <div className="relative z-10 w-[260px] h-[560px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-[#e1d4be] rounded-[2rem] overflow-hidden flex flex-col">
                <div className="bg-[#60181e] text-[#e1d4be] flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2 font-bold">
                    <HomeIcon />
                    Sahaara
                  </div>
                  <Menu size={18} />
                </div>
                <div className="flex-1 p-4 flex flex-col gap-3">
                  <div>
                    <h3 className="font-bold text-[#60181e] text-sm">
                      My Appointments
                    </h3>
                    <p className="text-[10px] text-[#8a5a3c]">
                      Manage your healthcare visits and schedules
                    </p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 flex-1">
                    <p className="text-[10px] font-bold text-[#60181e] mb-2">
                      Upcoming Appointments
                    </p>
                    <div className="bg-white rounded-md p-3 flex flex-col gap-1 text-[10px] text-[#4a3527]">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Sun, August 9, 2026</span>
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[8px]">
                          UPCOMING
                        </span>
                      </div>
                      <span>05:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - text + hands image (hands now breaks out to screen edge) */}
          <div className="relative flex-1 min-h-[500px] lg:min-h-screen bg-[#e1d4be] overflow-hidden">
            {/* Hands: absolutely positioned against the section, ignores column padding */}
            <div className="absolute right-0 bottom-0 top-0 w-[55%] lg:w-[60%] z-0">
              <Image
                src={hands}
                alt="Hands"
                fill
                className="object-contain object-right-bottom"
                loading="eager"
              />
            </div>

            {/* Text content sits above the hands, still padded normally */}
            <div className="relative z-10 my-4 flex flex-col justify-between h-full px-8 py-12 lg:px-16">
              <h2 className="text-4xl font-bold text-[#60181e] uppercase tracking-wide">
                What we built
              </h2>

              <div className="flex-1 flex flex-col justify-center gap-6 max-w-md">
                <p className="text-xl font-bold text-[#60181e] leading-snug">
                  SAHARA is a one stop platform for all your geriatric care needs.
                </p>
                <ul className="flex flex-col gap-4">
                  {features.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 text-[#60181e] font-semibold"
                    >
                      <Icon size={20} className="text-[#60181e] shrink-0" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex">
                <Link href={`/register`}>
                  <button className="bg-[#60181e] hover:cursor-pointer text-[#e1d4be] font-bold tracking-wider py-4 px-8 rounded-full hover:bg-[#4a1218] transition-colors">
                    JOIN SAHARA
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
