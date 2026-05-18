import React from "react";

interface OtpSheetProps {
  isOpen: boolean;
  otp: string;
  setOtp: (val: string) => void;
  onVerify: () => void;
  contact: string;
  amount: number;
}

const OtpSheet: React.FC<OtpSheetProps> = ({
  isOpen,
  otp,
  setOtp,
  onVerify,
  contact,
  amount,
}) => {
  return (
    <div
      className={`
        absolute inset-x-0 bottom-0 z-30
        bg-white rounded-t-3xl shadow-2xl
        transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-y-0" : "translate-y-full"}
        h-[50%] p-6
      `}
    >
      {/* drag indicator */}
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

      <h4 className="text-lg font-semibold mb-1">OTP Verification</h4>
      <p className="text-sm text-gray-600 mb-4">
        Enter OTP sent to <strong>{contact}</strong>
      </p>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        placeholder="Enter 6-digit OTP"
        className="w-full border rounded-lg p-3 text-center text-lg tracking-widest mb-4"
      />

      <button
        onClick={onVerify}
        className="w-full bg-[#0b3b32] text-white py-3 rounded-lg font-semibold"
      >
        Verify & Pay ₹{amount}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Mock OTP: <strong>123456</strong>
      </p>
    </div>
  );
};

export default OtpSheet;
