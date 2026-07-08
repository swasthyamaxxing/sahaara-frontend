'use client'

import { useState } from 'react'
import Image from 'next/image'
import bg from '@/assets/bgImages/oldPeople.svg'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#4285F4"
      d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.87 2.7-6.62Z"
    />
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z"
    />
    <path
      fill="#FBBC05"
      d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33Z"
    />
    <path
      fill="#EA4335"
      d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
    />
  </svg>
)

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', form.email, form.password)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#c9b998] px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      <div className="grid max-w-7xl h-[86vh] w-full grid-cols-1 gap-8 rounded-[48px] border-2 border-white/80 bg-[#e9dfc9] p-8 lg:grid-cols-[1.15fr_0.85fr]">
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
          <div className="w-full max-w-sm rounded-[32px] bg-[#FFFFFF66]/40 p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-brand-red">Login</h2>

            <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => {
              e.preventDefault();
              handleLogin()
            }}>
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

              <Link href="#" className="self-end hover:cursor-pointer text-sm font-medium text-[#8a2432] hover:underline">
                Forgot Password?
              </Link>

              <button
                type="submit"
                className="mt-1 w-full hover:cursor-pointer rounded-full bg-brand-red py-3 text-sm font-semibold text-white transition shadow-lg active:scale-95"
              >
                Sign In
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
              <GoogleIcon />
              Sign in with Google
            </button>

            <p className="mt-6 text-center text-sm text-[#3a2f28]">
              Don&apos;t have an account yet?{' '}
              <Link href="#" className="font-medium text-brand-red hover:underline">
                Register for free
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login