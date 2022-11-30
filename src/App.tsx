import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import ProfilePage from "./features/userData/UserRouter";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Main />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
