// components/BudgetPackage.tsx
"use client";

import { useEffect, useState } from 'react';
import { Check, Star, Zap, Calendar, TrendingUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { listPackage } from '@/store/packageSlice';
import { toast } from 'react-toastify';
import { LoadingSpinnerWithoutOverlay } from '../global/Loading';
import { TOKEN } from '@/utils/enum';
import { useRouter } from 'next/navigation';
import { decodeToken } from '@/utils/decodeToken';
import { countryCurrencyMap, CurrencyInfo } from './Plans';
import { bookPackage } from '@/store/paymentSlice';
import axios from 'axios';
import { fbPurchase } from '@/lib/PixelHelpers';

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

export default function BudgetPackage() {
    const [loading, setLoading] = useState(true);
    const [packageDetails, setPackageDetails] = useState({
        name: '',
        total_sessions: 0,
        realPrice: 0,
        discountedPrice: 0,
        description: '',
        points: [],
        resultCheck: ''
    });
    const [currency, setCurrency] = useState<CurrencyInfo>({ code: 'INR', symbol: '₹', conversionRate: 1 });

    const dispatch = useDispatch();
    const router = useRouter()
    const [sessions, setSessions] = useState(1);
    const maxSessions = 5;
    const minSessions = 1;

    const handleSessionIncrease = () => {
        if (sessions < maxSessions) {
            setSessions(prev => prev + 1);
        }
    };

    const handleSessionDecrease = () => {
        if (sessions > minSessions) {
            setSessions(prev => prev - 1);
        }
    };

    const calculateSavingsPercentage = () => {
        return Math.round(((packageDetails.realPrice - packageDetails.discountedPrice) / packageDetails.realPrice) * 100);
    };

    const convertPrice = (priceInINR: number): number => {
        return Math.round(priceInINR * currency.conversionRate);
    };

    const fetchLocation = async () => {
        try {
            const fetchedLoc = await axios.get(`https://ipapi.co/json/`);
            const countryCode = fetchedLoc.data.country_code;
            // console.log("Country Code:", countryCode);

            // Get currency info for the country
            const currencyInfo = countryCurrencyMap[countryCode as keyof typeof countryCurrencyMap];
            // console.log("Currency Info:", currencyInfo);

            if (currencyInfo && currencyInfo.code !== 'INR') {
                // Fetch conversion rate
                const conversionRate = await fetchConversionRate(currencyInfo.code);

                setCurrency({
                    code: currencyInfo.code,
                    symbol: currencyInfo.symbol,
                    conversionRate: conversionRate
                });
            } else if (countryCode === 'IN') {
                // Default to INR
                setCurrency({ code: 'INR', symbol: '₹', conversionRate: 1 });
            } else {
                // Default to INR
                setCurrency({ code: "USD", symbol: "$", conversionRate: 1 });
            }
        } catch (error) {
            console.log("Error fetching location:", error);
            // Default to INR on error
            setCurrency({ code: 'INR', symbol: '₹', conversionRate: 1 });
        }
    };

    const fetchConversionRate = async (targetCurrency: string): Promise<number> => {
        try {
            // Using a free currency conversion API
            const response = await axios.get(
                `https://api.exchangerate-api.com/v4/latest/INR`
            );

            // console.log("Conversion rates:", response.data.rates);

            const rate = response.data.rates[targetCurrency];
            return rate || 1;
        } catch (error) {
            console.log("Error fetching conversion rate:", error);
            return 1;
        }
    };

    async function handleSubmit(plan: any) {
        try {
            // setLoading(true);
            const token = JSON.parse(localStorage.getItem(TOKEN) || "null");
            if (!token) {
                toast.warn("Please login first to book package")
                sessionStorage.setItem("selectedPlan", JSON.stringify({ from: plan }));
                sessionStorage.setItem("redirectInfo", JSON.stringify({ from: "customPlan" }));
                router.push("/pages/login")
            }
            const decodedToken = decodeToken(token)
            if (decodedToken.role !== "user") {
                toast.error("You are not allowed to book package")
                return
            }
            const amount = convertPrice(plan.discountedPrice)
            const id = plan._id
            const code = currency.code
            const option = {
                amount: amount.toFixed(0),
                currency: code,
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(bookPackage(option as any) as any);
            if (response?.error) {
                toast.error(response.error.message);
            }

            // console.log(response.payload.data.package)
            const data = response.payload.data.package;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const paymentObject = new (window as any).Razorpay({
                key: "rzp_live_RKKqo4uLM9Dmie",
                order_id: data.id,
                ...data,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                handler: function (response: any) {
                    const option2 = {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        amount: amount.toFixed(0),
                        user_id: decodedToken.userId._id,
                        package_id: id
                    }
                    axios.post(`${backend}/package/verify-payment`, option2)
                        .then(async (response) => {
                            // console.log("response", response)
                            if (response.status === 200) {
                                setLoading(true)
                                fbPurchase(Number(amount.toFixed(0)), code)
                                toast.success("Package Order Placed successfully")
                                router.push('/pages/account')
                            } else {
                                console.log("error while placing order");
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false)
                        toast.error("Payment Failed")
                    },
                },
            })
            paymentObject.open()
        } catch (error) {
            setLoading(false)
            console.log("error while order placement", error);
        }
    }

    const fetchSinglePackages = async () => {
        setLoading(true);
        try {

            const params = {
                pageNum: 1,
                pageSize: 3,
                filters: {
                    total_sessions: sessions
                },
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listPackage(params as any) as any);
            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                const packageData = response.payload.data.packageList[0];
                setPackageDetails({
                    name: packageData.name,
                    total_sessions: packageData.total_sessions,
                    realPrice: packageData.realPrice,
                    discountedPrice: packageData.discountedPrice,
                    description: packageData.description,
                    points: packageData.points,
                    resultCheck: packageData.resultCheck
                })
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch packages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSinglePackages()
    }, [sessions])

    useEffect(() => {
        fetchLocation()
        const plan = JSON.parse(sessionStorage.getItem("selectedPlan") || "{}");
        // console.log("plan", plan)
        if (plan.from) {
            handleSubmit(plan.from)
            sessionStorage.removeItem("selectedPlan");
        }
    }, [])

    return (
        <div id='budgetFriendly' className="w-full max-w-7xl mx-auto p-4">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#009689]/10 mb-4">
                    <Zap className="w-4 h-4 text-[#009689]" />
                    <span className="text-sm font-medium text-[#009689]">
                        Budget-Friendly Plan
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {packageDetails.name} - Affordable Excellence
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Premium quality at an accessible price point
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Package Card */}
                <div className="lg:col-span-2 relative">

                    {loading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
                            <LoadingSpinnerWithoutOverlay />
                        </div>
                    )}
                    {/* Package Card */}
                    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full ${loading ? 'blur-sm pointer-events-none' : ''}
    transition-all duration-300`}>
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-[#009689] to-[#00b09b] p-6 text-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold">{packageDetails.name}</h2>
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2">
                                        <div className="flex  items-center gap-1">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>{packageDetails.total_sessions} sessions included</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                            </svg>
                                            <span>Money-back guarantee</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                                    <span className="font-bold">Save {calculateSavingsPercentage()}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6">
                            {/* Price Section */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
                                    <div>
                                        <div className="flex items-baseline gap-2 flex-wrap">
                                            <span className="text-4xl font-bold text-gray-900">
                                                ₹{packageDetails.discountedPrice}
                                            </span>
                                            <span className="text-gray-500 line-through">
                                                ₹{packageDetails.realPrice}
                                            </span>
                                            <span className="text-sm font-medium text-[#009689] bg-[#009689]/10 px-2 py-1 rounded">
                                                Save ₹{(packageDetails.realPrice - packageDetails.discountedPrice).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Session Selector */}
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600 mb-1">Number of Sessions</p>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={handleSessionDecrease}
                                                    disabled={sessions <= minSessions}
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${sessions <= minSessions
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-[#009689] text-white hover:bg-[#007d71]'
                                                        }`}
                                                >
                                                    −
                                                </button>
                                                <span className="text-xl font-bold min-w-[40px] text-center">
                                                    {sessions}
                                                </span>
                                                <button
                                                    onClick={handleSessionIncrease}
                                                    disabled={sessions >= maxSessions}
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${sessions >= maxSessions
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-[#009689] text-white hover:bg-[#007d71]'
                                                        }`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {sessions === maxSessions
                                                    ? 'Maximum sessions reached'
                                                    : `Up to ${maxSessions} sessions available`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>{minSessions} session</span>
                                        <span>{maxSessions} sessions</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#009689] rounded-full transition-all duration-300"
                                            style={{
                                                width: `${((sessions - minSessions) / (maxSessions - minSessions)) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    What's Included
                                </h3>
                                <p className="text-gray-600">{packageDetails.description}</p>
                            </div>

                            {/* Features List */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    Key Features
                                </h3>
                                <ul className="space-y-3">
                                    {packageDetails.points.map((point: any, index: any) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-[#009689]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-[#009689]" />
                                            </div>
                                            <span className="text-gray-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Result Check */}
                            <div className="mb-6 p-4 bg-[#009689]/5 rounded-lg border border-[#009689]/20">
                                <div className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-[#009689] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-800">Results Check:</p>
                                        <p className="text-gray-600">{packageDetails.resultCheck}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Buy Button Inside Card */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">
                                            Total: ₹{packageDetails.discountedPrice}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {sessions} session{sessions > 1 ? 's' : ''} • {calculateSavingsPercentage()}% savings
                                        </p>
                                    </div>
                                    <button onClick={() => handleSubmit(packageDetails)} className="w-full sm:w-auto bg-gradient-to-r from-[#009689] to-[#00b09b] text-white py-3 px-8 rounded-lg font-semibold hover:from-[#007d71] hover:to-[#009689] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Who Is This For? */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#009689]/10 flex items-center justify-center">
                                <svg className="w-5 h-5 text-[#009689]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Perfect For Budget-Conscious People</h3>
                                <p className="text-sm text-gray-600">Who should choose this plan?</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 bg-white rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#009689]/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#009689] font-bold">👤</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">Students & Beginners</p>
                                        <p className="text-sm text-gray-600">Limited budget, want to test quality first</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-white rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#009689]/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#009689] font-bold">💼</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">Freelancers & Startups</p>
                                        <p className="text-sm text-gray-600">Variable income, need flexible payment</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-white rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#009689]/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#009689] font-bold">🎯</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">Goal-Oriented Individuals</p>
                                        <p className="text-sm text-gray-600">Want to start small, scale based on results</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-white rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#009689]/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#009689] font-bold">💰</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">Value Seekers</p>
                                        <p className="text-sm text-gray-600">Want premium quality at affordable prices</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Want a Full Package? */}
                    <div className="bg-gradient-to-r from-[#009689]/10 to-white rounded-2xl p-6 shadow-lg border border-[#009689]/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#009689] flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Want a Full Package?</h3>
                                <p className="text-sm text-gray-600">Explore our comprehensive plans</p>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-4">
                            If you need more than 5 sessions or want a complete, all-inclusive package with additional benefits,
                            we have premium plans that might better suit your needs.
                        </p>
                        <button onClick={() => document.getElementById("plans")?.scrollIntoView({
                            behavior: "smooth",
                        })} className="w-full bg-white text-[#009689] border-2 border-[#009689] py-3 px-6 rounded-lg font-semibold hover:bg-[#009689]/5 transition-all duration-200">
                            View All Package Options
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-3">
                            Already know what you need? <a href="#" className="text-[#009689] font-medium hover:underline">Contact us for custom plans</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}