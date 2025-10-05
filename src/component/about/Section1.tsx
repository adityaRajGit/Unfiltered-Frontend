import Link from "next/link"
import Image from "next/image"

function Section1() {
    return (
        <div className="relative bg-gradient-to-r from-teal-700 to-cyan-600 py-20 md:py-32 px-4">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our Mission: Mental Wellness Without Barriers
                        </h1>
                        <p className="text-xl text-teal-100 mb-8 max-w-2xl">
                            At StayUnfiltered, we&apos;re building a world where everyone has access to compassionate,
                            personalized mental healthcare that fits their life and needs.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/services" className="px-8 py-3 bg-white text-teal-700 font-medium rounded-full hover:bg-gray-100 transition-colors">
                                Explore Our Services
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="relative w-full max-w-md h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/about1.jpg"
                                alt="Team discussion"
                                layout="fill"
                                objectFit="cover"
                                className="transition-all duration-500 hover:scale-105 object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section1