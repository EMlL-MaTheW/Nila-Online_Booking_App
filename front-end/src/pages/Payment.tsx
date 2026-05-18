import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PaymentProcess from './payment/PaymentProcess';
import API from '../services/api';

interface PatientData {
  name: string;
  contact: string;
}

interface BookingData {
  slot?: string;
  mode?: string;
  date?: string;
}

const PaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const location = useLocation();

  // Patient data state
  const [patientData, setPatientData] = useState<PatientData>({ name: '', contact: '' });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');
  // const [loading] = useState(false);
  const [error] = useState('');

  //payment process button
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Get booking data from previous page via location.state
  const bookingData = (location.state as BookingData) || {};
  const sessionData = {
    date: bookingData.date || '',
    time: bookingData.slot || '',
    duration: '50 mins',
    mode: bookingData.mode || 'Video-Call',
  };

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

  const consultationFee = expert.price || 1200;
  const platformFee = 0;
  const totalAmount = consultationFee + platformFee;
  
  const handleBookingConfirm = async () => {
    try {

      const bookingPayload = {
        counselor: expert.id,
        user_name: patientData.name,
        email: patientData.contact,
        mode: sessionData.mode,
        amount: totalAmount,
        payment_status: "paid",
        status: "booked",
        date: sessionData.date,
        time: sessionData.time,
      };

      const res = await API.post("/bookings/", bookingPayload);
      console.log("Booking Saved:", res.data);

      return res.data;

    } catch (err: any) {
      console.error(err);

      console.log(err.response?.data);

      alert(JSON.stringify(err.response?.data));

      throw err;
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 min-h-screen bg-[#f2fff2]">
      <div className="grid grid-cols-1 lg:grid-cols- gap-10">
        
        {/* Left Column - Patient Details Form */}
        <div className="space-y-8">
          {/* Page Header */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Booking - {expert.name}
            </h1>
            <p className="text-xl text-gray-600">
              Enter patient details and review payment summary
            </p>
          </div>

          {/* Patient Details Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Patient Details</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:border-green-600 focus:outline-none text-gray-700 font-medium transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                  value={patientData.name}
                  onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                />
              </div>

              {/* Contact Input */}
              <div className="relative">
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:border-green-600 focus:outline-none text-gray-700 font-medium transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                  value={patientData.contact}
                  onChange={(e) => setPatientData({ ...patientData, contact: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Summary */}
        <div className="lg:col-span-1 space-y-8">
          {/* Sticky Payment Summary Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-10 self-start">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl mb-6">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="font-semibold text-emerald-700 text-sm uppercase tracking-wide">
                Payment Summary
              </span>
            </div>

            {/* Fees Breakdown */}
            <div className="space-y-4 p-6 bg-emerald-50 rounded-3xl mb-8">
              <div className="flex justify-between items-center py-3 border-b border-emerald-100">
                <span className="text-sm text-gray-600">Consultation Fee ({expert.title})</span>
                <span className="font-semibold text-gray-900">₹{consultationFee}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-emerald-100">
                <span className="text-sm text-gray-600">Platform Fee</span>
                <span className="font-semibold text-gray-900">₹{platformFee}</span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-emerald-600">₹{totalAmount}</span>
              </div>
            </div>

            {/* Appointment Summary */}
            <div className="p-6 bg-gray-50 rounded-3xl space-y-4 mb-8">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Appointment Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between bg-white px-4 py-3 rounded-2xl">
                  <span className="text-gray-600">Mode</span>
                  <span className="font-semibold text-blue-700">{sessionData.mode}</span>
                </div>
                <div className="flex justify-between bg-white px-4 py-3 rounded-2xl">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold">{sessionData.date}</span>
                </div>
                <div className="flex justify-between bg-white px-4 py-3 rounded-2xl">
                  <span className="text-gray-600">Time</span>
                  <span className="font-semibold">{sessionData.time}</span>
                </div>
                <div className="flex justify-between bg-white px-4 py-3 rounded-2xl">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{sessionData.duration}</span>
                </div>
              </div>
            </div>

            {/* Patient Preview */}
            <div className="p-4 bg-blue-50 rounded-2xl text-sm space-y-2 mb-8">
              <h4 className="font-semibold text-gray-900 mb-3">Patient Preview</h4>
              <div className="flex justify-between">
                <span>Patient:</span>
                <span className="font-semibold">{patientData.name || 'Enter name'}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact:</span>
                <span>{patientData.contact || 'Enter contact'}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsPaymentModalOpen(true)}  // Opens modal 
              disabled={loading || !patientData.name || !patientData.contact}  // Validates form
              className={`w-full ${loading || !patientData.name || !patientData.contact ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-green-700 hover:shadow-3xl hover:-translate-y-1'} text-white py-5  hover:cursor-pointer rounded-3xl font-bold text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:shadow-none`}
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Confirm & Pay ₹{totalAmount}
                </>
              )}
            </button>


            <p className="text-xs text-gray-500 text-center mt-4">
              By continuing you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>

      <PaymentProcess
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        // onConfirm={() => navigate("/booking/success")}
        onConfirm={handleBookingConfirm}
        patientData={patientData}
        expert={{ name: expert.name, title: expert.title }}
        sessionData={sessionData}
        totalAmount={totalAmount}
      />


    </div>
  );
};

export default PaymentPage;

