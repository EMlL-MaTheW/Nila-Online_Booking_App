import { useState, } from "react";
import { useNavigate } from "react-router-dom";

import BookingPage from "./Booking";
import CounselorsPage from "./Counselors";
import AvailabilityManagement from "./Availability";

export default function AdminDashboard() {
  const [page, setPage] = useState<"bookings" | "counselors" | "availability">("bookings");

  const navigate = useNavigate();
  const adminLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  localStorage.removeItem("isAdmin");

  navigate("/");
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                {page === "bookings" ? "Manage appointments" : page === "counselors" ? "Manage counselors" : "Manage availability"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <button
                onClick={adminLogout}
                className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-xl flex items-center justify-center hover:scale-105 transition"
              ><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 9H5a2 2 0 01-2-2V7a2 2 0 012-2h8"
                />
              </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        <div className="w-full lg:w-64 bg-white shadow-lg border-r border-gray-200 lg:min-h-[calc(100vh-80px)] lg:sticky lg:top-20">
          <nav className="p-4 sm:p-6 space-y-2 flex lg:block gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible">
            <button onClick={() => setPage("bookings")} className={`min-w-[140px] lg:w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${page === "bookings" ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Bookings
            </button>

            <button onClick={() => setPage("counselors")} className={`min-w-[140px] lg:w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${page === "counselors" ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md" : "text-gray-700 hover:bg-green-50 hover:text-green-700"}`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Counselors
            </button>

            <button onClick={() => setPage("availability")} className={`min-w-[140px] lg:w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${page === "availability" ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md" : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"}`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2h-1V3m-10 2V3H6a2 2 0 00-2 2v11a2 2 0 002 2z" /></svg>
              Availability
            </button>
          </nav>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {page === "bookings" && <BookingPage />}
          {page === "counselors" && <CounselorsPage />}
          {page === "availability" && <AvailabilityManagement />}
        </main>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import API from "../services/api";
// import AvailabilityManagement from "./Availability";

// interface Booking {
//   id: number;
//   user: string;
//   counselor: string;
//   date: string;
//   time: string;
//   status: string;
//   user_name: string;
//   counselor_name: string;
// }

// interface Counselor {
//   id: number;
//   name: string;
//   title: string;
//   image: string;
//   experience: string;
//   therapy_hours: string;
//   expertise: string[];
//   videoDuration: string;
//   progress: string;
//   availableSlots: string[];
//   price: number;
//   location: string;
// }

// export default function AdminDashboard() {
//   const [page, setPage] = useState("bookings");
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [counselors, setCounselors] = useState<Counselor[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     title: "",
//     image: "",
//     experience: "",
//     therapy_hours: "",
//     expertise: "",
//     videoDuration: "",
//     progress: "",
//     availableSlots: "",
//     price: "",
//     location: "",
    
//   });

//   useEffect(() => {
//     fetchBookings();
//     fetchCounselors();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/admin/bookings/");
//       setBookings(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCounselors = async () => {
//     try {
//       const res = await API.get("/admin/counselors/");
//       setCounselors(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const updateStatus = async (id: number, status: string) => {
//     await API.patch(`/admin/bookings/${id}/`, { status });
//     fetchBookings();
//   };

//   const createCounselor = async () => {
//   const payload = {
//     name: formData.name,
//     title: formData.title,
//     image: formData.image,
//     experience: formData.experience,
//     therapy_hours: formData.therapy_hours,
//     videoDuration: formData.videoDuration,
//     progress: formData.progress,
//     location: formData.location,

//     // ✅ FIXES
//     expertise: formData.expertise
//       .split(",")
//       .map((s) => s.trim())
//       .filter((s) => s !== ""),

//     available_slots: formData.availableSlots
//       .split(",")
//       .map((s) => s.trim())
//       .filter((s) => s !== ""),

//     price: Number(formData.price),
//   };

//   await API.post("/admin/counselors/", payload);

//   closeModal();
//   fetchCounselors();
// };

//   const updateCounselor = async () => {
//   if (!selectedId) return;

//   const payload = {
//     name: formData.name,
//     title: formData.title,
//     image: formData.image,
//     experience: formData.experience,
//     therapy_hours: formData.therapy_hours,
//     videoDuration: formData.videoDuration,
//     progress: formData.progress,
//     location: formData.location,

//     // ✅ FIXES
//     expertise: formData.expertise
//       .split(",")
//       .map((s) => s.trim())
//       .filter((s) => s !== ""),

//     available_slots: formData.availableSlots
//       .split(",")
//       .map((s) => s.trim())
//       .filter((s) => s !== ""),

//     price: Number(formData.price), // ✅ convert to number
//   };

//   await API.put(`/admin/counselors/${selectedId}/`, payload);

//   closeModal();
//   fetchCounselors();
// };

//   const deleteCounselor = async (id: number) => {
//     if (!window.confirm("Delete this counselor?")) return;
//     await API.delete(`/admin/counselors/${id}/`);
//     fetchCounselors();
//   };

//   const openAddModal = () => {
//     setEditMode(false);
//     setFormData({
//       name: "",
//       title: "",
//       image: "",
//       experience: "",
//       therapy_hours: "",
//       expertise: "",
//       videoDuration: "",
//       progress: "",
//       availableSlots: "",
//       price: "",
//       location: "",
//     });
//     setShowModal(true);
//   };

//   const openEditModal = (c: Counselor) => {
//   setEditMode(true);
//   setSelectedId(c.id);

//   setFormData({
//     name: c.name || "",
//     title: c.title || "",
//     image: c.image || "",
//     experience: c.experience || "",
//     therapy_hours: c.therapy_hours || "",
//     expertise: Array.isArray(c.expertise) ? c.expertise.join(",") : "",
//     videoDuration: c.videoDuration || "",
//     progress: c.progress || "",
//     availableSlots: Array.isArray(c.availableSlots)
//       ? c.availableSlots.join(",")
//       : "",
//     price: c.price ? String(c.price) : "",
//     location: c.location || "",
//   });

//   setShowModal(true);
// };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedId(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//               <p className="mt-1 text-sm text-gray-500">
//                 {page === "bookings" ? "Manage appointments" : "Manage counselors"}
//               </p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
//         <div className="w-full lg:w-64 bg-white shadow-lg border-r border-gray-200 lg:min-h-[calc(100vh-80px)] lg:sticky lg:top-20">
//           <nav className="p-4 sm:p-6 space-y-2 flex lg:block gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible">
//             <button
//               onClick={() => setPage("bookings")}
//               className={`min-w-[140px] lg:w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                 page === "bookings"
//                   ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
//                   : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//               }`}
//             >
//               <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                 />
//               </svg>
//               Bookings
//             </button>
//             <button
//               onClick={() => setPage("counselors")}
//               className={`min-w-[140px] lg:w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                 page === "counselors"
//                   ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
//                   : "text-gray-700 hover:bg-green-50 hover:text-green-700"
//               }`}
//             >
//               <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//                 />
//               </svg>
//               Counselors
//             </button>
//             <button
//               onClick={() => setPage("availability")}
//               className={`min-w-[140px] lg:w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                 page === "availability"
//                   ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md"
//                   : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
//               }`}
//             >
//               <svg
//                 className="w-5 h-5 mr-3"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2h-1V3m-10 2V3H6a2 2 0 00-2 2v11a2 2 0 002 2z"
//                 />
//               </svg>
//               Availability
//             </button>
//           </nav>
//         </div>

//         <main className="flex-1 p-4 sm:p-6 lg:p-8">
//           {loading && (
//             <div className="flex items-center justify-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-lg text-gray-600">Loading...</span>
//             </div>
//           )}

//           {page === "bookings" && !loading && (
//             <div>
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
//                 <div>
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">All Bookings</h2>
//                   <p className="text-gray-500 mt-1">{bookings.length} appointments</p>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[700px]">
//                     <thead>
//                       <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
//                         <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
//                         <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Counselor</th>
//                         <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
//                         <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
//                         <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {bookings.map((b) => (
//                         <tr key={b.id} className="hover:bg-gray-50 transition-colors duration-150">
//                           <td className="px-6 py-5 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                                 {/* {b.user.charAt(0).toUpperCase()} */}
//                                 {/* {b.user_name?.charAt(0).toUpperCase() || "U"} */}
//                                 {b.user}
//                               </div>
//                               <span className="ml-3 text-sm font-medium text-gray-900">{b.user_name}</span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">{b.counselor_name}</td>
//                           <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900">{b.date}</td>
//                           <td className="px-6 py-5 whitespace-nowrap">
//                             <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//                               {b.time}
//                             </span>
//                           </td>
//                           <td className="px-6 py-5 whitespace-nowrap">
//                             <select
//                               value={b.status}
//                               onChange={(e) => updateStatus(b.id, e.target.value)}
//                               className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                             >
//                               <option value="pending" className="text-gray-900">Pending</option>
//                               <option value="confirmed" className="text-green-900">Confirmed</option>
//                               <option value="cancelled" className="text-red-900">Cancelled</option>
//                             </select>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {page === "counselors" && !loading && (
//             <div>
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
//                 <div>
//                   <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Counselors</h2>
//                   <p className="text-gray-500 mt-1">{counselors.length} professionals</p>
//                 </div>
//                 <button
//                   onClick={openAddModal}
//                   className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
//                 >
//                   + Add Counselor
//                 </button>
//               </div>

//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[750px]">
//                     <thead>
//                       <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
//                         <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
//                         <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Specialization</th>
//                         <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Experience</th>
//                         <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {counselors.map((c) => (
//                         <tr key={c.id} className="hover:bg-gray-50 transition-colors duration-150">
//                           <td className="px-6 py-5 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-semibold text-lg shadow-md">
//                                 {c.name.charAt(0).toUpperCase()}
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-semibold text-gray-900">{c.name}</div>
//                                 <div className="text-xs text-gray-500">ID: {c.id}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-5 whitespace-nowrap">
//                             <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium rounded-xl">
//                               {c.title}
//                             </span>
//                           </td>
//                           <td className="px-6 py-5 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
//                               <span className="text-sm font-medium text-gray-900">{c.experience} years</span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-5 whitespace-nowrap text-sm font-medium space-x-2">
//                             <button
//                               onClick={() => openEditModal(c)}
//                               className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => deleteCounselor(c.id)}
//                               className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
//                             >
//                               Remove
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}
//           {page === "availability" && !loading && (
//               <AvailabilityManagement />
//             )}
//         </main>
//       </div>

//       {showModal && (
//         <>
//           <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50" onClick={closeModal} />
//           <div className="fixed inset-0 flex items-center justify-center z-50 p-3 sm:p-4">
//             <div
//               className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-5 sm:p-8 overflow-y-auto max-h-[90vh]">
//                 <div className="flex items-center mb-8">
//                   <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
//                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//                       />
//                     </svg>
//                   </div>
//                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//                     {page === "availability"
//                       ? "Add Availability"
//                       : editMode
//                       ? "Edit Counselor"
//                       : "Add New Counselor"}
//                   </h2>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
//                       <input
//                         placeholder="Enter counselor name"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
//                       <input
//                         placeholder="Psychiatrist / Therapist"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
//                         value={formData.title}
//                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image URL</label>
//                       <input
//                         placeholder="https://image-url"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all text-sm"
//                         value={formData.image}
//                         onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
//                       <input
//                         placeholder="5 years exp"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
//                         value={formData.experience}
//                         onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Therapy Hours</label>
//                       <input
//                         placeholder="450+ Therapy Hours"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all text-sm"
//                         value={formData.therapy_hours}
//                         onChange={(e) => setFormData({ ...formData, therapy_hours: e.target.value })}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Expertise</label>
//                       <input
//                         placeholder="Stress, Relationships"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
//                         value={formData.expertise}
//                         onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
//                       />
//                       <p className="text-xs text-gray-400 mt-1">Comma separated</p>
//                     </div>

//                     {/* <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Available Slots</label>
//                       <input
//                         placeholder="09:00, 09:30, 10:00"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all text-sm"
//                         value={formData.availableSlots}
//                         onChange={(e) => setFormData({ ...formData, availableSlots: e.target.value })}
//                       />
//                     </div> */}

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Session Price (₹)</label>
//                       <input
//                         type="number"
//                         placeholder="1500"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-600 transition-all text-sm"
//                         value={formData.price}
//                         onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
//                       <input
//                         placeholder="Mental Health Care - India"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-500 transition-all text-sm"
//                         value={formData.location}
//                         onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 mt-10">
//                   <button
//                     onClick={closeModal}
//                     className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={editMode ? updateCounselor : createCounselor}
//                     className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl focus:ring-2 focus:ring-green-500 transition-all duration-200 transform hover:-translate-y-0.5"
//                   >
//                     {editMode ? "Update Counselor" : "Create Counselor"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

