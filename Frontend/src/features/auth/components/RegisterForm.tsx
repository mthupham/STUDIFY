import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    // 1. Khai báo State để lưu thông tin người dùng gõ vào
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    
    // State quản lý trạng thái hiển thị UI
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // 2. Hàm xử lý khi người dùng bấm nút "Create Account"
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Kiểm tra hợp lệ dữ liệu cơ bản ở Client
        if (!username || !email || !password) {
            return alert('Vui lòng nhập đầy đủ các trường thông tin!');
        }
        if (!agreeToTerms) {
            return alert('Bạn phải đồng ý với Điều khoản và Chính sách bảo mật!');
        }

        setIsLoading(true);
        setError('');

        try {
            // 💡 Khúc này đang "vibe code" giả lập đợi Backend trong 1.5 giây
            // Sau khi Kim Hằng viết xong API, bạn chỉ cần dùng Axios gọi POST ở đây
            console.log('Dữ liệu gửi lên Backend:', { username, email, password });
            
            await new Promise((resolve) => setTimeout(resolve, 1500)); 

            // Giả lập đăng ký thành công
            alert('Tạo tài khoản thành công! Quay lại trang đăng nhập thôi.');
            navigate('/login'); // Tự động chuyển sang màn hình Login
        } catch (err: any) {
            setError('Đăng ký thất bại, email này có thể đã được sử dụng!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen py-20 relative bg-slate-50 inline-flex justify-center items-center">
            {/* Hiệu ứng vòng tròn màu nền background giống Figma */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <div className="size-64 absolute left-16 top-24 bg-sky-700/10 rounded-full blur-3xl" />
                <div className="size-96 absolute right-32 bottom-24 bg-emerald-800/10 rounded-full blur-3xl" />
            </div>

            {/* Container chính bọc toàn bộ Form */}
            <div className="flex-1 max-w-4xl bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden inline-flex justify-start items-stretch">
                
                {/* Panel bên trái: Hình ảnh hoặc Banner trang trí (Giữ nguyên cấu trúc Figma của bạn) */}
                <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-600 to-sky-800 p-12 flex-col justify-end items-start relative overflow-hidden min-h-[650px]">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="z-10">
                        <h3 className="text-white text-3xl font-bold mb-2 font-['Inter']">Studify</h3>
                        <p className="text-sky-100 text-sm font-normal font-['Inter']">Achieving professional fluency through AI-powered immersion and tructured roadmaps.</p>
                    </div>
                </div>

                {/* Panel bên phải: Khu vực điền Form thực tế */}
                <form onSubmit={handleSubmit} className="flex-1 p-12 flex flex-col justify-center items-start gap-6">
                    
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <h2 className="text-gray-900 text-2xl font-bold font-['Inter']">Create an Account</h2>
                        <p className="text-gray-500 text-sm font-normal font-['Inter']">Join Studify to start your personalized English journey.</p>
                    </div>

                    <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
                        
                        {/* INPUT: USERNAME */}
                        <div className="self-stretch flex flex-col gap-1.5 w-full">
                            <label className="text-gray-700 text-xs font-semibold font-['Inter']">Username</label>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="JounsKims"
                                className="w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-900 border border-slate-300 focus:outline-none focus:border-sky-700 bg-transparent font-['Inter']"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* INPUT: EMAIL */}
                        <div className="self-stretch flex flex-col gap-1.5 w-full">
                            <label className="text-gray-700 text-xs font-semibold font-['Inter']">Email Address</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-900 border border-slate-300 focus:outline-none focus:border-sky-700 bg-transparent font-['Inter']"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* INPUT: PASSWORD */}
                        <div className="self-stretch flex flex-col gap-1.5 w-full">
                            <label className="text-gray-700 text-xs font-semibold font-['Inter']">Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2.5 rounded-lg text-sm text-gray-900 border border-slate-300 focus:outline-none focus:border-sky-700 bg-transparent font-['Inter']"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* Hiển thị lỗi từ hệ thống lên màn hình nếu có */}
                        {error && <p className="text-red-500 text-xs font-medium w-full text-center">{error}</p>}

                        {/* CHECKBOX: ĐỒNG Ý ĐIỀU KHOẢN */}
                        <div className="self-stretch inline-flex justify-start items-center gap-2 pt-2">
                            <input 
                                type="checkbox" 
                                id="terms"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                className="size-4 border border-slate-300 rounded cursor-pointer" 
                                disabled={isLoading}
                            />
                            <label htmlFor="terms" className="text-gray-700 text-xs font-medium font-['Inter'] cursor-pointer select-none">
                                I agree to the <span className="text-sky-700 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-sky-700 cursor-pointer hover:underline">Privacy Policy</span>.
                            </label>
                        </div>

                        {/* BUTTON: SUBMIT ĐĂNG KÝ */}
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 px-4 py-3 bg-sky-700 hover:bg-sky-800 transition-colors rounded-lg shadow-sm flex justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="text-white text-sm font-semibold font-['Inter']">
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </span>
                        </button>
                    </div>

                    {/* ĐIỀU HƯỚNG QUAY LẠI TRANG ĐĂNG NHẬP */}
                    <div className="self-stretch pt-2 text-center w-full">
                        <span className="text-gray-700 text-sm font-normal font-['Inter']">Already have an account? </span>
                        <span 
                            onClick={() => navigate('/login')} 
                            className="text-sky-700 text-sm font-semibold font-['Inter'] cursor-pointer hover:underline"
                        >
                            Sign In
                        </span>
                    </div>

                </form>
            </div>
        </div>
    );
}