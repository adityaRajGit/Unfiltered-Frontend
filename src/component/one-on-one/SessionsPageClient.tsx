'use client';

import OneonOneHeader from '@/component/one-on-one/Header';
import TimeOffer from '@/component/one-on-one/TimeOffer';
import BenefitsSection from '@/component/one-on-one/BenefitsSection';
import Quote from '@/component/one-on-one/Quote';
import Plans from '@/component/one-on-one/Plans';
import Metrices from '@/component/one-on-one/Metrices';
import HealingSection from '@/component/one-on-one/HealingSection';
import Testimonials from '@/component/one-on-one/Testimonials';
import CTA from '@/component/one-on-one/CTA';
import { useEffect } from 'react';
import TherapyPopupForm from '@/component/one-on-one/PopupForm';
import BudgetPackage from '@/component/one-on-one/BudgetPackage';
import VideoPlayer from '@/component/one-on-one/VideoSection';
import type { PackageSummary } from '@/utils/pricing';

// Client half of /pages/one-on-one. The server page fetches the 1-session package
// so its real price is in the first HTML response.
export default function SessionsPageClient({ initialPackage }: { initialPackage: PackageSummary | null }) {
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("redirectInfo") || "{}");
        if (data.from === "user") {
            setTimeout(() => {
                const section = document.getElementById("plans");
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            }, 300);
            // clear after use
            sessionStorage.removeItem("redirectInfo");
        } else {
            setTimeout(() => {
                const section = document.getElementById("budgetFriendly");
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            }, 300);
            // clear after use
            sessionStorage.removeItem("redirectInfo")
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
            {/* Header */}
            <OneonOneHeader />

            {/* Limited Time Offer Banner */}
            <TimeOffer />

            <BudgetPackage initialPackage={initialPackage} />

            {/* Benefits Section */}
            <BenefitsSection />

            <VideoPlayer />

            <Quote />

            {/* Therapy Plans */}
            <Plans />

            {/* Success Metrics */}
            <Metrices />


            <HealingSection />

            {/* Testimonials */}
            <Testimonials />

            {/* Final CTA */}
            <CTA />

            <TherapyPopupForm popup={false} setPopup={() => { }} />
        </div>
    );
}
