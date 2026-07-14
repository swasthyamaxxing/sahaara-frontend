'use client'

import { useState } from 'react'
import Image from 'next/image'
import bg from '@/assets/bgImages/oldPeople.svg'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link';
import GoogleIcon from '@/assets/logos/GoogleIcon.svg';
import { signupApi } from '@/services/api/auth.api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { setAccessToken } from '@/lib/utils';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    gender: '',
    age: '',
    role: "caretaker"
  })
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await signupApi(
        form.email,
        form.password,
        form.confirmPassword,
        form.fullName,
        form.gender,
        form.age,
        form.role
      );
      const role = res.role as 'caretaker' | 'patient' | undefined;

      toast.success(res.message || 'Registration successful!');
      setAccessToken(res.accessToken, role);

      if (role === 'caretaker') {
        router.push('/care-taker/dashboard');
      } else {
        router.push('/patient/dashboard');
      }

      console.log('Registering with:', res);
    } catch (error: Error | any) { //eslint-disable-line
      toast.error('Error during registration: ' + (error.message || error));
      console.error('Error during registration:', error.message || error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#c9b998] px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      <div className="grid max-w-7xl min-h-[86vh] w-full grid-cols-1 gap-8 rounded-[48px] border-2 border-white/80 bg-[#e9dfc9] p-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative flex flex-col overflow-hidden">
          <h1 className="text-4xl font-bold text-brand-red">सहारा</h1>

          <div className="relative mt-4 flex flex-1 items-center justify-center">
            <Image
              src={bg}
              alt="Illustration of an elderly family being cared for"
              fill
              className="object-contain"
              priority
            />

            <div
              className="absolute bottom-5 right-8 max-w-md rounded-3xl px-6 py-1 backdrop-blur-sm"
              style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0) 100%)'
              }}
            >
              <h2 className="text-4xl italic leading-10 text-white">
                Caring for those who once cared for us
              </h2>
              <p className="mt-2 pb-3 text-sm text-white/90">
                Manage health records, medications, and appointments for your loved ones all in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-sm rounded-[32px] scrollbar bg-[#FFFFFF66]/40 p-10 shadow-xl max-h-[76vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-brand-red">Register</h2>

            <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => {
              e.preventDefault();
              handleRegister()
            }}>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-sm font-medium text-[#3a2f28]">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Your full name"
                  required
                  className="w-full rounded-lg border border-[#d8ccb0] bg-[#efe6d2] px-4 py-2.5 text-sm text-[#3a2f28] placeholder:text-[#9a8f78] outline-none focus:border-brand-red"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-[#3a2f28]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="username@gmail.com"
                  required
                  className="w-full rounded-lg border border-[#d8ccb0] bg-[#efe6d2] px-4 py-2.5 text-sm text-[#3a2f28] placeholder:text-[#9a8f78] outline-none focus:border-brand-red"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-[#3a2f28]">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    className="w-full rounded-lg border border-[#d8ccb0] bg-[#efe6d2] px-4 py-2.5 pr-10 text-sm text-[#3a2f28] placeholder:text-[#9a8f78] outline-none focus:border-brand-red"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a8f78]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-[#3a2f28]">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                    className="w-full rounded-lg border border-[#d8ccb0] bg-[#efe6d2] px-4 py-2.5 pr-10 text-sm text-[#3a2f28] placeholder:text-[#9a8f78] outline-none focus:border-brand-red"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a8f78]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="age" className="text-sm font-medium text-[#3a2f28]">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  min="1"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  placeholder="Enter your age"
                  required
                  className="w-full rounded-lg border border-[#d8ccb0] bg-[#efe6d2] px-4 py-2.5 text-sm text-[#3a2f28] placeholder:text-[#9a8f78] outline-none focus:border-brand-red"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="gender" className="text-sm font-medium text-[#3a2f28]">
                  Gender
                </label>
                <select
                  id="gender"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  required
                  className="w-full rounded-lg border border-[#d8ccb0] bg-[#efe6d2] px-3 py-2 text-sm text-[#3a2f28] outline-none focus:border-brand-red"
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_say">Prefer not to say</option>
                </select>
              </div>

              <Link href="#" className="self-end hover:cursor-pointer text-sm font-medium text-[#8a2432] hover:underline">
                Forgot Password?
              </Link>

              <button
                type="submit"
                className="mt-1 w-full hover:cursor-pointer rounded-full bg-brand-red py-3 text-sm font-semibold text-white transition shadow-lg active:scale-95"
              >
                Sign Up
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#d8ccb0]" />
              <span className="text-xs text-[#8a7f68]">Or Continue With</span>
              <div className="h-px flex-1 bg-[#d8ccb0]" />
            </div>

            <button
              type="button"
              className="flex w-full hover:cursor-pointer items-center justify-center gap-2 rounded-full border border-[#d8ccb0] bg-white py-3 text-sm font-medium text-[#3a2f28] transition hover:bg-[#f5f0e4]"
            >
              <Image
                src={GoogleIcon}
                alt="Google Icon"
                width={20}
                height={20}
              />
              Sign up with Google
            </button>

            <p className="mt-6 text-center text-sm text-[#3a2f28]">
              Don&apos;t have an account yet?{' '}
              <Link href="/login" className="font-medium text-brand-red hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Register