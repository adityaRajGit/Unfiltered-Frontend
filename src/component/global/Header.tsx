"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaUser, FaSignInAlt, FaTimes } from 'react-icons/fa';
import { TOKEN } from '@/utils/enum';
import { decodeToken } from '@/utils/decodeToken';
import Image from 'next/image';
import { getInitials } from '@/utils/GetInitials';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, logoutUser } from '@/store/userSlice';
import { getTherapistDetails, logoutTherapist } from '@/store/therapistSlice';


interface UserData {
    name: string;
    email: string;
    _id: string;
    phone: string;
    username: string;
    profile_image: string;
}


export const Header = () => {
    const [user, setUser] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem(TOKEN) : null;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter()
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();
    const dispatch = useDispatch()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userDataFromStore = useSelector((state: any) => state.user.user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const therapistDataFromStore = useSelector((state: any) => state.therapist.therapist);


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.removeItem(TOKEN);
            setUser(false);
            dispatch(logoutTherapist())
            dispatch(logoutUser())
            setIsDropdownOpen(false);
            setLoading(false);
            router.push('/');
        }, 1000)
    };

    async function getUser(id: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(getUserDetails(id as any) as any);
        if (response?.error) {
            setLoading(false)
        } else {
            setLoading(false)
        }
    }
    async function getTherapist(id: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(getTherapistDetails(id as any) as any)
        if (response?.error) {
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Corporate Wellness', href: '/pages/corporate' },
        { name: 'Blogs', href: '/pages/blogs' },
        // { name: 'Therapy', href: '/counsellor' },
        { name: 'About', href: '/pages/about' },
        { name: 'FAQ', href: '/pages/faq' },
    ];

    useEffect(() => {
        if (userDataFromStore) {
            setUserData(userDataFromStore)
        }
        if (therapistDataFromStore) {
            setUserData(therapistDataFromStore)
        }
    }, [userDataFromStore, therapistDataFromStore])

    useEffect(() => {
        if (storedToken !== null) {
            const decodedToken = decodeToken(storedToken as string);
            if (decodedToken?.userId) {
                setUser(true);
                if (decodedToken?.userId?.role === 'user') {
                    getUser(decodedToken?.userId?._id)
                } else {
                    getTherapist(decodedToken?.userId?._id)
                }
            }
        }
        setLoading(false);
    }, [storedToken])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) {
        return (
            <nav className="flex items-center justify-between px-4 sm:px-6 py-3 text-sm font-normal text-black bg-white shadow-sm sticky top-0 z-30">
                {/* Mobile Menu Button Skeleton */}
                <div className="md:hidden p-2 rounded-md text-gray-600">
                    <div className="h-6 w-6 bg-gray-200 rounded-md animate-pulse" />
                </div>

                {/* Logo Skeleton */}
                <div className="flex items-center space-x-1 font-semibold text-lg ml-2 md:ml-0">
                    <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Navigation Links - Desktop Skeleton */}
                <ul className="hidden md:flex items-center space-x-6">
                    {[...Array(6)].map((_, i) => (
                        <li key={i}>
                            <div className={`w-16 h-4 bg-gray-200 rounded animate-pulse`} />
                        </li>
                    ))}
                </ul>

                {/* User Action Skeleton */}
                <div className="flex items-center space-x-4">
                    <div className="hidden sm:inline-flex">
                        <div className="w-20 h-9 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="md:hidden flex">
                        <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <Link href="/" className="flex items-center space-x-1 font-semibold text-lg">
                        <span>Stay</span>
                        <span className="font-light">Unfiltered</span>
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <nav className="p-5">
                    <ul className="space-y-4">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex font-semibold items-center py-2 px-3 rounded-lg ${pathname === item.href
                                        ? 'bg-teal-50 text-teal-600'
                                        : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        {user ? (
                            <Link
                                href="/profile"
                                className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700"
                            >
                                <FaUser className="mr-3" />
                                My Profile
                            </Link>
                        ) : (
                            <Link
                                href="/pages/login"
                                className="flex items-center py-2 px-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                            >
                                <FaSignInAlt className="mr-3" />
                                Login / Sign Up
                            </Link>
                        )}
                    </div>
                </nav>
            </div>

            {/* Main Header */}
            <nav className="flex items-center justify-between px-4 sm:px-6 py-3 text-sm font-normal text-black bg-white shadow-sm sticky top-0 z-30">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                    aria-label="Open menu"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center space-x-1 font-semibold text-lg ml-2 md:ml-0">
                    <span>Stay</span>
                    <span className="font-light">Unfiltered</span>
                </Link>

                {/* Navigation Links - Desktop */}
                <ul className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`py-2 px-1 font-semibold transition-colors duration-200 ${pathname === item.href
                                    ? 'text-teal-600 border-b-2 border-teal-600'
                                    : 'text-gray-600 hover:text-teal-600'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* User Actions */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="relative">
                            <button
                                ref={buttonRef}
                                onClick={toggleDropdown}
                                className="w-9 h-9 rounded-full bg-gray-100 border-2 border-teal-500 overflow-hidden flex items-center justify-center focus:outline-none"
                            >
                                {userData?.profile_image ? (
                                    <Image src={userData.profile_image} width={100} height={100} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-teal-600 font-bold text-sm uppercase">
                                        {getInitials(userData?.name || '')}
                                    </span>
                                )}
                            </button>

                            {isDropdownOpen && (
                                <div ref={dropdownRef} className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-teal-500 flex items-center justify-center">
                                            {userData?.profile_image ? (
                                                <Image src={userData.profile_image} width={100} height={100} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-teal-600 font-bold text-lg uppercase">
                                                    {getInitials(userData?.name || '')}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{userData?.name}</p>
                                            <p className="text-xs text-gray-500">@{userData?.username}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col p-2">
                                        <Link
                                            href="/pages/account"
                                            className="text-sm px-4 py-2 hover:bg-gray-100 rounded-md transition"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Manage Your Account
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="text-sm px-4 py-2 text-left hover:bg-gray-100 rounded-md transition text-red-500"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/pages/login"
                                className="hidden sm:inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                href="/pages/login"
                                className="md:hidden flex items-center p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700"
                            >
                                <FaSignInAlt className="text-lg" />
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

