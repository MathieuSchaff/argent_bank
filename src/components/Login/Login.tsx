import { useState, useRef, useEffect } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/hooks";
import { setToken } from "../../features/auth/authSlice";
import { useLoginMutation } from "./loginApiSlice";
import CustomField from "../CustomField/CustomField";
import "./Login.scss";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import Spinner from "../Spinner/Spinner";
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

const Login = () => {
  //REACT ROUTER DOM
  const navigate = useNavigate();
  // DISPATCH
  const dispatch = useAppDispatch();
  // DOM REFS
  const formContainer = useRef<HTMLElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [spinner, setSpinner] = useState<boolean>(false);
  // rtk query hook
  const [login, { data, isLoading, isError, error }] = useLoginMutation();
  // error catched
  const [errorMsg, setErrorMsg] = useState<any>("");

  const submitButton = async (
    values: IFormLogin,
    helpers: FormikHelpers<IFormLogin>
  ) => {
    setErrorMsg("");
    setSpinner(true);
    try {
      console.log("isLoading", isLoading);
      // unwrap to enable cactch
      const tokenResponse = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      console.log("isLoading", isLoading);
      if (data || tokenResponse) {
        console.log("isLoading", isLoading);

        dispatch(setToken(tokenResponse));
        console.log("tokenResponse ", tokenResponse);
      } else {
        console.log("isLoading", isLoading);
        throw new Error("An error occured: password or email invalid");
      }
      if (values.rememberMe) {
        localStorage.setItem("token", tokenResponse.body.token);
      }
      navigate("/profile");
    } catch (error: unknown) {
      console.log("isLoading", isLoading);

      if (error instanceof Error) {
        console.log("isLoading", isLoading);

        setErrorMsg("An unexpected error occurred");
        errRef?.current?.focus();
        return "An unexpected error occurred";
        // 👉️ err is type Error here
      } else {
        console.log("isLoading", isLoading);

        const typedError = error as ErrorForm;
        setErrorMsg(typedError.error);
        errRef?.current?.focus();
      }
    } finally {
      helpers.resetForm();
      helpers.setSubmitting(false);
      setSpinner(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: any): void => {
      if (
        formContainer.current &&
        !formContainer.current.contains(event.target as Node)
      ) {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formContainer, navigate]);
  return (
    <main className="main bg-dark modal-sign-in">
      <section className="sign-in-content" ref={formContainer}>
        <div>
          <FontAwesomeIcon icon={faCircleUser} id="user__svg" />
          <h1>Sign In</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitButton}
          validateOnMount
        >
          {({ isSubmitting, dirty, isValid, handleBlur }) => {
            return (
              <Form>
                {isError ||
                  (error && (
                    <p ref={errRef} className="errmsg">
                      {errorMsg}
                    </p>
                  ))}
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
                      classStyle="login__input "
                      onBlur={handleBlur}
                    />
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      component={CustomField}
                      label="Password"
                      classStyle="login__input "
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
                      className="css-button-sliding-to-left--green"
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
