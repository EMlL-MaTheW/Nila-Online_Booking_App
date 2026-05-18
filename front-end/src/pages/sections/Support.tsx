// // Support section
import { categories } from "../../data/support";
interface Props {
  onSelectCategory: (category: string | null) => void;
}

const Support: React.FC<Props> = ({ onSelectCategory }) => {
  return (
    <section id="section-categories" className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        How can we support you today?
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div 
            key={index}
            onClick={() => onSelectCategory(category.title)}  // 🔥 THIS LINE
            className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-600 cursor-pointer group"
          >
            <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
              <i className={`fa-solid ${category.icon} text-${category.color} text-2xl`}></i>
            </div>
            
            <h3 className="font-semibold text-gray-800 text-lg">
              {category.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Support;
// import React from 'react';
// //Data from support.ts file (./data/support.ts)
// import { categories } from "../../data/support";

// const Support: React.FC = () => {
//   return (
//     <section id="section-categories" className="max-w-7xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//         How can we support you today?
//       </h2>
      
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {categories.map((category, index) => (
//           <div 
//             key={index}
//             className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-600 cursor-pointer group"
//           >
//             <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
//               <i className={`fa-solid ${category.icon} text-${category.color} text-2xl`}></i>
//             </div>
            
//             <h3 className="font-semibold text-gray-800 text-lg">{category.title}</h3>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Support;

