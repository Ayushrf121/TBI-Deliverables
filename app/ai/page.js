'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Input from '@/components/Input';

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [chatLog, setChatLog] = useState([]);
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Session unauthorized. Routing to log-in workspace.");
            router.push('/login');
            return;
        }

        try {
            setLoading(true);
            setChatLog((prev) => [...prev, { role: 'user', text: data.askAI }]);
            
            const res = await axios.post('http://localhost:5000/api/ai/chat', 
                { prompt: data.askAI }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                setChatLog((prev) => [...prev, { role: 'bot', text: res.data.reply }]);
            }
            reset();
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong.";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4'>
            <div className="w-full max-w-2xl space-y-4">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-blue-400">SIP Bot 2k26</h1>
                    <p className="text-xs text-slate-400">Ask anything about anything related to the TBI SIP26</p>
                </div>

                <div className='w-full h-96 bg-slate-900 border border-slate-800 rounded-2xl p-4 overflow-y-auto flex flex-col gap-3 shadow-inner' aria-label='Main Chat Box'>
                    {chatLog.length === 0 && (
                        <div className="text-center text-slate-500 italic my-auto text-sm">
                            Pipeline initialized. Feed query context text below...
                        </div>
                    )}
                    {chatLog.map((message, i) => (
                        <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                                message.role === 'user' 
                                    ? 'bg-blue-600 text-white rounded-br-none' 
                                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                            }`}>
                                <span className="block text-[10px] uppercase font-bold tracking-wider opacity-60 mb-0.5">
                                    {message.role === 'user' ? 'You' : 'SIP Engine'}
                                </span>
                                <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                            </div>
                        </div>
                    ))}

                    {/* Mid-Request Loading state rendering view */}
                    {loading && (
                        <div className="flex justify-start items-center gap-2 text-xs font-mono text-blue-400 animate-pulse bg-slate-950/60 w-fit px-3 py-1.5 rounded-xl border border-slate-850">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"/>
                            <span>Compiling AI Output Nodes...</span>
                        </div>
                    )}
                </div>

                {/* Input submission structure form */}
                <form className='flex gap-3 w-full' onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-1 flex flex-col gap-1">
                        <Input 
                            placeholder={loading ? "Generating tokens..." : "Ask AI..."} 
                            type="text" 
                            id="ai" 
                            disabled={loading}
                            className="bg-slate-900 border border-slate-800 text-slate-100 w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50" 
                            registerName="askAI" 
                            registerField={register} 
                            rules={{
                                required: { value: true, message: "Query text cannot be blank" },
                                maxLength: { value: 300, message: "Can't add more than 300 characters" }
                            }}
                        />
                        {errors.askAI && <span className="text-xs text-red-400 font-medium pl-1">{errors.askAI.message}</span>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className='bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 text-white font-bold px-6 h-12 rounded-xl transition-all shadow-md'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}