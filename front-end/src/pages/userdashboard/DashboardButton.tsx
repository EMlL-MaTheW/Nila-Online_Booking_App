import React from "react";

interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

const DashboardButton: React.FC<Props> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg font-medium transition 
        ${active ? "bg-green-600 text-white" : "hover:bg-green-50 text-gray-700"}`}
    >
      {label}
    </button>
  );
};

export default DashboardButton;