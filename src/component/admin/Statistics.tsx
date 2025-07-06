
function Statistics() {
    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Statistics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-[#e3fcf7] rounded-lg p-4">
                        <div className="text-2xl font-bold text-[#009689]">1,024</div>
                        <div className="text-gray-600">Total Visitors</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Statistics