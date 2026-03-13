// components/SessionCompletionPopup.tsx
import { FC } from 'react';

interface SessionCompletionPopupProps {
  name: string;
  date: string | Date;
  onConfirm: () => void;
  onCancel: () => void;
}

const SessionCompletionPopup: FC<SessionCompletionPopupProps> = ({
  name,
  date,
  onConfirm,
  onCancel,
}) => {
  const dateObj = new Date(date);
  

  // @ts-ignore
  const formattedDate: any = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    : date;


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Non-clickable Backdrop - Only for visual effect */}
      <div className="fixed inset-0 bg-black/50 bg-opacity-70" />

      {/* Popup Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          {/* Header with decorative elements */}
          <div className="bg-gradient-to-r from-[#009689] to-[#00b09b] p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <div className="relative">
                  <div className="h-6 w-6 rounded-full border-2 border-white"></div>
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Session Complete</h3>
                <p className="text-white/80 text-sm mt-1">Confirmation Required</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Main Message */}
            <div className="mb-8 text-center">
              <div className="mb-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#009689]/10 to-[#00b09b]/10">
                  <svg
                    className="h-8 w-8 text-[#009689]"
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
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-2">
                Your session with{' '}
                <span className="font-bold text-[#009689] bg-[#009689]/10 px-2 py-1 rounded">
                  {name}
                </span>{' '}
                is now complete.
              </p>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center text-gray-600">
                  <svg
                    className="h-5 w-5 mr-2 text-[#009689]"
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
                  <span className="font-medium">{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    You must select an option to proceed. This popup will not close until you choose Yes or No.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={onConfirm}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#009689] to-[#00b09b] py-4 px-6 text-white font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                <div className="relative flex items-center justify-center space-x-3">
                  <svg
                    className="h-6 w-6 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-lg">Yes</div>
                    <div className="text-white/70 text-sm">Confirm completion</div>
                  </div>
                </div>
              </button>

              <button
                onClick={onCancel}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300 py-4 px-6 font-semibold text-gray-700 hover:border-gray-400 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gray-200/0 group-hover:bg-gray-200/20 transition-colors" />
                <div className="relative flex items-center justify-center space-x-3">
                  <svg
                    className="h-6 w-6 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-lg">No</div>
                    <div className="text-gray-500 text-sm">Cancel completion</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCompletionPopup;