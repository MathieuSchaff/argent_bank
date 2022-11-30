import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../auth/authSlice";
import { useChangeUserDataMutation } from "./formEditSlice";
import type { IUserFirstLastData, IRespMutation } from "./formEditSlice";
import type { IResponseToken } from "../../app/api/apiSlice";

const FormEditName = () => {
  const dispatch = useAppDispatch();
  const [changeUserData, { isError, data, isSuccess }] =
    useChangeUserDataMutation();
  const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<IUserFirstLastData>({
    firstName: "",
    lastName: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [event?.target?.id]: event?.target?.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 👇️ prevent page refresh
    event.preventDefault();
    const updataUserData = async () => {
      try {
        const responseUpdataData = await changeUserData(form).unwrap();
        if (responseUpdataData.status === 200) {
          // dispatch();
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
    <>
      {!isFormOpen && (
        <button className="edit-button" onClick={openForm}>
          Edit Name
        </button>
      )}
      {isFormOpen && (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">firstName</label>
              <input
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">lastName</label>
              <input
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <button type="submit"> Save</button>
            <button onClick={closeForm}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default FormEditName;
