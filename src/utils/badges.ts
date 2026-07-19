export type BadgeType = 'goal' | 'appointment';

export interface BadgeCatalogItem {
    key: string;
    type: BadgeType;
    threshold: number;
    title: string;
    description: string;
}

export interface UserBadge {
    _id: string;
    userId: string;
    badge_key: string;
    is_seen: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at?: string;
}

export const BADGE_CATALOG: BadgeCatalogItem[] = [
    {
        key: 'FIRST_GOAL',
        type: 'goal',
        threshold: 1,
        title: 'First Step',
        description: 'Completed your first therapy goal',
    },
    {
        key: 'GOAL_ACHIEVER_5',
        type: 'goal',
        threshold: 5,
        title: 'Goal Achiever',
        description: 'Completed 5 therapy goals',
    },
    {
        key: 'GOAL_MASTER_10',
        type: 'goal',
        threshold: 10,
        title: 'Goal Master',
        description: 'Completed 10 therapy goals',
    },
    {
        key: 'GOAL_CHAMPION_25',
        type: 'goal',
        threshold: 25,
        title: 'Goal Champion',
        description: 'Completed 25 therapy goals',
    },
    {
        key: 'FIRST_SESSION',
        type: 'appointment',
        threshold: 1,
        title: 'First Session',
        description: 'Completed your first therapy session',
    },
    {
        key: 'SESSION_REGULAR_5',
        type: 'appointment',
        threshold: 5,
        title: 'Regular Attender',
        description: 'Completed 5 therapy sessions',
    },
    {
        key: 'SESSION_COMMITTED_10',
        type: 'appointment',
        threshold: 10,
        title: 'Committed Healer',
        description: 'Completed 10 therapy sessions',
    },
];

export function getBadgeInfo(badgeKey: string): BadgeCatalogItem | undefined {
    return BADGE_CATALOG.find((badge) => badge.key === badgeKey);
}
