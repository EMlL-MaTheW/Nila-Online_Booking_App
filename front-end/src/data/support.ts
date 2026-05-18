
interface Category {
  title: string;
  icon: string;
  color: string;
  bgColor: string;
}

// Data for the Support section of the home page (./pages/sections/Support.tsx)
export const categories: Category[] = [
  {
    title: 'Consultant Psychologist',
    icon: 'fa-user-tie',
    color: 'amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    title: 'Sexual Wellness',
    icon: 'fa-solid fa-heart text-pink-600',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  {
    title: 'Clinical Psychologist',
    icon: 'fa-solid fa-brain text-teal-600',
    color: 'teal-600',
    bgColor: 'bg-teal-100'
  },
  {
    title: 'Psychiatrist',
    icon: 'fa-solid fa-stethoscope text-orange-600',
    color: 'orange-600',
    bgColor: 'bg-orange-100'
  }
];