import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authApi';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            if (password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }

            await register(username, email, password);
            // Registration successful, redirect to login
            navigate('/login');
        } catch (err) {
            console.error("Registration Error:", err);
            setError(err.response?.data?.error || err.message || 'Registration failed');
        }
    };

    return (
        <div className="relative w-full h-screen min-h-[900px] bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/d1532433-07b1-4e39-a920-0f08b81a489e/67033404-2df8-42e0-a5a0-4c8288b4da2c/US-en-20231120-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
            {/* Dark Overlay - Removed Blur for Sharpness */}
            <div className="bg-black/50 w-full h-full absolute inset-0"></div>

            <nav className="absolute top-0 left-0 w-full px-6 md:px-12 py-6 z-20">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                    alt="Netflix Logo"
                    className="h-8 md:h-12"
                />
            </nav>

            <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
                <div className="bg-black/85 px-[68px] py-[60px] rounded-[4px] w-full max-w-[450px]">
                    <h1 className="text-[32px] font-bold mb-7 text-white">Sign Up</h1>
                    {error && <div className="bg-[#e87c03] p-3 rounded mb-4 text-sm text-white">{error}</div>}

                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        <div className="relative group">
                            <input
                                id="username"
                                type="text"
                                className="block w-full rounded-[4px] pt-6 pb-2 px-5 bg-[#333] text-white text-base focus:bg-[#454545] outline-none peer transition-colors"
                                placeholder=" "
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="username"
                                className="absolute text-[#8c8c8c] duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                            >
                                Username
                            </label>
                        </div>

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
                                Email address
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
                                Password (min 6 chars)
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                id="confirmPassword"
                                type="password"
                                className="block w-full rounded-[4px] pt-6 pb-2 px-5 bg-[#333] text-white text-base focus:bg-[#454545] outline-none peer transition-colors"
                                placeholder=" "
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="confirmPassword"
                                className="absolute text-[#8c8c8c] duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                            >
                                Confirm Password
                            </label>
                        </div>

                        <button type="submit" className="bg-[#e50914] text-white font-bold py-3 rounded-[4px] mt-6 hover:bg-[#c11119] transition duration-200 text-base">
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-[20px] text-[#737373] text-base">
                        Already have an account? <Link to="/login" className="text-white hover:underline font-medium">Sign in now</Link>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
