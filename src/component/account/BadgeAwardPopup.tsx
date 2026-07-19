import { FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import { BadgeCatalogItem } from '@/utils/badges';
import BadgeIcon from './BadgeIcon';

interface BadgeAwardPopupProps {
    badge: BadgeCatalogItem;
    onClose: () => void;
}

const BadgeAwardPopup: FC<BadgeAwardPopupProps> = ({ badge, onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="fixed inset-0 bg-black/50" />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        aria-label="Close badge popup"
                    >
                        <FaTimes />
                    </button>

                    <div className="relative overflow-hidden bg-gradient-to-br from-[#009689] via-[#00a896] to-[#00796b] px-6 pt-10 pb-12 text-center text-white">
                        <div className="pointer-events-none absolute -top-8 -left-8 h-28 w-28 rounded-full bg-white/10" />
                        <div className="pointer-events-none absolute -bottom-10 -right-6 h-36 w-36 rounded-full bg-white/10" />

                        <div className="relative mx-auto mb-3 flex h-28 w-28 items-center justify-center rounded-full bg-white/15 ring-4 ring-white/25 shadow-lg animate-[pulse_2.4s_ease-in-out_infinite]">
                            <BadgeIcon badgeKey={badge.key} size={96} />
                        </div>

                        <p className="relative text-xs uppercase tracking-[0.2em] text-white/80">
                            New Achievement Unlocked
                        </p>
                        <h3 className="relative mt-2 text-2xl font-bold">{badge.title}</h3>
                    </div>

                    <div className="px-6 py-8 text-center">
                        <p className="text-gray-600 leading-relaxed">{badge.description}</p>
                        <p className="mt-3 text-sm text-gray-400">
                            Keep going — every step counts on your wellness journey.
                        </p>

                        <button
                            onClick={onClose}
                            className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#009689] to-[#00b09b] py-3.5 font-semibold text-white hover:shadow-lg transition-all duration-300"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadgeAwardPopup;
