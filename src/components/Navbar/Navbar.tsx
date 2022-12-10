import "./Navbar.scss";
import iconArgentBank from "../../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { AiOutlineExport } from "react-icons/ai";

import {
  logout,
  selectCurentTokenAuth,
  selectCurentUserAuth,
} from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
const Navbar = () => {
  const userToken = useAppSelector(selectCurentTokenAuth);
  const user = useAppSelector(selectCurentUserAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={iconArgentBank}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!userToken && (
          <button className="main-nav-item" onClick={() => navigate("/login")}>
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </button>
        )}
        {userToken && (
          <div className="nav__connected">
            <Link className="nav__first" to="/profile">
              <FontAwesomeIcon icon={faCircleUser} />
              {user?.firstName.charAt(0).toUpperCase()}
              {user?.firstName.slice(1)}
            </Link>
            <p className="nav__sec">
              <AiOutlineExport />
              <button onClick={logoutUser}>Sign Out</button>
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
