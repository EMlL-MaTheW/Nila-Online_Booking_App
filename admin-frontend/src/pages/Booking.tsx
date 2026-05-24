import { useEffect, useState } from "react";
import API from "../services/api";

interface Booking {
  id: number;
  user: string;
  counselor: string;
  date: string;
  time: string;
  status: string;
  user_name: string;
  counselor_name: string;
}

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/bookings/");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await API.patch(`/admin/bookings/${id}/`, { status });
      // update locally for snappy UI instead of refetch
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading...</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">All Bookings</h2>
              <p className="text-gray-500 mt-1">{bookings.length} appointments</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Counselor</th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {b.user}
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-900">{b.user_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">{b.counselor_name}</td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">{b.date}</td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {b.time}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)} className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                          <option value="pending" className="text-gray-900">Pending</option>
                          <option value="confirmed" className="text-green-900">Confirmed</option>
                          <option value="cancelled" className="text-red-900">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {bookings.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-500">No bookings available.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}