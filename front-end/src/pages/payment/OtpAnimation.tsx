import React from "react";

interface OtpSectionProps {
  otp: string;
  setOtp: (val: string) => void;
  onVerify: () => void;
  contact: string;
  totalAmount: number;
}

const OtpSection: React.FC<OtpSectionProps> = ({
  otp,
  setOtp,
  onVerify,
  
  totalAmount,
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 text-center animate-fadeIn">
        <h4 className="text-lg font-semibold">OTP Verification</h4>

        <p className="text-sm text-gray-600">
          <strong>Enter OTP send to the number linked to your card</strong>
        </p>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full border rounded-lg p-3 text-center tracking-widest text-lg"
          placeholder="Enter your OTP here"
        />

        <button
          onClick={onVerify}
          className=" w-full bg-[#0b3b32] text-white py-3 rounded-lg font-semibold hover:opacity-90  hover:cursor-pointer"
        >
          Verify & Pay ₹{totalAmount}
        </button>
      </div>
    </div>

    // <div
    //  style={{padding:"50px 60px 50px 60px"}}
    //  className="w-full space-y-6 animate-fadeIn justify-items-center place-items-center">
    //   <h4 className="font-semibold text-lg">Enter OTP</h4>

    //   <p className="text- text-green-900">
        
    //     <strong>Enter OTP send to the number linked to your card <br /></strong>
    //   </p>

    //   <input
    //     type="text"
    //     value={otp}
    //     onChange={(e) => setOtp(e.target.value)}
    //     maxLength={6}
    //     placeholder="Enter 6-digit OTP"
    //     className="border rounded-lg p-3 w-full text-center tracking-widest text-lg"
    //   />
    
    //   <p className="text-xs text-gray-400 text-center">
    //      <strong>Pay on bank's page</strong>
    //   </p>
    //   <button
    //     onClick={onVerify}
    //     className="
    //       w-full bg-[#0b3b32] text-white
    //       py-3 rounded-lg font-semibold
    //       hover:opacity-90
    //     "
    //   >
    //     Verify & Pay ₹{totalAmount}
    //   </button>

    // </div>
  );
};

export default OtpSection;

