"use client";
import { LoadingSpinnerWithOverlay } from '@/component/global/Loading';
import { loginAdmin } from '@/store/adminSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Page() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(loginAdmin(data as any) as any)
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      toast.success("Admin Logged in Successfully")
      router.push('/admin/dashboard')
    }
  };

  if(loading){
    return <LoadingSpinnerWithOverlay />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e3fcf7]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#009689] mb-2">Admin Panel</div>
          <h2 className="text-2xl font-semibold text-gray-800">Sign in to Dashboard</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009689] focus:border-transparent transition"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009689] focus:border-transparent transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#009689] hover:bg-[#007e72] text-white font-semibold rounded-lg transition duration-300 transform hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;