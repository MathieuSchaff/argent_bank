import { useState } from "react";
import "./Navbar.scss";
import iconArgentBank from "../../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Login from "../../features/login/Login";
import { useAppSelector } from "../../app/hooks";
import { logout, selectCurentTokenAuth } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const userToken = useAppSelector(selectCurentTokenAuth);
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };
  const handleToogle = () => {
    setIsOpen(!isOpen);
  };

  // MANUQE AFFICHER LE USER

  {
    /* <nav class="main-nav">
<a class="main-nav-logo" href="./index.html">
  <img
    class="main-nav-logo-image"
    src="./img/argentBankLogo.png"
    alt="Argent Bank Logo"
  />
  <h1 class="sr-only">Argent Bank</h1>
</a>
<div>
  <a class="main-nav-item" href="./user.html">
    <i class="fa fa-user-circle"></i>
    Tony
  </a>
  <a class="main-nav-item" href="./index.html">
    <i class="fa fa-sign-out"></i>
    Sign Out
  </a>
</div>
</nav> */
  }
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
        {isOpen && <Login handleToogle={handleToogle} />}
        {!userToken && (
          <button className="main-nav-item" onClick={() => handleToogle()}>
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </button>
        )}
        {userToken && <button onClick={logoutUser}>deconnecter</button>}
      </div>
    </nav>
  );
};

export default Navbar;
