import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import letterIcon from '../../../assets/Studify_icon/letter.svg';
import lockIcon from '../../../assets/Studify_icon/lock.svg';

export default function LoginForm() {
    // 1. Khai báo State hứng dữ liệu
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 2. Gọi logic từ Store và Router
    const { loginAction, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    // 3. Hàm xử lý khi bấm Sign In
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return alert('Vui lòng nhập đủ thông tin!');

        const success = await loginAction({ email, password });
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="w-full min-h-screen py-20 relative bg-slate-50 inline-flex justify-center items-center">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                <div className="size-72 absolute right-10 top-1/4 bg-blue-600/10 rounded-full blur-2xl" />
                <div className="size-64 absolute left-16 bottom-1/4 bg-emerald-300/10 rounded-full blur-2xl" />
            </div>

            <div className="flex-1 max-w-lg bg-white rounded-xl shadow-lg p-12 z-10">
                {/* 🔴 BỌC TOÀN BỘ BẰNG THẺ FORM 🔴 */}
                <form onSubmit={handleSubmit} className="inline-flex flex-col justify-start items-start gap-8 w-full">
                    
                    <div className="self-stretch flex flex-col justify-start items-start gap-2 text-center w-full">
                        <h2 className="text-gray-900 text-3xl font-bold font-['Inter'] w-full" style={{ color: '#151C27' }}>Welcome Back</h2>
                        <p className="text-gray-700 text-base font-normal font-['Inter'] w-full">Please enter your details to sign in.</p>
                    </div>

                    <div className="self-stretch pt-2 flex flex-col justify-start items-start gap-6 w-full">
                        
                        {/* THẺ INPUT EMAIL THỰC TẾ */}
                        <div className="self-stretch flex flex-col gap-2">
                            <label className="text-gray-700 text-sm font-semibold font-['Inter'] inline-flex items-center gap-2">
                                <img src={letterIcon} alt="email" className="size-4" />
                                Email Address
                            </label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                               className="w-full px-4 py-3.5 rounded-lg outline outline-1 outline-gray-300 focus:outline-blue-600 text-gray-900 bg-transparent font-['Inter']"
                                required
                            />
                        </div>

                        {/* THẺ INPUT PASSWORD THỰC TẾ */}
                        <div className="self-stretch flex flex-col gap-2">
                            <div className="inline-flex justify-between items-center w-full">
                                <label className="text-gray-700 text-sm font-semibold font-['Inter'] inline-flex items-center gap-2">
                                    <img src={lockIcon} alt="password" className="size-4" />
                                    Password
                                </label>
                                <span
                                    onClick={() => navigate('/forgot-password')}
                                    className="text-sky-700 text-sm font-semibold font-['Inter'] cursor-pointer hover:underline"
                                >
                                    Forgot password?
                                </span>
                            </div>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                               className="w-full px-4 py-3.5 rounded-lg outline outline-1 outline-gray-300 focus:outline-blue-600 text-gray-900 bg-transparent font-['Inter']"
                                required
                            />
                        </div>

                        {/* Hiện lỗi từ Backend nếu có */}
                        {error && <p className="text-red-500 text-sm w-full text-center font-['Inter']">{error}</p>}

                        <div className="self-stretch inline-flex justify-start items-center gap-2">
                            <input type="checkbox" className="size-4 rounded-sm border-gray-500" />
                            <span className="text-gray-700 text-sm font-semibold font-['Inter']">Remember me for 30 days</span>
                        </div>

                        {/* THẺ BUTTON SUBMIT THỰC TẾ */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-4 bg-sky-700 hover:bg-sky-800 transition-colors rounded-xl flex justify-center items-center disabled:opacity-50"
                        >
                            <span className="text-white text-sm font-semibold font-['Inter']">
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </span>
                        </button>
                    </div>

                    <div className="self-stretch inline-flex justify-start items-center gap-4 w-full">
                        <div className="flex-1 h-px bg-slate-300" />
                        <span className="text-gray-500 text-xs font-medium font-['Inter']">OR</span>
                        <div className="flex-1 h-px bg-slate-300" />
                    </div>

                    <button type="button" className="w-full py-3 rounded-xl outline outline-1 outline-slate-300 hover:bg-slate-50 transition-colors inline-flex justify-center items-center gap-2">
                        <svg className="size-5" viewBox="0 0 24 24">
                            <image href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3C/svg%3E" width="20" height="20" />
                        </svg>
                        <span className="text-gray-900 text-sm font-semibold font-['Inter']">Continue with Google</span>
                    </button>

                    <div className="w-full text-center">
                        <span className="text-gray-700 text-base font-normal font-['Inter']">Don't have an account? </span>
                        <span 
                            onClick={() => navigate('/register')}
                            className="text-sky-700 text-base font-normal font-['Inter'] cursor-pointer hover:underline"
                        >
                            Create an account
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}