

function LeadSections() {
    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Leads Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map((item) => (
                            <tr key={item} className="border-b">
                                <td className="py-3 px-4">John Doe</td>
                                <td className="py-3 px-4">john@example.com</td>
                                <td className="py-3 px-4">
                                    <span className="bg-[#e3fcf7] text-[#009689] px-2 py-1 rounded-full text-xs">
                                        New
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeadSections