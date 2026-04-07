import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
    CheckCircle,
    Circle,
    Clock,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { listFilteredGoals } from "@/store/goalsSlice";
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

// GoalSet now supports both plain goals and usercompletedgoals
interface GoalSet {
    source: string;
    data: {
        _id: string;                // document ID (goals or usercompletedgoals)
        goalId?: {
            _id: string,
            frequency: "daily" | "weekly" | "monthly";
            defaultDurationDays: number;
        };             // original goals document ID (for usercompletedgoals)
        goals: Array<{ goal: string; done: boolean; _id?: string }>;
        frequency: "daily" | "weekly" | "monthly";
        defaultDurationDays: number;
        createdAt: string;
        updatedAt: string;
    }
}

// Raw goal record from backend (used only for mapping)
interface PastGoal {
    source: string;
    data: {
        _id: string;
        goalId?: {
            _id: string,
            frequency: "daily" | "weekly" | "monthly";
            defaultDurationDays: number;
        };                             // only present for usercompletedgoals
        goals: string[] | Array<{ goal: string; done: boolean; _id: string }>;
        frequency: "daily" | "weekly" | "monthly";
        defaultDurationDays: number;
        isactive: boolean;
        created_at: string;
        updated_at: string;
    }
}

export const UserGoalsModal = ({
    onClose,
    userId,
    therapistId,
    therapistName,
}: UserGoalsModalProps) => {
    const [loading, setLoading] = useState(true);
    const [savingSetId, setSavingSetId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"current" | "history">("current");
    const [activeGoalSets, setActiveGoalSets] = useState<GoalSet[]>([]);

    const dispatch = useDispatch();

    // Fetch all active goal sets
    const fetchActiveGoals = async () => {
        setLoading(true);
        try {
            const data = {
                pageNum: 1,
                pageSize: 50, // enough to get all active goals
                filters: {
                    userId,
                    therapistId,
                    isactive: true
                },
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listFilteredGoals(data as any) as any);
            if (response?.error) {
                toast.error(response.error.message);
                setActiveGoalSets([]);
            } else {
                const goalsList = response.payload.data.goalsList || [];
                const sets: GoalSet[] = goalsList.map((g: PastGoal) => {
                    let goalsArray;
                    if (g.source === 'usercompletedgoals') {
                        // goals is already array of objects with goal, done, _id
                        goalsArray = g.data.goals as Array<{ goal: string; done: boolean; _id: string }>;
                    } else {
                        // goals is array of strings
                        goalsArray = (g.data.goals as string[]).map(goalText => ({
                            goal: goalText,
                            done: false
                        }));
                    }

                    return {
                        source: g.source,
                        data: {
                            _id: g.data._id,
                            goalId: g.source === 'usercompletedgoals' ? g.data.goalId : g.data._id,
                            goals: goalsArray,
                            frequency: g.data.frequency,
                            defaultDurationDays: g.data.defaultDurationDays,
                            createdAt: g.data.created_at,
                            updatedAt: g.data.updated_at,
                        }
                    };
                });
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

    // Load data when modal opens or tab changes
    useEffect(() => {
        if (activeTab === "current") {
            fetchActiveGoals();
        }
        // No fetching for history – we just show a placeholder
    }, [activeTab, userId, therapistId]);

    // Toggle a goal within a specific set
    const toggleGoal = (setId: string, goalIndex: number) => {
        setActiveGoalSets((prev) =>
            prev.map((set) =>
                set.data._id === setId
                    ? {
                        ...set,
                        data: {
                            ...set.data,
                            goals: set.data.goals.map((g, idx) =>
                                idx === goalIndex ? { ...g, done: !g.done } : g
                            ),
                        }
                    }
                    : set
            )
        );
    };

    // Save progress for a specific goal set
    const handleSaveSet = async (setId: string) => {
        const set = activeGoalSets.find((s) => s.data._id === setId);
        if (!set) return;

        setSavingSetId(setId);
        try {
            const data = {
                id: set.source === 'usercompletedgoals' ? set.data?._id : null,
                userId,
                therapistId,
                goalId: set.data.goalId?._id || set.data._id,  // use goalId if available (for usercompletedgoals)
                goals: set.data.goals
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(AddandUpdateUserGoal(data as any) as any);
            if (response?.error) {
                toast.error(response.error.message);
            } else {
                toast.success("Progress updated!");
                // Optionally refresh the list to reflect saved done states? 
                // If the backend updates the same document, we might not need to.
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
                        {loading && activeTab === "current" ? (
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
                                            key={set.data._id}
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
                                                    {set.data.frequency || set.data.goalId?.frequency}
                                                </span>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {set.data.defaultDurationDays || set.data.goalId?.defaultDurationDays} days
                                                </span>
                                                {/* Optional: show source tag for debugging */}
                                                {set.source === 'usercompletedgoals' && (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                                        In Progress
                                                    </span>
                                                )}
                                            </div>

                                            {/* Goals list with toggles */}
                                            <div className="space-y-3 mb-4">
                                                {set.data.goals.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                                        onClick={() => toggleGoal(set.data._id, idx)}
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
                                                    Created: {formatDate(set.data.createdAt)}
                                                </div>
                                                <button
                                                    onClick={() => handleSaveSet(set.data._id)}
                                                    disabled={savingSetId === set.data._id}
                                                    className="px-3 py-1.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors disabled:opacity-50 flex items-center"
                                                >
                                                    {savingSetId === set.data._id ? (
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
                            /* ----- History (placeholder) ----- */
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">Work in progress</p>
                                <p className="text-gray-400 text-sm mt-2">History view is coming soon.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer - close button */}
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