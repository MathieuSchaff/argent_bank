import React, { useState, useRef, useEffect } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { selectCurentTokenAuth } from "../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCredentials } from "../auth/authSlice";
import { useLoginMutation } from "../../app/api/authApiSlice";
//  login page with username and password fields,
//on submit the page sends a POST request to the API to authenticate user credentials,
// on success the API returns a JWT token to make authenticated requests to secure API routes.

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
  const token = useAppSelector(selectCurentTokenAuth);

  // STATE DE LOGIN
  const formContainer = useRef<HTMLElement>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const errRef = useRef<HTMLParagraphElement>(null);
  // const [login, , { isLoading }] = useLoginMutation();
  const [login, { isLoading }] = useLoginMutation();
  const userRef = useRef<HTMLInputElement>(null);
  // when the token is in, navigate to user
  useEffect(() => {
    console.log("enter useeffect login");
    if (token) {
      console.log("enter navigate login");
      navigate("/user");
    }
  }, [navigate, token]);
  // FUNCTIONS
  const submitButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login({
        email,
        password,
      }).unwrap();
      if (userData) {
        console.log(userData);
        dispatch(setCredentials({ ...userData, user }));
      }
      setUser("");
      setPassword("");
      // navigate("/user");
      console.log("fini login");
    } catch (e) {
      // probleme de type avec e
      console.error("error login", e);
      // setErrorMsg(e as string);
      errRef?.current?.focus();
    }
  };

  const handleChange = () => {
    setRememberMe(!rememberMe);
  };

  // If click outside of FORM => form is close
  useEffect(() => {
    userRef?.current?.focus();
  }, []);
  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);
  useEffect(() => {
    const handleClickOutside = (event: any): void => {
      if (
        formContainer.current &&
        !formContainer.current.contains(event.target)
      ) {
        console.log("entré dans login useeffect");
        dispatch(modal.actions.closeModalAction());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formContainer, dispatch]);
  return (
    <main className="main bg-dark modal-sign-in">
      <section className="sign-in-content" ref={formContainer}>
        <FontAwesomeIcon icon={faCircleUser} />
        <h1>Sign In</h1>
        {isLoading ? (
          <h1> Loading Login</h1>
        ) : (
          <>
            <p ref={errRef} className={errorMsg ? "errmsg" : "offscreen"}>
              {errorMsg}
            </p>
            <form onSubmit={(e) => submitButton(e)}>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={email}
                  ref={userRef}
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
          </>
        )}
      </section>
    </main>
  );
};

export default Login;
