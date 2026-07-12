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

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <div className='flex flex-col items-center justify-center m-4 p-4 gap-4'>
                <h1 className='text-4xl font-bold text-blue-950'>Signup</h1>
                
                <form className='flex flex-col p-6 bg-mauve-200 border-2 gap-6' onSubmit={handleSubmit(onSubmit)}>
                    
                    {/* Username Input Field */}
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-3 items-center'>
                            <label htmlFor="name">Username: </label>
                            <Input 
                                className='outline-none bg-gray-200 rounded-2xl p-2 shadow-md shadow-black' 
                                type="text" 
                                placeholder='Username' 
                                id='name' 
                                registerName='name' 
                                registerField={register} 
                                rules={{
                                    required: { value: true, message: 'Name field required' }, 
                                    minLength: { value: 3, message: 'Must be at least 3 characters' }, 
                                    maxLength: { value: 30, message: "Can't be more than 30 characters" }
                                }} 
                            />
                        </div>
                        {errors.name && <span className="text-xs text-red-500 font-semibold pl-20">{errors.name.message}</span>}
                    </div>

                    {/* Email Input Field */}
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-3 items-center'>
                            <label htmlFor="email">Email: </label> {/* ✅ Fix: Corrected htmlFor */}
                            <Input 
                                className='outline-none bg-gray-200 rounded-2xl p-2 shadow-md shadow-black' 
                                type="email" 
                                placeholder='Email' 
                                id='email' 
                                registerName='email' 
                                registerField={register} 
                                rules={{ required: { value: true, message: 'Email field required' } }} 
                            />
                        </div>
                        {errors.email && <span className="text-xs text-red-500 font-semibold pl-20">{errors.email.message}</span>}
                    </div>

                    {/* Password Input Field */}
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-3 items-center'>
                            <label htmlFor="password">Password: </label> {/* ✅ Fix: Corrected htmlFor */}
                            <Input 
                                className='outline-none bg-gray-200 rounded-2xl p-2 shadow-md shadow-black' 
                                type="password" 
                                placeholder='Password' 
                                id='password' 
                                registerName='password' 
                                registerField={register} 
                                rules={{
                                    required: { value: true, message: 'Password required' }, 
                                    minLength: { value: 8, message: 'Must be at least 8 characters' }, 
                                    maxLength: { value: 20, message: "Can't be more than 20 characters" }
                                }} 
                            />
                        </div>
                        {errors.password && <span className="text-xs text-red-500 font-semibold pl-20">{errors.password.message}</span>}
                    </div>

                    <GoogleLogin
                        onSuccess={handleSubmitByGoogle}
                        text='signup_with'
                        shape='pill'
                        width={300}
                        theme='filled_blue'
                    />

                    <p>Already have an account? <Link href="/login" className='text-blue-600 underline'>Login</Link></p>
                    
                    <button className='border-2 border-blue-500 font-bold text-white rounded-2xl px-7 py-3 bg-blue-400 active:bg-blue-500 shadow-2xs shadow-gray-500' type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        </GoogleOAuthProvider>
    )
}