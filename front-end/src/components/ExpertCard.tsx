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
  available_slots: {
    date: string;
    slots: string[];
  };
  price: number;
  location: string;
}

const ExpertCard: React.FC<Props> = ({ selectedCategory }) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  // const [slotsMap, setSlotsMap] = useState<{ [key: number]: string[] }>({});
  const [slotsMap, setSlotsMap] = useState<{
    [key: number]: {
      date: string;
      slots: string[];
    };
  }>({});

  // Fetch from backend
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
      // const today = new Date().toISOString().split("T")[0];

      const res = await API.get(`/counselors/${id}/available_slots/`);

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

      res.data.forEach((exp: Expert) => {
        fetchSlots(exp.id);
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const generateSlots = (
    data: { date: string; slots: string[] }
  ) => {
    if (!data?.slots?.length) return [];
    const slots: Date[] = [];
    data.slots.forEach((time) => {
      const [h, m] = time.split(":").map(Number);
      const slot = new Date(data.date);
      slot.setHours(h, m, 0, 0);
      slots.push(slot);
    });

    return slots.sort(
      (a, b) => a.getTime() - b.getTime()
    );
  };

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

  //       if (slot > now) slots.push(slot);
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
  const getNextSlot = (
    data: { date: string; slots: string[] }
  ) => {

    const slots = generateSlots(data);

    if (!slots.length) {
      return "No slots available";
    }

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

      expertise: Array.isArray(exp.expertise)
        ? exp.expertise
        : exp.expertise
        ? [exp.expertise]
        : [exp.title],

      available_slots: slotsMap[exp.id] || {
        date: "",
        slots: [],
      },
      therapy_hours: exp.therapy_hours || "",
      progress: exp.progress || "3/5",
      videoDuration: exp.videoDuration || "2m",
    })),
  },
];

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

            <div className="mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-4">
                {category.category}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                {category.experts.length} top experts available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.experts.map((expert) => (
                <div
                  key={expert.id}
                  className="group bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y transition-all duration-300 border-2 border-green-200 hover:border-green-300"
                >

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

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: getProgressWidth(expert.progress) }}
                      />
                    </div>
                    <span className="text-xs">{expert.videoDuration}</span>
                  </div>

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





