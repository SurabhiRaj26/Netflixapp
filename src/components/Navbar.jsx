import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Search, Bell, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Ensure token is also cleared if present
        window.location.href = '/login'; // Force reload to clear state
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-500 ease-in-out ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
            <div className="flex items-center justify-between px-4 md:px-12 py-4">
                <div className="flex items-center gap-8">
                    <Link to="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Logo" className="h-6 md:h-8" />
                    </Link>
                    <div className="hidden md:flex gap-6 text-sm text-gray-300 font-medium">
                        <Link to="/" className="hover:text-white transition">Home</Link>
                        <Link to="/" className="hover:text-white transition">TV Shows</Link>
                        <Link to="/" className="hover:text-white transition">Movies</Link>
                        <Link to="/" className="hover:text-white transition">New & Popular</Link>
                        <Link to="/" className="hover:text-white transition">My List</Link>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-white text-sm">
                    <Search className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
                    <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
                    <div className="flex items-center gap-2 cursor-pointer group relative">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" className="w-8 h-8 rounded" />
                        <ChevronDown size={14} className="group-hover:rotate-180 transition duration-300" />

                        {user && (
                            <div className="absolute top-full right-0 pt-4 w-48 bg-transparent hidden group-hover:block">
                                <div className="bg-black/90 border border-gray-700/50 rounded shadow-xl py-2">
                                    <div className="px-3 py-2 text-xs text-gray-400 hover:text-white cursor-pointer border-b border-gray-700/50 mb-1">
                                        Manage Profiles
                                    </div>
                                    <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white hover:text-gray-300 w-full text-left px-3 py-2 hover:bg-white/10 transition">
                                        <LogOut size={16} /> Sign out of Netflix
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
