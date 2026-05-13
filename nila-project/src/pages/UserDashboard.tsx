import React, { useState } from "react";

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "past" | "payments" | "profile"
  >("upcoming");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg p-4">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          User Dashboard
        </h2>
        <nav className="space-y-2">
          <DashboardButton
            label="Upcoming Appointments"
            active={activeTab === "upcoming"}
            onClick={() => setActiveTab("upcoming")}
          />
          <DashboardButton
            label="Past Appointments"
            active={activeTab === "past"}
            onClick={() => setActiveTab("past")}
          />
          <DashboardButton
            label="Payment Details"
            active={activeTab ===( "payments")}
            onClick={() => setActiveTab("payments")}
          />
          <DashboardButton
            label="Personal Info"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "upcoming" && <UpcomingAppointments />}
        {activeTab === "past" && <PastAppointments />}
        {activeTab === "payments" && <PaymentDetails />}
        {activeTab === "profile" && <PersonalInfo />}
      </main>
    </div>
  );
};

export default UserDashboard;

/* ---------------- Sub Components ---------------- */

const DashboardButton = ({ label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition 
      ${active ? "bg-green-600 text-white" : "hover:bg-green-50 text-gray-700"}`}
  >
    {label}
  </button>
);

const UpcomingAppointments = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
    <div className="bg-white rounded-xl p-4 shadow">
      <p className="font-medium">Dr. Gayathri R</p>
      <p className="text-sm text-gray-500">12 Feb 2026 • 10:30 AM</p>
      <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
        Confirmed
      </span>
    </div>
  </div>
);

const PastAppointments = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Past Appointments</h3>
    <div className="bg-white rounded-xl p-4 shadow">
      <p className="font-medium">Dr. Arun Kumar</p>
      <p className="text-sm text-gray-500">02 Jan 2026 • 5:00 PM</p>
      <span className="inline-block mt-2 px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
        Completed
      </span>
    </div>
  </div>
);

const PaymentDetails = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Payment History</h3>
    <div className="bg-white rounded-xl p-4 shadow flex justify-between">
      <div>
        <p className="font-medium">₹1600</p>
        <p className="text-sm text-gray-500">12 Feb 2026</p>
      </div>
      <span className="text-green-600 font-semibold">Success</span>
    </div>
  </div>
);

const PersonalInfo = () => {
  
  const [edit, setEdit] = useState(false);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
      <div className="bg-white rounded-xl p-4 shadow space-y-3">
        <input
          disabled={!edit}
          className="w-full  bg-gray-200 rounded-lg p-2"
          defaultValue="John Doe"
        />
        <input
          disabled={!edit}
          className="w-full bg-gray-200 rounded-lg p-2"
          defaultValue="+91 9999999999"
        />
        <button
          onClick={() => setEdit(!edit)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          {edit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};
