import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookingSession from './pages/BookingSession'
import Verification from './pages/booking/Verification'
import PaymentPage from "./pages/Payment";
import Register from "./pages/signIn/UserRegister";

import "./app.css";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import SignIn from "./pages/signIn/SignIn"

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./routes/ProtectedRoute";

// Main App Component
const App: React.FC = () => {
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element = {<ProtectedRoute/>}>
        <Route path="booking/" element={<BookingSession />} />
        </Route>

        <Route element={<ProtectedRoute/>}>
        <Route path="/booking/:id" element={<BookingSession />} />
        </Route>

        <Route path="/book/:id" element={<Verification />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="userdashboard/" element={<UserDashboard />} />
        <Route path="signin/" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;


// import { Routes, Route, Navigate, Router } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home"


// import "./app.css";


// export default function App() {
//   return (
//     <>
//     <Router>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />

//       </Routes>
//     </Router> 
//     </> 
//   );
// }
