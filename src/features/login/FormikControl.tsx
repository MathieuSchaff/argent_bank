import React from "react";
import { ErrorMessage, FieldInputProps, FormikState } from "formik";

const CustomField = ({
  field,
  form,
  label,
  ...props
}: {
  label: string;
  field: FieldInputProps<any>;
  form: FormikState<any>;
}) => {
  let isError = form.errors[field.name] && form.touched[field.name];
  return (
    <div className="input-wrapper">
      <label htmlFor={field.name}>{label}</label>
      <input
        {...field}
        {...props}
        className={
          isError
            ? "login__input login__input--error login__focus "
            : "login__input login__focus"
        }
      />

      <ErrorMessage name="email">
        {(errorMsg) => <div className="errmsg">{errorMsg}</div>}
      </ErrorMessage>
    </div>
  );
};
export default CustomField;
