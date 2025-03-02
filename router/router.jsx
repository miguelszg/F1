import { BrowserRouter as Router, Routes, Route }  from "react-router-dom";
import Login from "../src/pages/login";
import Register from "../src/pages/register";
import NotFound from "../src/pages/NotFound";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRouter
