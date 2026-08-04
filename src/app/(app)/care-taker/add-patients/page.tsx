'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import bg from '@/assets/bgImages/oldPeople.svg'

const AddPatients = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'link'>('add')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    gender: '',
    age: '',
    password: '',
    existingId: '',
  })

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    if (activeTab === 'add') {
      console.log('Add patient', form)
    } else {
      console.log('Link existing patient', form.existingId)
    }
    setTimeout(() => setIsLoading(false), 400)
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
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
                background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0) 100%)',
              }}
            >
              <h2 className="text-4xl italic leading-10 text-white">Caring for those who once cared for us</h2>
              <p className="mt-2 pb-3 text-sm text-white/90">
                Manage health records, medications, and appointments for your loved ones all in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-sm rounded-[32px] bg-[#FFFFFF66]/40 p-10 shadow-xl max-h-[76vh] overflow-hidden">
            <div className="flex items-center gap-2 rounded-full bg-[#F4E7D3] p-1 shadow-sm mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('add')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === 'add'
                    ? 'bg-brand-red text-[#D7C6A8] shadow-lg'
                    : 'text-[#62513e] hover:bg-white/80'
                }`}
              >
                Add New Patient
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('link')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === 'link'
                    ? 'bg-brand-red text-[#D7C6A8] shadow-lg'
                    : 'text-[#62513e] hover:bg-white/80'
                }`}
              >
                Link Existing Patient
              </button>
            </div>

            <div className="h-full overflow-hidden">
              <form className="mt-2 flex h-full flex-col gap-4 overflow-y-auto scrollbar" onSubmit={handleSubmit}>
              {activeTab === 'add' ? (
                <>
                  <h2 className="text-3xl font-bold text-brand-red">Add Patient</h2>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-sm font-medium text-[#3a2f28]">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      value={form.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Abisha Aryal"
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
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="username@gmail.com"
                      className="w-full rounded-lg border border-[#d8ccb0] bg-[#efe6d2] px-4 py-2.5 text-sm text-[#3a2f28] placeholder:text-[#9a8f78] outline-none focus:border-brand-red"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="gender" className="text-sm font-medium text-[#3a2f28]">
                        Gender
                      </label>
                      <select
                        id="gender"
                        value={form.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="h-11 w-full rounded-lg border border-[#d8ccb0] bg-[#efe6d2] px-4 text-sm text-[#3a2f28] outline-none focus:border-brand-red"
                      >
                        <option value="">Select</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="age" className="text-sm font-medium text-[#3a2f28]">
                        Age
                      </label>
                      <input
                        id="age"
                        type="number"
                        value={form.age}
                        onChange={(e) => handleChange('age', e.target.value)}
                        placeholder="70"
                        className="h-11 w-full rounded-lg border border-[#d8ccb0] bg-[#efe6d2] px-4 text-sm text-[#3a2f28] outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className="text-sm font-medium text-[#3a2f28]">
                      Set Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder="••••••••"
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

                  <p className="text-xs text-[#7a6757]">Caretakers can set an initial password for patients.</p>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-1 w-full rounded-full bg-brand-red py-3 text-sm font-semibold text-white transition shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-[#a94b54]"
                  >
                    {isLoading ? 'Saving...' : 'Add Patient'}
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-brand-red">Link Existing Patient</h2>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="existingId" className="text-sm font-medium text-[#3a2f28]">
                      Patient ID or Email
                    </label>
                    <input
                      id="existingId"
                      value={form.existingId}
                      onChange={(e) => handleChange('existingId', e.target.value)}
                      placeholder="Enter linked patient ID or email"
                      className="w-full rounded-lg border border-[#d8ccb0] bg-[#efe6d2] px-4 py-2.5 text-sm text-[#3a2f28] placeholder:text-[#9a8f78] outline-none focus:border-brand-red"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-1 w-full rounded-full bg-brand-red py-3 text-sm font-semibold text-white transition shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-[#a94b54]"
                  >
                    {isLoading ? 'Saving...' : 'Link Patient'}
                  </button>
                </>
              )}

              <p className="mt-6 text-center text-sm text-[#3a2f28]">
                Need help?{' '}
                <Link href="/care-taker/dashboard" className="font-medium text-brand-red hover:underline">
                  Return to dashboard
                </Link>
              </p>
            </form>
          </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AddPatients;