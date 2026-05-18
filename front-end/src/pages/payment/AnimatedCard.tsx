import { motion } from "framer-motion";
import Card from "../../assets/cardimg.png";

const AnimatedCard: React.FC = () => {
  return (
    <div
     className="w-full h-full flex items-center justify-center">
      <motion.img
        src={Card}
        alt="Card Animation"
        initial={{
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
        }}
        animate={{
          y: -220,
          scale: 0.65,
          rotate: 0,
          opacity: 0,
        }}
        transition={{
          duration: 2.6,          
          ease: [0.4, 0, 0.2, 1], 
        }}
        className="w-80 rounded-2xl shadow-2xl"
      />
    </div>
  );
};

export default AnimatedCard;


// import { motion } from "framer-motion";
// import Card from "../../assets/cardimg.png"

// const AnimatedCard: React.FC = () => {
//   return (
//     <motion.div
//       initial={{ y: 0, scale: 1, opacity: 1 }}
//       animate={{ y: -120, scale: 0.85, opacity: 0 }}
//       transition={{ duration: 1.5, ease: "easeInOut" }}
//       className="absolute z-20"
//       style={{padding:"50px 60px 50px 60px"}}
//     >
//       <img
//         src={Card}
//         alt="Card Animation"
//         className="w-80 rounded-xl shadow-2xl"
//       />
//     </motion.div>
//   );
// };

// export default AnimatedCard;
