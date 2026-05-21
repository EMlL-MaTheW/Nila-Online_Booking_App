import { useEffect, useState } from "react";
import API from "../../services/api";

interface Booking {
  id: number;
  counselor_name: string;
  date: string;
  time: string;
  mode: string;
  payment_status: string;
  status: string;
}

const PastAppointments = () => {

  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/user/past-bookings/");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <p>Loading appointments...</p>;
  }
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Past Appointments
      </h3>
      <div className="space-y-4">
        {appointments.length === 0 ? (

          <div className="bg-white rounded-xl p-4 shadow">
            <p>No appointments found</p>
          </div>

        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl p-4 shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg">
                    {appointment.counselor_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {appointment.date} • {appointment.time}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {appointment.mode}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className="
                      inline-block
                      px-3 py-1
                      bg-gray-200
                      text-gray-700
                      rounded-full
                      text-xs
                    "
                  >
                    {appointment.status}
                  </span>
                  <p className="text-xs text-green-600 mt-2">
                    {appointment.payment_status}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PastAppointments;