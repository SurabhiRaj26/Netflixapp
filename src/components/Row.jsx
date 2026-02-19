import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/movieApi';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Row = ({ title, fetchQuery, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await fetchMovies(fetchQuery);
            if (request && request.description) {
                const validMovies = request.description.filter(movie => movie['#IMG_POSTER']);
                setMovies(validMovies);
            }
        }
        fetchData();
    }, [fetchQuery]);

    const slideLeft = () => {
        var slider = document.getElementById('slider' + title);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider = document.getElementById('slider' + title);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <div className="px-4 md:px-8 py-2">
            <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
            <div className="relative group flex items-center">
                <ChevronLeft
                    onClick={slideLeft}
                    className="bg-white text-black left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition-all duration-300 hover:scale-125"
                    size={40}
                />
                <div
                    id={'slider' + title}
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative no-scrollbar flex items-center gap-2"
                >
                    {movies.map((movie, id) => (
                        <div
                            key={id}
                            className={`relative flex-none cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${isLargeRow ? 'w-[160px] md:w-[200px] h-[240px] md:h-[300px]' : 'w-[120px] md:w-[160px] h-[180px] md:h-[240px]'}`}
                        >
                            <img
                                className="w-full h-full object-cover rounded block"
                                src={movie['#IMG_POSTER']}
                                alt={movie['#TITLE']}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white flex items-center justify-center transition-opacity duration-300 rounded">
                                <p className="white-space-normal text-xs font-bold text-center px-2">
                                    {movie['#TITLE']}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <ChevronRight
                    onClick={slideRight}
                    className="bg-white text-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition-all duration-300 hover:scale-125"
                    size={40}
                />
            </div>
        </div>
    );
};

export default Row;
