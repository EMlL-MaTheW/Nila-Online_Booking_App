import React, { useEffect, useState } from "react";
import API from "../services/api";

interface Availability {
  id: number;
  counselor: number;
  counselor_name: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  session_duration: number;
}

interface Counselor {
  id: number;
  name: string;
  counselor_name: string;
}

export default function AvailabilityManagement() {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    counselor: "",
    day: "",
    start_time: "",
    end_time: "",
    duration: "",
  });

  useEffect(() => {
    fetchAvailability();
    fetchCounselors();
  }, []);

  const fetchAvailability = async () => {
    const res = await API.get("/admin/availability/");
    setAvailability(res.data);
  };

  const fetchCounselors = async () => {
    const res = await API.get("/admin/counselors/");
    setCounselors(res.data);
  };

  const createAvailability = async () => {
    await API.post("/admin/availability/", {
      counselor: formData.counselor,
      day_of_week: formData.day,
      start_time: formData.start_time,
      end_time: formData.end_time,
      session_duration: Number(formData.duration),
    });

    fetchAvailability();
    setShowModal(false);
    setFormData({
      counselor: "",
      day: "",
      start_time: "",
      end_time: "",
      duration: "",
    });
  };

  const deleteAvailability = async (id: number) => {
    await API.delete(`/admin/availability/${id}/`);
    fetchAvailability();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Availability
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage counselor working hours and session slots
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-purple-700 sm:w-auto"
          >
            + Add Availability
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 sm:px-6">
                    Counselor
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 sm:px-6">
                    Day
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 sm:px-6">
                    Time
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 sm:px-6">
                    Duration
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 sm:px-6">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {availability.map((a) => (
                  <tr key={a.id} className="transition hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                      {a.counselor_name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">
                      <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                        {a.day_of_week}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">
                      {a.start_time} - {a.end_time}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">
                      {a.session_duration} min
                    </td>
                    <td className="px-4 py-4 text-center sm:px-6">
                      <button
                        onClick={() => deleteAvailability(a.id)}
                        className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600 sm:px-4 sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {availability.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                      No availability added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
            <div
              className="w-full max-w-md rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[90vh] overflow-y-auto p-5 sm:p-6">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Add Availability
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Set working day, start time, end time, and session duration.
                  </p>
                </div>

                <div className="space-y-4">
                  <select
                    className="w-full rounded-xl bg-blue-50 px-4 py-3 text-sm outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-500"
                    value={formData.counselor}
                    onChange={(e) =>
                      setFormData({ ...formData, counselor: e.target.value })
                    }
                  >
                    <option value="">Select Counselor</option>
                    {counselors.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="w-full rounded-xl bg-blue-50 px-4 py-3 text-sm outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-500"
                    value={formData.day}
                    onChange={(e) =>
                      setFormData({ ...formData, day: e.target.value })
                    }
                  >
                    <option value="">Select Day</option>
                    <option value="mon">Monday</option>
                    <option value="tue">Tuesday</option>
                    <option value="wed">Wednesday</option>
                    <option value="thu">Thursday</option>
                    <option value="fri">Friday</option>
                    <option value="sat">Saturday</option>
                    <option value="sun">Sunday</option>
                  </select>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="time"
                      className="w-full rounded-xl bg-blue-50 px-4 py-3 text-sm outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-500"
                      value={formData.start_time}
                      onChange={(e) =>
                        setFormData({ ...formData, start_time: e.target.value })
                      }
                    />

                    <input
                      type="time"
                      className="w-full rounded-xl bg-blue-50 px-4 py-3 text-sm outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-500"
                      value={formData.end_time}
                      onChange={(e) =>
                        setFormData({ ...formData, end_time: e.target.value })
                      }
                    />
                  </div>

                  <input
                    type="number"
                    placeholder="Session Duration (minutes)"
                    className="w-full rounded-xl bg-blue-50 px-4 py-3 text-sm outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-purple-500"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={createAvailability}
                    className="w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import API from "../services/api";

// interface Availability {
//   id: number;
//   counselor: number;
//   counselor_name: string;
//   day_of_week: string;
//   start_time: string;
//   end_time: string;
//   session_duration: number;
// }

// interface Counselor {
//   id: number;
//   name: string;
//   counselor_name: string;
// }

// export default function AvailabilityManagement() {
//   const [availability, setAvailability] = useState<Availability[]>([]);
//   const [counselors, setCounselors] = useState<Counselor[]>([]);
//   const [showModal, setShowModal] = useState(false);

//   const [formData, setFormData] = useState({
//     counselor: "",
//     day: "",
//     start_time: "",
//     end_time: "",
//     duration: "",
//   });

//   useEffect(() => {
//     fetchAvailability();
//     fetchCounselors();
//   }, []);

//   const fetchAvailability = async () => {
//     const res = await API.get("/admin/availability/");
//     setAvailability(res.data);
//   };

//   const fetchCounselors = async () => {
//     const res = await API.get("/admin/counselors/");
//     setCounselors(res.data);
//   };

//   const createAvailability = async () => {
//     await API.post("/admin/availability/", {
//       counselor: formData.counselor,
//       day_of_week: formData.day,
//       start_time: formData.start_time,
//       end_time: formData.end_time,
//       session_duration: Number(formData.duration),
//     });

//     fetchAvailability();
//     setShowModal(false);
//   };

//   const deleteAvailability = async (id: number) => {
//     await API.delete(`/admin/availability/${id}/`);
//     fetchAvailability();
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex justify-between mb-6">
//         <h2 className="text-2xl font-bold">Availability</h2>

//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-purple-600 text-white px-6 py-2 rounded-xl"
//         >
//           + Add Availability
//         </button>
//       </div>

//       {/* Table */}
//       <table className="w-full bg-white rounded-xl shadow">
//         <thead>
//           <tr>
//             <th className="p-3 text-left">Counselor</th>
//             <th className="p-3 text-left">Day</th>
//             <th className="p-3 text-left">Time</th>
//             <th className="p-3 text-left">Duration</th>
//             <th className="p-3">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {availability.map((a) => (
//             <tr key={a.id}>
//               <td className="p-3">{a.counselor_name}</td>
//               <td className="p-3">{a.day_of_week}</td>
//               <td className="p-3">
//                 {a.start_time} - {a.end_time}
//               </td>
//               <td className="p-3">{a.session_duration} min</td>
//               <td className="p-3">
//                 <button
//                   onClick={() => deleteAvailability(a.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* MODAL */}
//       {showModal && (
//         <>
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
//             onClick={() => setShowModal(false)}
//           />

//           <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//             <div
//               className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6 space-y-4">

//                 <h2 className="text-xl font-bold">Add Availability</h2>

//                 {/* Counselor */}
//                 <select
//                   className="w-full bg-blue-100 p-3 rounded-xl"
//                   value={formData.counselor}
//                   onChange={(e) =>
//                     setFormData({ ...formData, counselor: e.target.value })
//                   }
//                 >
//                   <option value="">Select Counselor</option>
//                   {counselors.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Day */}
//                 <select
//                   className="w-full bg-blue-100 p-3 rounded-xl"
//                   value={formData.day}
//                   onChange={(e) =>
//                     setFormData({ ...formData, day: e.target.value })
//                   }
//                 >
//                   <option value="">Select Day</option>
//                   <option value="mon">Monday</option>
//                   <option value="tue">Tuesday</option>
//                   <option value="wed">Wednesday</option>
//                   <option value="thu">Thursday</option>
//                   <option value="fri">Friday</option>
//                   <option value="sat">Saturday</option>
//                   <option value="sun">Sunday</option>
//                 </select>

//                 {/* Time */}
//                 <input
//                   type="time"
//                   className="w-full bg-blue-100 p-3 rounded-xl"
//                   onChange={(e) =>
//                     setFormData({ ...formData, start_time: e.target.value })
//                   }
//                 />

//                 <input
//                   type="time"
//                   className="w-full bg-blue-100 p-3 rounded-xl"
//                   onChange={(e) =>
//                     setFormData({ ...formData, end_time: e.target.value })
//                   }
//                 />

//                 {/* Duration */}
//                 <input
//                   type="number"
//                   placeholder="Session Duration (minutes)"
//                   className="w-full bg-blue-100 p-3 rounded-xl"
//                   onChange={(e) =>
//                     setFormData({ ...formData, duration: e.target.value })
//                   }
//                 />

//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="flex-1 border py-2 rounded-xl"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     onClick={createAvailability}
//                     className="flex-1 bg-purple-600 text-white py-2 rounded-xl"
//                   >
//                     Save
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