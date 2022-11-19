import React from "react";
import "./Navbar.scss";
import iconArgentBank from "../../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { selectorModal, selectUserAuth } from "../../utils/selectors";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../features/login/Login";
import { openModalAction } from "../../features/modal/modal";

const Navbar = () => {
  const modal = useSelector(selectorModal);
  // console.log(userAuth);
  const userAuth = useSelector(selectUserAuth);
  const dispatch = useDispatch();
  const openModal = () => {
    console.log("modal/openModal");
    dispatch(openModalAction());
  };
  const logout = () => {
    // dispatch(logout());
  };
  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="./index.html">
        <img
          className="main-nav-logo-image"
          src={iconArgentBank}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {/* {userAuth.isAuthenticated && (
          <a className="main-nav-item" onClick={() => logout()}>
            <FontAwesomeIcon icon={faCircleUser} />
            Se deconnecter
          </a>
        )} */}
        {modal.isOpen && <Login />}

        {!userAuth.token && (
          <button className="main-nav-item" onClick={() => openModal()}>
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </button>
        )}
        {userAuth.token && <button onClick={logout}>deconnecter</button>}
      </div>
    </nav>
  );
};

export default Navbar;
