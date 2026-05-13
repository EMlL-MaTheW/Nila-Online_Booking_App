// // import { Link } from "react-router-dom";
// import VideoSection from './/sections/VideoSection';
// import  Support from "./sections/Support";
// import Card from "./sections/Card";
// import ExpertCard from '../components/ExpertCard'
// import Question from './sections/Question';
// import Footer from './sections/Footer';
// import '../App.css'

// const Home: React.FC = () => {
//   return (
//     <>
    
//     <div className="min-h-screen m-0 p-0 bg-[#f2fff2]">
//       <VideoSection/>
//       <Support/>
//       <Card/>
//       <ExpertCard/>
//       <Question/>
//       <Footer/>
//     </div>  
//     </>
//   );
// };

// export default Home;

import { useState } from "react";  // ✅ ADD

import VideoSection from './/sections/VideoSection';
import Support from "./sections/Support";
import Card from "./sections/Card";
import ExpertCard from '../components/ExpertCard';
import Question from './sections/Question';
import Footer from './sections/Footer';
import '../App.css';

const Home: React.FC = () => {

  // ✅ MAIN STATE (IMPORTANT)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen m-0 p-0 bg-[#f2fff2]">
      <VideoSection/>
      <Support onSelectCategory={setSelectedCategory} />
      <Card/>
      <ExpertCard selectedCategory={selectedCategory} />
      <Question/>
      <Footer/>
    </div>
  );
};

export default Home;