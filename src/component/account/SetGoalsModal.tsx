import { useState } from "react";
import { toast } from "react-toastify";
import { Flag, Plus, Trash2, Clock, Calendar, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { listGoals } from "@/store/goalsSlice";

// Icons (same as before)
const CloseIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SaveIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

interface GoalsModalProps {
    onClose: () => void;
    therapistId: string;
    userId: string;
    clientName: string;
    onSaveGoal: (
        therapistId: string,
        userId: string,
        goalData: {
            goals: string[];
            frequency: "daily" | "weekly" | "monthly";
            defaultDurationDays: number;
        }
    ) => Promise<any>;
}

// Type for a goal record (as stored in backend)
interface PastGoal {
    _id: string;
    goals: string[];
    frequency: "daily" | "weekly" | "monthly";
    defaultDurationDays: number;
    isactive: boolean;
    created_at: string;   // ISO date
    updated_at: string;   // ISO date
}

export const GoalsModal = ({
    onClose,
    therapistId,
    userId,
    clientName,
    onSaveGoal,
}: GoalsModalProps) => {
    const [goalItems, setGoalItems] = useState<string[]>([""]);
    const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("weekly");
    const [defaultDurationDays, setDefaultDurationDays] = useState(30);
    const [isSaving, setIsSaving] = useState(false);

    const [activeTab, setActiveTab] = useState<"set" | "view">("set");
    const [pastGoals, setPastGoals] = useState<PastGoal[]>([]);
    const [isLoadingPast, setIsLoadingPast] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 3; // items per page

    const dispatch = useDispatch()

    // --- Handlers for Set Goals ---
    const addGoalField = () => {
        setGoalItems([...goalItems, ""]);
    };

    const removeGoalField = (index: number) => {
        if (goalItems.length === 1) {
            toast.info("At least one goal is required.");
            return;
        }
        const updated = [...goalItems];
        updated.splice(index, 1);
        setGoalItems(updated);
    };

    const updateGoalField = (index: number, value: string) => {
        const updated = [...goalItems];
        updated[index] = value;
        setGoalItems(updated);
    };

    const handleSave = async () => {
        const nonEmptyGoals = goalItems
            .map((g) => g.trim())
            .filter((g) => g.length > 0);

        if (nonEmptyGoals.length === 0) {
            toast.warn("Please enter at least one goal.");
            return;
        }

        setIsSaving(true);
        try {
            await onSaveGoal(therapistId, userId, {
                goals: nonEmptyGoals,
                frequency,
                defaultDurationDays,
            });
            setGoalItems([""]); // reset form
            setFrequency("weekly");
            setDefaultDurationDays(30);
            onClose();
        } catch (error) {
            toast.error("Failed to save goals.");
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    // --- Handler for fetching past goals (demo version) ---
    const fetchPastGoals = async (page = 1) => {
        setIsLoadingPast(true);
        try {
            const data = {
                pageNum: page,
                pageSize,
                filters: {
                    userId,
                    therapistId,
                },
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listGoals(data as any) as any);
            if (response?.error) {
                toast.error(response.error.message);
                setPastGoals([]);
                setTotalPages(1);
            } else {
                const goalsList = response.payload.data.goalsList || [];
                const goalsCount = response.payload.data.goalsCount || 0;
                setPastGoals(goalsList);
                setTotalPages(Math.ceil(goalsCount / pageSize));
                setCurrentPage(page); // ensure currentPage matches
            }
        } catch (error) {
            toast.error("Failed to load past goals.");
            console.error(error);
            setPastGoals([]);
            setTotalPages(1);
        } finally {
            setIsLoadingPast(false);
        }
    };

    // Handle tab change
    const handleTabChange = (tab: "set" | "view") => {
        setActiveTab(tab);
        if (tab === "view" && pastGoals.length === 0 && !isLoadingPast) {
            fetchPastGoals();
        }
    };


    // Pagination handlers
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            fetchPastGoals(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            fetchPastGoals(currentPage + 1);
        }
    };

    // Format date for display
    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                    {/* Header */}
                    <div className="bg-teal-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Therapy Goals</h3>
                                <p className="text-teal-100 text-sm mt-1">
                                    {clientName}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-1 text-white hover:bg-teal-700 transition-colors"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Toggle Tabs */}
                        <div className="flex mt-3 bg-teal-700 rounded-md p-1">
                            <button
                                onClick={() => handleTabChange("set")}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "set"
                                    ? "bg-white text-teal-700"
                                    : "text-teal-100 hover:bg-teal-600"
                                    }`}
                            >
                                Set New Goals
                            </button>
                            <button
                                onClick={() => handleTabChange("view")}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "view"
                                    ? "bg-white text-teal-700"
                                    : "text-teal-100 hover:bg-teal-600"
                                    }`}
                            >
                                View Previous Goals
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                        {activeTab === "set" ? (
                            /* ----- Set New Goals Form ----- */
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                                    <Flag className="w-5 h-5" />
                                    <span className="ml-2">Add New Goals</span>
                                </h4>

                                <div className="border border-gray-300 rounded-lg overflow-hidden">
                                    {/* Dynamic list of goal inputs */}
                                    <div className="p-4 space-y-3 bg-white">
                                        {goalItems.map((goal, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={goal}
                                                    onChange={(e) => updateGoalField(index, e.target.value)}
                                                    placeholder={`Goal ${index + 1}`}
                                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeGoalField(index)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                    title="Remove goal"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}

                                        {/* Add goal button */}
                                        <button
                                            type="button"
                                            onClick={addGoalField}
                                            className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-md transition-colors"
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Another Goal
                                        </button>
                                    </div>

                                    {/* Settings row */}
                                    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                            {/* Frequency */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Frequency
                                                </label>
                                                <select
                                                    value={frequency}
                                                    onChange={(e) =>
                                                        setFrequency(e.target.value as "daily" | "weekly" | "monthly")
                                                    }
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                                >
                                                    <option value="daily">Daily</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                </select>
                                            </div>

                                            {/* Default Duration */}
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Default Duration (days)
                                                </label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={365}
                                                    value={defaultDurationDays}
                                                    onChange={(e) => setDefaultDurationDays(parseInt(e.target.value) || 30)}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Footer with therapist avatar and action buttons */}
                                        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center sm:justify-end sm:mt-6">

                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={onClose}
                                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleSave}
                                                    disabled={isSaving}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                                >
                                                    {isSaving ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <SaveIcon />
                                                            <span className="ml-2">Save Goals</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* ----- View Previous Goals ----- */
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                                    <Clock className="w-5 h-5" />
                                    <span className="ml-2">Previously Assigned Goals</span>
                                </h4>

                                {isLoadingPast ? (
                                    <div className="flex justify-center items-center py-8">
                                        <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                                        <span className="ml-2 text-gray-600">Loading goals...</span>
                                    </div>
                                ) : pastGoals.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        No previous goals found for this client.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {pastGoals.map((goal) => (
                                            <div
                                                key={goal._id}
                                                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                {/* Header: status, frequency, duration */}
                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        {/* Active/Inactive badge */}
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${goal.isactive
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-gray-100 text-gray-600"
                                                                }`}
                                                        >
                                                            {goal.isactive ? (
                                                                <>
                                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                                                                    Active
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-1.5"></span>
                                                                    Inactive
                                                                </>
                                                            )}
                                                        </span>

                                                        {/* Frequency badge */}
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700">
                                                            <svg
                                                                className="w-3 h-3 mr-1.5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                            {goal.frequency}
                                                        </span>

                                                        {/* Duration badge */}
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                            <svg
                                                                className="w-3 h-3 mr-1.5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            {goal.defaultDurationDays} days
                                                        </span>
                                                    </div>

                                                    {/* Creation date (right-aligned on larger screens) */}
                                                    <span className="text-xs text-gray-400 flex items-center whitespace-nowrap">
                                                        <svg
                                                            className="w-3 h-3 mr-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        Created {formatDate(goal.created_at)}
                                                    </span>
                                                </div>

                                                {/* Goals list */}
                                                <ul className="space-y-2 mb-3">
                                                    {goal.goals.map((g, idx) => (
                                                        <li key={idx} className="flex items-start text-sm text-gray-700">
                                                            <svg
                                                                className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                            <span>{g}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Footer: last updated (if different from creation) */}
                                                {goal.updated_at && goal.updated_at !== goal.created_at && (
                                                    <div className="text-xs text-gray-400 flex items-center border-t border-gray-100 pt-2 mt-1">
                                                        <svg
                                                            className="w-3 h-3 mr-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                        Last updated {formatDate(goal.updated_at)}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {totalPages > 1 && (
                                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                                                <button
                                                    onClick={goToPreviousPage}
                                                    disabled={currentPage === 1 || isLoadingPast}
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                                    Previous
                                                </button>
                                                <span className="text-sm text-gray-600">
                                                    Page {currentPage} of {totalPages}
                                                </span>
                                                <button
                                                    onClick={goToNextPage}
                                                    disabled={currentPage === totalPages || isLoadingPast}
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Next
                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};