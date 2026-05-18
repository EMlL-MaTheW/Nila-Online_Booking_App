import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { expertsData } from '../../data/experts';
import React, { useState, useEffect } from 'react';
import API from '../../services/api';

interface BookingData {
  slot?: string;
  mode?: string;
  date?: string;
}

const Verification: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const location = useLocation();

const bookingData: BookingData =
  (location.state as BookingData) ||
  JSON.parse(localStorage.getItem("bookingData") || "{}");

const sessionData = {
  date: bookingData.date || "Jun 2026",
  time: bookingData.slot || "10:30 AM",
  duration: "50 mins",
  mode: bookingData.mode || "Video Call",
};


   // 🔹 SLOT STATE
    // const [data, setData] = useState<BookingData>({});
  //   const [error, setError] = useState<string>("");

  // const bookingData = (location.state as BookingData) || {};
  // const data = {
  //   date: bookingData.date || 'Jun 2026',
  //   time: bookingData.slot || '10:30 AM',
  //   duration: '50 mins',
  //   mode: bookingData.mode || 'Video Call',
  // };

  
  // State management
  const [step, setStep] = useState<'phone' | 'otp' | 'confirm'>('phone');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState('');
  // const [sentOtp, setSentOtp] = useState('123456'); // Mock OTP
  const [sentOtp] = useState('123456'); // Mock OTP

  const [expert, setExpert] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // FETCH USER PROFILE
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await API.get("/profile/");

      setPhoneNumber(res.data.mobile || "");
    } catch (err) {
      console.error(err);
    }
  };

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
  // Mock OTP verification
  const verifyOtp = async () => {
  if (otp === sentOtp) {
    try {
      await API.put("/profile/", {
        mobile: phoneNumber
      });
      setStep("confirm");
    } catch (err) {
      console.error(err);
      alert("Failed to save mobile number");
    }
  } else {
    alert("Invalid OTP! Mock OTP is: 123456");
  }
};

  return (
    <div className="max-w-8xl mx-auto px-6 py-10 min-h-screen bg-[#f2fff2]">
      <div className="grid grid-cols-1 lg:grid-cols- gap-10  ">
        <div className="lg:col-span-2 space-y-8 ">


          {/* Phone Verification Step */}
          {step === 'phone' && (
            <div className="bg-[#f2fff1] rounded-2xl p-8 shadow-xl">
              <div className="flex items-start gap-6 mb-6">
                <img src={expert.image} alt={expert.name} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{expert.name}</h1>
                  <p className="text-lg text-gray-600">{expert.title}</p>
                </div>
              </div>
              
              <h4 className="text-3xl font-bold text-gray-900 mb-6">Verify your Number</h4>
              
              <div className="relative mb-6">
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:border-green-600 focus:outline-none text-gray-700 font-medium transition-all duration-300 bg-white shadow-sm hover:shadow-md hover:cursor-pointer"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              
              <button
                onClick={() => setStep('otp')}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300  hover:cursor-pointer"
              >
                Send OTP
              </button>
              {/* <p className="text-xs text-gray-500 text-center mt-3">
                Mock OTP: <strong>123456</strong>
              </p> */}
            </div>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && (
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <svg className="w-20 h-20 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">OTP Sent!</h4>
                <p className="text-gray-600">Enter the 6-digit code sent to <strong>{phoneNumber}</strong></p>
              </div>
              
              <div className="grid grid-cols-6 gap-3 mb-8">
                {Array(6).fill(0).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-full h-16 text-2xl font-bold text-center rounded-xl border-2 border-gray-200 focus:border-green-600 focus:outline-none shadow-sm transition-all"
                    value={otp[i] || ''}
                    onChange={(e) => {
                      const newOtp = otp.split('');
                      newOtp[i] = e.target.value.slice(-1);
                      setOtp(newOtp.join(''));
                      if (i < 5 && e.target.value) {
                        (document.querySelector(`input:nth-child(${i + 2})`) as HTMLInputElement)?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[i] && i > 0) {
                        (document.querySelector(`input:nth-child(${i})`) as HTMLInputElement)?.focus();
                      }
                    }}
                  />
                ))}
              </div>
              
              <button
                onClick={verifyOtp}
                disabled={otp.length < 6}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed  hover:cursor-pointer"
              >
                Verify & Continue
              </button>
            </div>
          )}

          {/* Confirmation Step */}
          {step === 'confirm' && (
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
              <svg className="w-24 h-24 text-green-500 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
              Your appointment with <strong>{expert.name}</strong> is confirmed for{" "}
              <strong>
                {sessionData.date}, {sessionData.time}
              </strong>

              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
                <p className="text-sm text-green-800 mb-2">Session Details:</p>
                <p className="font-semibold text-lg">₹{expert.price} • 30 mins</p>
              </div>

            <button
              onClick={() => {
                // if (!data.mode) {
                //   setError("Please select a session mode");
                //   return;
                // }

                // if (!data.slot) {
                //   setError("Please select a time slot");
                //   return;
                // }

                navigate(`/payment/${expert.id}`, {
                  state: bookingData,
                  // state: {
                  //   expertId: expert.id,
                  //   slot: sessionData.time,
                  //   date: sessionData.date,
                  //   mode: sessionData.mode,
                  // },
                });

              }}

              className="w-full block bg-gray-900 text-white py-4 rounded-2xl font-semibold text-center hover:bg-green-800 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:-translate-y-1  hover:cursor-pointer"
            >
              Continue
            </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;

