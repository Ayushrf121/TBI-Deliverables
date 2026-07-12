import React from 'react'

export default function CustomLoader() {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-blue-400 tracking-wider uppercase animate-pulse">Syncing with Cluster...</p>
        </div>
    )
}