import React, { useState, useEffect } from "react";
import API from "../../services/api";

export type TimePeriod = "Morning" | "Afternoon" | "Evening";

export interface TimeSlot {
  time: string;
}

export interface DaySlot {
  id: string;
  day: string;
  date: string;
  fullDate: string;
  slotsCount: number;
  disabled?: boolean;
  periods: {
    period: TimePeriod;
    slots: TimeSlot[];
  }[];
}

interface Props {
  data: any;
  setData: (data: any) => void;
  setError: (msg: string) => void;
}

const SlotSelection: React.FC<Props> = ({ data, setData, setError }) => {
  const [selectedDay, setSelectedDay] = useState<DaySlot | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [availableDays, setAvailableDays] = useState<DaySlot[]>([]);
  const [slotsFromBackend, setSlotsFromBackend] = useState<{
    date: string;
    slots: string[];
  }>({
    date: "",
    slots: [],
  });
  // const [slotsFromBackend, setSlotsFromBackend] = useState<string[]>([]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
console.log("Current selectedSlot state:", selectedSlot);//check
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: DaySlot[] = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 8; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      days.push({
        id: d.getTime().toString(),
        day: dayNames[d.getDay()],
        date:
          d.getDate().toString().padStart(2, "0") +
          " " +
          d.toLocaleDateString("en-US", { month: "short" }),
        fullDate: formatDate(d),
        slotsCount: 0,
        periods: [],
      });
    }

    setAvailableDays(days);
    setSelectedDay(days[0]);

    setData((prev: any) => ({
      ...prev,
      date: days[0].fullDate,
      fullDate: days[0].fullDate,
      time: "",
    }));
  }, []);

  useEffect(() => {
  if (!selectedDay || !data.counselorId) return;

  fetchSlots();
}, [selectedDay, data.counselorId]);

  const fetchSlots = async () => {
    try {

      const res = await API.get(
        `/counselors/${data.counselorId}/available_slots/?date=${selectedDay?.fullDate}`
      );

      setSlotsFromBackend({
        date: res.data.date || "",
        slots: Array.isArray(res.data.slots)
          ? res.data.slots.map((t: string) => t.trim())
          : [],
      });

    } catch (err) {

      console.error(err);

      setSlotsFromBackend({
        date: "",
        slots: [],
      });
    }
  };
  const filterFutureSlots = (slots: string[]) => {
    if (!selectedDay) return slots;

    const todayStr = new Date().toISOString().split("T")[0];
    const now = new Date();
    const isToday = selectedDay.fullDate === todayStr;

    if (!isToday) return slots;

    return slots.filter((time) => {
      const [h, m] = time.split(":").map(Number);
      const slotTime = new Date();
      slotTime.setHours(h, m, 0, 0);
      return slotTime > now;
    });
  };

  const filteredSlots = filterFutureSlots(slotsFromBackend.slots);

  const groupedSlots = [
    {
      period: "Morning",
      slots: filteredSlots
        .filter((t) => Number(t.split(":")[0]) < 12)
        .map((t) => ({ time: t })),
    },
    {
      period: "Afternoon",
      slots: filteredSlots
        .filter((t) => {
          const h = Number(t.split(":")[0]);
          return h >= 12 && h < 17;
        })
        .map((t) => ({ time: t })),
    },
    {
      period: "Evening",
      slots: filteredSlots
        .filter((t) => Number(t.split(":")[0]) >= 17)
        .map((t) => ({ time: t })),
    },
  ];

  const handleSlotSelect = (slot: string) => {

    setSelectedSlot(slot);

    setData((prev: any) => ({
      ...prev,
      slot,
      time: slot,

      date: slotsFromBackend.date,
      fullDate: slotsFromBackend.date,
    }));

    setError("");
  };

const handleDaySelect = (day: DaySlot) => {
  setSelectedDay(day);

  setSelectedSlot("");

  setData((prev: any) => ({
    ...prev,
    date: day.fullDate,
    fullDate: day.fullDate,
    time: "",
  }));

  setError("");
};
  if (!selectedDay) return <div>Loading slots...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {availableDays.map((day) => (
          <button
            key={day.id}
            onClick={() => handleDaySelect(day)}
            className={`min-w-[110px] rounded-2xl border-2 p-4 text-center transition-all duration-300 flex flex-col items-center
              ${
                selectedDay.id === day.id
                  ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-xl scale-105"
                  : "bg-white hover:bg-teal-50 hover:border-teal-300 hover:shadow-md border-gray-200"
              }`}
          >
            <p className="font-bold text-sm">{day.day}</p>
            <p className="text-xs font-semibold mt-1">{day.date}</p>
            <p className="text-xs opacity-75">
              {selectedDay.id === day.id
              ? slotsFromBackend.slots.length
              : "--"} slots           
            </p>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-teal-800">
              {selectedDay.day}, {selectedDay.date}
            </p>
            <p className="text-sm text-teal-600">
              Available slots:{" "}
              <span className="font-bold">{filteredSlots.length}</span>
            </p>
          </div>

          {selectedSlot !== "" && (
            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">
              {selectedSlot}
            </span>
          )}
        </div>
      </div>

      {groupedSlots.map(
        (section) =>
          section.slots.length > 0 && (
            <div key={section.period} className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full"></div>
                {section.period} Slots
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {section.slots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => handleSlotSelect(slot.time)}
                    className={`rounded-xl py-3 px-4 font-medium transition-all duration-300 shadow-sm
                      ${
                        selectedSlot.trim() === slot.time.trim()
                          ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg scale-105"
                          : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-800"
                      }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )
      )}

      {filteredSlots.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-semibold text-gray-600">
            No slots available
          </p>
        </div>
      )}
    </div>
  );
};

export default SlotSelection;
