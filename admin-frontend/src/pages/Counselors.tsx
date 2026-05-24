import { useEffect, useState } from "react";
import API from "../services/api";
import CounselorFormModal from "./CounselorFormModal";

interface Counselor {
  id: number;
  name: string;
  title: string;
  image: string;
  experience: string;
  therapy_hours: string;
  expertise: string[];
  videoDuration: string;
  progress: string;
  availableSlots: string[];
  price: number;
  location: string;
}

export default function CounselorsPage() {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    experience: "",
    therapy_hours: "",
    expertise: "",
    videoDuration: "",
    progress: "",
    availableSlots: "",
    price: "",
    location: "",
  });

  useEffect(() => { fetchCounselors(); }, []);

  const fetchCounselors = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/counselors/");
      setCounselors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCounselor = async () => {
    const payload = {
      name: formData.name,
      title: formData.title,
      image: formData.image,
      experience: formData.experience,
      therapy_hours: formData.therapy_hours,
      videoDuration: formData.videoDuration,
      progress: formData.progress,
      location: formData.location,
      expertise: formData.expertise.split(",").map((s) => s.trim()).filter(Boolean),
      available_slots: formData.availableSlots.split(",").map((s) => s.trim()).filter(Boolean),
      price: Number(formData.price),
    };
    await API.post("/admin/counselors/", payload);
    setShowModal(false);
    fetchCounselors();
  };

  const updateCounselor = async () => {
    if (!selectedId) return;
    const payload = {
      name: formData.name,
      title: formData.title,
      image: formData.image,
      experience: formData.experience,
      therapy_hours: formData.therapy_hours,
      videoDuration: formData.videoDuration,
      progress: formData.progress,
      location: formData.location,
      expertise: formData.expertise.split(",").map((s) => s.trim()).filter(Boolean),
      available_slots: formData.availableSlots.split(",").map((s) => s.trim()).filter(Boolean),
      price: Number(formData.price),
    };
    await API.put(`/admin/counselors/${selectedId}/`, payload);
    setShowModal(false);
    setSelectedId(null);
    fetchCounselors();
  };

  const deleteCounselor = async (id: number) => {
    if (!window.confirm("Delete this counselor?")) return;
    await API.delete(`/admin/counselors/${id}/`);
    fetchCounselors();
  };

  const openAddModal = () => {
    setEditMode(false);
    setFormData({ name: "", title: "", image: "", experience: "", therapy_hours: "", expertise: "", videoDuration: "", progress: "", availableSlots: "", price: "", location: "" });
    setShowModal(true);
  };

  const openEditModal = (c: Counselor) => {
    setEditMode(true);
    setSelectedId(c.id);
    setFormData({
      name: c.name || "",
      title: c.title || "",
      image: c.image || "",
      experience: c.experience || "",
      therapy_hours: c.therapy_hours || "",
      expertise: Array.isArray(c.expertise) ? c.expertise.join(",") : "",
      videoDuration: c.videoDuration || "",
      progress: c.progress || "",
      availableSlots: Array.isArray(c.availableSlots) ? c.availableSlots.join(",") : "",
      price: c.price ? String(c.price) : "",
      location: c.location || "",
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading counselors...
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Counselors</h2>
          <p className="text-gray-500 mt-1">{counselors.length} professionals</p>
        </div>

        <button onClick={openAddModal} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
          + Add Counselor
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {counselors.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-semibold text-lg shadow-md">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{c.name}</div>
                        <div className="text-xs text-gray-500">ID: {c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap"><span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium rounded-xl">{c.title}</span></td>
                  <td className="px-6 py-5 whitespace-nowrap"><div className="flex items-center"><div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div><span className="text-sm font-medium text-gray-900">{c.experience} years</span></div></td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => openEditModal(c)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl shadow-sm">Edit</button>
                    <button onClick={() => deleteCounselor(c.id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl shadow-sm">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {counselors.length === 0 && <div className="p-8 text-center text-sm text-gray-500">No counselors yet.</div>}
      </div>

      <CounselorFormModal
        open={showModal}
        editMode={editMode}
        initialData={formData}
        onClose={() => { setShowModal(false); setSelectedId(null); }}
        onChange={(newData) => setFormData(newData)}
        onCreate={createCounselor}
        onUpdate={updateCounselor}
      />
    </div>
  );
}