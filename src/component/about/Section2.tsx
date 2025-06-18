

function Section2() {
    return (
        <div className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                        Our Journey
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        From Vision to Reality
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                        How a shared passion for mental health accessibility became a platform transforming lives worldwide
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 mt-8" />
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-72" />
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 mt-8" />
                        </div>
                        <div className="absolute -bottom-6 right-0 sm:-right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <div className="text-4xl font-bold text-teal-600">2018</div>
                            <p className="text-sm text-gray-600">Founded in Bangalore</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-700 mb-6">
                            StayUnfiltered was born from a simple observation: too many people were struggling with
                            mental health challenges without access to quality, affordable care. Our founders, a team
                            of mental health professionals and technologists, saw an opportunity to bridge this gap
                            through technology.
                        </p>
                        <p className="text-gray-700 mb-6">
                            What started as a small initiative to connect therapists with clients in underserved areas
                            has grown into a comprehensive platform serving over 100,000 users across 20+ countries.
                            Our journey has been fueled by a shared commitment to breaking down barriers to mental
                            healthcare.
                        </p>
                        <p className="text-gray-700">
                            Today, we&apos;re proud to be at the forefront of the digital mental health revolution, but
                            our mission remains the same: to make compassionate, personalized mental healthcare
                            accessible to everyone, everywhere.
                        </p>

                        <div className="mt-10 flex items-center gap-6">
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold text-teal-600">100k+</div>
                                <div className="text-gray-600">Lives Touched</div>
                            </div>
                            <div className="h-12 w-px bg-gray-300"></div>
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold text-teal-600">20+</div>
                                <div className="text-gray-600">Countries Served</div>
                            </div>
                            <div className="h-12 w-px bg-gray-300"></div>
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold text-teal-600">500+</div>
                                <div className="text-gray-600">Expert Therapists</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section2