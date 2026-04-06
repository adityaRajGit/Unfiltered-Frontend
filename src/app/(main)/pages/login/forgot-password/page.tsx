"use client"
import { LoadingSpinnerWithOverlay } from '@/component/global/Loading';
import { sendOtp, verifyOtp } from '@/store/otpSlice';
import { userAndTherapistResetPasswordFunc } from '@/store/userSlice';
import Link from 'next/link';
import { useState, FormEvent, useEffect } from 'react';
import { FaEnvelope, FaLock, FaCheck, FaArrowLeft, FaUser, FaBuilding, FaUserMd, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


interface RoleOption {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
}

const roleOptions: RoleOption[] = [
    {
        id: 'employee',
        label: 'Employee',
        description: 'Company staff member',
        icon: <FaBuilding className="w-5 h-5" />
    },
    {
        id: 'user',
        label: 'User',
        description: 'Regular platform user',
        icon: <FaUser className="w-5 h-5" />
    },
    {
        id: 'therapist',
        label: 'Therapist',
        description: 'Professional therapist',
        icon: <FaUserMd className="w-5 h-5" />
    }
];


export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentStep, setCurrentStep] = useState<'email' | 'otp' | 'newPassword' | 'success'>('email');
    const [countdown, setCountdown] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [role, setRole] = useState('')
    const dispatch = useDispatch()

    // Password strength checker
    useEffect(() => {
        if (!newPassword) {
            setPasswordStrength(0);
            return;
        }

        let strength = 0;
        if (newPassword.length >= 8) strength++;
        if (/[A-Z]/.test(newPassword)) strength++;
        if (/[0-9]/.test(newPassword)) strength++;
        if (/[^A-Za-z0-9]/.test(newPassword)) strength++;

        setPasswordStrength(strength);
    }, [newPassword]);

    const handleEmailSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            email
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(sendOtp(data as any) as any);
        if (response?.error) {
            setLoading(false)
            toast.error(response.error.message);
        } else {
            setLoading(false);
            setCurrentStep('otp');
            startCountdown();
        }

        // Simulate API call
        // setTimeout(() => {
        //     setLoading(false);
        //     setCurrentStep('otp');
        //     startCountdown();
        // }, 1500);
    };

    const handleOtpSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length !== 6) return;

        setLoading(true);

        const data = {
            email,
            otp: otpString
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(verifyOtp(data as any) as any);
        if (response?.error) {
            setLoading(false)
            toast.error(response.error.message);
        } else {
            setLoading(false);
            setCurrentStep('newPassword');
        }

        // Simulate OTP verification
        // setTimeout(() => {
        //     setLoading(false);
        //     setCurrentStep('newPassword');
        // }, 1500);
    };

    const handlePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        setLoading(true);

        const data = {
            email,
            newPassword,
            role
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(userAndTherapistResetPasswordFunc(data as any) as any);
        if (response?.error) {
            setLoading(false)
            toast.error(response.error.message);
        } else {
            setLoading(false);
            setCurrentStep('success');
        }

        // Simulate password reset API call
        // setTimeout(() => {
        //     setLoading(false);
        //     setCurrentStep('success');
        // }, 1500);
    };

    const startCountdown = () => {
        setCountdown(300); // 5 minutes
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`) as HTMLInputElement;
            nextInput?.focus();
        }
    };

    const getPasswordStrengthColor = (strength: number) => {
        switch (strength) {
            case 1: return 'from-red-400 to-red-500';
            case 2: return 'from-orange-400 to-orange-500';
            case 3: return 'from-yellow-400 to-yellow-500';
            case 4: return 'from-teal-400 to-teal-500';
            default: return 'from-gray-300 to-gray-400';
        }
    };

    const getPasswordStrengthText = (strength: number) => {
        switch (strength) {
            case 1: return 'Very Weak';
            case 2: return 'Weak';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return 'Enter a password';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Loading Overlay */}
            {loading && <LoadingSpinnerWithOverlay />}

            {/* Header */}
            <header className="w-full max-w-md mb-8 text-center z-10">
                <Link
                    href="/"
                    className="flex items-center justify-center space-x-2 mb-6 group"
                >
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <FaLock className="text-white text-xl" />
                    </div>
                    <div className="flex flex-col items-start">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-900 to-teal-700 bg-clip-text text-transparent">
                            StayUnfiltered
                        </h1>
                        <p className="text-sm text-teal-600 font-medium">Secure Account Recovery</p>
                    </div>
                </Link>

                <div className="mb-8">
                    <div className="flex justify-center space-x-4 mb-6">
                        {['email', 'otp', 'newPassword', 'success'].map((step, index) => (
                            <div key={step} className="flex items-center">
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                    ${currentStep === step
                                        ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg'
                                        : index < ['email', 'otp', 'newPassword', 'success'].indexOf(currentStep)
                                            ? 'bg-teal-500 text-white'
                                            : 'bg-teal-100 text-teal-400'
                                    }
                                    transition-all duration-300
                                `}>
                                    {index < ['email', 'otp', 'newPassword', 'success'].indexOf(currentStep) ? (
                                        <FaCheck className="text-xs" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                {index < 3 && (
                                    <div className={`
                                        w-12 h-1 mx-2
                                        ${index < ['email', 'otp', 'newPassword', 'success'].indexOf(currentStep)
                                            ? 'bg-teal-500'
                                            : 'bg-teal-200'
                                        }
                                        transition-all duration-300
                                    `} />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-teal-900">
                            {currentStep === 'email' && 'Reset Your Password'}
                            {currentStep === 'otp' && 'Verify Identity'}
                            {currentStep === 'newPassword' && 'Create New Password'}
                            {currentStep === 'success' && 'Password Updated!'}
                        </h2>
                        <p className="text-teal-700">
                            {currentStep === 'email' && "Enter your email address and we'll send you a verification code"}
                            {currentStep === 'otp' && 'Enter the 6-digit code sent to your email'}
                            {currentStep === 'newPassword' && 'Create a strong, unique password for your account'}
                            {currentStep === 'success' && 'Your password has been successfully updated'}
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full mb-20 max-w-2xl z-10">
                {/* Step 1: Email Input */}
                {currentStep === 'email' && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 transform transition-all duration-300 hover:shadow-2xl">
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <label className="text-gray-700 font-medium flex items-center">
                                    <FaUser className="mr-2 text-teal-600" />
                                    Select Your Role
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {roleOptions.map((roles) => (
                                        <div
                                            key={roles.id}
                                            className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1
                ${role === roles.id
                                                    ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200'
                                                    : 'border-gray-200 hover:border-teal-300'
                                                }`}
                                            onClick={() => setRole(roles.id)}
                                        >
                                            {/* Selection Indicator */}
                                            <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                ${role === roles.id
                                                    ? 'bg-teal-500 border-teal-500'
                                                    : 'border-gray-300'
                                                }`}
                                            >
                                                {role === roles.id && (
                                                    <FaCheck className="w-3 h-3 text-white" />
                                                )}
                                            </div>

                                            {/* Role Icon */}
                                            <div className={`p-3 rounded-lg w-fit mb-3 transition-colors
                ${role === roles.id
                                                    ? 'bg-teal-100 text-teal-600'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}
                                            >
                                                {roles.icon}
                                            </div>

                                            {/* Role Label */}
                                            <h3 className={`font-semibold text-lg mb-1
                ${role === roles.id ? 'text-teal-700' : 'text-gray-800'}`}
                                            >
                                                {roles.label}
                                            </h3>

                                            {/* Role Description */}
                                            <p className="text-sm text-gray-600">
                                                {roles.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {role && (
                                    <p className="text-sm text-teal-600 font-medium">
                                        Selected: <span className="font-bold capitalize">{role}</span>
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-700 mb-2 font-medium flex items-center">
                                    <FaEnvelope className="mr-2 text-teal-600" />
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="relative w-full pl-12 pr-4 py-4 border-2 border-teal-100 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 bg-white/50"
                                        required
                                        autoComplete="email"
                                    />
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400">
                                        <FaEnvelope />
                                    </div>
                                </div>
                                <p className="text-sm text-teal-600">
                                    We'll send a verification code to this email
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <Link
                                    href="/pages/login"
                                    className="flex items-center text-teal-600 hover:text-teal-800 font-medium transition-colors group"
                                >
                                    <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Back to Login
                                </Link>
                                <button
                                    type="submit"
                                    disabled={loading || !email}
                                    className="relative group"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                                    <div className="relative bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed">
                                        Send Code
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 2: OTP Verification */}
                {currentStep === 'otp' && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 animate-fade-in">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-50 rounded-full mb-6 ring-4 ring-teal-50">
                                <FaEnvelope className="text-3xl text-teal-600" />
                            </div>
                            <h3 className="text-xl font-bold text-teal-900 mb-2">
                                Check Your Email
                            </h3>
                            <p className="text-teal-700">
                                We sent a code to <span className="font-semibold text-teal-800">{email}</span>
                            </p>
                        </div>

                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            {/* OTP Input */}
                            <div className="space-y-3">
                                <label className="block text-gray-700 font-medium text-center">
                                    Enter Verification Code
                                </label>
                                <div className="flex justify-center space-x-3">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <input
                                            key={index}
                                            name={`otp-${index}`}
                                            type="text"
                                            maxLength={1}
                                            value={otp[index]}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            className="w-14 h-14 text-center text-3xl font-bold text-teal-900 bg-white border-2 border-teal-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
                                        />
                                    ))}
                                </div>

                                {/* Countdown Timer */}
                                {countdown > 0 && (
                                    <div className="text-center">
                                        <div className="inline-flex items-center space-x-2 text-sm text-teal-600">
                                            <span className="font-mono font-bold">{formatTime(countdown)}</span>
                                            <span>remaining</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={otp.join('').length !== 6 || loading}
                                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                            Verifying...
                                        </span>
                                    ) : 'Verify & Continue'}
                                </button>

                                <div className="flex items-center justify-end">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCurrentStep('email');
                                            setOtp(Array(6).fill(''));
                                        }}
                                        className="text-teal-600 hover:text-teal-800 font-medium transition-colors"
                                    >
                                        ← Use different email
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 3: New Password */}
                {currentStep === 'newPassword' && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 animate-fade-in">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-50 rounded-full mb-6 ring-4 ring-teal-50">
                                <FaShieldAlt className="text-3xl text-teal-600" />
                            </div>
                            <h3 className="text-xl font-bold text-teal-900 mb-2">
                                Create New Password
                            </h3>
                            <p className="text-teal-700">
                                Your new password must be different from previous ones
                            </p>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            {/* New Password */}
                            <div className="space-y-2">
                                <label className="text-gray-700 mb-2 font-medium flex items-center">
                                    <FaLock className="mr-2 text-teal-600" />
                                    New Password
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-4 border-2 border-teal-100 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 bg-white/50"
                                        placeholder="Enter new password"
                                        required
                                    />
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400">
                                        <FaLock />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                {/* Password Strength Meter */}
                                {newPassword && (
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">Password Strength</span>
                                            <span className={`text-sm font-bold ${passwordStrength === 4 ? 'text-teal-600' :
                                                passwordStrength === 3 ? 'text-yellow-600' :
                                                    passwordStrength === 2 ? 'text-orange-600' :
                                                        'text-red-600'
                                                }`}>
                                                {getPasswordStrengthText(passwordStrength)}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${getPasswordStrengthColor(passwordStrength)} transition-all duration-500`}
                                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                            ></div>
                                        </div>
                                        <ul className="text-xs text-gray-600 space-y-1 mt-2">
                                            <li className={`flex items-center ${newPassword.length >= 8 ? 'text-teal-600' : ''}`}>
                                                <span className="mr-2">{newPassword.length >= 8 ? '✓' : '○'}</span>
                                                At least 8 characters
                                            </li>
                                            <li className={`flex items-center ${/[A-Z]/.test(newPassword) ? 'text-teal-600' : ''}`}>
                                                <span className="mr-2">{/[A-Z]/.test(newPassword) ? '✓' : '○'}</span>
                                                Contains uppercase letter
                                            </li>
                                            <li className={`flex items-center ${/[0-9]/.test(newPassword) ? 'text-teal-600' : ''}`}>
                                                <span className="mr-2">{/[0-9]/.test(newPassword) ? '✓' : '○'}</span>
                                                Contains number
                                            </li>
                                            <li className={`flex items-center ${/[^A-Za-z0-9]/.test(newPassword) ? 'text-teal-600' : ''}`}>
                                                <span className="mr-2">{/[^A-Za-z0-9]/.test(newPassword) ? '✓' : '○'}</span>
                                                Contains special character
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-gray-700 mb-2 font-medium flex items-center">
                                    <FaLock className="mr-2 text-teal-600" />
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-4 border-2 border-teal-100 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 bg-white/50"
                                        placeholder="Confirm new password"
                                        required
                                    />
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400">
                                        <FaLock />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-400 hover:text-teal-600"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                {confirmPassword && newPassword !== confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Passwords don't match
                                    </p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                            Updating...
                                        </span>
                                    ) : 'Update Password'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setCurrentStep('otp')}
                                    className="w-full text-teal-600 hover:text-teal-800 font-medium transition-colors"
                                >
                                    ← Back to verification
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 4: Success */}
                {currentStep === 'success' && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center animate-fade-in">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-teal-50 rounded-full mb-6 ring-4 ring-green-50">
                            <FaCheck className="text-4xl text-green-600" />
                        </div>

                        <h3 className="text-2xl font-bold text-teal-900 mb-3">
                            Password Updated!
                        </h3>
                        <p className="text-teal-700 mb-2">
                            Your password has been successfully changed
                        </p>

                        <div className="space-y-4">
                            <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-4 text-left">
                                <div className="flex items-start">
                                    <div className="bg-teal-100 p-2 rounded-lg mr-3">
                                        <FaLock className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-teal-800 mb-1">Security Tip</p>
                                        <p className="text-xs text-teal-700">
                                            Use a unique password for StayUnfiltered. Consider using a password manager for better security.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-3 pt-4">
                                <Link
                                    href="/pages/login"
                                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-center"
                                >
                                    Login with New Password
                                </Link>
                                <Link
                                    href="/"
                                    className="text-teal-600 hover:text-teal-800 font-medium transition-colors"
                                >
                                    ← Return to Homepage
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <style jsx global>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}