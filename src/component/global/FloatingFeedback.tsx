"use client";
import { addFeedback } from "@/store/feedbackSlice";
import { useState, useRef, useEffect } from "react";
import {
    FiMessageSquare,
    FiThumbsUp,
    FiThumbsDown,
    FiSend,
    FiX
} from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EnhancedFeedbackButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | null>(null);
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            type_of_feedback: feedbackType === 'positive' ? true : false,
            feedback_content: feedback,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(addFeedback(data as any) as any);
        if (response?.error) {
            toast.error(response.error.message);
        } else if (response.payload?.data) {

            setIsSubmitted(true);
            setFeedback('');
            setFeedbackType(null);

            setTimeout(() => {
                setIsSubmitted(false);
                setIsOpen(false);
            }, 3000);
            toast.success('Feedback submitted successfully');
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    return (
        <div className="fixed bottom-8 right-8 z-50">
            {/* Floating Button */}
            <div className="relative">

                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-teal-400/50"
                    aria-label="Provide feedback"
                    style={{
                        boxShadow: '0 10px 25px -5px rgba(13, 148, 136, 0.5)',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative flex items-center space-x-2">
                        <FiMessageSquare size={26} className="transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-sm font-medium opacity-0 max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-300">
                            Feedback
                        </span>
                    </div>
                </button>
            </div>

            {/* Feedback Form */}
            {isOpen && (
                <div ref={formRef} className="absolute bottom-20 right-0 w-[360px] max-w-[90vw] bg-white rounded-2xl shadow-2xl overflow-hidden border border-teal-100 backdrop-blur-sm bg-opacity-95 animate-fade-in-up">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-5 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <FiMessageSquare className="text-teal-100" size={20} />
                            <h3 className="text-white font-bold text-lg">Share Your Thoughts</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-teal-100 hover:text-white transition-colors p-1 rounded-full hover:bg-teal-700"
                            aria-label="Close feedback form"
                        >
                            <FiX size={22} />
                        </button>
                    </div>

                    {isSubmitted ? (
                        <div className="p-6 text-center">
                            <div className="mx-auto mb-5 flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-teal-500 rounded-full opacity-20 animate-ping"></div>
                                    <div className="relative w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
                                        <FiSend className="text-teal-600" size={28} />
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-teal-800 font-bold text-xl mb-1">Thank You!</h4>
                            <p className="text-gray-600">Your feedback is valuable to us</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-5">
                            <div className="mb-5">
                                <p className="text-gray-700 font-medium mb-3">How was your experience?</p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setFeedbackType('positive')}
                                        className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${feedbackType === 'positive'
                                            ? 'bg-teal-50 border-teal-400 text-teal-600'
                                            : 'border-gray-200 text-gray-400 hover:border-gray-300'
                                            }`}
                                        aria-label="Positive experience"
                                    >
                                        <FiThumbsUp size={24} />
                                        <span className="text-xs mt-1">Positive</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFeedbackType('negative')}
                                        className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${feedbackType === 'negative'
                                            ? 'bg-red-50 border-red-400 text-red-600'
                                            : 'border-gray-200 text-gray-400 hover:border-gray-300'
                                            }`}
                                        aria-label="Negative experience"
                                    >
                                        <FiThumbsDown size={24} />
                                        <span className="text-xs mt-1">Negative</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="feedback" className="block text-gray-700 font-medium mb-2">
                                    Your feedback
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="feedback"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Tell us what worked well or what didn't."
                                        className="w-full min-h-[120px] p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none shadow-sm"
                                        required
                                    />
                                    <div className="absolute bottom-3 right-3 text-gray-400 text-sm">
                                        {feedback.length}/200
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!feedback.trim() || !feedbackType}
                                className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${feedback.trim() && feedbackType
                                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <FiSend size={18} />
                                Send Feedback
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default EnhancedFeedbackButton;