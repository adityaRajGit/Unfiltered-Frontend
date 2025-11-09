import { listPackage } from '@/store/packageSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingSpinnerWithoutOverlay } from '../global/Loading';
import { CheckCircle, Calendar, Users, Zap } from 'lucide-react';
import { bookPackage } from '@/store/paymentSlice';
import { TOKEN } from '@/utils/enum';
import { decodeToken } from '@/utils/decodeToken';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

interface Package {
    _id: number;
    name: string;
    timeLine: string;
    total_sessions: string;
    realPrice: number;
    discountedPrice: number;
    description: string;
    points: string[];
    resultCheck: string;
    popular?: boolean;
}

interface CurrencyInfo {
    code: string;
    symbol: string;
    conversionRate: number;
}

function Plans() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const [packages, setPackages] = useState<Package | []>([]);
    const [currency, setCurrency] = useState<CurrencyInfo>({ code: 'INR', symbol: '₹', conversionRate: 1 });
    const router = useRouter()

    const countryCurrencyMap = {
        AT: { code: "EUR", symbol: "€" }, // Austria
        BE: { code: "EUR", symbol: "€" }, // Belgium
        BG: { code: "BGN", symbol: "лв" }, // Bulgaria
        HR: { code: "EUR", symbol: "€" }, // Croatia
        CY: { code: "EUR", symbol: "€" }, // Cyprus
        CZ: { code: "CZK", symbol: "Kč" }, // Czech Republic
        DK: { code: "DKK", symbol: "kr" }, // Denmark
        EE: { code: "EUR", symbol: "€" }, // Estonia
        FI: { code: "EUR", symbol: "€" }, // Finland
        FR: { code: "EUR", symbol: "€" }, // France
        DE: { code: "EUR", symbol: "€" }, // Germany
        GR: { code: "EUR", symbol: "€" }, // Greece
        HU: { code: "HUF", symbol: "Ft" }, // Hungary
        IS: { code: "ISK", symbol: "kr" }, // Iceland
        IE: { code: "EUR", symbol: "€" }, // Ireland
        IT: { code: "EUR", symbol: "€" }, // Italy
        LV: { code: "EUR", symbol: "€" }, // Latvia
        LT: { code: "EUR", symbol: "€" }, // Lithuania
        LU: { code: "EUR", symbol: "€" }, // Luxembourg
        MT: { code: "EUR", symbol: "€" }, // Malta
        NL: { code: "EUR", symbol: "€" }, // Netherlands
        NO: { code: "NOK", symbol: "kr" }, // Norway
        PL: { code: "PLN", symbol: "zł" }, // Poland
        PT: { code: "EUR", symbol: "€" }, // Portugal
        RO: { code: "RON", symbol: "lei" }, // Romania
        SK: { code: "EUR", symbol: "€" }, // Slovakia
        SI: { code: "EUR", symbol: "€" }, // Slovenia
        ES: { code: "EUR", symbol: "€" }, // Spain
        SE: { code: "SEK", symbol: "kr" }, // Sweden
        CH: { code: "CHF", symbol: "CHF" }, // Switzerland
        GB: { code: "GBP", symbol: "£" }, // United Kingdom
        US: { code: "USD", symbol: "$" }, // United States
        IN: { code: "INR", symbol: "₹" }, // India
    };


    const fetchLocation = async () => {
        try {
            const fetchedLoc = await axios.get(`http://ip-api.com/json`);
            const countryCode = fetchedLoc.data.countryCode;
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
            setCurrency({ code: "USD", symbol: "$", conversionRate: 1 });
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

    const convertPrice = (priceInINR: number): number => {
        return Math.round(priceInINR * currency.conversionRate);
    };


    const fetchPackages = async () => {
        setLoading(true);
        try {
            const params = {
                pageNum: 1,
                pageSize: 3,
                filters: {
                    is_active: true
                },
                sortBy: {
                    createdAt: -1
                }
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listPackage(params as any) as any);
            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                const packages = response.payload.data.packageList;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                packages.forEach((packageItem: any) => {
                    if (packageItem.package_type === 'advanced') {
                        packageItem.popular = true;
                    } else {
                        packageItem.popular = false;
                    }
                });
                // console.log("packages", packages)
                await fetchLocation()
                setPackages(packages);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch packages");
        } finally {
            setLoading(false);
        }
    };

    async function handleSubmit(plan: Package) {
        try {
            // setLoading(true);
            const token = JSON.parse(localStorage.getItem(TOKEN) || "null");
            if (!token) {
                toast.warn("Please login first to book package")
                sessionStorage.setItem("selectedPlan", JSON.stringify({ from: plan }));
                sessionStorage.setItem("redirectInfo", JSON.stringify({ from: "user" }));
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

    useEffect(() => {
        fetchPackages()
        const plan = JSON.parse(sessionStorage.getItem("selectedPlan") || "{}");
        // console.log("plan", plan)
        if (plan.from) {
            handleSubmit(plan.from)
            sessionStorage.removeItem("selectedPlan");
        }

    }, [])

    return (
        <section id='plans' className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Choose Your Healing Journey</h2>
                <p className="text-center text-gray-600 mb-12">Select the program that matches your needs and goals</p>

                {
                    loading
                        ? <div className='w-full h-80 flex items-center justify-center'>
                            <LoadingSpinnerWithoutOverlay />
                        </div>
                        :
                        (
                            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {(packages as Package[]).map((plan) => (
                                    <div
                                        key={plan._id}
                                        className={`relative bg-white rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 ${plan.popular ? 'ring-4 ring-[#03978a] ring-opacity-50' : ''
                                            }`}
                                    >
                                        {plan.popular && (
                                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <span className="bg-[#03978a] text-white px-6 py-2 rounded-full font-bold text-sm">
                                                    MOST POPULAR
                                                </span>
                                            </div>
                                        )}

                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Calendar size={16} className="text-[#03978a]" />
                                                        <span className="text-gray-600">{plan.timeLine}</span>
                                                        <Users size={16} className="text-[#03978a] ml-2" />
                                                        <span className="text-gray-600">{plan.total_sessions} Sessions</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="mb-6">
                                                <div className="flex flex-wrap items-baseline gap-2">
                                                    <span className="text-3xl font-bold text-[#03978a]">₹{plan.discountedPrice}</span>
                                                    <span className="text-lg text-gray-500 line-through">₹{plan.realPrice}</span>
                                                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
                                                        Save ₹{plan.realPrice - plan.discountedPrice}
                                                    </span>
                                                </div>
                                            </div> */}
                                            <div className="mb-6">
                                                <div className="flex flex-wrap items-baseline gap-2">
                                                    <span className="text-3xl font-bold text-[#03978a]">
                                                        {currency.symbol}{convertPrice(plan.discountedPrice)}
                                                    </span>
                                                    <span className="text-lg text-gray-500 line-through">
                                                        {currency.symbol}{convertPrice(plan.realPrice)}
                                                    </span>
                                                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
                                                        Save {currency.symbol}{convertPrice(plan.realPrice - plan.discountedPrice)}
                                                    </span>
                                                </div>
                                                {currency.code !== 'INR' && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Prices converted from INR to {currency.code}
                                                    </p>
                                                )}
                                            </div>

                                            <p className="text-gray-600 mb-6">{plan.description}</p>

                                            <ul className="space-y-3 mb-6">
                                                {plan.points.map((point, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                                                        <span className="text-gray-700">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="bg-teal-50 p-4 rounded-lg mb-6">
                                                <div className="flex items-center">
                                                    <Zap size={16} className="text-[#03978a] mr-2" />
                                                    <span className="font-semibold text-gray-800">Results Check:</span>
                                                </div>
                                                <p className="text-gray-700 text-sm mt-1">{plan.resultCheck}</p>
                                            </div>

                                            <button onClick={() => handleSubmit(plan)} className="w-full bg-[#03978a] text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-300">
                                                Book Now - Limited Spots
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                }


            </div>
        </section>
    )
}

export default Plans