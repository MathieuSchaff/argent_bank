import React from "react";
import "./FormEditName.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeUserLastFirstName } from "../../features/auth/authSlice";
import { useChangeUserDataMutation } from "./formEditSlice";
import type { IUserFirstLastData } from "./formEditSlice";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import CustomField from "../../CustomField/CustomField";
import { selectCurentUserAuth } from "../../features/auth/authSlice";
export interface IFormChangeLastFirstName {
  firstName: string;
  lastName: string;
}
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Must be 2 characters atleast ")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Must be 2 characters atleast ")
    .required("Required"),
});
const initialValues: IFormChangeLastFirstName = {
  firstName: "",
  lastName: "",
};

const FormEditName = () => {
  const dispatch = useAppDispatch();
  const [changeUserData] = useChangeUserDataMutation();
  const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false);
  const user = useAppSelector(selectCurentUserAuth);

  const handleSubmit = async (
    values: IFormChangeLastFirstName,
    helpers: FormikHelpers<IFormChangeLastFirstName>
  ) => {
    // 👇️ prevent page refresh
    const updataUserData = async () => {
      try {
        const responseUpdataData = await changeUserData({
          firstName: values.firstName,
          lastName: values.lastName,
        }).unwrap();
        if (responseUpdataData.status === 200) {
          dispatch(changeUserLastFirstName(responseUpdataData));

          setIsFormOpen(false);
        }
        console.log("fulfilled", responseUpdataData);
      } catch (error) {
        console.error("rejected", error);
      }
    };
    updataUserData();
  };
  const openForm = () => {
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <section className="editForm__container">
      {!isFormOpen && (
        <button className="edit-button" onClick={openForm}>
          Edit Name
        </button>
      )}
      {isFormOpen && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount
        >
          {({ isSubmitting, dirty, isValid, handleBlur }) => {
            return (
              <Form>
                <div className="editName__container editName__container--1">
                  <Field
                    id="firstName"
                    name="firstName"
                    type="firstName"
                    component={CustomField}
                    label={null}
                    onBlur={handleBlur}
                    classStyle="edit__input"
                    placeholder={user?.firstName}
                  />
                  <button
                    type="submit"
                    className="sign-in-button"
                    disabled={!(dirty && isValid) || isSubmitting}
                  >
                    {" "}
                    Save
                  </button>
                </div>
                <div className=" editName__container editName__container--2">
                  <Field
                    id="lastName"
                    name="lastName"
                    type="lastName"
                    classStyle="edit__input"
                    component={CustomField}
                    label={null}
                    placeholder={user?.lastName}
                    autoComplete="on"
                    onBlur={handleBlur}
                  />
                  <button onClick={closeForm}>Cancel</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </section>
  );
};

export default FormEditName;
