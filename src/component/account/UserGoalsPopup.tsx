import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
    CheckCircle,
    Circle,
    Clock,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { listGoals } from "@/store/goalsSlice";
import { AddandUpdateUserGoal } from "@/store/userGoalsSlice";

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

interface UserGoalsModalProps {
    onClose: () => void;
    userId: string;
    therapistId: string;
    therapistName: string;
}

interface GoalSet {
    _id: string;                // goal document ID
    goals: Array<{ goal: string; done: boolean }>;
    frequency: "daily" | "weekly" | "monthly";
    defaultDurationDays: number;
    createdAt: string;
    updatedAt: string;
}

// Type for a goal record from the backend (raw)
interface PastGoal {
    _id: string;
    goals: string[];
    frequency: "daily" | "weekly" | "monthly";
    defaultDurationDays: number;
    isactive: boolean;
    created_at: string;
    updated_at: string;
}

export const UserGoalsModal = ({
    onClose,
    userId,
    therapistId,
    therapistName,
}: UserGoalsModalProps) => {
    const [loading, setLoading] = useState(true);
    const [savingSetId, setSavingSetId] = useState<string | null>(null); // track which set is being saved
    const [activeTab, setActiveTab] = useState<"current" | "history">("current");

    // Current goals: multiple active goal sets
    const [activeGoalSets, setActiveGoalSets] = useState<GoalSet[]>([]);

    // History & pagination state
    const [pastGoals, setPastGoals] = useState<PastGoal[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 3; // items per page in history

    const dispatch = useDispatch();

    // --- Fetch all active goal sets ---
    const fetchActiveGoals = async () => {
        setLoading(true);
        try {
            const data = {
                pageNum: 1,
                pageSize: 50, // fetch enough to get all active goals (adjust as needed)
                filters: {
                    userId,
                    therapistId,
                    isactive: true
                },
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listGoals(data as any) as any);
            if (response?.error) {
                toast.error(response.error.message);
                setActiveGoalSets([]);
            } else {
                const goalsList = response.payload.data.goalsList || [];
                // Filter only active goals
                const activeGoals = goalsList.filter((g: PastGoal) => g.isactive);
                // Convert to GoalSet format (initialize done = false for all goals)
                const sets: GoalSet[] = activeGoals.map((g: PastGoal) => ({
                    _id: g._id,
                    goals: g.goals.map((goalText) => ({ goal: goalText, done: false })),
                    frequency: g.frequency,
                    defaultDurationDays: g.defaultDurationDays,
                    createdAt: g.created_at,
                    updatedAt: g.updated_at,
                }));
                setActiveGoalSets(sets);
            }
        } catch (error) {
            toast.error("Failed to load current goals.");
            console.error(error);
            setActiveGoalSets([]);
        } finally {
            setLoading(false);
        }
    };

    // --- Fetch history (paginated) ---
    const fetchHistoryGoals = async (page = 1) => {
        setLoading(true);
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
                console.log("goals", goalsList)
                setPastGoals(goalsList);
                setTotalPages(Math.ceil(goalsCount / pageSize));
                setCurrentPage(page);
            }
        } catch (error) {
            toast.error("Failed to load history.");
            console.error(error);
            setPastGoals([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    // Load data when modal opens or tab changes
    useEffect(() => {
        if (activeTab === "current") {
            fetchActiveGoals();
        } else {
            fetchHistoryGoals(1);
        }
    }, [activeTab, userId, therapistId]);

    // Toggle a goal within a specific set
    const toggleGoal = (setId: string, goalIndex: number) => {
        setActiveGoalSets((prev) =>
            prev.map((set) =>
                set._id === setId
                    ? {
                        ...set,
                        goals: set.goals.map((g, idx) =>
                            idx === goalIndex ? { ...g, done: !g.done } : g
                        ),
                    }
                    : set
            )
        );
    };

    // Save progress for a specific goal set
    const handleSaveSet = async (setId: string) => {
        const set = activeGoalSets.find((s) => s._id === setId);
        if (!set) return;

        setSavingSetId(setId);
        try {
            const data = {
                id: null,
                userId,
                therapistId,
                goalId: setId,
                goals: set.goals
            }

            const response = await dispatch(AddandUpdateUserGoal(data as any) as any);
            if (response?.error) {
                toast.error(response.error.message);
            } else {
                toast.success("Progress updated!");
            }
        } catch (error) {
            toast.error("Failed to update progress.");
            console.error(error);
        } finally {
            setSavingSetId(null);
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

    // Pagination handlers
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            fetchHistoryGoals(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            fetchHistoryGoals(currentPage + 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                    {/* Header */}
                    <div className="bg-teal-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-white">My Goals</h3>
                                <p className="text-teal-100 text-sm mt-1">with {therapistName}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-1 text-white hover:bg-teal-700 transition-colors"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex mt-3 bg-teal-700 rounded-md p-1">
                            <button
                                onClick={() => setActiveTab("current")}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "current"
                                    ? "bg-white text-teal-700"
                                    : "text-teal-100 hover:bg-teal-600"
                                    }`}
                            >
                                Current Goals
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "history"
                                    ? "bg-white text-teal-700"
                                    : "text-teal-100 hover:bg-teal-600"
                                    }`}
                            >
                                History
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                                <span className="ml-2 text-gray-600">Loading...</span>
                            </div>
                        ) : activeTab === "current" ? (
                            /* ----- Current Goals (multiple sets) ----- */
                            activeGoalSets.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No active goals at the moment.
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {activeGoalSets.map((set) => (
                                        <div
                                            key={set._id}
                                            className="border border-gray-200 rounded-xl p-5 shadow-sm"
                                        >
                                            {/* Set metadata */}
                                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5" />
                                                    Active
                                                </span>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {set.frequency}
                                                </span>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {set.defaultDurationDays} days
                                                </span>
                                            </div>

                                            {/* Goals list with toggles */}
                                            <div className="space-y-3 mb-4">
                                                {set.goals.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                                        onClick={() => toggleGoal(set._id, idx)}
                                                    >
                                                        <div className="flex-shrink-0 mt-0.5">
                                                            {item.done ? (
                                                                <CheckCircle className="w-5 h-5 text-teal-600" />
                                                            ) : (
                                                                <Circle className="w-5 h-5 text-gray-400" />
                                                            )}
                                                        </div>
                                                        <span
                                                            className={`ml-3 text-sm ${item.done ? "line-through text-gray-400" : "text-gray-700"
                                                                }`}
                                                        >
                                                            {item.goal}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Footer: dates and save button */}
                                            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                                <div className="text-xs text-gray-400">
                                                    Created: {formatDate(set.createdAt)}
                                                    {set.updatedAt !== set.createdAt && (
                                                        <> • Updated: {formatDate(set.updatedAt)}</>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleSaveSet(set._id)}
                                                    disabled={savingSetId === set._id}
                                                    className="px-3 py-1.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors disabled:opacity-50 flex items-center"
                                                >
                                                    {savingSetId === set._id ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <SaveIcon />
                                                            <span className="ml-2">Save Progress</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        ) : (
                            /* ----- History (paginated) ----- */
                            <>
                                {pastGoals.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        No past goals found.
                                    </div>
                                ) : (
                                    <>
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

                                                        {/* Creation date */}
                                                        <span className="text-xs text-gray-400 flex items-center whitespace-nowrap">
                                                            <svg
                                                                className="w-3 h-3 mr-1"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
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

                                                    {/* Last updated (if different) */}
                                                    {goal.updated_at && goal.updated_at !== goal.created_at && (
                                                        <div className="text-xs text-gray-400 flex items-center border-t border-gray-100 pt-2 mt-1">
                                                            <svg
                                                                className="w-3 h-3 mr-1"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
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
                                        </div>

                                        {/* Pagination Controls */}
                                        {totalPages > 1 && (
                                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                                                <button
                                                    onClick={goToPreviousPage}
                                                    disabled={currentPage === 1}
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
                                                    disabled={currentPage === totalPages}
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Next
                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Footer - only show global close button (save buttons are per set) */}
                    <div className="bg-gray-50 px-6 py-3 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};