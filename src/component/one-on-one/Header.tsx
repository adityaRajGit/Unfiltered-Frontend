function OneonOneHeader() {
    return (
        <header className="bg-[#03978a] text-white py-6">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Struggling With Mental Health?</h1>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Life with One-on-One Therapy</h1>
                <p className="text-xl opacity-90">Professional guidance tailored to your unique journey,</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6 mt-4">
                    {[
                        "Anxiety",
                        "Depression",
                        "Trauma",
                        "Relationships",
                        "Sleep Issues",
                        "Stress",
                        "Self-Esteem",
                    ].map((issue, idx) => (
                        <span
                            key={idx}
                            className="bg-white text-teal-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {issue}
                        </span>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default OneonOneHeader