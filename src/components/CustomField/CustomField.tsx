import React from "react";
import { ErrorMessage, FieldInputProps, FormikState } from "formik";

const CustomField = ({
  field,
  form,
  label,
  classStyle,
  ...props
}: {
  label: string;
  field: FieldInputProps<any>;
  form: FormikState<any>;
  classStyle: string;
}) => {
  let isError = form.errors[field.name] && form.touched[field.name];
  return (
    <div className="input-wrapper">
      <label htmlFor={field.name}>{label}</label>
      <input
        {...field}
        {...props}
        className={
          isError ? `${classStyle} login__input--error` : `${classStyle}`
        }
      />

      <ErrorMessage name={field.name}>
        {(errorMsg) => <div className="errmsg">{errorMsg}</div>}
      </ErrorMessage>
    </div>
  );
};
export default CustomField;
