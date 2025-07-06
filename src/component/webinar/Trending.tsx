

function Trending() {
    const trendingTherapies = [
        { title: 'Mindfulness-Based Stress Reduction', description: 'Evidence-based program for stress, anxiety, and chronic pain' },
        { title: 'Cognitive Behavioral Therapy (CBT)', description: 'Practical approach to managing thoughts and behaviors' },
        { title: 'Acceptance and Commitment Therapy (ACT)', description: 'Focuses on psychological flexibility and values-based living' },
        { title: 'Solution-Focused Brief Therapy', description: 'Goal-directed collaborative approach' },
        { title: 'Art and Expressive Therapies', description: 'Using creative arts for emotional expression and healing' },
        { title: 'Digital Therapeutics', description: 'App-based interventions for mental wellness' }
    ];
    return (
        <section className="py-16 bg-[#f7fdfc] px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4">Trending Therapy Approaches</h2>
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                    Modern therapeutic techniques making an impact in corporate wellness
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingTherapies.map((therapy, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#009689] hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-bold mb-2">{therapy.title}</h3>
                            <p className="text-gray-700">{therapy.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Trending