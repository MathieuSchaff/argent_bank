import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import UserPage from "./components/UserPage/UserPage";
import Login from "./components/Login/Login";
function App() {
  let location = useLocation();

  return (
    <div
      className={
        location.pathname === "/login" ? "App app__overflowhidden" : "App"
      }
    >
      <div className="router-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<UserPage />} path="/profile" />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
