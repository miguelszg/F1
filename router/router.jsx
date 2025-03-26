import { BrowserRouter as Router, Routes, Route }  from "react-router-dom";
import Login from "../src/pages/login";
import Register from "../src/pages/register";
import NotFound from "../src/pages/NotFound";
import Home from "../src/pages/home";
import Profile from "../src/pages/profile";
import Articule from "../src/pages/Articule";
import ForgotPassword from "../src/pages/forgotpaswword";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/home" element={<Home/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/articule" element={<Articule/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
        </Router>
    );
}

export default AppRouter
