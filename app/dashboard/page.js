"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Modal, Toast, Loader } from '@/components/ui';

export default function Page() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [textVal, setTextVal] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  // Prevent view flashing before redirect completes
  if (isCheckingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <Loader size="medium" />
        <p className="text-xs font-medium text-gray-400 mt-2">Checking Credentials...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors w-full'>
      <div className='flex flex-col items-center justify-between p-8 space-y-8 w-full max-w-2xl flex-1'>
        <div className='text-center'>
          <h1 className='text-3xl font-extrabold mb-2'>Dashboard</h1>
        </div>

        <div className="w-full border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6 bg-gray-50 dark:bg-gray-950 shadow-sm">
          <h2 className="text-lg font-bold border-b pb-2 dark:border-gray-800">UI Component Verification</h2>
          
          <Input 
            label="Library Input Demo Field"
            placeholder="Type context messages here..."
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
          />

          <div className="flex flex-wrap gap-2 pt-2">
            <Button 
              text="Open Modal Window" 
              variant="primary" 
              onClick={() => setIsModalOpen(true)} 
            />
            <Button 
              text="Trigger Toast Overlay" 
              variant="secondary" 
              onClick={() => setShowToast(true)} 
            />
          </div>

          <div className="flex flex-col items-center justify-center pt-4 border-t dark:border-gray-800">
            <span className="text-xs font-semibold text-gray-400 mb-2">Spinner State Element:</span>
            <Loader size="medium" />
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Live Modal Demonstration"
      >
        <p className="text-sm">
          Modal rendering successfully context verification active. Captured state: 
          <span className="block font-bold mt-2 text-blue-600">"{textVal || 'Field Empty'}"</span>
        </p>
      </Modal>

      {showToast && (
        <Toast 
          message="Success! Element verified." 
          type="success" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}