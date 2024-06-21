import "./App.css";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ForgotPassword from './pages/ForgotPassword.jsx';
import VerifyOtp from './pages/VerifyOtp.jsx'

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/VerifyOtp" element={<VerifyOtp />} />

      </Routes> 
    </>
  );
}

export default App;


    