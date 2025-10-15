import React, { useEffect, useState } from 'react'
import { Clock } from 'lucide-react';


function TimeOffer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

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
    return (
        <div className="bg-red-500 text-white py-4">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
                    <div className="flex items-center gap-2">
                        <Clock size={20} />
                        <span className="font-bold text-lg">OFFER ENDS IN:</span>
                    </div>
                    <div className="flex gap-4 text-xl font-mono">
                        <div className="flex flex-col items-center">
                            <span className="bg-white text-red-500 px-3 py-1 rounded-lg font-bold">{timeLeft.days}</span>
                            <span className="text-sm">DAYS</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="bg-white text-red-500 px-3 py-1 rounded-lg font-bold">{timeLeft.hours}</span>
                            <span className="text-sm">HOURS</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="bg-white text-red-500 px-3 py-1 rounded-lg font-bold">{timeLeft.minutes}</span>
                            <span className="text-sm">MIN</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="bg-white text-red-500 px-3 py-1 rounded-lg font-bold">{timeLeft.seconds}</span>
                            <span className="text-sm">SEC</span>
                        </div>
                    </div>
                    <div className="bg-yellow-400 text-red-600 px-4 py-2 rounded-full font-bold animate-pulse">
                        ⚠️ This Week Only - Special Discounts!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeOffer