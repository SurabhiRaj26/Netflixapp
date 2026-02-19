import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Row from '../components/Row';
import { fetchMovies } from '../services/movieApi';
import { Play, Info } from 'lucide-react';

const LandingPage = () => {
    const [heroMovie, setHeroMovie] = useState(null);

    useEffect(() => {
        const getHeroMovie = async () => {
            // Fetch Action movies specifically for the Hero to match "Stranger Things" vibe if possible, or just popular
            // The API is search based. "Avengers" or "Batman" usually yields good posters.
            // Let's try "Spider" or something dynamic.
            const movies = await fetchMovies('Spider-Man');
            if (movies && movies.description && movies.description.length > 0) {
                // Randomly pick one
                const randomMovie = movies.description[Math.floor(Math.random() * movies.description.length)];
                setHeroMovie(randomMovie);
            }
        };
        getHeroMovie();
    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    return (
        <div className="bg-[#141414] min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <header
                className="w-full h-[56.25vw] relative text-white object-contain"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url("${heroMovie?.['#IMG_POSTER'] || 'https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'}")`,
                    backgroundPosition: 'center 20%',
                }}
            >
                {/* Gradient Video Overlay Style */}
                <div className="absolute w-full h-[56.25vw] bg-gradient-to-r from-black via-transparent to-transparent z-10 opacity-90" />

                <div className="absolute w-full top-[30%] md:top-[25%] p-4 md:px-16 z-20 flex flex-col justify-center gap-6">
                    <h1 className="text-4xl md:text-7xl font-bold max-w-2xl drop-shadow-2xl">
                        {heroMovie?.['#TITLE'] || "Loading..."}
                    </h1>

                    <p className="text-white text-lg font-medium w-full md:max-w-[50%] drop-shadow-md line-clamp-3">
                        {truncate(heroMovie?.['#AKA'] || "Watch this amazing movie on Netflix Clone.", 200)}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                        <button className="bg-white text-black py-2 md:py-3 px-6 md:px-8 font-bold rounded flex items-center gap-3 hover:bg-opacity-80 transition text-lg md:text-xl">
                            <Play fill="black" size={28} /> Play
                        </button>
                        <button className="bg-[gray]/50 text-white py-2 md:py-3 px-6 md:px-8 font-bold rounded flex items-center gap-3 hover:bg-[gray]/30 transition text-lg md:text-xl bg-opacity-40 backdrop-blur-sm">
                            <Info size={28} /> More Info
                        </button>
                    </div>
                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 w-full h-[15rem] bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent z-20" />
            </header>

            {/* Movie Rows (Negative margin to pull up) */}
            <div className="relative z-30 -mt-52 md:-mt-80 px-4 md:px-12 space-y-1 pb-12">
                <Row title="Trending Now" fetchQuery="Trending" />
                <Row title="Top Rated" fetchQuery="Top Rated" />
                <Row title="Action Movies" fetchQuery="Action" />
                <Row title="Comedy Movies" fetchQuery="Comedy" />
                <Row title="Horror Movies" fetchQuery="Horror" />
                <Row title="Documentaries" fetchQuery="Documentary" />
            </div>

            <footer className="p-8 text-center text-gray-500 text-sm bg-[#141414]">
                <p>Netflix Clone - For Educational Purposes Only</p>
            </footer>
        </div >
    );
};

export default LandingPage;
