import React from 'react';

interface PatientData {
  name: string;
  contact: string;
}

interface PatientDetailsProps {
  data: PatientData;
  setData: React.Dispatch<React.SetStateAction<PatientData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;  // Uncommented & typed
}

const PatientDetails: React.FC<PatientDetailsProps> = ({
  data,
  setData,
  setLoading,
  setError,
  onNext
}) => {
  const submit = () => {
    // ✅ Clear validation
    if (!data.name.trim() || !data.contact.trim()) {
      setError("Please fill all fields");
      return;
    }

    if (data.contact.length < 10) {
      setError("Phone number must be at least 10 digits");
      return;
    }

    setError("");
    setLoading(true);

    // ✅ Mock API delay
    setTimeout(() => {
      setLoading(false);
      onNext();  // ✅ Proceed to next step
    }, 1500);
  };

  return (
    <div className="space-y-6 ">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Details</h2>

      {/* Name Input */}
      <div className="relative">
        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:border-green-600 focus:outline-none text-gray-700 font-medium transition-all duration-300 bg-white shadow-sm hover:shadow-md"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>

      {/* Contact Input */}
      <div className="relative">
        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> */}
        </svg>
        <input
          type="email"
          placeholder="Your email"
          className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:border-green-600 focus:outline-none text-gray-700 font-medium transition-all duration-300 bg-white shadow-sm hover:shadow-md"
          value={data.contact}
          onChange={(e) => setData({ ...data, contact: e.target.value })}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={submit}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500"
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;

