import { addIndividualForm } from '@/store/individualForm';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingSpinnerWithOverlay } from '../global/Loading';

interface FormData {
    name: string;
    contact: string;
    email: string;
    help: string;
}

interface FormErrors {
    name?: string;
    contact?: string;
    email?: string;
    help?: string;
}

export default function TherapyPopupForm() {
    const [isOpen, setIsOpen] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        contact: '',
        email: '',
        help: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const dispatch = useDispatch()

    useEffect(() => {
        // Check if popup was recently closed
        const popupClosedAt = localStorage.getItem('popupClosedAt');
        const now = Date.now();

        if (!popupClosedAt || (now - parseInt(popupClosedAt)) > 5 * 60 * 1000) {
            // Show popup after 5 minutes
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5 * 60 * 1000); // 5 minutes

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Store close time in localStorage
        localStorage.setItem('popupClosedAt', Date.now().toString());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.contact.trim()) {
            newErrors.contact = 'Contact number is required';
        } else if (!/^\d{10,}$/.test(formData.contact.replace(/\D/g, ''))) {
            newErrors.contact = 'Please enter a valid contact number';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.help.trim()) {
            newErrors.help = 'Please tell us how we can help you';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(addIndividualForm(formData as any) as any);
        if (response?.error) {
            toast.error(response.error.message);
        } else if (response.payload?.data) {
            toast.success('Details submitted successfully');
            setFormData({ name: '', contact: '', email: '', help: '' });
            setTimeout(() => {
                setLoading(false);
                handleClose();
            }, 1000);
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    if (loading) {
        return (
            <LoadingSpinnerWithOverlay />
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all">
                {/* Header */}
                <div className="bg-[#03978a] rounded-t-2xl p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Book Your Therapy Session</h2>
                        <button
                            onClick={handleClose}
                            className="text-white hover:text-teal-100 transition-colors text-2xl font-light"
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-teal-100 mt-2">
                        Take the first step towards better mental health
                    </p>
                </div>

                {/* Form */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your full name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                                Contact Number *
                            </label>
                            <input
                                type="tel"
                                id="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${errors.contact ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your contact number"
                            />
                            {errors.contact && (
                                <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your email address"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="help" className="block text-sm font-medium text-gray-700 mb-1">
                                How Can We Help You? *
                            </label>
                            <textarea
                                id="help"
                                name="help"
                                value={formData.help}
                                onChange={handleInputChange}
                                rows={4}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none ${errors.help ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Please describe what you're going through and how we can support you..."
                            />
                            {errors.help && (
                                <p className="text-red-500 text-sm mt-1">{errors.help}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Booking Session...' : 'Book Therapy Session'}
                        </button>

                        <p className="text-xs text-gray-500 text-center">
                            We respect your privacy. Your information is secure and confidential.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}