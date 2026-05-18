import React, { useState } from "react";
// import Img from '../../assets/image.png';
import AnimatedCard from "../payment/AnimatedCard";
import OtpAnimation from "../payment/OtpAnimation";
// import OtpSheet from "../payment/OtpSheet";
import PaymentSuccessAnimation from "../payment/PaymentSuccessAnimation";
import { useNavigate } from "react-router-dom";


interface PaymentProcessProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  patientData: {
    name: string;
    contact: string;
  };
    expert: {              
    name: string;
    title: string;
  };
    sessionData: {
    date: string;
    time: string;
    duration: string;
    mode: string;
  };
  totalAmount?: number;
}

const PaymentProcess: React.FC<PaymentProcessProps> = ({
  isOpen,
  onClose,
  onConfirm,
  patientData,
  totalAmount = 1600,
}) => {

  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("card");

  const [step, setStep] = useState<"payment" |"animating" | "otp" | "success">("payment");
  const [otp, setOtp] = useState("");
  const MOCK_OTP = "123456";
  //OtpSheet
  // const [showOtp, setShowOtp] = useState(false);

  // const onVerify = () => {
  //   if (otp === MOCK_OTP) {
  //     setStep("success");
  //   } else {
  //     alert("Invalid OTP. Try 123456");
  //   }
  // };
  const onVerify = async () => {

  if (otp !== MOCK_OTP) {
      alert("Invalid OTP. Try 123456");
      return;
    }

    try {
      await onConfirm();
      setStep("success");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };


  if (!isOpen) return null;

  return (
    <div
    //  style={{minHeight:"700px"}}
     className="fixed  inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
      style = {styles.box}
        className="
          min-h-[550px]
          w-full h-full md:h-auto md:max-w-5xl
           bg-white md:rounded-2xl
          overflow-hidden shadow-2xl
          flex flex-col md:flex-row
          relative
        "
      >

        {/* LEFT PANEL */}
        <div
          className="
            w-full md:w-[35%]
            bg-[#0b3b32] text-white
            p-5 md:p-6
            flex flex-col justify-between
            h-100
          "
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-3 group hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-gradient-to-br from-[#247336] to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <i className="fa-solid fa-leaf text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#247336] to-emerald-600 bg-clip-text text-transparent">
              Nila
            </span>
          </div>
            </div>

            <div className="bg-white text-black rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-500">Price Summary</p>
              <p className="text-2xl font-bold">₹ {totalAmount}</p>
            </div>

            <div className="bg-emerald-700/30 rounded-xl p-4 text-sm">
              Using as <br />
              <span className="font-semibold break-all">
                {patientData.contact}
              </span>
              
            </div>              
          </div>

          <div className="text-xs text-gray-300 mt-4">
            Secured by <span className="font-semibold">Razorpay</span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
           className="
    bg-white md:rounded-2xl
    w-full md:w-[65%]
    p-5 md:p-6
    relative
    overflow-visible md:overflow-y-auto
    min-h-[60vh] md:min-h-full
  "
        >
          {/* Header */}
          <div className="flex justify-between text-center items-center mb-4">
            <h3 className="text-lg  font-semibold">Payment Options</h3>
            <button
              onClick={onClose}
              className="text-gray-500 text-2xl md:text-xl"
            >
              ✕
            </button>
          </div>

        {step ==="payment" &&(
          <div className="flex flex-col md:flex-row gap-6">
            {/* PAYMENT METHODS */}
            <div
              style={{gap:""}}
              className="
              relative
                w-full md:w-[40%]
                bg-emerald-50 rounded-xl
                p-4 md:p-4
                flex md:block
                gap-3 md:gap-5
                overflow-x-auto md:overflow-visible
                text-sm
              "
            >
              {[
                { id: "upi", label: "UPI" },
                { id: "card", label: "Cards" },
                { id: "emi", label: "EMI" },
                { id: "netbanking", label: "Netbanking" },
                { id: "wallet", label: "Wallet" },
                { id: "paylater", label: "Pay Later" },
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  style={{marginBottom:"10px", 
                          marginTop:"10px"
                  }}
                  className={`
                    min-w-max md:w-full
                    text-left px-4 py-2 rounded-lg font-medium
                    ${
                      selectedMethod === method.id
                        ? "bg-white shadow text-emerald-700"
                        : "text-gray-600 hover:bg-white"
                    }
                  `}
                >
                  {method.label}
                </button>
              ))}
            </div>

            {/* CARD FORM */}
            <div className="w-full md:w-[60%] space-y-4">
              <h4 className="font-semibold">Add a new card</h4>

              <div className="border rounded-lg p-3 flex justify-between items-center">
                <input
                  minLength={10}
                  type="text"
                  placeholder="Card Number "
                  className="outline-none w-full text-sm"
                />
                <span className="text-blue-600 font-bold text-sm ml-2">
                  VISA
                </span>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="border rounded-lg p-3 w-1/2 text-sm"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  className="border rounded-lg p-3 w-1/2 text"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" />
                Save this card as per RBI guidelines
              </label>

              <button
                // onClick={() => setStep("otp")}
                onClick={() => {
                  setStep("animating");
                  setTimeout(() => {
                    setStep("otp");
                  }, 900); // match animation duration
                }}
                className="
                  w-full bg-[#0b3b32] text-white
                  py-3 rounded-lg font-semibold
                  hover:opacity-90  hover:cursor-pointer
                "
              >
                Continue
              </button>         

            </div>
          </div>
          )}

          {/* CARD → OTP ANIMATION */}
          {step === "animating" && (
            <div 
            style={{minHeight:"700px"}}
            className="absolute inset-0 flex items-center justify-center z-30 bg-white">
              <AnimatedCard />
            </div>
          )}

          {step === "otp" && (
            <OtpAnimation
              otp={otp}
              setOtp={setOtp}
              contact={patientData.contact}
              totalAmount={totalAmount}
              onVerify={onVerify}  
            />
          )}


          {step === "success" && (
            <PaymentSuccessAnimation
              onDone={() => {
                // onConfirm(); // final success (close modal / navigate)
                navigate("/userdashboard")
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentProcess;

const styles = {
  box:{
    padding:"8px",
    background:"#0b3b32",
    
  }
}