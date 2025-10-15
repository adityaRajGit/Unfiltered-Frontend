import React, { useEffect, useState } from 'react'

function CTA() {
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
        <section className="py-16 bg-gradient-to-r from-[#03978a] to-teal-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to Start Your Healing Journey?</h2>
                <p className="text-xl mb-8 opacity-90">Don&apos;t wait - this special offer disappears in</p>

                <div className="flex justify-center gap-4 mb-8 text-2xl font-mono">
                    <div className="bg-white text-[#03978a] px-4 py-2 rounded-lg">{timeLeft.days}d</div>
                    <div className="bg-white text-[#03978a] px-4 py-2 rounded-lg">{timeLeft.hours}h</div>
                    <div className="bg-white text-[#03978a] px-4 py-2 rounded-lg">{timeLeft.minutes}m</div>
                    <div className="bg-white text-[#03978a] px-4 py-2 rounded-lg">{timeLeft.seconds}s</div>
                </div>

                <div className="space-y-4 max-w-2xl mx-auto">
                    <button className="w-full bg-yellow-400 text-gray-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors duration-300">
                        🔒 Secure Your Spot Now - Limited Availability
                    </button>
                    <p className="text-teal-200 text-sm">✅ 100% Confidential • ✅ Certified Therapists • ✅ Money-Back Guarantee</p>
                </div>
            </div>
        </section>
    )
}

export default CTA