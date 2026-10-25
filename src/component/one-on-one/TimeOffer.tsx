import React, { useState } from 'react'
import TherapyPopupForm from './PopupForm';

// Discovery-call banner above the pricing block. It used to carry a countdown that
// reset every Sunday; that was fake urgency and has been removed.
function TimeOffer() {
    const [popup, setPopup] = useState(false)

    function handlePopup() {
        localStorage.removeItem("popupClosedAt")
        setPopup(true)
    }

    return (
        <div className="bg-white text-gray-800 py-4">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
                    <div className="bg-[#009689] text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-95 transition-all duration-300 cursor-pointer shadow-lg">
                        Don&apos;t guess your therapy plan—start with a free discovery call.
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
