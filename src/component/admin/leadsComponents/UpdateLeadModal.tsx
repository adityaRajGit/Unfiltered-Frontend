import { updateLead } from '@/store/leadSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingSpinnerWithOverlay } from '../../global/Loading';
import { listPackage } from '@/store/packageSlice';
import { Package } from '../packagesComponents/PackageSetion';

interface Lead {
    _id: string;
    company?: string;
    employees?: string;
    email?: string;
    stage: 'open' | 'proposal_sent' | 'negotiation' | 'closed_won' | 'closed_lost';
    boughtPackage?: boolean;
    updated_at?: Date;
}

interface CompanyData {
    name: string;
    size: string;
    industry: string;
    company_mail: string;
    website: string;
    address: string;
    package: string;
}

interface UpdateLeadPopupProps {
    lead: Lead;
    onClose: () => void;
    fetchLeads: () => void;
}

const UpdateLeadPopup: React.FC<UpdateLeadPopupProps> = ({ lead, onClose, fetchLeads }) => {
    const [status, setStatus] = useState<'open' | 'proposal_sent' | 'negotiation' | 'closed_won' | 'closed_lost'>(lead.stage);
    const [companyData, setCompanyData] = useState<CompanyData>({
        name: lead.company || '',
        size: lead.employees || '',
        industry: '',
        company_mail: lead.email || '',
        website: '',
        address: '',
        package: ''
    });
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState<Package[]>([]);
    const dispatch = useDispatch()

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as 'open' | 'proposal_sent' | 'negotiation' | 'closed_won' | 'closed_lost');
    };

    const handleCompanyChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setCompanyData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CompanyData, string>> = {};
        toast.dismiss()

        if (!companyData.name) newErrors.name = 'Company name is required';
        if (!companyData.size) newErrors.size = 'Company size is required';
        if (!companyData.industry) newErrors.industry = 'Industry is required';
        if (!companyData.company_mail) newErrors.company_mail = 'Company email is required';
        if (!companyData.website) newErrors.website = 'Website is required';
        if (!companyData.address) newErrors.address = 'Address is required';
        if (!companyData.package) newErrors.package = 'Package is required';

        // Show all validation errors via toast
        const errorMessages = Object.values(newErrors);
        if (errorMessages.length > 0) {
            errorMessages.forEach(msg => toast.error(msg));
            return false;
        }

        return true;
    };

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const params = {
                pageNum: 1,
                pageSize: 50,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listPackage(params as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                setPackages(response.payload.data.packageList);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch packages");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (status === 'closed_won' && !validateForm()) {
            return;
        }

        const data = status === 'closed_won'
            ? { ...companyData, stage: status }
            : { stage: status };

        const payload = {
            data,
            id: lead._id,
        };
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(updateLead(payload as any) as any);

        if (response?.error) {
            toast.error(response.error.message);
            setLoading(false);
        } else if (response.payload?.data) {
            toast.success('Lead updated successfully');
            onClose();
            fetchLeads();
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages()
    }, [])


    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex flex-col justify-between overflow-hidden h-[90vh] overflow-y-scroll" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#007169 #f5f5f5'
            }}>
                {
                    loading && <LoadingSpinnerWithOverlay />
                }
                <div>
                    {/* Header */}
                    <div className="py-4 px-6 text-white font-semibold text-lg" style={{ backgroundColor: '#007169' }}>
                        Update Lead Status
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <div className="mb-6">
                            <label htmlFor="status" className="block text-gray-700 text-sm font-medium mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={handleStatusChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169]"
                            >
                                <option value="open">Open</option>
                                <option value="proposal_sent">Proposal Sent</option>
                                <option value="negotiation">Negotiation</option>
                                <option value="closed_won">Closed Won</option>
                                <option value="closed_lost">Closed Lost</option>
                            </select>
                        </div>

                        {status === 'closed_won' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-800">Company Information</h3>

                                {/* Company Name */}
                                <div>
                                    <label htmlFor="companyName" className="block text-gray-700 text-sm font-medium mb-2">
                                        Company Name*
                                    </label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="name"
                                        value={companyData.name}
                                        onChange={handleCompanyChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169] border-gray-300`}
                                    />
                                </div>

                                {/* Company Size */}
                                <div>
                                    <label htmlFor="companySize" className="block text-gray-700 text-sm font-medium mb-2">
                                        Company Size*
                                    </label>
                                    <input
                                        type="text"
                                        id="companySize"
                                        name="size"
                                        value={companyData.size}
                                        onChange={handleCompanyChange}
                                        placeholder="e.g., 50-100 employees"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169] border-gray-300`}
                                    />
                                </div>

                                {/* Industry */}
                                <div>
                                    <label htmlFor="industry" className="block text-gray-700 text-sm font-medium mb-2">
                                        Industry
                                    </label>
                                    <input
                                        type="text"
                                        id="industry"
                                        name="industry"
                                        value={companyData.industry}
                                        onChange={handleCompanyChange}
                                        placeholder="e.g., Technology"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169]"
                                    />
                                </div>

                                {/* Website */}
                                <div>
                                    <label htmlFor="website" className="block text-gray-700 text-sm font-medium mb-2">
                                        Website
                                    </label>
                                    <input
                                        type="text"
                                        id="website"
                                        name="website"
                                        value={companyData.website}
                                        onChange={handleCompanyChange}
                                        placeholder="https://www.example.com"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169]"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={companyData.address}
                                        onChange={handleCompanyChange}
                                        placeholder="123 Main St, City, Country"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169]"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="companyEmail" className="block text-gray-700 text-sm font-medium mb-2">
                                        Company Email
                                    </label>
                                    <input
                                        type="email"
                                        id="companyEmail"
                                        name="company_mail"
                                        value={companyData.company_mail}
                                        onChange={handleCompanyChange}
                                        placeholder="contact@company.com"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169]"
                                    />
                                </div>

                                {/* Package */}
                                <div>
                                    <label htmlFor="package" className="block text-gray-700 text-sm font-medium mb-2">
                                        Package*
                                    </label>
                                    <select
                                        id="package"
                                        name="package"
                                        value={companyData.package}
                                        onChange={handleCompanyChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169] border-gray-300`}
                                    >
                                        <option value="">Select a package</option>
                                        {
                                            packages.map((item) => (<option key={item._id} value={item._id}>{item.name}</option>))
                                        }
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end py-4 px-6 gap-3" style={{ backgroundColor: '#d3f9f1' }}>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-white rounded-md transition-colors"
                        style={{ backgroundColor: '#007169' }}
                    >
                        Confirm Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateLeadPopup;
