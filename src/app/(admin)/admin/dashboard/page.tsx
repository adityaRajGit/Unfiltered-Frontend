"use client";
import LeadSections from '@/component/admin/LeadSections';
import Statistics from '@/component/admin/Statistics';
import { useState } from 'react';
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
    FaCog
} from 'react-icons/fa';

// Placeholder components for other sections
const CompanySection = () => <SectionPlaceholder title="Company Management" />;
const TherapistsSection = () => <SectionPlaceholder title="Therapists Management" />;
const UsersSection = () => <SectionPlaceholder title="Users Management" />;
const BlogsSection = () => <SectionPlaceholder title="Blogs Management" />;
const WebinarsSection = () => <SectionPlaceholder title="Webinars Management" />;

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
];

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState('statistics');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const renderSection = () => {
        switch (activeSection) {
            case 'statistics': return <Statistics />;
            case 'leads': return <LeadSections />;
            case 'company': return <CompanySection />;
            case 'therapists': return <TherapistsSection />;
            case 'users': return <UsersSection />;
            case 'blogs': return <BlogsSection />;
            case 'webinars': return <WebinarsSection />;
            default: return <Statistics />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile sidebar toggle button */}
            <button
                className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-[#009689] text-white"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? (
                    <FaTimes className="h-6 w-6" />
                ) : (
                    <FaBars className="h-6 w-6" />
                )}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed md:relative z-20 w-64 bg-gray-800 text-white min-h-screen transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <div className="p-4 border-b border-gray-700">
                    <div className="text-xl font-bold text-[#009689] flex items-center">
                        <FaCog className="mr-2" /> Admin Panel
                    </div>
                    <div className="text-sm text-gray-400">Dashboard</div>
                </div>

                <nav className="mt-4">
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

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
                    <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                            <FaUser className="text-gray-600" />
                        </div>
                        <div className="ml-3">
                            <div className="text-sm font-medium">Admin User</div>
                            <div className="text-xs text-gray-400">admin@example.com</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-x-hidden">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold capitalize">
                        {navItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                                <FaUser className="text-gray-600" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    {renderSection()}

                  
                </div>
            </main>
        </div>
    );
}