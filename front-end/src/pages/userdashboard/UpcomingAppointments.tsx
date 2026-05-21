import { useEffect, useState } from "react";
import API from "../../services/api";

interface Booking {
  id: number;
  counselor_name: string;
  date: string;
  time: string;
  mode: string;
  status: string;
}

const UpcomingAppointments = () => {

  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    try {
      const res = await API.get("/user/upcoming-bookings/");
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
        Upcoming Appointments
      </h3>
      <div className="space-y-4">

        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl p-4 shadow">
            <p>No upcoming appointments</p>
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
                <span
                  className="
                    inline-block
                    px-3 py-1
                    bg-green-100
                    text-green-700
                    rounded-full
                    text-xs
                  "
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;