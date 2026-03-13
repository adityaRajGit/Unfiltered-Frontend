"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaEye, FaEyeSlash, FaUserMd, FaBuilding } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { login, signup } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { LoadingSpinnerWithOverlay } from '@/component/global/Loading';
import { GoogleSignIn, GoogleSignUp } from '@/component/Authentication';
import { loginTherapist, signupTherapist } from '@/store/therapistSlice';
import { sendOtp, verifyOtp } from '@/store/otpSlice';
import { employeeSignup } from '@/store/employeeSlice';
import { fbLead } from '@/lib/PixelHelpers';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'user' | 'therapist' | 'employee'>('employee'); // Now used in both login and signup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [redirectFrom, setRedirectFrom] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailOtpPopup, setEmailOtpPopup] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password || (formData.password.length < 8 && !isLogin)) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Full name is required.";
      }
      if (!formData.phone || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = "Enter a valid 10-digit phone number.";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors).join(' '));
    }
    return Object.keys(newErrors).length === 0;
  };

  function clearForm() {
    setFormData({
      name: '',
      phone: '',
      email: '',
      password: '',
    });
    setRole('employee');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    if (validateForm()) {
      if (isLogin) {
        if (role === 'user') {
          const loginData = { ...formData, role };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = await dispatch(login(loginData as any) as any);
          if (response?.error) {
            setLoading(false)
            toast.error(response.error.message)
          } else {
            toast.success("User Logged in Successfully")
            fbLead(loginData)
            if (redirectFrom) {
              router.push('/pages/one-on-one')
            } else {
              router.push('/')
            }
            clearForm()
          }
        } else if (role === 'employee') {
          const loginData = { ...formData, role };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = await dispatch(login(loginData as any) as any);
          if (response?.error) {
            setLoading(false)
            toast.error(response.error.message)
          } else {
            toast.success("Employee Logged in Successfully")
            fbLead(loginData)
            router.push('/')
            clearForm()
          }
        } else {
          const loginData = { ...formData, role };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = await dispatch(loginTherapist(loginData as any) as any);
          if (response?.error) {
            setLoading(false)
            toast.error(response.error.message)
          } else {
            toast.success("Therapist Logged in Successfully")
            fbLead(loginData)
            router.push('/')
            clearForm()
          }
        }
      } else {
        if (!emailOtpPopup) {
          sendEmailOtp();
          return;
        }
        if (role === 'user') {
          const signupData = { ...formData, role };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = await dispatch(signup(signupData as any) as any);
          if (response?.error) {
            setLoading(false)
            toast.error(response.error.message);
          } else {
            toast.success('Account created successfully!');
            fbLead(signupData)
            if (redirectFrom) {
              router.push('/pages/one-on-one')
            } else {
              router.push('/')
            }
            clearForm()
          }
        } else if (role === 'employee') {
          const signupData = { ...formData, role };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = await dispatch(employeeSignup(signupData as any) as any);
          if (response?.error) {
            setLoading(false)
            toast.error(response.error.message);
          } else {
            toast.success('Account created successfully!');
            fbLead(signupData)
            router.push('/');
            clearForm()
          }
        }
        else {
          const signupData = { ...formData, role };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = await dispatch(signupTherapist(signupData as any) as any);
          if (response?.error) {
            setLoading(false)
            toast.error(response.error.message);
          } else {
            toast.success('Account created successfully!');
            fbLead(signupData)
            router.push('/');
            clearForm()
          }
        }
      }
    }
    setLoading(false)
  };

  async function sendEmailOtp() {
    if (validateForm()) {
      if (!isLogin) {
        setLoading(true)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(sendOtp({ email: formData.email } as any) as any);
        if (response?.error) {
          toast.error(response.error.message);
        } else {
          // console.log(response.payload)
          toast.success('OTP sent successfully!');
          setEmailOtpPopup(true)
        }
        setLoading(false)
      }
    }
  }

  async function verifyEmailOtp() {
    if (validateForm()) {
      if (!isLogin) {
        setLoading(true)
        const data = {
          email: formData.email,
          otp: otp
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(verifyOtp(data as any) as any);
        if (response?.error) {
          toast.error(response.error.message);
          setLoading(false)
          setOtp('')
        } else {
          // console.log(response.payload)
          toast.success('OTP Verified successfully!');
          setEmailOtpPopup(false)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleSubmit(new Event('submit') as any)
        }

      }
    }
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const closeOtpPopup = () => {
    setEmailOtpPopup(false);
    setOtp('');
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("redirectInfo") || "{}");
    if (data.from) {
      setRole(data.from);
      setRedirectFrom(true);
      // clear after use
      sessionStorage.removeItem("redirectInfo");
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex flex-col items-center justify-center p-4">
      {/* Header */}
      {
        loading && <LoadingSpinnerWithOverlay />
      }
      <header className="w-full max-w-md mb-8">
        <Link href="/" className="flex items-center justify-center space-x-1 text-2xl font-bold">
          <span className="text-teal-900">Stay</span>
          <span className="text-teal-600 font-light">Unfiltered</span>
        </Link>
        <p className="text-center mt-2 text-teal-700">
          {isLogin ? 'Welcome back to your mental wellness journey' : 'Join our supportive community'}
        </p>
      </header>

      {emailOtpPopup && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            {/* Popup Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Verify Your Email</h2>
                  <p className="text-teal-100 mt-1">We&apos;ve sent a code to {formData.email}</p>
                </div>
                <button
                  onClick={closeOtpPopup}
                  className="text-white hover:text-teal-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Popup Body */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <FaEnvelope className="text-2xl text-teal-600" />
                </div>
                <p className="text-gray-600">
                  Enter the 6-digit verification code sent to your email address.
                </p>
              </div>

              {/* OTP Input */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3 font-medium text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter 6-digit code"
                  className="w-full text-center text-2xl font-mono tracking-widest px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Code expires in 10 minutes
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={verifyEmailOtp}
                  disabled={otp.length !== 6 || loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify & Create Account'}
                </button>

                <button
                  onClick={sendEmailOtp}
                  disabled={loading}
                  className="w-full text-teal-600 hover:text-teal-800 font-medium py-2 transition-colors"
                >
                  Didn&apos;t receive the code? Resend
                </button>
              </div>

              {/* Help Text */}
              <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                <p className="text-sm text-teal-800">
                  <strong>Tip:</strong> Check your spam folder if you don&apos;t see the email.
                  Make sure to enter the code exactly as received.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors duration-300 ${isLogin
              ? 'bg-teal-600 text-white'
              : 'bg-white text-gray-600 hover:bg-teal-50'
              }`}
            onClick={() => { setIsLogin(true); clearForm() }}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors duration-300 ${!isLogin
              ? 'bg-teal-600 text-white'
              : 'bg-white text-gray-600 hover:bg-teal-50'
              }`}
            onClick={() => { setIsLogin(false); clearForm() }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-teal-600" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Role Selection - NOW SHOWN FOR BOTH LOGIN AND SIGNUP */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              {isLogin ? 'I am logging in as:' : 'I am signing up as:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {/* Employee */}
              <button
                type="button"
                onClick={() => setRole('employee')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${role === 'employee'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-300'
                  }`}
              >
                <div
                  className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${role === 'employee' ? 'bg-teal-100' : 'bg-gray-100'
                    }`}
                >
                  <FaBuilding
                    className={`text-xl ${role === 'employee' ? 'text-teal-600' : 'text-gray-500'
                      }`}
                  />
                </div>
                <span className="font-semibold text-gray-900">Employee</span>
                <span className="text-sm text-gray-500 mt-1">Corporate</span>
              </button>

              {/* Therapist */}
              <button
                type="button"
                onClick={() => setRole('therapist')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${role === 'therapist'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-300'
                  }`}
              >
                <div
                  className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${role === 'therapist' ? 'bg-teal-100' : 'bg-gray-100'
                    }`}
                >
                  <FaUserMd
                    className={`text-xl ${role === 'therapist' ? 'text-teal-600' : 'text-gray-500'
                      }`}
                  />
                </div>
                <span className="font-semibold text-gray-900">Therapist</span>
                <span className="text-sm text-gray-500 mt-1">Providing support</span>
              </button>

              {/* Individual */}
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${role === 'user'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-300'
                  }`}
              >
                <div
                  className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${role === 'user' ? 'bg-teal-100' : 'bg-gray-100'
                    }`}
                >
                  <FaUser
                    className={`text-xl ${role === 'user' ? 'text-teal-600' : 'text-gray-500'
                      }`}
                  />
                </div>
                <span className="font-semibold text-gray-900">Individual</span>
                <span className="text-sm text-gray-500 mt-1">Seeking support</span>
              </button>
            </div>

          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-teal-600" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-teal-600" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-teal-600" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-teal-600" />
                ) : (
                  <FaEye className="text-teal-600" />
                )}
              </div>
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end items-center mb-6">
              <Link href="/pages/login/forgot-password" className="text-sm text-teal-600 hover:text-teal-800 transition-colors">
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            {isLogin
              ? (role === 'user' ? 'Login as User' :
                role === 'therapist' ? 'Login as Therapist' : 'Login as Employee')
              : (role === 'user' ? 'Create Account' :
                role === 'therapist' ? 'Apply as Therapist' : 'Register Employee')
            }
          </button>
        </form>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-teal-600 font-medium hover:text-teal-800 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>

          {
            role === 'employee'
              ? null
              : <>
                <div className="mt-4 flex items-center justify-center">
                  <div className="border-t border-gray-300 flex-grow"></div>
                  <span className="px-3 text-gray-500 text-sm">Or continue with</span>
                  <div className="border-t border-gray-300 flex-grow"></div>
                </div>

                {
                  isLogin
                    ? <GoogleSignIn role={role} redirectFrom={redirectFrom} />
                    : <GoogleSignUp role={role} redirectFrom={redirectFrom} />
                }
              </>
          }
        </div>
      </div>

      {/* Role Explanation - Only shown during signup */}
      {!isLogin && (
        <div className="mt-8 max-w-md bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3">Which role should I choose?</h3>
          <div className="space-y-4">
            {/* Employee */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                <FaBuilding className="text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Employee</h4>
                <p className="text-sm text-gray-600">
                  Choose this if you&apos;re part of a company or organization and want to access
                  our mental health and wellness programs through your workplace.
                </p>
              </div>
            </div>

            {/* Therapist */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                <FaUserMd className="text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Therapist</h4>
                <p className="text-sm text-gray-600">
                  Choose this if you&apos;re a licensed mental health professional interested in
                  providing therapy and support through our platform.
                </p>
              </div>
            </div>

            {/* Individual */}
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                <FaUser className="text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Individual</h4>
                <p className="text-sm text-gray-600">
                  Choose this if you&apos;re seeking mental health support, therapy sessions, or
                  want to participate in our community as an individual user.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AuthPages;