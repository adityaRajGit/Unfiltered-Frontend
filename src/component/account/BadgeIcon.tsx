"use client";

import { CSSProperties, ReactNode, useId } from "react";

interface BadgeIconProps {
    badgeKey: string;
    size?: number;
    locked?: boolean;
    className?: string;
}

const FRAME = 64;

function RibbonBase({ color }: { color: string }) {
    return (
        <>
            <path d="M22 42L18 58L26 52L32 58L38 52L46 58L42 42" fill={color} opacity="0.95" />
            <path d="M24 44L22 52L26 49L32 54L38 49L42 52L40 44" fill="#ffffff" opacity="0.18" />
        </>
    );
}

function HexMedal({
    fill,
    shineId,
    rim = "#ffffff",
    children,
}: {
    fill: string;
    shineId: string;
    rim?: string;
    children: ReactNode;
}) {
    return (
        <>
            <path
                d="M32 6L52 18V40L32 52L12 40V18L32 6Z"
                fill={fill}
                stroke={rim}
                strokeWidth="2.5"
            />
            <path
                d="M32 12L46 20.2V37.8L32 46L18 37.8V20.2L32 12Z"
                fill={`url(#${shineId})`}
                opacity="0.9"
            />
            {children}
        </>
    );
}

function CircleMedal({
    fill,
    shineId,
    rim = "#ffffff",
    children,
}: {
    fill: string;
    shineId: string;
    rim?: string;
    children: ReactNode;
}) {
    return (
        <>
            <circle cx="32" cy="30" r="22" fill={fill} stroke={rim} strokeWidth="2.5" />
            <circle cx="32" cy="30" r="17" fill={`url(#${shineId})`} opacity="0.85" />
            {children}
        </>
    );
}

function ShieldMedal({
    fill,
    shineId,
    rim = "#ffffff",
    children,
}: {
    fill: string;
    shineId: string;
    rim?: string;
    children: ReactNode;
}) {
    return (
        <>
            <path
                d="M32 6C40 10 50 10 54 12V30C54 42 44 50 32 56C20 50 10 42 10 30V12C14 10 24 10 32 6Z"
                fill={fill}
                stroke={rim}
                strokeWidth="2.5"
            />
            <path
                d="M32 12C38 15 46 15 48.5 16.5V30C48.5 39 41 45.5 32 50.5C23 45.5 15.5 39 15.5 30V16.5C18 15 26 15 32 12Z"
                fill={`url(#${shineId})`}
                opacity="0.85"
            />
            {children}
        </>
    );
}

