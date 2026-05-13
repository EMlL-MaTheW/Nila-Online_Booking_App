import React, {useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { expertsData } from "../data/experts";
import { mode } from "../data/session/mode";
import SlotSelection from "./booking/SlotSelection";
import API from "../services/api"


interface BookingData {
  slot?: string;
  mode?: string;
  date?: string;
}

const BookingSession: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

const handleModeSelect = (selectedMode: string) => {
  setData(prev => ({
    ...prev,
    mode: selectedMode,
  }));
  setError("");
};


  // 🔹 SLOT STATE
  const [data, setData] = useState<BookingData>({});
  const [error, setError] = useState<string>("");
  
  const [expert, setExpert] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchExpert();
  }, [id]);

  const fetchExpert = async () => {
    try {
      const res = await API.get(`/counselors/${id}/`);
      setExpert(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // const allExperts = useMemo(() => {
  //   return expertsData.flatMap(category => category.experts);
  // }, []);

  // const expert = allExperts.find(e => e.id === id);

  // if (!expert) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 py-12">
  //       <div className="max-w-4xl mx-auto px-6">
  //         <p className="text-center text-xl text-gray-500 bg-white rounded-2xl p-12 shadow-lg">
  //           Expert not found
  //         </p>
  //         <button
  //           onClick={() => navigate("/experts")}
  //           className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 mt-8 block mx-auto transition-all"
  //         >
  //           Back to Experts
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
  if (loading) {
      return <p className="text-center py-20">Loading...</p>;
  }

  if (!expert) {
    return (
      <div className="text-center py-20">
        <p>Expert not found</p>
      </div>
    );
  }
  return (
    <div className="max-w-8xl mx-auto px-6 py-10 min-h-screen bg-[#f2fff2]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {/* Expert Info */}
          <div className="flex items-start gap-6 bg-white rounded-2xl p-8 shadow-xl">
            <img
              src={expert.image}
              alt={expert.name}
              className="w-28 h-28 rounded-full object-cover shadow-lg ring-4 ring-white"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {expert.name}
              </h1>
              <p className="text-xl text-gray-600 mb-3">{expert.title}</p>
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                {expert.experience} years
              </span>
            </div>
          </div>

          {/* Mode of Session */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Mode of Session
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mode.map((category, index) => {
                const isSelected = data.mode === category.title;

                return (
                  <div
                    key={index}
                    onClick={() => handleModeSelect(category.title)}
                    className={`rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 border-2
                      ${
                        isSelected
                          ? "border-green-600 bg-gradient-to-br from-teal-500 to-teal-600 shadow-xl scale-105"
                          : "border-gray-200 hover:border-green-400 hover:shadow-lg"
                      }`}
                  >
                    <div
                      className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <i
                        className={`fa-solid ${category.icon} text-${category.color} text-2xl`}
                      ></i>
                    </div>

                    <h3 className="font-semibold text-grey-700 text-lg">
                      {category.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>


          {/* Location */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Location</h2>
            <p className="text-xl text-gray-600 mb-3">{expert.location}</p>
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              INDIA
            </span>
          </div>

          {/* Slot Selection Component (Time & Date) */}
             <SlotSelection
               data={{ ...data, counselorId: expert.id }}
              setData={setData}
              setError={setError}
            />

            {error && (
              <p className="text-red-500 text-sm text-center font-medium">
                {error}
              </p>
            )}

        </div>

        {/* RIGHT SIDE – BOOKING CARD */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-green-100 sticky top-10 self-start">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Book a Session
          </h3>

          <div className="space-y-6">

            {/* PRICE + SLOT INFO */}
            <div className="text-center space-y-2 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">50 mins session</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{expert.price}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Selected Slot
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide mt-4">
                Session Mode
              </p>
              <span className="text-lg font-semibold text-blue-700">
                {data.mode ?? "Please select a mode"}
              </span>/

              <span className="text-lg font-semibold text-blue-700">
                {data.date ?? "Please select a Date"}
              </span>/

              <span className="text-lg font-semibold text-green-700">
                {data.slot ?? "Please select a slot"}
              </span>
            </div>

            {/* CONTINUE BUTTON */}
            <button
              onClick={() => {
                if (!data.mode) {
                  setError("Please select a session mode");
                  return;
                }

                if (!data.slot) {
                  setError("Please select a time slot");
                  return;
                }

                // if (!data.date) {
                //   setError("Please select a Date");
                //   return;
                // }

                navigate(`/book/${expert.id}`, {
                  state: {
                    expertId: expert.id,
                    slot: data.slot,
                    mode: data.mode,
                    date: data.date,
                  },
                });
              }}

              className="w-full block bg-gray-900 text-white py-4 rounded-2xl font-semibold text-center hover:bg-green-800 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:-translate-y-1 hover:pointer"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSession;

