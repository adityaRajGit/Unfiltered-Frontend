
function Testimonials() {
    const testimonials = [
        { name: 'Sarah Johnson', company: 'Tech Innovations Inc.', quote: 'Our team engagement increased by 40% after the stress management series.' },
        { name: 'Michael Chen', company: 'Global Finance Corp', quote: 'The positive psychology workshops transformed our workplace culture.' },
        { name: 'Emma Rodriguez', company: 'HealthFirst Partners', quote: 'Best investment we made in our employees this year!' }
    ];
    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                    Hear from companies that transformed their workplace culture
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-md border-t-4 border-[#009689]"
                        >
                            <div className="flex items-center mb-4">
                                <div className="bg-[#e3fdf7] w-12 h-12 rounded-full flex items-center justify-center text-[#009689] font-bold mr-4">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials