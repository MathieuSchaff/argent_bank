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

export interface IFormLogin {
  email: string;
  password: string;
  rememberMe: boolean;
}
interface ErrorForm {
  data: {
    status: number;
    message: string;
  };
  status: number;
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
  const [login, result] = useLoginMutation();
  // error catched
  const [errorMsg, setErrorMsg] = useState<string>("");

  const submitButton = async (
    values: IFormLogin,
    helpers: FormikHelpers<IFormLogin>
  ) => {
    setErrorMsg("");
    setSpinner(true);

    try {
      const tokenResponse = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      if (tokenResponse.status === 200) {
        dispatch(setToken(tokenResponse));
      } else {
        throw new Error("An error occured");
      }
      if (values.rememberMe) {
        localStorage.setItem("token", tokenResponse.body.token);
      }
      navigate("/profile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg("An unexpected error occurred");
        errRef?.current?.focus();
        return "An unexpected error occurred";
      } else {
        const typedError = error as ErrorForm;
        setErrorMsg(typedError.data.message);
        errRef?.current?.focus();
      }
    } finally {
      // helpers.resetForm();
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
                {spinner ? (
                  <Spinner />
                ) : (
                  <>
                    {errorMsg && (
                      <p ref={errRef} className="form-errmsg">
                        {errorMsg}
                      </p>
                    )}
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
