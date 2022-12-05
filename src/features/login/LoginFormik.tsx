import React, { useState, useRef, useEffect, FC } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/hooks";
import { setToken } from "../auth/authSlice";
import { useLoginMutation } from "./loginApiSlice";
import CustomField from "./FormikControl";
import "./Login.scss";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import Spinner from "../../components/Spinner/Spinner";
interface ErrorForm {
  error: string;
  status: number;
}
export interface IFormLogin {
  email: string;
  password: string;
  rememberMe: boolean;
}
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(5, "Must be 5 characters atleast ")
    .required("Required"),
  rememberMe: Yup.boolean().required(),
});

const initialValues: IFormLogin = {
  email: "",
  rememberMe: false,
  password: "",
};

const Login = ({ handleToogle }: { handleToogle: () => void }) => {
  //REACT ROUTER DOM
  const navigate = useNavigate();
  // DISPATCH
  const dispatch = useAppDispatch();
  // DOM REFS
  const formContainer = useRef<HTMLElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [spinner, setSpinner] = useState<boolean>(false);
  // rtk query hook
  const [login, result] = useLoginMutation();
  // error catched
  const [errorMsg, setErrorMsg] = useState<any>("");

  const submitButton = async (
    values: IFormLogin,
    helpers: FormikHelpers<IFormLogin>
  ) => {
    setErrorMsg("");
    setSpinner(true);
    console.log("result", result);

    try {
      console.log("result", result);

      // unwrap to enable cactch
      // const tokenResponse = await login({
      //   email: values.email,
      //   password: values.password,
      // }).unwrap();
      const tokenResponse = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      console.log("result ", result);
      console.log("tokenResponse ", tokenResponse);

      // if (tokenResponse.status === 200) {
      //   console.log("isLoading", isLoading);

      //   // if token received => can add it into store
      //   dispatch(setToken(tokenResponse));

      if (result.data || tokenResponse) {
        console.log("result ", result);
        console.log("tokenResponse ", tokenResponse);
      } else {
        console.log("isLoading", result);

        throw new Error("la tete a toto");
      }
      // if (values.rememberMe) {
      //   localStorage.setItem("token", tokenResponse.body.token);
      // }
      console.log("result", result);
      console.log("tokenResponse ", tokenResponse);

      handleToogle();
      // navigate("/profile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("result", result);

        setErrorMsg("An unexpected error occurred");
        errRef?.current?.focus();
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
        // 👉️ err is type Error here
      } else {
        console.log("result", result);
        const typedError = error as ErrorForm;
        setErrorMsg(typedError.error);
        errRef?.current?.focus();
        console.log(typedError?.error);
      }
    } finally {
      helpers.resetForm();
      helpers.setSubmitting(false);
      setSpinner(false);
      console.log("result", result);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: any): void => {
      if (
        formContainer.current &&
        !formContainer.current.contains(event.target as Node)
      ) {
        handleToogle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formContainer, handleToogle]);
  return (
    <main className="main bg-dark modal-sign-in">
      <section className="sign-in-content" ref={formContainer}>
        <FontAwesomeIcon icon={faCircleUser} id="user__svg" />
        <h1>Sign In</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitButton}
          validateOnMount
        >
          {({ isSubmitting, dirty, isValid, handleBlur }) => {
            return (
              <Form>
                {result.error && (
                  <p ref={errRef} className="errmsg">
                    {errorMsg}
                  </p>
                )}
                {spinner ? (
                  <Spinner />
                ) : (
                  <>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      component={CustomField}
                      label="Email"
                      onBlur={handleBlur}
                    />
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      component={CustomField}
                      label="Password"
                      autoComplete="on"
                      onBlur={handleBlur}
                    />
                    <div className="input-remember">
                      <Field
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                      />
                      <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button
                      className="sign-in-button"
                      type="submit"
                      disabled={!(dirty && isValid) || isSubmitting}
                    >
                      Submit
                    </button>
                  </>
                )}
              </Form>
            );
          }}
        </Formik>
      </section>
    </main>
  );
};

export default Login;
