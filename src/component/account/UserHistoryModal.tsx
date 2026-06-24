import React, { useState } from 'react';
import {
  X,
  User,
  Users,
  MessageCircle,
  Activity,
  Smile,
  Target,
  FileText,
  History,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';

interface UserHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const UserHistoryModal: React.FC<UserHistoryModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(0);

  const isEmpty = !data || Object.keys(data).length === 0;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Render rating as stars + numeric value
  const renderRating = (value: any) => {
    if (typeof value !== 'number' || value < 1 || value > 5) return String(value);
    const stars = Array.from({ length: 5 }, (_, i) => i < value);
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex">
          {stars.map((filled, idx) => (
            <Star
              key={idx}
              className={`w-3.5 h-3.5 ${
                filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-gray-600 ml-1">({value}/5)</span>
      </div>
    );
  };

  // Render a single field as a grid cell
  const renderField = (key: string, value: any, index: number) => {
    if (value === undefined || value === null || value === '') return null;

    // If it's a nested object, render as an indented sub-list (but we'll keep it simple)
    // In this grid layout, nested objects are rare; we can show them as a single block.
    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div key={`${key}-${index}`} className="col-span-1 md:col-span-2 bg-gray-50 p-2 rounded-md">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            {key.replace(/_/g, ' ')}
          </div>
          <div className="space-y-1">
            {Object.entries(value).map(([subKey, subVal], subIndex) => (
              <div key={subIndex} className="text-sm text-gray-700">
                <span className="font-medium capitalize">{subKey.replace(/_/g, ' ')}: </span>
                <span>{String(subVal)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const isRating = typeof value === 'number' && value >= 1 && value <= 5;
    const displayValue = isRating ? renderRating(value) : <span className="text-sm text-gray-800 break-words">{String(value)}</span>;

    return (
      <div
        key={`${key}-${index}`}
        className="bg-gray-50/50 rounded-lg p-3 border border-gray-100 hover:border-teal-200 transition-colors"
      >
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
          {key.replace(/_/g, ' ')}
        </div>
        <div className="text-sm">{displayValue}</div>
      </div>
    );
  };

  // Build sections dynamically
  const buildSections = () => {
    const sections = [];

    if (data.personal_information) {
      sections.push({
        title: 'Personal',
        icon: <User className="w-4 h-4" />,
        fields: {
          Name: data.personal_information.name,
          'Date of Birth': data.personal_information.date_of_birth
            ? formatDate(data.personal_information.date_of_birth)
            : undefined,
          Age: data.personal_information.age,
          'Marital Status': data.personal_information.marital_status,
          'Gender / Pronoun / Orientation': data.personal_information.gender_pronoun_sexual_orientation,
          Qualifications: data.personal_information.qualifications,
          'Company Name': data.personal_information.company_name,
          'Company Location': data.personal_information.company_location,
          Designation: data.personal_information.designation,
          'Preferred Language': data.personal_information.language_preferred,
          'Residential Address': data.personal_information.residential_address,
          'Emergency Contact': data.personal_information.alternate_emergency_contact_name_and_number,
        },
      });
    }

    if (data.referral_information) {
      sections.push({
        title: 'Referral',
        icon: <Users className="w-4 h-4" />,
        fields: {
          'Source of Referral': data.referral_information.source_of_referral,
          'Referred By': data.referral_information.name_of_person_who_referred,
          'Referrer Mobile': data.referral_information.referrer_contact_details?.mobile_number,
          'Referrer Email': data.referral_information.referrer_contact_details?.email_id,
          'Name of Informant': data.referral_information.name_of_informant,
        },
      });
    }

    if (data.concerns) {
      sections.push({
        title: 'Concerns',
        icon: <MessageCircle className="w-4 h-4" />,
        fields: {
          'Area of Concerns': data.concerns.area_of_concerns,
          'Personal Concerns': data.concerns.current_personal_concerns,
          'Professional Concerns': data.concerns.current_professional_concerns,
          'Self-Development Goals': data.concerns.current_self_development_goals,
        },
      });
    }

    if (data.perception_of_work_environment) {
      sections.push({
        title: 'Work Perception',
        icon: <Activity className="w-4 h-4" />,
        fields: data.perception_of_work_environment,
      });
    }

    if (data.emotions_as_a_result_of_concerns) {
      sections.push({
        title: 'Emotions',
        icon: <Smile className="w-4 h-4" />,
        fields: data.emotions_as_a_result_of_concerns,
      });
    }

    if (data.effect_on_work_factors_due_to_concerns) {
      sections.push({
        title: 'Work Effect',
        icon: <Target className="w-4 h-4" />,
        fields: data.effect_on_work_factors_due_to_concerns,
      });
    }

    if (data.history) {
      sections.push({
        title: 'History',
        icon: <FileText className="w-4 h-4" />,
        fields: {
          'Medical History': data.history.medical_history,
          'Past Psychiatric': data.history.past_psychiatric_history,
          'Family Psychiatric': data.history.past_family_psychiatric_history,
          'Substance History': data.history.substance_history,
          'Familial Substance': data.history.past_familial_substance_history,
          'Family Structure': data.history.family_structure,
          'Family Background': data.history.family_background_and_relationship,
          'Childhood History': data.history.childhood_history,
          'Academic/School': data.history.academic_school_history,
          'Sexual/Menstrual': data.history.sexual_menstrual_history,
          'Relationship/Marital': data.history.relationship_marital_history,
          'Work History': data.history.work_history,
          'Spiritual History': data.history.spiritual_history,
          'Pre-morbid Personality': data.history.pre_morbid_personality,
        },
      });
    }

    return sections;
  };

  const sections = buildSections();
  const totalSteps = sections.length;
  const currentSection = sections[currentStep];

  const goToNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };
  const goToPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  const goToStep = (index: number) => {
    if (index >= 0 && index < totalSteps) setCurrentStep(index);
  };

  const renderSectionContent = () => {
    if (!currentSection) return null;
    const entries = Object.entries(currentSection.fields).filter(
      ([_, val]) => val !== undefined && val !== null && val !== ''
    );
    if (entries.length === 0) {
      return (
        <div className="text-gray-400 text-center py-8">No data available for this section.</div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {entries.map(([key, val], index) => renderField(key, val, index))}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-[#CBFBF1]">
          <h2 className="text-lg sm:text-xl font-bold text-[#009689] flex items-center gap-2">
            <History className="w-4 h-4 sm:w-5 sm:h-5" />
            User History
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/60 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/50 custom-scroll">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="text-5xl sm:text-6xl mb-4 text-gray-300">📋</div>
              <p className="text-base sm:text-lg font-semibold text-gray-600">No user history available</p>
              <p className="text-sm text-gray-400">There is no data to display for this client.</p>
            </div>
          ) : (
            <>
              {/* Stepper */}
              <div className="mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-2 px-2">
                <div className="flex items-center gap-1 min-w-max">
                  {sections.map((section, idx) => (
                    <React.Fragment key={section.title}>
                      <button
                        onClick={() => goToStep(idx)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                          idx === currentStep
                            ? 'bg-[#009689] text-white shadow-md'
                            : idx < currentStep
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {idx < currentStep ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <span className="w-3 h-3 flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </span>
                        )}
                        <span className="hidden xs:inline">{section.title}</span>
                      </button>
                      {idx < sections.length - 1 && (
                        <div className="flex-1 h-0.5 bg-gray-200 min-w-4" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Current Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#CBFBF1] px-4 sm:px-5 py-2.5 sm:py-3 border-b border-teal-100 flex items-center gap-2">
                  <span className="text-[#009689]">{currentSection?.icon}</span>
                  <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">
                    {currentSection?.title}{' '}
                    <span className="text-gray-400 text-xs font-normal">
                      ({currentStep + 1}/{totalSteps})
                    </span>
                  </h3>
                </div>
                <div className="p-3 sm:p-4">{renderSectionContent()}</div>
              </div>

              {/* Navigation */}
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={goToPrev}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentStep === 0
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden xs:inline">Previous</span>
                </button>
                <div className="text-xs text-gray-400">
                  Step {currentStep + 1} of {totalSteps}
                </div>
                {currentStep < totalSteps - 1 ? (
                  <button
                    onClick={goToNext}
                    className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#009689] text-white rounded-lg text-sm font-medium hover:bg-[#007a6e] transition-colors shadow-sm"
                  >
                    <span className="hidden xs:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#009689] text-white rounded-lg text-sm font-medium hover:bg-[#007a6e] transition-colors shadow-sm"
                  >
                    Done
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHistoryModal;