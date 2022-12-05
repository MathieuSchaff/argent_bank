// import React from "react";
// import { useAppDispatch } from "../../app/hooks";
// import { changeUserLastFirstName } from "../auth/authSlice";
// import { useChangeUserDataMutation } from "./formEditSlice";
// import type { IUserFirstLastData, IRespMutation } from "./formEditSlice";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const FormEditName = () => {
//   const dispatch = useAppDispatch();
//   const [changeUserData] = useChangeUserDataMutation();
//   const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false);

//   const openForm = () => {
//     setIsFormOpen(true);
//   };
//   const closeForm = () => {
//     setIsFormOpen(false);
//   };

//   return (
//     <>
//       {!isFormOpen && (
//         <button className="edit-button" onClick={openForm}>
//           Edit Name
//         </button>
//       )}
//       {isFormOpen && (
//         <Formik
//           initialValues={{ firstName: "", lastName: "" }}
//           validationSchema={Yup.object({
//             firstName: Yup.string()
//               .min(3, "First name must be at least 3 characters long")
//               .required("First name is required"),
//             lastName: Yup.string()
//               .min(3, "Last name must be at least 3 characters long")
//               .required("Last name is required"),
//           })}
//           onSubmit={async (values, { setSubmitting }) => {
//             try {
//               const responseUpdataData = await changeUserData(values).unwrap();
//               if (responseUpdataData.status === 200) {
//                 dispatch(changeUserLastFirstName(responseUpdataData));
//                 setForm({
//                   firstName: "",
//                   lastName: "",
//                 });
//                 setIsFormOpen(false);
//               }
//               console.log("fulfilled", responseUpdataData);
//             } catch (error) {
//               console.error("rejected", error);
//             } finally {
//               setSubmitting(false);
//             }
//           }}
//         >
//           <Form>
//             <div>
//               <label htmlFor="firstName">firstName</label>
//               <Field id="firstName" type="text" name="firstName" />
//               <ErrorMessage name="firstName" />
//             </div>
//             <div>
//               <label htmlFor="lastName">lastName</label>
//               <Field id="lastName" type="text" name="lastName" />
//               <ErrorMessage name="lastName" />
//             </div>
//             <button type="submit"> Save</button>
//             <button onClick={closeForm}>Cancel</button>
//           </Form>
//         </Formik>
//       )}
//     </>
//   );
// };

// export default FormEditName;
