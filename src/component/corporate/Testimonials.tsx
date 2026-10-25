

type Testimonial = { name: string; role: string; quote: string };

// Only verified client testimonials, used with permission, belong here. The earlier
// entries named placeholder companies, so the section is hidden until real ones exist.
const testimonials: Testimonial[] = [];

function Testimonials() {
    if (testimonials.length === 0) return null;
    return (
        <section className="py-16 px-4 bg-gradient-to-b from-teal-700 to-teal-800 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Organizations that transformed their workplace culture
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300"
                        >
                            <div className="flex items-center mb-6">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                <div className="ml-4">
                                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                                    <p className="text-teal-200">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-300 mb-4">
                                ★★★★★
                            </div>
                            <p className="opacity-90 italic">
                                &quot;{testimonial.quote}&quot;
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials