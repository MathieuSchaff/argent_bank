import React, { useState, useRef, useEffect } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { selectCurentToken } from "../../utils/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
//  login page with username and password fields,
//on submit the page sends a POST request to the API to authenticate user credentials,
// on success the API returns a JWT token to make authenticated requests to secure API routes.
import { loginUser } from "./userAuthSlice";
import modal from "../modal/modal";
export type formData = {
  email: string | undefined;
  password: string | undefined;
  rememberMe: boolean | undefined;
};
const Login = () => {
  //REACT ROUTER DOM
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // SELECTORS
  const token = useAppSelector(selectCurentToken);

  // STATE DE LOGIN
  const form = useRef<HTMLFormElement>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // when the token is in, navigate to user
  useEffect(() => {
    console.log("enter useeffect login");
    if (token) {
      console.log("enter navigate login");
      navigate("/user");
    }
  }, [navigate, token]);
  // FUNCTIONS
  const submitButton = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, rememberMe);
  };

  const handleChange = () => {
    setRememberMe(!rememberMe);
  };

  const login = (
    email: string | undefined,
    password: string | undefined,
    rememberMe: boolean | undefined
  ): void => {
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
    const handleClickOutside = (event: any): void => {
      if (form.current && !form.current.contains(event.target)) {
        console.log("entré dans login useeffect");
        dispatch(modal.actions.closeModalAction());
      }
    };

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
          <input className="sign-in-button" type="submit" value="Sign in" />
        </form>
      </section>
    </main>
  );
};

export default Login;