function BadgeArt({ badgeKey, uid }: { badgeKey: string; uid: string }) {
    const g = `${uid}-g`;
    const shine = `${uid}-shine`;

    const gradientStops: Record<string, [string, string]> = {
        FIRST_GOAL: ["#34d399", "#059669"],
        GOAL_ACHIEVER_5: ["#2dd4bf", "#0f766e"],
        GOAL_MASTER_10: ["#38bdf8", "#0369a1"],
        GOAL_CHAMPION_25: ["#fbbf24", "#d97706"],
        FIRST_SESSION: ["#a78bfa", "#6d28d9"],
        SESSION_REGULAR_5: ["#fb7185", "#e11d48"],
        SESSION_COMMITTED_10: ["#67e8f9", "#0891b2"],
    };

    const [from, to] = gradientStops[badgeKey] || ["#2dd4bf", "#0f766e"];

    const defs = (
        <defs>
            <linearGradient id={g} x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor={from} />
                <stop offset="1" stopColor={to} />
            </linearGradient>
            <radialGradient id={shine} cx="0.32" cy="0.28" r="0.72">
                <stop stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
        </defs>
    );

    if (badgeKey === "FIRST_GOAL") {
        return (
            <>
                {defs}
                <RibbonBase color="#047857" />
                <CircleMedal fill={`url(#${g})`} shineId={shine}>
                    <path
                        d="M32 38V24M32 24l-5 5M32 24l5 5"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                    <circle cx="32" cy="40" r="2.2" fill="#fff" />
                </CircleMedal>
            </>
        );
    }

    if (badgeKey === "GOAL_ACHIEVER_5") {
        return (
            <>
                {defs}
                <RibbonBase color="#0f766e" />
                <HexMedal fill={`url(#${g})`} shineId={shine}>
                    <path
                        d="M24 31l5 5 11-12"
                        stroke="#fff"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                    <text x="32" y="44" textAnchor="middle" fill="#ecfdf5" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">
                        5
                    </text>
                </HexMedal>
            </>
        );
    }

    if (badgeKey === "GOAL_MASTER_10") {
        return (
            <>
                {defs}
                <RibbonBase color="#0369a1" />
                <ShieldMedal fill={`url(#${g})`} shineId={shine}>
                    <path
                        d="M32 18l2.4 7.2H42l-6 4.4 2.3 7.2L32 32.6l-6.3 4.2 2.3-7.2-6-4.4h7.6L32 18z"
                        fill="#fff"
                    />
                    <text x="32" y="46" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">
                        10
                    </text>
                </ShieldMedal>
            </>
        );
    }

    if (badgeKey === "GOAL_CHAMPION_25") {
        return (
            <>
                {defs}
                <RibbonBase color="#b45309" />
                <g>
                    <path d="M18 16h28v4H18z" fill="#f59e0b" />
                    <path d="M24 12h16v6H24z" fill="#fbbf24" />
                    <path d="M28 8h8v5H28z" fill="#fde68a" />
                </g>
                <CircleMedal fill={`url(#${g})`} shineId={shine} rim="#fff7ed">
                    <path
                        d="M32 18l2.6 7.6H43l-6.2 4.6 2.4 7.4L32 33.4l-7.2 4.2 2.4-7.4-6.2-4.6h8.4L32 18z"
                        fill="#fff"
                    />
                    <text x="32" y="48" textAnchor="middle" fill="#fffbeb" fontSize="8" fontWeight="800" fontFamily="system-ui,sans-serif">
                        25
                    </text>
                </CircleMedal>
            </>
        );
    }

    if (badgeKey === "FIRST_SESSION") {
        return (
            <>
                {defs}
                <RibbonBase color="#5b21b6" />
                <CircleMedal fill={`url(#${g})`} shineId={shine}>
                    <path
                        d="M24 28c0-4.4 3.6-8 8-8s8 3.6 8 8c0 6-8 12-8 12s-8-6-8-12z"
                        fill="#fff"
                        opacity="0.95"
                    />
                    <circle cx="32" cy="28" r="2.4" fill="#7c3aed" />
                </CircleMedal>
            </>
        );
    }

    if (badgeKey === "SESSION_REGULAR_5") {
        return (
            <>
                {defs}
                <RibbonBase color="#be123c" />
                <HexMedal fill={`url(#${g})`} shineId={shine}>
                    <rect x="22" y="20" width="20" height="18" rx="3" fill="#fff" />
                    <path d="M22 26h20" stroke="#fda4af" strokeWidth="2" />
                    <circle cx="27" cy="31.5" r="1.6" fill="#e11d48" />
                    <circle cx="32" cy="31.5" r="1.6" fill="#e11d48" />
                    <circle cx="37" cy="31.5" r="1.6" fill="#e11d48" />
                    <text x="32" y="44" textAnchor="middle" fill="#fff1f2" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">
                        5
                    </text>
                </HexMedal>
            </>
        );
    }

    if (badgeKey === "SESSION_COMMITTED_10") {
        return (
            <>
                {defs}
                <RibbonBase color="#0e7490" />
                <ShieldMedal fill={`url(#${g})`} shineId={shine}>
                    <path
                        d="M22 30c0-5.5 4.5-10 10-10s10 4.5 10 10c0 7.5-10 14-10 14S22 37.5 22 30z"
                        fill="#fff"
                        opacity="0.2"
                    />
                    <path
                        d="M26 29.5l4 4 8-9"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                    <text x="32" y="46" textAnchor="middle" fill="#ecfeff" fontSize="8" fontWeight="800" fontFamily="system-ui,sans-serif">
                        10
                    </text>
                </ShieldMedal>
            </>
        );
    }

    return (
        <>
            {defs}
            <RibbonBase color="#0f766e" />
            <CircleMedal fill={`url(#${g})`} shineId={shine}>
                <path
                    d="M32 18l2.6 7.6H43l-6.2 4.6 2.4 7.4L32 33.4l-7.2 4.2 2.4-7.4-6.2-4.6h8.4L32 18z"
                    fill="#fff"
                />
            </CircleMedal>
        </>
    );
}

export default function BadgeIcon({
    badgeKey,
    size = 56,
    locked = false,
    className = "",
}: BadgeIconProps) {
    const reactId = useId().replace(/:/g, "");
    const uid = `badge-${badgeKey}-${reactId}`;

    const style: CSSProperties = {
        width: size,
        height: size,
        filter: locked ? "grayscale(1) brightness(1.05)" : undefined,
        opacity: locked ? 0.55 : 1,
    };

    return (
        <svg
            viewBox={`0 0 ${FRAME} ${FRAME}`}
            width={size}
            height={size}
            className={`shrink-0 drop-shadow-sm ${className}`}
            style={style}
            aria-hidden="true"
        >
            <BadgeArt badgeKey={badgeKey} uid={uid} />
        </svg>
    );
}
