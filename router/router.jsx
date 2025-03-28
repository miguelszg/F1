import { BrowserRouter as Router, Routes, Route }  from "react-router-dom";
import Login from "../src/pages/login";
import Register from "../src/pages/register";
import NotFound from "../src/pages/NotFound";
import Home from "../src/pages/home";
import Profile from "../src/pages/profile";
import Articule from "../src/pages/Articule";
import ForgotPassword from "../src/pages/forgotpaswword";
import NewsDetail from "../src/pages/NewsDetail";
import CalendarDetail from "../src/pages/CalendarDetail";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/home" element={<Home/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/articule/:id" element={<Articule />} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/calendar/:id" element={<CalendarDetail />} />
            </Routes>
        </Router>
    );
}

export default AppRouter
