import React, { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

const PaymentSuccessAnimation: React.FC<Props> = ({ onDone }) => {
  const [phase, setPhase] = useState<"processing" | "success">("processing");

  useEffect(() => {
    // Switch to success
    const successTimer = setTimeout(() => {
      setPhase("success");
    }, 4200);

    // Exit modal
    const doneTimer = setTimeout(() => {
      onDone();
    }, 5800);

    return () => {
      clearTimeout(successTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center z-50 transition-colors duration-700
        ${phase === "processing" ? "bg-white" : "bg-green-50"}
      `}
    >
      {/* PROCESSING */}
      {phase === "processing" && (
        <>
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-[#0b3b32] border-t-transparent animate-spin"></div>
          </div>

          <h2 className="mt-6 text-lg font-semibold text-gray-800 animate-pulse">
            Processing payment…
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Please wait, do not refresh
          </p>
        </>
      )}

      {/* SUCCESS */}
      {phase === "success" && (
        <>
          {/* Coin */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center text-4xl font-bold animate-coin">
              ₹
            </div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-full border-4 border-yellow-300 animate-ping opacity-40"></div>
          </div>

          {/* Success Text */}
          <h2 className="mt-6 text-2xl font-bold text-green-700 animate-fadeUp">
            Payment Successful
          </h2>

          <p className="text-sm text-green-800 mt-1 animate-fadeUp delay-150">
            Thank you for your payment
          </p>
        </>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes coinSpin {
            0% {
              transform: scale(0.4) rotateY(0deg);
              opacity: 0;
            }
            60% {
              transform: scale(1.2) rotateY(180deg);
              opacity: 1;
            }
            100% {
              transform: scale(1) rotateY(360deg);
            }
          }

          .animate-coin {
            animation: coinSpin 1.4s ease-out forwards;
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeUp {
            animation: fadeUp 0.6s ease forwards;
          }

          .delay-150 {
            animation-delay: 0.15s;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentSuccessAnimation;


// import React, { useEffect } from "react";

// interface Props {
//   onDone: () => void;
// }

// const PaymentSuccessAnimation: React.FC<Props> = ({ onDone }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onDone();
//     }, 4500); // animation duration

//     return () => clearTimeout(timer);
//   }, [onDone]);

//   return (
//     <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-50">
//       {/* Coin */}
//       <div className="relative">
//         <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold animate-coin">
//           ₹
//         </div>

//         {/* Glow Ring */}
//         <div className="absolute inset-0 rounded-full border-4 border-yellow-300 animate-ping opacity-40"></div>
//       </div>

//       {/* Text */}
//       <h2 className="mt-6 text-2xl font-bold text-green-700 animate-fade">
//         Payment Successful
//       </h2>

//       <p className="text-sm text-gray-500 mt-2 animate-fade">
//         Thank you for your payment
//       </p>

//       {/* Inline CSS animation */}
//       <style>
//         {`
//           @keyframes coinSpin {
//             0% { transform: rotateY(0deg) scale(0.8); opacity: 0; }
//             50% { transform: rotateY(180deg) scale(1.1); opacity: 1; }
//             100% { transform: rotateY(360deg) scale(1); }
//           }

//           .animate-coin {
//             animation: coinSpin 1.2s ease-out forwards;
//           }

//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }

//           .animate-fade {
//             animation: fadeIn 0.6s ease forwards;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default PaymentSuccessAnimation;
