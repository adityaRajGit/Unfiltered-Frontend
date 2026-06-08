// components/CaseHistoryModal.tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    FaTimes, FaStar, FaUserMd, FaBriefcase, FaHeart, FaBrain, FaHistory,
    FaChevronLeft, FaChevronRight, FaSave
} from 'react-icons/fa';
import { LoadingSpinnerWithoutOverlay } from '../global/Loading';
import { useDispatch } from 'react-redux';
import { addAndUpdateUserCaseHistory, getUserCaseHistory } from '@/store/caseHistory';
import { toast } from 'react-toastify';


interface CaseHistoryModalProps {
    userId: string;
    onClose: () => void;
}

// Default empty state matching Mongoose schema
const defaultHistory = {
    therapist: '',
    date: new Date().toISOString().split('T')[0],
    personal_information: {
        name: '',
        date_of_birth: '',
        age: null,
        marital_status: '',
        gender_pronoun_sexual_orientation: '',
        qualifications: '',
        company_name: '',
        company_location: '',
        designation: '',
        language_preferred: '',
        residential_address: '',
        mobile_number: '',
        email_id: '',
        alternate_emergency_contact_name_and_number: ''
    },
    referral_information: {
        source_of_referral: '',
        name_of_person_who_referred: '',
        referrer_contact_details: {
            mobile_number: '',
            email_id: ''
        },
        name_of_informant: ''
    },
    concerns: {
        area_of_concerns: '',
        current_personal_concerns: '',
        current_professional_concerns: '',
        current_self_development_goals: ''
    },
    perception_of_work_environment: {
        trusting_and_open: 3,
        being_heard_and_valued: 3,
        diversity_and_inclusion_priority: 3,
        sensitive_and_empathetic_members: 3,
        strong_effective_leadership_skills: 3
    },
    emotions_as_a_result_of_concerns: {
        happy_joyful: 3,
        anxious_fearful: 3,
        sad_depressed: 3,
        angry: 3
    },
    effect_on_work_factors_due_to_concerns: {
        productivity: 3,
        motivation: 3,
        concentration_focus_attention: 3,
        absenteeism: 3,
        innovation_creativity: 3,
        handling_pressure_and_stress: 3,
        coping_with_present_concerns: 3
    },
    history: {
        medical_history: '',
        past_psychiatric_history: '',
        past_family_psychiatric_history: '',
        substance_history: '',
        past_familial_substance_history: '',
        family_structure: '',
        family_background_and_relationship: '',
        childhood_history: '',
        academic_school_history: '',
        sexual_menstrual_history: '',
        relationship_marital_history: '',
        work_history: '',
        spiritual_history: '',
        pre_morbid_personality: '',
        miscellaneous: ''
    }
};

const MARITAL_STATUS_OPTIONS = [
    'single', 'in a relationship', 'married', 'separated', 'divorced', 'widowed', 'other'
];

const STEPS = [
    { title: 'Personal Info', icon: <FaUserMd /> },
    { title: 'Referral', icon: <FaBriefcase /> },
    { title: 'Concerns', icon: <FaHeart /> },
    { title: 'Ratings', icon: <FaStar /> },
    { title: 'History', icon: <FaBrain /> }
];

