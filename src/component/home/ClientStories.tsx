"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Content mirrors the Stay Unfiltered "Our 1:1 clients work at India's leading
// companies" Instagram carousel. Client names are abbreviated, as published there.
// Logos in /public/clients are cut from that carousel slide (transparent PNGs).
// w/h are the files' pixel sizes; they set each logo's aspect ratio.
const companies = [
    { name: "Boston Consulting Group", src: "/clients/bcg.png", w: 268, h: 62 },
    { name: "Kohler", src: "/clients/kohler.png", w: 194, h: 45 },
    { name: "HSBC", src: "/clients/hsbc.png", w: 250, h: 74 },
    { name: "Cloudify", src: "/clients/cloudify.png", w: 264, h: 59 },
    { name: "Deloitte", src: "/clients/deloitte.png", w: 229, h: 47 },
    { name: "Mahindra", src: "/clients/mahindra.png", w: 129, h: 95 },
    { name: "Google", src: "/clients/google.png", w: 232, h: 81 },
    { name: "Amazon", src: "/clients/amazon.png", w: 214, h: 68 },
];

const stats = [
    { value: "5000+", label: "1:1 Sessions" },
    { value: "70+", label: "Corporates" },
    { value: "25", label: "Psychologists" },
];

const stories = [
    {
        quote: "Leading three teams, I was working 14-hour days and felt nothing. My therapist helped me set boundaries without guilt. I lead better now — and I take Sundays off.",
        name: "Sharvari D.",
        role: "Vice President, Product",
        city: "Bengaluru",
        concern: "Burnout",
    },
    {
        quote: "Every board review gave me sleepless nights. I learned to catch anxious thoughts before they spiral. I walk into leadership meetings calm now.",
        name: "Aniruddh B.",
        role: "Director of Engineering",
        city: "Pune",
        concern: "Anxiety",
    },
    {
        quote: "After my divorce I couldn't focus at work or at home. Sessions gave me a safe space to grieve and rebuild. I feel like myself again.",
        name: "Mrinalini S.",
        role: "Senior Finance Controller",
        city: "Mumbai",
        concern: "Divorce & grief",
    },
    {
        quote: "Work pressure was spilling into constant fights at home. Therapy taught me to listen before reacting. Our home is calmer, and so am I.",
        name: "Devansh K.",
        role: "Regional Sales Head",
        city: "Delhi NCR",
        concern: "Family conflict",
    },
    {
        quote: "Online sessions fit my Singapore schedule perfectly. For the first time in years, I can actually switch off after work.",
        name: "Shermaine G.",
        role: "Regional Marketing Director, APAC",
        city: "Singapore",
        concern: "Work-life balance",
    },
    {
        quote: "I supported everyone's wellbeing but doubted myself in every boardroom. A few months of sessions later, I lead with confidence.",
        name: "Hetvi P.",
        role: "Head of Human Resources",
        city: "Ahmedabad",
        concern: "Self-doubt",
    },
    {
        quote: "I cared for everyone's health except my own mind. Simple, practical tools from my therapist fixed my sleep within weeks.",
        name: "Dr. Revathi I.",
        role: "Senior Consultant, Cardiology",
        city: "Hyderabad",
        concern: "Overthinking & sleep",
    },
    {
        quote: "I thought constant stress was the price of running a 200-member team. Therapy showed me it isn't. Clearer decisions, calmer me.",
        name: "Ilango V.",
        role: "AVP, Operations",
        city: "Chennai",
        concern: "Chronic stress",
    },
];

function ClientStories() {
    const track = useRef<HTMLUListElement>(null);

    const scroll = (dir: 1 | -1) => {
        const el = track.current;
        if (!el) return;
        const card = el.querySelector("li");
        const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth;
        el.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    return (
        <section aria-labelledby="client-stories-heading">
            <div className="text-center mb-10">
                <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                    Client Stories
                </div>
                <h2 id="client-stories-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Our 1:1 clients work at India&apos;s leading companies
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                    Senior professionals bring us burnout, anxiety, grief and more. Here&apos;s what changed for them.
                </p>
            </div>

            {/* Where clients work + headline numbers */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 md:p-10 mb-10">
                <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-10 items-center justify-items-center">
                    {companies.map((c) => (
                        <li key={c.name} className="flex items-center justify-center h-12 md:h-14 w-full">
                            <Image
                                src={c.src}
                                alt={c.name}
                                width={c.w}
                                height={c.h}
                                sizes="(max-width: 640px) 40vw, 180px"
                                className="max-h-full w-auto max-w-[85%] md:max-w-[180px] object-contain"
                            />
                        </li>
                    ))}
                </ul>
                <dl className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="text-3xl md:text-5xl font-bold text-teal-600">{s.value}</dd>
                            <dd className="mt-1 text-sm md:text-base text-gray-600">{s.label}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            {/* Stories: swipeable on touch, arrow buttons on desktop */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">Swipe to hear their stories</p>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => scroll(-1)}
                        aria-label="Previous stories"
                        className="w-10 h-10 rounded-full border border-teal-200 bg-white text-teal-700 flex items-center justify-center hover:bg-teal-50 transition-colors"
                    >
                        <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scroll(1)}
                        aria-label="Next stories"
                        className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 transition-colors"
                    >
                        <FiChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <ul
                ref={track}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {stories.map((s) => (
                    <li
                        key={s.name}
                        className="snap-start shrink-0 w-[85%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] bg-white rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col"
                    >
                        <FaQuoteLeft className="text-2xl text-teal-400 mb-4" aria-hidden />
                        <blockquote className="text-gray-800 leading-relaxed flex-1">{s.quote}</blockquote>
                        <div className="mt-6 flex items-end justify-between gap-3">
                            <div>
                                <p className="font-semibold text-teal-700">{s.name}</p>
                                <p className="text-xs text-gray-500">{s.role} · {s.city}</p>
                            </div>
                            <span className="shrink-0 text-xs font-medium text-teal-800 bg-teal-50 border border-teal-100 rounded-full px-3 py-1">
                                {s.concern}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ClientStories;
