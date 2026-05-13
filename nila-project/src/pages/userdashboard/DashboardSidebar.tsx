import React from "react";
import DashboardButton from "./DashboardButton";
import type { TabType } from "./UserDashboard";

interface Props {
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const DashboardSidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-full md:w-64 bg-white shadow-lg p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-6">User Dashboard</h2>

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
          active={activeTab === "payments"}
          onClick={() => setActiveTab("payments")}
        />
        <DashboardButton
          label="Personal Info"
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <button
        onClick={() => {
            localStorage.clear();
            window.location.href = "/signin";
        }}
        className="w-full text-left px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50"
        >
        Logout
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;