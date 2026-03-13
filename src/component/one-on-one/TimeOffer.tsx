import React, { useEffect, useState } from 'react'
import { Clock } from 'lucide-react';
import TherapyPopupForm from './PopupForm';

function TimeOffer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [popup, setPopup] = useState(false)

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endOfWeek = new Date();
            endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);

            const difference = endOfWeek.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    function handlePopup() {
        localStorage.removeItem("popupClosedAt")
        setPopup(true)
    }

    return (
        <div className="bg-white text-gray-800 py-4">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
                    <div className="flex items-center gap-2 text-[#009689]">
                        <Clock size={20} />
                        <span className="font-bold text-lg">OFFER ENDS IN:</span>
                    </div>
                    <div className="flex gap-4 text-xl font-mono">
                        <div className="flex flex-col items-center">
                            <span className="bg-[#009689] text-white px-3 py-1 rounded-lg font-bold min-w-[50px]">
                                {timeLeft.days.toString().padStart(2, '0')}
                            </span>
                            <span className="text-sm mt-1 text-gray-600">DAYS</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="bg-[#009689] text-white px-3 py-1 rounded-lg font-bold min-w-[50px]">
                                {timeLeft.hours.toString().padStart(2, '0')}
                            </span>
                            <span className="text-sm mt-1 text-gray-600">HOURS</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="bg-[#009689] text-white px-3 py-1 rounded-lg font-bold min-w-[50px]">
                                {timeLeft.minutes.toString().padStart(2, '0')}
                            </span>
                            <span className="text-sm mt-1 text-gray-600">MIN</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="bg-[#009689] text-white px-3 py-1 rounded-lg font-bold min-w-[50px]">
                                {timeLeft.seconds.toString().padStart(2, '0')}
                            </span>
                            <span className="text-sm mt-1 text-gray-600">SEC</span>
                        </div>
                    </div>
                    <div className="bg-[#009689] text-white px-6 py-3 rounded-full font-bold animate-pulse hover:bg-opacity-95 transition-all duration-300 cursor-pointer shadow-lg">
                        Don't guess your therapy plan—start with a free discovery call.
                        <span onClick={handlePopup} className="font-extrabold ml-2 underline">Click here</span>
                    </div>
                </div>
            </div>
            {
                popup && <TherapyPopupForm popup={popup} setPopup={setPopup} />
            }
        </div>
    )
}

export default TimeOffer