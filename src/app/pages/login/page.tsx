"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaEye, FaEyeSlash, FaUserMd, FaUserInjured } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { login, signup } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { LoadingSpinnerWithOverlay } from '@/component/global/Loading';
import { GoogleSignIn, GoogleSignUp } from '@/component/Authentication';
import { loginTherapist, signupTherapist } from '@/store/therapistSlice';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'user' | 'therapist'>('user'); // Now used in both login and signup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
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
    setRole('user');
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
            router.push('/')
            clearForm()
          }
        }
      } else {
        if (role === 'user') {
          const signupData = { ...formData, role };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = await dispatch(signup(signupData as any) as any);
          if (response?.error) {
            setLoading(false)
            toast.error(response.error.message);
          } else {
            toast.success('Account created successfully!');
            router.push('/');
            clearForm()
          }
        } else {
          const signupData = { ...formData, role };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = await dispatch(signupTherapist(signupData as any) as any);
          if (response?.error) {
            setLoading(false)
            toast.error(response.error.message);
          } else {
            toast.success('Account created successfully!');
            router.push('/');
            clearForm()
          }
        }
      }
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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

      {/* Auth Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
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
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === 'user'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-300'
                  }`}
              >
                <div className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center ${role === 'user' ? 'bg-teal-100' : 'bg-gray-100'
                  }`}>
                  <FaUserInjured className={`text-xl ${role === 'user' ? 'text-teal-600' : 'text-gray-500'
                    }`} />
                </div>
                <span className="font-medium">Individual</span>
                <span className="text-xs text-gray-500 mt-1">Seeking support</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('therapist')}
                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === 'therapist'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-300'
                  }`}
              >
                <div className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center ${role === 'therapist' ? 'bg-teal-100' : 'bg-gray-100'
                  }`}>
                  <FaUserMd className={`text-xl ${role === 'therapist' ? 'text-teal-600' : 'text-gray-500'
                    }`} />
                </div>
                <span className="font-medium">Therapist</span>
                <span className="text-xs text-gray-500 mt-1">Providing support</span>
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
              <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-800 transition-colors">
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            {isLogin
              ? (role === 'therapist' ? 'Login as Therapist' : 'Login as User')
              : (role === 'therapist' ? 'Apply as Therapist' : 'Create Account')
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

          <div className="mt-4 flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="px-3 text-gray-500 text-sm">Or continue with</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          {
            isLogin
              ? <GoogleSignIn role={role} />
              : <GoogleSignUp role={role} />
          }
        </div>
      </div>

      {/* Role Explanation - Only shown during signup */}
      {!isLogin && (
        <div className="mt-8 max-w-md bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3">Which role should I choose?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                <FaUserInjured className="text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Individual</h4>
                <p className="text-sm text-gray-600">
                  Choose this if you&apos;re seeking mental health support, therapy sessions,
                  or want to participate in our community.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                <FaUserMd className="text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Therapist</h4>
                <p className="text-sm text-gray-600">
                  Choose this if you&apos;re a licensed mental health professional
                  interested in providing therapy through our platform.
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