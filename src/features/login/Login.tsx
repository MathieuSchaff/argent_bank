import React, { useState, useRef, useEffect } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { selectCurentToken } from "../../utils/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
//  login page with username and password fields,
//on submit the page sends a POST request to the API to authenticate user credentials,
// on success the API returns a JWT token to make authenticated requests to secure API routes.
import { loginUser } from "./userAuthSlice";
import modal from "../modal";
const Login = () => {
  //REACT ROUTER DOM
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // SELECTORS
  const token = useSelector(selectCurentToken);

  // STATE DE LOGIN
  const form = useRef();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // when the token is in, navigate to user
  useEffect(() => {
    console.log("enter useeffect login");
    if (token) {
      console.log("enter navigate login");
      navigate("/user");
    }
  }, [navigate, token]);
  // FUNCTIONS
  const submitButton = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleChange = () => {
    setRememberMe(!rememberMe);
  };

  const login = (email, password, rememberMe) => {
    // First Name: Tony
    // Last Name: Stark
    // Email: tony@stark.com
    // Password: password123
    const data = { email, password, rememberMe };
    try {
      dispatch(loginUser(data));
    } catch (e) {
      console.error("e login", e);
    }
  };
  // If click outside of FORM => form is close
  useEffect(() => {
    function handleClickOutside(event) {
      if (form.current && !form.current.contains(event.target)) {
        console.log("entré dans login useeffect");
        dispatch(modal.actions.closeModalAction());
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [form, dispatch]);
  return (
    <main className="main bg-dark modal-sign-in">
      <section className="sign-in-content" ref={form}>
        <FontAwesomeIcon icon={faCircleUser} />
        <h1>Sign In</h1>
        <form onSubmit={(e) => submitButton(e)}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" onClick={() => login()}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
