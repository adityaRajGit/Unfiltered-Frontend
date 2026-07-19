"use client";

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Award } from 'lucide-react';
import { getUserBadges } from '@/store/badgeSlice';
import { BADGE_CATALOG, UserBadge } from '@/utils/badges';
import BadgeIcon from './BadgeIcon';

interface BadgesSectionProps {
    userId: string;
    refreshKey?: number;
}

const BadgesSection = ({ userId, refreshKey = 0 }: BadgesSectionProps) => {
    const dispatch = useDispatch();
    const [earnedBadges, setEarnedBadges] = useState<UserBadge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        async function fetchBadges() {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(getUserBadges(userId as any) as any);
            if (!response?.error) {
                setEarnedBadges(response.payload?.data?.badgeList || []);
            }
            setLoading(false);
        }

        fetchBadges();
    }, [userId, refreshKey, dispatch]);

    const earnedKeys = new Set(earnedBadges.map((badge) => badge.badge_key));
    const earnedCount = earnedBadges.length;

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">My Achievements</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Earn badges by completing goals and therapy sessions
                    </p>
                </div>
                <span className="inline-flex items-center self-start rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800">
                    <Award className="mr-1.5 h-4 w-4" />
                    {earnedCount} / {BADGE_CATALOG.length} earned
                </span>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {BADGE_CATALOG.map((catalogBadge) => {
                        const earned = earnedBadges.find((b) => b.badge_key === catalogBadge.key);
                        const isEarned = earnedKeys.has(catalogBadge.key);

                        return (
                            <div
                                key={catalogBadge.key}
                                className={`group relative rounded-xl border p-4 transition-all duration-300 ${
                                    isEarned
                                        ? 'border-teal-200 bg-gradient-to-br from-teal-50 via-white to-amber-50/40 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                                        : 'border-gray-200 bg-gray-50'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
                                            isEarned
                                                ? 'bg-white shadow-inner ring-1 ring-teal-100'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        <BadgeIcon
                                            badgeKey={catalogBadge.key}
                                            size={56}
                                            locked={!isEarned}
                                        />
                                        {!isEarned && (
                                            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-[10px] font-bold text-white shadow">
                                                ?
                                            </span>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1 pt-0.5">
                                        <h3
                                            className={`font-semibold text-sm ${
                                                isEarned ? 'text-gray-900' : 'text-gray-500'
                                            }`}
                                        >
                                            {catalogBadge.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            {catalogBadge.description}
                                        </p>
                                        {isEarned && earned?.created_at && (
                                            <p className="text-xs text-teal-600 mt-2 font-medium">
                                                Earned {formatDate(earned.created_at)}
                                            </p>
                                        )}
                                        {!isEarned && (
                                            <p className="text-xs text-gray-400 mt-2">
                                                {catalogBadge.type === 'goal'
                                                    ? `Complete ${catalogBadge.threshold} goal${catalogBadge.threshold > 1 ? 's' : ''}`
                                                    : `Complete ${catalogBadge.threshold} session${catalogBadge.threshold > 1 ? 's' : ''}`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default BadgesSection;
