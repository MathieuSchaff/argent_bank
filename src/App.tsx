import "./App.scss";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import UserRouter from "./components/UserRouter/UserRouter";
import Login from "./components/Login/Login";
function App() {
  let location = useLocation();
  useEffect(() => {
    console.log("location", location);
  }, [location]);
  console.log(useLocation);
  return (
    <div
      className={
        location.pathname === "/login" ? "App app__overflowhidden" : "App"
      }
    >
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<UserRouter />} path="/profile" />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
