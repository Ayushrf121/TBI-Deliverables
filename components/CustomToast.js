import React from 'react'

export default function CustomToast() {
    return (
        <div className={`fixed bottom-5 right-5 z-50 max-w-sm flex items-center gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-slide-in ${type === 'error'
                ? 'bg-red-950/80 border-red-800 text-red-200'
                : 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
            }`}>
            <div className={`w-2 h-2 rounded-full ${type === 'error' ? 'bg-red-400' : 'bg-emerald-400'}`} />
            <p className="text-sm font-medium flex-1">{message}</p>
            <button onClick={onClose} className="text-xs opacity-50 hover:opacity-100 font-bold px-1">✕</button>
        </div>
    )
}
