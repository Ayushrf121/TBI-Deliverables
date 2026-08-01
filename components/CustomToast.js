import React from 'react'

export default function CustomToast() {
    return (
        <div className={`fixed bottom-5 right-5 z-50 max-w-sm flex items-center gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-slide-in `}>
            <div className={`w-2 h-2 rounded-full`} />
            <p className="text-sm font-medium flex-1">User Message</p>
        </div>
    )
}
