

function HeroSection() {
    return (
        <header className="bg-[#009689] text-white py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Corporate Wellness Webinars</h1>
                <p className="text-xl max-w-3xl mx-auto mb-8">
                    Transform your workplace with expert-led therapy webinars designed for modern teams
                </p>
                <div className="flex justify-center gap-4">
                    <button className="bg-white text-[#009689] px-6 py-3 rounded-full font-semibold hover:bg-[#e3fdf7] transition">
                        Explore Webinars
                    </button>
                    <button className="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#009689] transition">
                        Request Demo
                    </button>
                </div>
            </div>
        </header>
    )
}

export default HeroSection