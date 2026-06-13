import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col items-center '>
                <Navbar />
                <div className='flex flex-col items-center justify-between'>
                    <h1 className='text-2xl font-extrabold'>About</h1>
                    <p>I am About Page</p>
                </div>
                <Footer />
            </div>
  )
}
