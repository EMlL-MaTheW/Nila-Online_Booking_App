import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import UpcomingAppointments from "./UpcomingAppointments";
import PastAppointments from "./PastAppointments";
import PaymentDetails from "./PaymentDetails";
import PersonalInfo from "./PersonalInfo";

export type TabType = "profile"|"upcoming" | "past" | "payments" ;

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6">
        {activeTab === "profile" && <PersonalInfo />}
        {activeTab === "upcoming" && <UpcomingAppointments />}
        {activeTab === "past" && <PastAppointments />}
        {activeTab === "payments" && <PaymentDetails />}
        
      </main>
    </div>
  );
};

export default UserDashboard;