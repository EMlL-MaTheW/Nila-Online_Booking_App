import React, { useEffect, useState } from "react";
import API from "../../services/api";

interface Payment {
  id: number;
  counselor_name: string;
  amount: number;
  payment_status: string;
  date: string;
  mode: string;
}

const PaymentDetails = () => {

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {

    try {
      const res = await API.get("/user/payment-history/");
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading payments...</p>;
  }

  return (
    <div>

      <h3 className="text-xl font-semibold mb-4">
        Payment History
      </h3>
      <div className="space-y-4">
        {payments.length === 0 ? (
          <div className="bg-white rounded-xl p-4 shadow">
            <p>No payment history</p>
          </div>
        ) : (

          payments.map((payment) => (
            <div
              key={payment.id}
              className="
                bg-white
                rounded-xl
                p-4
                shadow
                flex
                justify-between
                items-center
              "
            >

              <div>
                <p className="font-semibold text-lg">
                  ₹{payment.amount}
                </p>
                <p className="text-sm text-gray-500">
                  {payment.counselor_name}
                </p>
                <p className="text-sm text-gray-500">
                  {payment.date}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {payment.mode}
                </p>
              </div>
              <span
                className={`
                  font-semibold capitalize
                  ${
                    payment.payment_status === "paid"
                      ? "text-green-600"
                      : payment.payment_status === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                `}
              >
                {payment.payment_status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;