// ========== MAPPING FUNCTION: API (with user_profile) -> MODAL SHAPE ==========
function transformApiToModalShape(apiData: any): any {
    const modalData = JSON.parse(JSON.stringify(defaultHistory));
    if (!apiData) return modalData;

    // Personal Information
    if (apiData.user_profile) {
        const up = apiData.user_profile;
        modalData.personal_information.name = `${up.first_name || ''} ${up.last_name || ''}`.trim();
        modalData.personal_information.date_of_birth = up.date_of_birth ? up.date_of_birth.split('T')[0] : '';
        modalData.personal_information.age = up.age ?? null;
        modalData.personal_information.marital_status = up.marital_status || '';
        modalData.personal_information.gender_pronoun_sexual_orientation = 
            [up.gender, up.pronouns].filter(Boolean).join(' / ');
        modalData.personal_information.qualifications = up.education_level || '';
        modalData.personal_information.designation = up.occupation || '';
        modalData.personal_information.language_preferred = up.primary_language || '';
        modalData.personal_information.mobile_number = up.phone_number || '';
        modalData.personal_information.email_id = up.email_address || '';
        modalData.personal_information.alternate_emergency_contact_name_and_number = 
            [up.emergency_contact_name, up.emergency_contact_phone_number].filter(Boolean).join(' - ');
        if (up.company_name) modalData.personal_information.company_name = up.company_name;
        if (up.company_location) modalData.personal_information.company_location = up.company_location;
        if (up.residential_address) modalData.personal_information.residential_address = up.residential_address;
    }

    // Intake & Referral
    if (apiData.intake_information) {
        modalData.date = apiData.intake_information.intake_date
            ? new Date(apiData.intake_information.intake_date).toISOString().split('T')[0]
            : modalData.date;
        modalData.referral_information.source_of_referral = apiData.intake_information.referral_source || '';
        if (apiData.intake_information.primary_reason_for_seeking_help) {
            modalData.concerns.area_of_concerns = apiData.intake_information.primary_reason_for_seeking_help;
        }
    }

    // Concerns from presenting_problem
    if (apiData.presenting_problem) {
        const pp = apiData.presenting_problem;
        if (pp.user_description_of_problem && !modalData.concerns.area_of_concerns) {
            modalData.concerns.area_of_concerns = pp.user_description_of_problem;
        }
        modalData.concerns.current_self_development_goals = pp.expectations_from_therapy || '';
        const desc = pp.user_description_of_problem || '';
        if (desc.toLowerCase().includes('work') || desc.toLowerCase().includes('job')) {
            modalData.concerns.current_professional_concerns = desc;
        } else {
            modalData.concerns.current_personal_concerns = desc;
        }
    }

    // Medical History
    if (apiData.medical_history) {
        const mh = apiData.medical_history;
        const conditions = [...(mh.medical_diagnoses || []), ...(mh.chronic_medical_conditions || [])];
        const meds = (mh.current_medications || []).map((m: any) => `${m.name} ${m.dosage} ${m.frequency}`).join('; ');
        const allergies = (mh.allergies || []).join(', ');
        modalData.history.medical_history = `Diagnoses: ${conditions.join(', ')}. Medications: ${meds}. Allergies: ${allergies}.`;
    }

    // Mental Health / Psychiatric History
    if (apiData.mental_health_history) {
        const mhh = apiData.mental_health_history;
        let psychHistory = '';
        if (mhh.previous_therapy_experience) {
            psychHistory += `Previous therapy (${mhh.type_of_therapy || 'unknown'}): ${mhh.therapy_outcome || ''}. `;
        }
        const prevMeds = (mhh.past_psychiatric_medications || []).map((m: any) => `${m.name} ${m.dosage}`).join(', ');
        if (prevMeds) psychHistory += `Past medications: ${prevMeds}. `;
        if (mhh.medication_effectiveness) psychHistory += `Effectiveness: ${mhh.medication_effectiveness}. `;
        if (mhh.previous_diagnoses) {
            const diag = mhh.previous_diagnoses.map((d: any) => d.diagnosis).join(', ');
            if (diag) psychHistory += `Diagnoses: ${diag}.`;
        }
        modalData.history.past_psychiatric_history = psychHistory.trim();
    }

    // Family History
    if (apiData.family_history) {
        const fh = apiData.family_history;
        if (fh.family_mental_health_history?.details) {
            modalData.history.past_family_psychiatric_history = fh.family_mental_health_history.details;
        }
        if (fh.family_structure) {
            modalData.history.family_structure = typeof fh.family_structure === 'string' 
                ? fh.family_structure 
                : JSON.stringify(fh.family_structure);
        }
        if (fh.family_relationships) {
            modalData.history.family_background_and_relationship = typeof fh.family_relationships === 'string'
                ? fh.family_relationships
                : JSON.stringify(fh.family_relationships);
        }
    }

    // Substance Use
    if (apiData.substance_use) {
        const su = apiData.substance_use;
        const parts = [];
        if (su.alcohol?.use) parts.push(`Alcohol: ${su.alcohol.frequency} (${su.alcohol.quantity || ''})`);
        if (su.tobacco?.use) parts.push(`Tobacco: ${su.tobacco.frequency}`);
        if (su.cannabis?.use) parts.push(`Cannabis: ${su.cannabis.frequency}`);
        if (su.other_substances?.length) {
            parts.push(`Other: ${su.other_substances.map((s: any) => s.name).join(', ')}`);
        }
        modalData.history.substance_history = parts.join('; ');
    }

    // Social History
    if (apiData.social_history) {
        const sh = apiData.social_history;
        if (sh.work_education) {
            if (sh.work_education.job_title) modalData.personal_information.designation = sh.work_education.job_title;
            modalData.history.work_history = `${sh.work_education.job_title || ''} at ${sh.work_education.employer_name || 'unknown'}. Satisfaction: ${sh.work_education.job_satisfaction || ''}/10. Stress level: ${sh.work_education.work_stress_level || ''}`;
        }
        if (sh.relationships) {
            modalData.history.relationship_marital_history = `Status: ${sh.relationships.relationship_status || ''}. Stressors: ${sh.relationships.relationship_stressors || ''}`;
        }
        if (sh.living_situation?.current_living_arrangement) {
            modalData.history.miscellaneous += ` Living: ${sh.living_situation.current_living_arrangement}. `;
        }
    }

    // Strengths & Resources
    if (apiData.strengths_resources) {
        const sr = apiData.strengths_resources;
        if (sr.spiritual_resources?.length) {
            modalData.history.spiritual_history = sr.spiritual_resources.join(', ');
        }
        const miscParts = [];
        if (sr.personal_strengths?.length) miscParts.push(`Strengths: ${sr.personal_strengths.join(', ')}`);
        if (sr.coping_skills?.length) miscParts.push(`Coping: ${sr.coping_skills.join(', ')}`);
        if (sr.hobbies?.length) miscParts.push(`Hobbies: ${sr.hobbies.join(', ')}`);
        if (miscParts.length) {
            modalData.history.miscellaneous += (modalData.history.miscellaneous ? '; ' : '') + miscParts.join('; ');
        }
    }

    return modalData;
}

