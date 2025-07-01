import Image from 'next/image';

type Appointment = {
    id: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    date: Date;
    duration: number;
    client: {
        name: string;
        profilePic?: string;
    };
};


export function AppointmentList({
    appointments,
    emptyMessage,
    emptyDescription,
    isPast = false
}: {
    appointments: Appointment[];
    emptyMessage: string;
    emptyDescription: string;
    isPast?: boolean;
}) {
    if (appointments.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center">
                    <svg
                        className="h-8 w-8 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isPast
                                ? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                : "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            }
                        />
                    </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{emptyMessage}</h3>
                <p className="mt-1 text-gray-500">{emptyDescription}</p>
            </div>
        );
    }

    return (
        <div className="flow-root">
            <ul className="divide-y divide-gray-100">
                {appointments.map((appointment) => (
                    <li key={appointment.id} className="py-4 hover:bg-gray-50 rounded-lg px-3 transition-colors">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Client Avatar with Status */}
                            <div className="flex-shrink-0 relative">
                                {appointment.client.profilePic ? (
                                    <Image
                                        className="h-14 w-14 rounded-full object-cover border-2 border-white shadow"
                                        width={56}
                                        height={56}
                                        src={appointment.client.profilePic}
                                        alt={appointment.client.name}
                                    />
                                ) : (
                                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-14 h-14 flex items-center justify-center text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                )}
                                <div className={`absolute -bottom-1 -right-1 rounded-full p-1 border-2 border-white ${appointment.status === 'scheduled' ? 'bg-yellow-400' :
                                    appointment.status === 'completed' ? 'bg-green-500' :
                                        'bg-red-500'
                                    }`}></div>
                            </div>

                            {/* Client Info */}
                            <div className="flex-1 min-w-0 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <h3 className="text-base font-semibold text-gray-900 truncate">
                                        {appointment.client.name}
                                    </h3>
                                    <div className='sm:flex sm:items-center sm:justify-center'>
                                        <span className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                                            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {/* Appointment Details */}
                                <div className="mt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center text-sm text-gray-500 gap-y-2">
                                    <div className="flex items-center col-span-1">
                                        <svg
                                            className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="truncate">
                                            {appointment.date.toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center col-span-1">
                                        <svg
                                            className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="truncate">
                                            {appointment.date.toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center col-span-2">
                                        <svg
                                            className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="truncate">
                                            {appointment.duration} min session
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button - moves to bottom on mobile */}
                            <div className="w-full sm:w-auto sm:flex-shrink-0 sm:ml-4 mt-2 sm:mt-0">
                                <button className="w-full sm:w-auto inline-flex justify-center items-center px-3 py-1.5 border border-teal-200 shadow-sm text-sm font-medium rounded-lg text-teal-700 bg-teal-50 hover:bg-teal-100 focus:outline-none">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}