
function Faq() {
    return (
        <section className="py-16 px-4 bg-[#f7fdfc]">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>

                <div className="mt-8 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-2">How are webinars delivered?</h3>
                        <p className="text-gray-700">Our webinars are delivered via secure video conferencing platforms. We offer live interactive sessions as well as recorded options for flexible scheduling.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-2">Can sessions be customized for our industry?</h3>
                        <p className="text-gray-700">Absolutely! All our programs can be tailored to address the specific challenges and culture of your industry and organization.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-2">What is the typical ROI for these programs?</h3>
                        <p className="text-gray-700">Companies typically see a 3-5x return through reduced absenteeism, increased productivity, and improved employee retention.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-2">How do you ensure confidentiality?</h3>
                        <p className="text-gray-700">We adhere to strict confidentiality protocols. Individual participation details are never shared with employers without explicit consent.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq