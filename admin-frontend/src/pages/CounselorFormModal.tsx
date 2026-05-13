import React from "react";

interface Props {
  open: boolean;
  editMode: boolean;
  initialData: any;
  onClose: () => void;
  onChange: (d: any) => void;
  onCreate: () => void;
  onUpdate: () => void;
}

export default function CounselorFormModal({ open, editMode, initialData, onClose, onChange, onCreate, onUpdate }: Props) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="p-5 sm:p-8 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{editMode ? "Edit Counselor" : "Add New Counselor"}</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input value={initialData.name} onChange={(e) => onChange({...initialData, name: e.target.value})} placeholder="Enter counselor name" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input value={initialData.title} onChange={(e) => onChange({...initialData, title: e.target.value})} placeholder="Psychiatrist / Therapist" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image URL</label>
                <input value={initialData.image} onChange={(e) => onChange({...initialData, image: e.target.value})} placeholder="https://image-url" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                <input value={initialData.experience} onChange={(e) => onChange({...initialData, experience: e.target.value})} placeholder="5 years exp" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Therapy Hours</label>
                <input value={initialData.therapy_hours} onChange={(e) => onChange({...initialData, therapy_hours: e.target.value})} placeholder="450+ Therapy Hours" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expertise</label>
                <input value={initialData.expertise} onChange={(e) => onChange({...initialData, expertise: e.target.value})} placeholder="Stress, Relationships" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                <p className="text-xs text-gray-400 mt-1">Comma separated</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Session Price (₹)</label>
                <input value={initialData.price} onChange={(e) => onChange({...initialData, price: e.target.value})} type="number" placeholder="1500" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-600 transition-all text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input value={initialData.location} onChange={(e) => onChange({...initialData, location: e.target.value})} placeholder="Mental Health Care - India" className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-500 transition-all text-sm" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button onClick={onClose} className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50">Cancel</button>
              <button onClick={editMode ? onUpdate : onCreate} className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-2xl shadow-lg"> {editMode ? "Update Counselor" : "Create Counselor"} </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}