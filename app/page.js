import React from 'react'
import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';
export default function page() {
  return (
    <div>
        <Hero/>
        <Link className='fixed right-12 bottom-20' href='/ai'>
          <div className='flex flex-col justify-between animate-pulse'>
              <Image className='drop-shadow-md drop-shadow-gray-900' width={50} height={50} src='/chatbotImage.webp' alt='Chatbot' />
              <span className='text-blue-950 font-bold drop-shadow-md drop-shadow-gray-600'>Ask me !</span>
          </div>
        </Link>
    </div>
  )
}
