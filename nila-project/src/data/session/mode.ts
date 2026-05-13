
interface Category {
  title: string;
  icon: string;
  color: string;
  bgColor: string;
}

// Data for the Support section of the home page (./pages/sections/Support.tsx)
export const mode: Category[] = [
  {
    title: 'In-Person',
    icon: 'fa-solid fa-location-dot',
    color: 'amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    title: 'Video-Call',
    icon: 'fa-solid fa-video text-red-600',
    color: 'text-pink-600',
    bgColor: 'bg--100'
  },
  {
    title: 'Phone-call',
    icon: 'fa-solid fa-phone text-teal-600',
    color: 'teal-600',
    bgColor: 'bg-teal-100'
  },
 
];