'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import api from '../../components/API';
import { GoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function Signup2() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const router = useRouter();

  const handleSubmitByGoogle = async ({ credential }) => {
    try {
      const res = await axios.post(api + 'googleAuth', { credential });
      if (res.data.success) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        router.push('/profile');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        console.log(error);
      }
    }
    reset();
  }

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(api + 'register', data);
      if (res.data.success) {
        alert(res.data.message);
        router.push('/login');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        console.log(error);
      }
    }
  }

  const inputClass =
    'w-full outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all';

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <div className="min-h-[calc(100vh-8rem)] w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors">
        <div className="w-full max-w-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg dark:shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Create your account</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Join to start building with the SIP program</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Username
              </label>
              <Input
                className={inputClass}
                type="text"
                placeholder="Your username"
                id="name"
                registerName="name"
                registerField={register}
                rules={{
                  required: { value: true, message: 'Name field required' },
                  minLength: { value: 3, message: 'Must be at least 3 characters' },
                  maxLength: { value: 30, message: 'Cannot be more than 30 characters' }
                }}
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Email
              </label>
              <Input
                className={inputClass}
                type="email"
                placeholder="you@example.com"
                id="email"
                registerName="email"
                registerField={register}
                rules={{ required: { value: true, message: 'Email field required' } }}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Password
              </label>
              <Input
                className={inputClass}
                type="password"
                placeholder="••••••••"
                id="password"
                registerName="password"
                registerField={register}
                rules={{
                  required: { value: true, message: 'Password required' },
                  minLength: { value: 8, message: 'Must be at least 8 characters' },
                  maxLength: { value: 20, message: 'Cannot be more than 20 characters' }
                }}
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-xl px-6 py-2.5 transition-all shadow-md"
              type="submit"
            >
              Sign up
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              or
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleSubmitByGoogle}
                text="signup_with"
                shape="pill"
                width={300}
                theme="filled_blue"
              />
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}