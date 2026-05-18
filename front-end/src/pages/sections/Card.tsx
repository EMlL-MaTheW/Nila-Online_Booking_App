// This file is a part of home page
import { Link } from "react-router-dom";

const Card: React.FC = () => {
  return (
    <section id="section-cta" className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-700 rounded-3xl p-12 relative overflow-hidden shadow-2xl">
        
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20">
          <i className="fa-solid fa-heart-pulse text-white text-9xl"></i>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Healing starts here
            <br />
            we'll walk with you
          </h2>
          
          <Link
            to="/assessment"
            className="bg-gray-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-gray-800 hover:shadow-xl transition-all duration-300 inline-block"
          >
            Take Assessment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Card;
