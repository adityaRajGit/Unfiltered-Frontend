import Link from "next/link";
import ClientStories from "./ClientStories";

function Section2() {
    return (
        <div className="py-16 px-4 sm:px-6 bg-gradient-to-b from-teal-50 to-white">
            <div className="max-w-7xl mx-auto">
                <ClientStories />

                <div className="mt-16 text-center">
                    <Link
                        href="/pages/one-on-one"
                        className="inline-flex items-center px-8 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition-colors"
                    >
                        Explore All Therapy Options
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Section2;
