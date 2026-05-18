export type TimePeriod = "Morning" | "Afternoon" | "Evening";

export interface TimeSlot {
  time: string;
}

export interface DaySlot {
  id: string;
  day: string;
  date: string;
  slotsCount: number;
  disabled?: boolean;
  periods: {
    period: TimePeriod;
    slots: TimeSlot[];
  }[];
}

export const slotsData: DaySlot[] = [
  {
    id: "1",
    day: "Tue",
    date: "06 Jan",
    slotsCount: 8,
    periods: [
      {
        period: "Morning",
        slots: [
          { time: "09:00" },
          { time: "09:30" },
          { time: "10:00" },
          { time: "10:30" },
          { time: "11:30" },
        ],
      },
      {
        period: "Afternoon",
        slots: [
          { time: "14:00" },
          { time: "14:30" },
          { time: "15:00" },
          { time: "15:30" },
          { time: "16:00" },
          { time: "16:30" },
        ],
      },
      {
        period: "Evening",
        slots: [
          { time: "18:00" },
          { time: "18:30" },
          { time: "19:30" },
        ],
      },
    ],
  },
];

// export type TimePeriod = "Morning" | "Afternoon" | "Evening";

// export interface TimeSlot {
//   time: string;
// }

// export interface DaySlot {
//   id: string;
//   day: string;
//   date: string;
//   slotsCount: number;
//   disabled?: boolean;
//   periods: {
//     period: TimePeriod;
//     slots: TimeSlot[];
//   }[];
// }

// export const slotsData: DaySlot[] = [
//   {
//     id: "1",
//     day: "Tue",
//     date: "06 Jan",
//     slotsCount: 8,
//     periods: [
//       {
//         period: "Morning",
//         slots: [{ time: "09:00" }, { time: "09:30" }, { time: "10:00" }, { time: "10:30" }, { time: "11:30" }],
//       },
//       {
//         period: "Afternoon",
//         slots: [{ time: "14:00" }, { time: "14:30" }, { time: "15:00" }, { time: "15:30" }, { time: "16:00" }, { time: "16:30" }],
//       },
//       {
//         period: "Evening",
//         slots: [{ time: "18:00" }, { time: "18:30" }, { time: "19:30" }],
//       },
//     ],
//   },
// ];
