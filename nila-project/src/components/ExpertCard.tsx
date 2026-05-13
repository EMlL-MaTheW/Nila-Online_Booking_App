import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api"

interface Props {
  selectedCategory: string | null;
}

interface Expert {
  id: number;
  name: string;
  title: string;
  image: string;
  experience: string;
  therapy_hours: string;
  expertise: string[];
  videoDuration: string;
  progress: string;
  available_slots: string[];
  price: number;
  location: string;
}

const ExpertCard: React.FC<Props> = ({ selectedCategory }) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [slotsMap, setSlotsMap] = useState<{ [key: number]: string[] }>({});

  // ✅ Fetch from backend
  useEffect(() => {
    fetchExperts();
  }, []);

  // const fetchExperts = async () => {
  //   try {
  //     const res = await API.get("/counselors/");
  //     setExperts(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //Slots for counselor
  const fetchSlots = async (id: number) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const res = await API.get(`/counselors/${id}/available_slots/?date=${today}`);

      setSlotsMap(prev => ({
        ...prev,
        [id]: res.data,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExperts = async () => {
    try {
      const res = await API.get("/counselors/");
      setExperts(res.data);

      // 🔥 fetch slots for each counselor
      res.data.forEach((exp: Expert) => {
        fetchSlots(exp.id);
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Slot logic (unchanged)
  const generateSlots = (times: string[]) => {
    const now = new Date();
    let slots: Date[] = [];

    for (let i = 0; i < 3; i++) {
      const day = new Date();
      day.setDate(now.getDate() + i);

      times.forEach(time => {
        const [h, m] = time.split(":").map(Number);
        const slot = new Date(day);
        slot.setHours(h, m, 0, 0);

        if (slot > now) slots.push(slot);
      });
    }

    return slots.sort((a, b) => a.getTime() - b.getTime());
  };

  const getNextSlot = (times: string[]) => {
    const slots = generateSlots(times);
    if (!slots.length) return "No slots available";

    return slots[0].toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProgressWidth = (progress: string): string => {
    const [current, total] = progress.split('/').map(Number);
    return `${(current / total) * 100}%`;
  };

  // ✅ Transform backend → SAME UI format
  const formattedExperts = [
  {
    category: "All Specialists",
    experts: experts.map((exp) => ({
      id: exp.id,
      name: exp.name,
      title: exp.title,
      experience: `${exp.experience}`,
      price: exp.price || 500,
      image: exp.image || "https://via.placeholder.com/150",

      // ✅ FIX HERE
      expertise: Array.isArray(exp.expertise)
        ? exp.expertise
        : exp.expertise
        ? [exp.expertise]
        : [exp.title],

      available_slots: slotsMap[exp.id] || [],
      therapy_hours: exp.therapy_hours || "",
      progress: exp.progress || "3/5",
      videoDuration: exp.videoDuration || "2m",
    })),
  },
];

  // ✅ Filter
  const filteredExperts = formattedExperts.map(category => ({
    ...category,
    experts: category.experts.filter(expert =>
      !selectedCategory ||
      expert.title.toLowerCase().includes(selectedCategory.toLowerCase())
    )
  })).filter(category => category.experts.length > 0);

  if (loading) {
    return <p className="text-center py-20">Loading experts...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {filteredExperts.length > 0 ? (
        filteredExperts.map((category, catIndex) => (
          <div key={catIndex} className="mb-20 last:mb-0">

            {/* ✅ SAME HEADER */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-4">
                {category.category}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                {category.experts.length} top experts available
              </p>
            </div>

            {/* ✅ SAME GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.experts.map((expert) => (
                <div
                  key={expert.id}
                  className="group bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y transition-all duration-300 border-2 border-green-200 hover:border-green-300"
                >

                  {/* TOP */}
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-20 h-20 rounded-2xl object-cover shadow-md group-hover:scale-105 transition"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 truncate">
                        {expert.name}
                      </h3>
                      <p className="text-sm text-gray-600">{expert.title}</p>
                      <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs mt-1">
                        {expert.experience} years exp
                      </span>
                    </div>
                  </div>

                  {/* TAGS */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      {expert.therapy_hours} + Therappy Hours
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {expert.expertise.map((tag, index) => (
                        <span key={index} className="bg-white px-3 py-1 rounded-full text-xs shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* PROGRESS */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: getProgressWidth(expert.progress) }}
                      />
                    </div>
                    <span className="text-xs">{expert.videoDuration}</span>
                  </div>

                  {/* SLOT + PRICE */}
                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-xs text-gray-500">Next slot</p>
                      <p className="font-bold text-sm">
                        {getNextSlot(expert.available_slots)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Starts</p>
                      <p className="font-bold text-xl">₹{expert.price}</p>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <Link
                    to={`/booking/${expert.id}`}
                    className="block w-full text-center bg-gray-900 text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition"
                  >
                    Book Now
                  </Link>

                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-32">
          <h2 className="text-3xl font-bold">No experts found</h2>
        </div>
      )}
    </section>
  );
};

export default ExpertCard;






// // import { useState } from "react";
// import { Link } from "react-router-dom";

// // Experts details from expert.ts file (./data/experts.ts)
// import {expertsData, } from '../data/experts'; 

// interface Props {
//   selectedCategory: string | null;
// }
// const ExpertCard: React.FC<Props> = ({ selectedCategory }) => {
//   // const [searchTerm, setSearchTerm] = useState("");

//   // for nextSlot function
// const generateSlots = (times: string[]) => {
//   const now = new Date();
//   let slots: Date[] = [];

//   for (let i = 0; i < 3; i++) {
//     const day = new Date();
//     day.setDate(now.getDate() + i);

//     times.forEach(time => {
//       const [h, m] = time.split(":").map(Number);
//       const slot = new Date(day);
//       slot.setHours(h, m, 0, 0);

//       if (slot > now) {
//         slots.push(slot);
//       }
//     });
//   }

//   return slots.sort((a, b) => a.getTime() - b.getTime());
// };

// const getNextSlot = (times: string[]) => {
//   const slots = generateSlots(times);

//   if (!slots.length) return "No slots available";

//   return slots[0].toLocaleString("en-IN", {
//     day: "numeric",
//     month: "short",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };
// // end next slot functions

//   const getProgressWidth = (progress: string): string => {
//     const [current, total] = progress.split('/').map(Number);
//     return `${(current / total) * 100}%`;
//   };

//   // const filteredExperts = expertsData.map(category => ({
//   //   ...category,
//   //   experts: category.experts.filter(expert =>
//   //     expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //     expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //     expert.expertise.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//   //   )
//   // })).filter(category => category.experts.length > 0);
//     const filteredExperts = expertsData.map(category => ({
//       ...category,
//       experts: category.experts.filter(expert =>
//         !selectedCategory || 
//         expert.title.toLowerCase().includes(selectedCategory.toLowerCase())
//       )
//     })).filter(category => category.experts.length > 0);
//   return (
//     <>
//       {/* <section id="section-search" className="max-w-7xl mx-auto px-6 py-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//           <div className="relative">
//             <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
//             <input
//               type="text"
//               placeholder="Search by therapist name, specialty or expertise"
//               className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:border-green-600 focus:outline-none text-gray-700 font-medium transition-all duration-300 bg-white shadow-sm hover:shadow-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>
//       </section> */}

//       <section id="section-experts" className="max-w-7xl mx-auto px-6 py-12">
//         {filteredExperts.length > 0 ? (
//           filteredExperts.map((category, catIndex) => (
//             <div key={catIndex} className="mb-20 last:mb-0">
//               <div className="mb-12">
//                 <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-4">
//                   {category.category}
//                 </h2>
//                 <p className="text-xl text-gray-600 max-w-2xl">
//                   {category.experts.length} top {category.category.toLowerCase()} experts available
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {category.experts.map((expert) => (
//                   <div
//                     key={expert.id}
//                     className="group bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y transition-all duration-300 border-2 border-green-200 hover:border-green-300"
//                   >
//                     <div className="flex items-start gap-4 mb-6">
//                       <img
//                         src={expert.image}
//                         alt={expert.name}
//                         className="w-20 h-20 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-bold text-xl text-gray-900 leading-tight truncate">
//                           {expert.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-2 truncate">
//                           {expert.title}
//                         </p>
//                         <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
//                           {expert.experience}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="mb-6">
//                       <p className="text-sm font-semibold text-gray-700 mb-3">
//                         {expert.therapyHours}
//                       </p>
//                       <div className="flex flex-wrap gap-2">
//                         {expert.expertise.map((tag, index) => (
//                           <span
//                             key={index}
//                             className="bg-white px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3 mb-6">
//                       <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group-hover:bg-green-50">
//                         <i className="fa-solid fa-play text-green-600 text-sm group-hover:scale-110 transition-transform"></i>
//                       </button>
//                       <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-green-600 rounded-full transition-all duration-300"
//                           style={{ width: getProgressWidth(expert.progress) }}
//                         />
//                       </div>
//                       <span className="text-xs font-medium text-gray-700 min-w-[32px] text-center">
//                         {expert.videoDuration}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between mb-6">
//                       <div className="space-y-1">
//                         <p className="text-xs text-gray-500">Next available slot</p>
//                         {/* <p className="font-bold text-gray-900 text-sm">
//                           {expert.nextSlot}
//                         </p> */}
//                         <p className="font-bold text-gray-900 text-sm">
//                           {getNextSlot(expert.availableSlots)}
//                         </p>
//                       </div>
//                       <div className="text-right space-y-1">
//                         <p className="text-xs text-gray-500">Starts from</p>
//                         <p className="font-bold text-2xl text-gray-900">₹{expert.price}</p>
//                       </div>
//                     </div>

//                     <Link
//                       to={`/booking/${expert.id}`}
//                       className="w-full block bg-gray-900 text-white py-4 rounded-2xl font-semibold text-center hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:-translate-y-1"
//                     >
//                       Book Now
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-32">
//             <i className="fa-solid fa-magnifying-glass text-6xl text-gray-300 mb-6"></i>
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">No experts found</h2>
//             <p className="text-xl text-gray-600 max-w-md mx-auto">
//               Try searching with different keywords or clear the search
//             </p>
//           </div>
//         )}
//       </section>
//     </>
//   );
// };

// export default ExpertCard;
