import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authApi';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="relative w-full h-screen min-h-[900px] bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/d1532433-07b1-4e39-a920-0f08b81a489e/67033404-2df8-42e0-a5a0-4c8288b4da2c/US-en-20231120-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
            {/* Dark Overlay - Removed Blur for Sharpness */}
            <div className="bg-black/50 w-full h-full absolute inset-0"></div>

            {/* Navbar / Logo Area */}
            <nav className="absolute top-0 left-0 w-full px-6 md:px-12 py-6 z-20">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                    alt="Netflix Logo"
                    className="h-8 md:h-12"
                />
            </nav>

            {/* Centered Login Card */}
            <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
                <div className="bg-black/85 px-[68px] py-[60px] rounded-[4px] w-full max-w-[450px]">
                    <h1 className="text-[32px] font-bold mb-7 text-white">Sign In</h1>
                    {error && <div className="bg-[#e87c03] p-3 rounded mb-4 text-sm text-white">{error}</div>}

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="relative group">
                            <input
                                id="email"
                                type="email"
                                className="block w-full rounded-[4px] pt-6 pb-2 px-5 bg-[#333] text-white text-base focus:bg-[#454545] outline-none peer transition-colors"
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="email"
                                className="absolute text-[#8c8c8c] duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                            >
                                Email or phone number
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                id="password"
                                type="password"
                                className="block w-full rounded-[4px] pt-6 pb-2 px-5 bg-[#333] text-white text-base focus:bg-[#454545] outline-none peer transition-colors"
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="password"
                                className="absolute text-[#8c8c8c] duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                            >
                                Password
                            </label>
                        </div>

                        <button type="submit" className="bg-[#e50914] text-white font-bold py-3 rounded-[4px] mt-6 hover:bg-[#c11119] transition duration-200 text-base">
                            Sign In
                        </button>
                    </form>

                    <div className="flex justify-between items-center text-[#b3b3b3] text-[13px] mt-3">
                        <div className="flex items-center gap-1">
                            <input type="checkbox" id="remember" className="w-4 h-4 accent-[#b3b3b3] bg-[#333] border-none rounded-[2px] focus:ring-0" defaultChecked />
                            <label htmlFor="remember" className="select-none cursor-pointer">Remember me</label>
                        </div>
                        <a href="#" className="hover:underline">Need help?</a>
                    </div>

                    <div className="mt-[70px]">
                        <p className="text-[#737373] text-base">
                            New to Netflix? <Link to="/register" className="text-white hover:underline font-medium">Sign up now</Link>.
                        </p>
                        <p className="text-[#8c8c8c] text-[13px] mt-4 leading-tight">
                            This page is protected by Google reCAPTCHA to ensure you're not a bot. <button className="text-[#0071eb] hover:underline bg-transparent border-none p-0 cursor-pointer">Learn more</button>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
