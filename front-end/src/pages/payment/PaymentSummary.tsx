
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { expertsData } from '../../data/experts';
import { useMemo } from 'react';

interface BookingSummaryProps {
  patientName: string;
  patientContact: string;
}

const PaymentSummary: React.FC<BookingSummaryProps> = ({ 
  patientName, 
  patientContact 
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allExperts = useMemo(() => {
    return expertsData.flatMap(category => category.experts);
  }, []);

  const expert = allExperts.find(e => e.id === id);

  if (!expert) {
    return <div>Expert not found</div>;
  }

  const consultationFee = 1200;
  const platformFee = 180;
  const totalAmount = consultationFee + platformFee;
  const doctorName = expert.name;
  const date = 'Jun 2026';
  const time = '10:30 AM';

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl">
        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
        <span className="font-semibold text-emerald-700 text-sm uppercase tracking-wide">
          Payment Summary
        </span>
      </div>

      {/* Fees Breakdown */}
      <div className="space-y-4 p-6 bg-emerald-50 rounded-3xl">
        <div className="flex justify-between items-center py-3 border-b border-emerald-100 last:border-b-0">
          <span className="text-sm text-gray-600">Consultation Fee</span>
          <span className="font-semibold text-gray-900">₹{consultationFee}</span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-emerald-100 last:border-b-0">
          <span className="text-sm text-gray-600">Platform Fee</span>
          <span className="font-semibold text-gray-900">₹{platformFee}</span>
        </div>
        <div className="flex justify-between items-center pt-3">
          <span className="text-lg font-bold text-gray-900">Total Amount</span>
          <span className="text-2xl font-bold text-emerald-600">₹{totalAmount}</span>
        </div>
      </div>

      {/* Doctor Summary */}
      <div className="p-6 bg-gray-50 rounded-3xl space-y-3">
        <h3 className="font-bold text-lg text-gray-900">Doctor Summary</h3>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{doctorName}</span>
          <span className="font-semibold text-gray-900">Dr. Projesh</span>
        </div>
        <div className="flex justify-between text-sm bg-white px-4 py-3 rounded-2xl">
          <span className="text-gray-600">Date</span>
          <span className="font-semibold">{date}</span>
        </div>
        <div className="flex justify-between text-sm bg-white px-4 py-3 rounded-2xl">
          <span className="text-gray-600">Time</span>
          <span className="font-semibold">{time}</span>
        </div>
      </div>

      {/* Patient Info */}
      <div className="p-4 bg-blue-50 rounded-2xl text-sm space-y-2">
        <div className="flex justify-between">
          <span>Patient:</span>
          <span className="font-semibold">{patientName}</span>
        </div>
        <div className="flex justify-between">
          <span>Contact:</span>
          <span>{patientContact}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button 
        onClick={() => navigate('/payment-confirm')} // or handle payment
        className="w-full bg-gradient-to-r from-emerald-600 to-green-700 text-white py-5 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        Confirm & Pay ₹1380
      </button>

      <p className="text-xs text-gray-500 text-center">
        By continuing you agree to our Terms & Conditions
      </p>
    </div>
  );
};

export default PaymentSummary;
