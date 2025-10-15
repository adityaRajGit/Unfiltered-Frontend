function Quote() {
    return (
        <section className="py-6 bg-teal-600 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Quote Icon */}
                    <div className="mb-6">
                        <svg
                            className="w-12 h-12 mx-auto text-teal-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                        </svg>
                    </div>

                    {/* Main Quote */}
                    <h2 className="text-3xl font-bold mb-6 leading-tight">
                        Why Our Pricing is Different
                    </h2>

                    <blockquote className="text-xl lg:text-2xl font-light mb-8 leading-relaxed italic">
                        &quot;We don&lsquo;t believe in one-size-fits-all. Our prices reflect the personal care, confidential support, and attention we design just for you.&quot;
                    </blockquote>
                </div>
            </div>
        </section>
    )
}

export default Quote