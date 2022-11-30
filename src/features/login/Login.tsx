import React, { useState, useRef, useEffect } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/hooks";
import { setToken } from "../auth/authSlice";
import { useLoginMutation } from "../../app/api/authApiSlice";

//  login page with username and password fields,
//on submit the page sends a POST request to the API to authenticate user credentials,
// on success the API returns a JWT token to make authenticated requests to secure API routes.
interface ErrorForm {
  data: { status: number; message: string };
  status: number;
}
export type formData = {
  email: string | undefined;
  password: string | undefined;
  rememberMe: boolean | undefined;
};
const Login = ({ handleToogle }: { handleToogle: () => void }) => {
  //REACT ROUTER DOM
  const navigate = useNavigate();
  // DISPATCH
  const dispatch = useAppDispatch();

  // STATE DE LOGIN
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<any>("");
  // DOM REFS
  const formContainer = useRef<HTMLElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const [login, { isLoading }] = useLoginMutation();

  // submit
  const submitButton = async (e: React.FormEvent) => {
    e.preventDefault();
    // try to post email and password to receive the token
    try {
      // unwrap to enable cactch
      const tokenResponse = await login({
        email,
        password,
      }).unwrap();
      if (tokenResponse.status === 200) {
        // if token received => can add it into store
        dispatch(setToken(tokenResponse));
      }
      if (rememberMe) {
        localStorage.setItem("token", tokenResponse.body.token);
      }
      setPassword("");
      setEmail("");
      handleToogle();
      navigate("/profile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg("An unexpected error occurred");
        errRef?.current?.focus();
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
        // 👉️ err is type Error here
      } else {
        const typedError = error as ErrorForm;
        setErrorMsg(typedError.data?.message);
        errRef?.current?.focus();
        console.log(typedError?.data?.message);
      }
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
        handleToogle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formContainer, dispatch, handleToogle]);
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
