"use client";
import LeadSections from '@/component/admin/leadsComponents/LeadSection';
import Statistics from '@/component/admin/Statistics';
import { LoadingSpinnerWithOverlay } from '@/component/global/Loading';
import { logoutAdmin } from '@/store/adminSlice';
import { decodeToken } from '@/utils/decodeToken';
import { ADMINTOKEN } from '@/utils/enum';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import {
    FaChartBar,
    FaUsers,
    FaBuilding,
    FaUser,
    FaUserFriends,
    FaFileAlt,
    FaVideo,
    FaTimes,
    FaBars,
    FaCog,
    FaSignOutAlt,
    FaBoxOpen
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import PackageSections from '@/component/admin/packagesComponents/PackageSetion';
import CompanySections from '@/component/admin/companyComponents/CompanySection';
import WebinarSection from '@/component/admin/webinarComponents/WebinarSection';
import TherapistsSection from '@/component/admin/therapistComponents/TherapistsSection';
import UsersSection from '@/component/admin/usersComponents/UsersSection';

interface Admin {
    name: string;
    email: string;
}

// Placeholder components for other sections
const BlogsSection = () => <SectionPlaceholder title="Blogs Management" />;

const SectionPlaceholder = ({ title }: { title: string }) => (
    <div className="p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-gray-500">Content will be displayed here</div>
    </div>
);

// Navigation items
const navItems = [
    { id: 'statistics', label: 'Statistics', icon: FaChartBar },
    { id: 'leads', label: 'Leads', icon: FaUsers },
    { id: 'company', label: 'Company', icon: FaBuilding },
    { id: 'therapists', label: 'Therapists', icon: FaUser },
    { id: 'users', label: 'Users', icon: FaUserFriends },
    { id: 'blogs', label: 'Blogs', icon: FaFileAlt },
    { id: 'webinars', label: 'Webinars', icon: FaVideo },
    { id: 'packages', label: 'Packages', icon: FaBoxOpen },
];

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState('statistics');
    const [adminDetails, setAdminDetails] = useState<Admin | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const dispatch = useDispatch()
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem(ADMINTOKEN) : null;


    const renderSection = () => {
        switch (activeSection) {
            case 'statistics': return <Statistics />;
            case 'leads': return <LeadSections />;
            case 'company': return <CompanySections />;
            case 'therapists': return <TherapistsSection />;
            case 'users': return <UsersSection />;
            case 'blogs': return <BlogsSection />;
            case 'webinars': return <WebinarSection />;
            case 'packages': return <PackageSections />;
            default: return <Statistics />;
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Type assertion to satisfy .contains()
            if (
                dropdownRef.current &&
                event.target instanceof Node &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            dispatch(logoutAdmin())
            toast.success('Admin logged out successfully!');
            router.push('/');
        }, 2000)
    };

    useEffect(() => {
        if (storedToken !== null) {
            const decodedToken = decodeToken(storedToken as string);
            const allowedRoles = ['Admin', 'superadmin', 'eventmanager'];
            if (allowedRoles.includes(decodedToken?.userId?.role)) {
                setLoading(false);
                setAdminDetails(decodedToken?.userId);
            } else {
                localStorage.removeItem(ADMINTOKEN);
                router.push('/');
            }
        } else {
            localStorage.removeItem(ADMINTOKEN);
            router.push('/');
        }
    }, [storedToken])


    return (
        <div className="flex min-h-screen bg-gray-50">
            {
                loading
                    ? <LoadingSpinnerWithOverlay />
                    : <>
                        {/* Mobile sidebar toggle button */}
                        <button
                            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#009689] text-white"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>

                        {/* Fixed Sidebar */}
                        <aside
                            className={`fixed z-40 w-64 bg-gray-800 text-white h-screen transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                                } md:translate-x-0 md:static md:z-auto`}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                height: '100vh',
                                overflowY: 'auto',
                            }}
                        >
                            <div className="flex flex-col h-full">
                                {/* Logo and Title */}
                                <div className="p-4 border-b border-gray-700 flex-shrink-0">
                                    <div className="text-xl font-bold text-[#009689] flex items-center">
                                        <FaCog className="mr-2" /> Admin Panel
                                    </div>
                                    <div className="text-sm text-gray-400">Dashboard</div>
                                </div>

                                {/* Navigation - Scrollable if needed */}
                                <nav style={{
                                    scrollbarWidth: "none"
                                }} className="flex-1 overflow-y-auto">
                                    <ul>
                                        {navItems.map((item) => (
                                            <li key={item.id}>
                                                <button
                                                    className={`w-full text-left px-6 py-3 flex items-center transition-colors ${activeSection === item.id
                                                        ? 'bg-[#009689] text-white'
                                                        : 'text-gray-300 hover:bg-gray-700'
                                                        }`}
                                                    onClick={() => {
                                                        setActiveSection(item.id);
                                                        if (window.innerWidth < 768) setSidebarOpen(false);
                                                    }}
                                                >
                                                    <item.icon className="h-5 w-5 mr-3" />
                                                    {item.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>

                                {/* Admin Info - Fixed at bottom */}
                                <div className="p-4 border-t border-gray-700 flex-shrink-0">
                                    <div className="flex items-center">
                                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                                            <FaUser className="text-gray-600" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium">{adminDetails?.name}</div>
                                            <div className="text-xs text-gray-400">{adminDetails?.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main content with proper spacing */}
                        <main 
                            className={`flex-1 min-h-screen transition-all duration-300 ${
                                sidebarOpen ? 'md:ml-64' : 'md:ml-0'
                            }`}
                        >
                            {/* Fixed Header */}
                            <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-30">
                                <h1 className="text-xl font-bold capitalize">
                                    {navItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
                                </h1>
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="flex items-center justify-center rounded-full focus:outline-none"
                                        aria-label="User menu"
                                        aria-haspopup="true"
                                        aria-expanded={isOpen}
                                    >
                                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center hover:bg-gray-300 transition-colors">
                                            <FaUser className="text-gray-600" />
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <FaSignOutAlt className="mr-3" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </header>

                            {/* Scrollable Content Area */}
                            <div className="p-6">
                                {renderSection()}
                            </div>
                        </main>
                    </>
            }
        </div>
    );
}