export default function CaseHistoryModal({ userId, onClose }: CaseHistoryModalProps) {
    const [history, setHistory] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
    const dispatch = useDispatch();

    // Fetch existing case history on mount and auto-fill if data exists
    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const response = await dispatch(getUserCaseHistory() as any);
                if (response?.error) {
                    toast.error(response.error.message);
                    setHistory(JSON.parse(JSON.stringify(defaultHistory)));
                } else {
                    // Try to get userhistory from the response
                    let rawData = response.payload?.data?.userhistory;
                    if (!rawData && response.payload?.data) {
                        // Maybe the whole payload.data is the userhistory object
                        rawData = response.payload.data;
                    }

                    if (rawData && Object.keys(rawData).length > 0) {
                        // Check if this is already in modal shape (has personal_information)
                        if (rawData.personal_information) {
                            // Already in correct format – use directly
                            console.log("Using existing modal-shaped data", rawData);
                            setHistory(rawData);
                        } 
                        // Check if it's the other API format (has user_profile)
                        else if (rawData.user_profile) {
                            const mapped = transformApiToModalShape(rawData);
                            console.log("Transformed from API format", mapped);
                            setHistory(mapped);
                        } 
                        else {
                            // Unknown format – start empty
                            console.warn("Unknown data format, using default");
                            setHistory(JSON.parse(JSON.stringify(defaultHistory)));
                        }
                    } else {
                        // No existing data – empty form
                        setHistory(JSON.parse(JSON.stringify(defaultHistory)));
                    }
                }
            } catch (err: any) {
                console.error("Fetch error", err);
                setError(err.message);
                setHistory(JSON.parse(JSON.stringify(defaultHistory)));
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [userId, dispatch]);

    const handleChange = (path: string, value: any) => {
        setHistory((prev: any) => {
            const newState = JSON.parse(JSON.stringify(prev));
            const keys = path.split('.');
            let target = newState;
            for (let i = 0; i < keys.length - 1; i++) {
                target = target[keys[i]];
            }
            target[keys[keys.length - 1]] = value;
            return newState;
        });
    };

    const handleSave = async () => {
        if (!history) return;
        setSaving(true);
        setError('');
        try {
            const payload = {
                ...history,
                userId
            };
            const response = await dispatch(addAndUpdateUserCaseHistory(payload as any) as any);
            if (response?.error) {
                toast.error(response.error.message);
            } else {
                toast.success("Case history saved successfully");
                onClose();
            }
        } catch (err: any) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    const goToNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Responsive rating slider (touch‑friendly)
    const RatingInput = ({ label, value, path }: { label: string; value: number; path: string }) => {
        const [localValue, setLocalValue] = useState(value || 3);
        const [isDragging, setIsDragging] = useState(false);
        const sliderRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (!isDragging) setLocalValue(value || 3);
        }, [value, isDragging]);

        const getValueFromPosition = (clientX: number) => {
            if (!sliderRef.current) return localValue;
            const rect = sliderRef.current.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percent = x / rect.width;
            const raw = 1 + percent * 4;
            return Math.round(raw);
        };

        const updateValueFromEvent = (clientX: number) => {
            const newVal = getValueFromPosition(clientX);
            setLocalValue(newVal);
            handleChange(path, newVal);
        };

        const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            updateValueFromEvent(clientX);
            e.preventDefault();
        }, [isDragging]);

        const stopDrag = useCallback(() => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', stopDrag);
        }, [handleMove]);

        const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
            e.preventDefault();
            setIsDragging(true);
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            updateValueFromEvent(clientX);
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('touchend', stopDrag);
        };

        const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
            const newVal = getValueFromPosition(e.clientX);
            setLocalValue(newVal);
            handleChange(path, newVal);
        };

        useEffect(() => {
            return () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', stopDrag);
                document.removeEventListener('touchmove', handleMove);
                document.removeEventListener('touchend', stopDrag);
            };
        }, [handleMove, stopDrag]);

        const percent = ((localValue - 1) / 4) * 100;

        return (
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <div
                            ref={sliderRef}
                            className="relative w-full h-3 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors duration-150"
                            onMouseDown={startDrag}
                            onTouchStart={startDrag}
                            onClick={handleTrackClick}
                        >
                            <div
                                className="absolute left-0 top-0 h-full rounded-full bg-teal-500 pointer-events-none transition-all duration-75"
                                style={{ width: `${percent}%` }}
                            />
                            <div
                                className={`
                  absolute top-1/2 -translate-y-1/2 w-7 h-7 md:w-6 md:h-6 rounded-full 
                  bg-white border-2 border-teal-600 shadow-md
                  transition-all duration-75 pointer-events-none
                  ${isDragging ? 'scale-110 shadow-lg border-teal-700' : ''}
                `}
                                style={{ left: `calc(${percent}% - 14px)` }}
                            />
                            {isDragging && (
                                <div
                                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none"
                                    style={{ left: `calc(${percent}% - 12px)`, transform: 'translateX(0%)' }}
                                >
                                    {localValue}
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-7 left-0 text-xs text-gray-400 flex justify-between w-full px-1">
                            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                        </div>
                    </div>
                    <span className={`w-8 text-center font-semibold ${isDragging ? 'text-teal-700 scale-110' : 'text-gray-800'} transition-all`}>
                        {localValue}
                    </span>
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={`${i < localValue ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-100`}
                                size={16}
                            />
                        ))}
                    </div>
                </div>
                {isDragging && (
                    <div className="text-xs text-teal-600 mt-1 animate-pulse text-center">
                        Drag left/right – current: {localValue}
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8">
                    <LoadingSpinnerWithoutOverlay />
                </div>
            </div>
        );
    }

    if (!history) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0 md:p-4">
            <div className="bg-white w-full h-full md:h-auto md:rounded-2xl md:shadow-2xl md:max-w-5xl md:max-h-[90vh] md:overflow-y-auto flex flex-col">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center flex-wrap gap-2 z-10">
                    <h2 className="text-xl md:text-2xl font-bold text-teal-800 flex items-center">
                        <FaHistory className="mr-2 text-teal-600" />
                        <span className="hidden sm:inline">Clinical Intake Form</span>
                        <span className="sm:hidden">Intake</span>
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>

                {/* Step Indicator - responsive */}
                <div className="px-4 pt-3 pb-2 md:px-6 md:pt-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        {STEPS.map((step, idx) => (
                            <div
                                key={idx}
                                className={`flex-1 relative ${idx < STEPS.length - 1 ? 'after:content-[""] after:absolute after:top-1/2 after:right-0 after:w-full after:h-0.5 after:bg-gray-200 after:-translate-y-1/2' : ''}`}
                            >
                                <div className="relative z-10 flex flex-col items-center">
                                    <div
                                        className={`
                      w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm
                      transition-colors duration-200
                      ${idx <= currentStep ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}
                    `}
                                    >
                                        {idx + 1}
                                    </div>
                                    <span className={`text-[10px] md:text-xs mt-1 md:mt-2 ${idx <= currentStep ? 'text-teal-700 font-medium' : 'text-gray-400'} hidden sm:block`}>
                                        {step.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="mx-4 mt-4 p-3 bg-red-100 text-red-700 rounded-sm text-sm">
                        {error}
                    </div>
                )}

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    {currentStep === 0 && (
                        <div className="space-y-5">
                            <div className="bg-teal-50 rounded-xl p-3 md:p-4 flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Therapist Name</label>
                                    <input
                                        type="text"
                                        value={history?.therapist || ''}
                                        onChange={(e) => handleChange('therapist', e.target.value)}
                                        placeholder="e.g., Dr. Sarah Johnson"
                                        className="mt-1 w-full p-2 border rounded-sm focus:ring-teal-500 focus:border-teal-500 text-sm"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Intake Date</label>
                                    <input
                                        type="date"
                                        value={history?.date?.split('T')[0] || ''}
                                        onChange={(e) => handleChange('date', e.target.value)}
                                        className="mt-1 w-full p-2 border rounded-sm text-sm"
                                    />
                                </div>
                            </div>

                            <Section title="Personal Information" icon={<FaUserMd />}>
                                <Grid cols={2}>
                                    <TextInput label="Full Name" path="personal_information.name" value={history?.personal_information?.name} onChange={handleChange} placeholder="Enter your full name" />
                                    <DateInput label="Date of Birth" path="personal_information.date_of_birth" value={history?.personal_information?.date_of_birth} onChange={handleChange} />
                                    <NumberInput label="Age" path="personal_information.age" value={history?.personal_information?.age} min={0} max={120} onChange={handleChange} placeholder="e.g., 32" />
                                    <SelectInput label="Marital Status" path="personal_information.marital_status" value={history?.personal_information?.marital_status} options={MARITAL_STATUS_OPTIONS} onChange={handleChange} />
                                    <TextInput label="Gender / Pronoun / Orientation" path="personal_information.gender_pronoun_sexual_orientation" value={history?.personal_information?.gender_pronoun_sexual_orientation} onChange={handleChange} placeholder="e.g., Female / she/her / heterosexual" />
                                    <TextInput label="Qualifications" path="personal_information.qualifications" value={history?.personal_information?.qualifications} onChange={handleChange} placeholder="e.g., MBA, B.Tech, PhD" />
                                    <TextInput label="Company Name" path="personal_information.company_name" value={history?.personal_information?.company_name} onChange={handleChange} placeholder="Where do you work?" />
                                    <TextInput label="Company Location" path="personal_information.company_location" value={history?.personal_information?.company_location} onChange={handleChange} placeholder="City, State" />
                                    <TextInput label="Designation" path="personal_information.designation" value={history?.personal_information?.designation} onChange={handleChange} placeholder="e.g., Senior Software Engineer" />
                                    <TextInput label="Preferred Language" path="personal_information.language_preferred" value={history?.personal_information?.language_preferred} onChange={handleChange} placeholder="e.g., English, Hindi" />
                                    <TextareaInput label="Residential Address" path="personal_information.residential_address" value={history?.personal_information?.residential_address} onChange={handleChange} fullWidth placeholder="Your complete home address" />
                                    <TextInput label="Mobile Number" path="personal_information.mobile_number" value={history?.personal_information?.mobile_number} onChange={handleChange} placeholder="10-digit number" />
                                    <EmailInput label="Email" path="personal_information.email_id" value={history?.personal_information?.email_id} onChange={handleChange} placeholder="you@example.com" />
                                    <TextInput label="Emergency Contact (Name & Number)" path="personal_information.alternate_emergency_contact_name_and_number" value={history?.personal_information?.alternate_emergency_contact_name_and_number} onChange={handleChange} fullWidth placeholder="e.g., Jane Doe - +91 98765 43210" />
                                </Grid>
                            </Section>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <Section title="Referral Information" icon={<FaBriefcase />}>
                            <Grid cols={2}>
                                <TextInput label="Source of Referral" path="referral_information.source_of_referral" value={history?.referral_information?.source_of_referral} onChange={handleChange} placeholder="e.g., Friend, Google, Company EAP" />
                                <TextInput label="Referrer Name" path="referral_information.name_of_person_who_referred" value={history?.referral_information?.name_of_person_who_referred} onChange={handleChange} placeholder="Name of the person who referred you" />
                                <TextInput label="Referrer Mobile" path="referral_information.referrer_contact_details.mobile_number" value={history?.referral_information?.referrer_contact_details?.mobile_number} onChange={handleChange} placeholder="Referrer's phone number" />
                                <EmailInput label="Referrer Email" path="referral_information.referrer_contact_details.email_id" value={history?.referral_information?.referrer_contact_details?.email_id} onChange={handleChange} placeholder="referrer@example.com" />
                                <TextInput label="Informant Name" path="referral_information.name_of_informant" value={history?.referral_information?.name_of_informant} onChange={handleChange} placeholder="Person providing information (if different)" />
                            </Grid>
                        </Section>
                    )}

                    {currentStep === 2 && (
                        <Section title="Concerns" icon={<FaHeart />}>
                            <Grid cols={1}>
                                <TextareaInput label="Area of Concerns" path="concerns.area_of_concerns" value={history?.concerns?.area_of_concerns} onChange={handleChange} fullWidth placeholder="What are the main issues you're facing?" />
                                <TextareaInput label="Personal Concerns" path="concerns.current_personal_concerns" value={history?.concerns?.current_personal_concerns} onChange={handleChange} fullWidth placeholder="Personal life challenges (relationships, health, finances, etc.)" />
                                <TextareaInput label="Professional Concerns" path="concerns.current_professional_concerns" value={history?.concerns?.current_professional_concerns} onChange={handleChange} fullWidth placeholder="Work-related issues (career, colleagues, stress, etc.)" />
                                <TextareaInput label="Self‑Development Goals" path="concerns.current_self_development_goals" value={history?.concerns?.current_self_development_goals} onChange={handleChange} fullWidth placeholder="What would you like to achieve through therapy?" />
                            </Grid>
                        </Section>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-8">
                            <Section title="Perception of Work Environment (1=Strongly Disagree → 5=Strongly Agree)">
                                <Grid cols={2}>
                                    <RatingInput label="Trusting and open" path="perception_of_work_environment.trusting_and_open" value={history?.perception_of_work_environment?.trusting_and_open} />
                                    <RatingInput label="Being heard and valued" path="perception_of_work_environment.being_heard_and_valued" value={history?.perception_of_work_environment?.being_heard_and_valued} />
                                    <RatingInput label="Diversity & inclusion priority" path="perception_of_work_environment.diversity_and_inclusion_priority" value={history?.perception_of_work_environment?.diversity_and_inclusion_priority} />
                                    <RatingInput label="Sensitive & empathetic members" path="perception_of_work_environment.sensitive_and_empathetic_members" value={history?.perception_of_work_environment?.sensitive_and_empathetic_members} />
                                    <RatingInput label="Strong leadership skills" path="perception_of_work_environment.strong_effective_leadership_skills" value={history?.perception_of_work_environment?.strong_effective_leadership_skills} />
                                </Grid>
                            </Section>

                            <Section title="Emotions (Intensity 1=Very Low → 5=Very High)">
                                <Grid cols={2}>
                                    <RatingInput label="Happy / Joyful" path="emotions_as_a_result_of_concerns.happy_joyful" value={history?.emotions_as_a_result_of_concerns?.happy_joyful} />
                                    <RatingInput label="Anxious / Fearful" path="emotions_as_a_result_of_concerns.anxious_fearful" value={history?.emotions_as_a_result_of_concerns?.anxious_fearful} />
                                    <RatingInput label="Sad / Depressed" path="emotions_as_a_result_of_concerns.sad_depressed" value={history?.emotions_as_a_result_of_concerns?.sad_depressed} />
                                    <RatingInput label="Angry" path="emotions_as_a_result_of_concerns.angry" value={history?.emotions_as_a_result_of_concerns?.angry} />
                                </Grid>
                            </Section>

                            <Section title="Effect on Work (Impact 1=No Impact → 5=Severe Impact)">
                                <Grid cols={2}>
                                    <RatingInput label="Productivity" path="effect_on_work_factors_due_to_concerns.productivity" value={history?.effect_on_work_factors_due_to_concerns?.productivity} />
                                    <RatingInput label="Motivation" path="effect_on_work_factors_due_to_concerns.motivation" value={history?.effect_on_work_factors_due_to_concerns?.motivation} />
                                    <RatingInput label="Concentration / Focus" path="effect_on_work_factors_due_to_concerns.concentration_focus_attention" value={history?.effect_on_work_factors_due_to_concerns?.concentration_focus_attention} />
                                    <RatingInput label="Absenteeism" path="effect_on_work_factors_due_to_concerns.absenteeism" value={history?.effect_on_work_factors_due_to_concerns?.absenteeism} />
                                    <RatingInput label="Innovation / Creativity" path="effect_on_work_factors_due_to_concerns.innovation_creativity" value={history?.effect_on_work_factors_due_to_concerns?.innovation_creativity} />
                                    <RatingInput label="Handling pressure & stress" path="effect_on_work_factors_due_to_concerns.handling_pressure_and_stress" value={history?.effect_on_work_factors_due_to_concerns?.handling_pressure_and_stress} />
                                    <RatingInput label="Coping with present concerns" path="effect_on_work_factors_due_to_concerns.coping_with_present_concerns" value={history?.effect_on_work_factors_due_to_concerns?.coping_with_present_concerns} />
                                </Grid>
                            </Section>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <Section title="Detailed History" icon={<FaBrain />}>
                            <Grid cols={1}>
                                <TextareaInput label="Medical History" path="history.medical_history" value={history?.history?.medical_history} onChange={handleChange} fullWidth placeholder="Hospitalizations, major illnesses, injuries, current medications" />
                                <TextareaInput label="Past Psychiatric History" path="history.past_psychiatric_history" value={history?.history?.past_psychiatric_history} onChange={handleChange} fullWidth placeholder="Previous therapy, psychiatric diagnoses, treatments" />
                                <TextareaInput label="Family Psychiatric History" path="history.past_family_psychiatric_history" value={history?.history?.past_family_psychiatric_history} onChange={handleChange} fullWidth placeholder="Mental health issues in immediate family" />
                                <TextareaInput label="Substance History" path="history.substance_history" value={history?.history?.substance_history} onChange={handleChange} fullWidth placeholder="Alcohol, drugs, smoking – frequency, duration, intensity" />
                                <TextareaInput label="Family Substance History" path="history.past_familial_substance_history" value={history?.history?.past_familial_substance_history} onChange={handleChange} fullWidth placeholder="Substance use among family members" />
                                <TextareaInput label="Family Structure" path="history.family_structure" value={history?.history?.family_structure} onChange={handleChange} fullWidth placeholder="Nuclear / joint family, who you live with, family dynamics" />
                                <TextareaInput label="Family Background & Relationships" path="history.family_background_and_relationship" value={history?.history?.family_background_and_relationship} onChange={handleChange} fullWidth placeholder="Relationship quality with parents, siblings, spouse, children" />
                                <TextareaInput label="Childhood History" path="history.childhood_history" value={history?.history?.childhood_history} onChange={handleChange} fullWidth placeholder="Early years, milestones, significant events, trauma" />
                                <TextareaInput label="Academic / School History" path="history.academic_school_history" value={history?.history?.academic_school_history} onChange={handleChange} fullWidth placeholder="Education, performance, peer relationships, bullying" />
                                <TextareaInput label="Sexual / Menstrual History" path="history.sexual_menstrual_history" value={history?.history?.sexual_menstrual_history} onChange={handleChange} fullWidth placeholder="Sexual orientation, experiences, concerns, menstrual health" />
                                <TextareaInput label="Relationship / Marital History" path="history.relationship_marital_history" value={history?.history?.relationship_marital_history} onChange={handleChange} fullWidth placeholder="Past and current relationships, marriages, conflicts" />
                                <TextareaInput label="Work History" path="history.work_history" value={history?.history?.work_history} onChange={handleChange} fullWidth placeholder="Job roles, duration, satisfaction, career changes" />
                                <TextareaInput label="Spiritual History" path="history.spiritual_history" value={history?.history?.spiritual_history} onChange={handleChange} fullWidth placeholder="Religious or spiritual beliefs, practices, community" />
                                <TextareaInput label="Premorbid Personality" path="history.pre_morbid_personality" value={history?.history?.pre_morbid_personality} onChange={handleChange} fullWidth placeholder="Sleep, appetite, typical behavior before current issues" />
                                <TextareaInput label="Miscellaneous" path="history.miscellaneous" value={history?.history?.miscellaneous} onChange={handleChange} fullWidth placeholder="Any other relevant information not covered above" />
                            </Grid>
                        </Section>
                    )}
                </div>

                {/* Navigation Footer - responsive stacking */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 md:px-6 md:py-4 flex flex-col-reverse sm:flex-row justify-between gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 text-sm md:text-base"
                    >
                        Cancel
                    </button>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {currentStep > 0 && (
                            <button
                                onClick={goToPrevious}
                                className="px-4 py-2 border border-teal-600 text-teal-600 rounded-sm hover:bg-teal-50 flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                <FaChevronLeft size={14} /> Back
                            </button>
                        )}
                        {currentStep < STEPS.length - 1 ? (
                            <button
                                onClick={goToNext}
                                className="px-4 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-700 flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                Next <FaChevronRight size={14} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                <FaSave /> {saving ? 'Saving...' : 'Save & Close'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ========== Helper Components (responsive) ==========

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="border-b border-gray-200 pb-4 last:border-0">
            <h3 className="text-md md:text-lg font-semibold text-gray-800 flex items-center mb-3">
                {icon && <span className="mr-2 text-teal-600 text-sm md:text-base">{icon}</span>}
                {title}
            </h3>
            {children}
        </div>
    );
}

function Grid({ cols, children }: { cols: 1 | 2; children: React.ReactNode }) {
    return (
        <div className={`grid grid-cols-1 ${cols === 2 ? 'md:grid-cols-2' : ''} gap-x-4 md:gap-x-6 gap-y-4`}>
            {children}
        </div>
    );
}

interface InputProps {
    label: string;
    path: string;
    value: any;
    onChange: (path: string, value: any) => void;
    fullWidth?: boolean;
    placeholder?: string;
}

function TextInput({ label, path, value, onChange, fullWidth = false, placeholder = '' }: InputProps) {
    return (
        <div className={fullWidth ? 'md:col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(path, e.target.value)}
                placeholder={placeholder}
                className="mt-1 w-full p-2 border border-gray-300 rounded-sm focus:ring-teal-500 focus:border-teal-500 text-sm"
            />
        </div>
    );
}

function TextareaInput({ label, path, value, onChange, fullWidth = false, placeholder = '' }: InputProps) {
    return (
        <div className={fullWidth ? 'md:col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <textarea
                rows={3}
                value={value || ''}
                onChange={(e) => onChange(path, e.target.value)}
                placeholder={placeholder}
                className="mt-1 w-full p-2 border resize-none border-gray-300 rounded-sm focus:ring-teal-500 focus:border-teal-500 text-sm"
            />
        </div>
    );
}

function NumberInput({ label, path, value, min, max, onChange, placeholder = '' }: InputProps & { min?: number; max?: number }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type="number"
                min={min}
                max={max}
                value={value ?? ''}
                onChange={(e) => onChange(path, e.target.value === '' ? null : parseInt(e.target.value))}
                placeholder={placeholder}
                className="mt-1 w-full p-2 border border-gray-300 rounded-sm text-sm"
            />
        </div>
    );
}

function DateInput({ label, path, value, onChange }: InputProps) {
    const formatted = value ? new Date(value).toISOString().split('T')[0] : '';
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type="date"
                value={formatted}
                onChange={(e) => onChange(path, e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-sm text-sm"
            />
        </div>
    );
}

function SelectInput({ label, path, value, options, onChange }: InputProps & { options: string[] }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                value={value || ''}
                onChange={(e) => onChange(path, e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-sm bg-white text-sm"
            >
                <option value="">Select...</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

function EmailInput({ label, path, value, onChange, placeholder = '' }: InputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type="email"
                value={value || ''}
                onChange={(e) => onChange(path, e.target.value)}
                placeholder={placeholder}
                className="mt-1 w-full p-2 border border-gray-300 rounded-sm text-sm"
            />
        </div>
    );
}