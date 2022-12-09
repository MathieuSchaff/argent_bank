import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectCurentTokenAuth,
  selectCurentUserAuth,
  setToken,
  setUser,
} from "../../features/auth/authSlice";
import { useGetUserMutation } from "./userApiSlice";
import FormEditName from "../FormEditName/FormEditName";
import Account from "../Account/Account";
import type { IResponseToken } from "../../app/api/apiSlice";
import type { DataToken } from "../Login/loginApiSlice";

interface IFormatedUser {
  firstName: string;
  lastName: string;
}
const UserRouter = () => {
  const token = useAppSelector(selectCurentTokenAuth);
  const user = useAppSelector(selectCurentUserAuth);
  const dispatch = useAppDispatch();
  const [getUser, { isUninitialized, isError, isLoading, isSuccess }] =
    useGetUserMutation();
  let userFirstletterToUpperCase: IFormatedUser = {
    firstName: "",
    lastName: "",
  };
  if (user?.lastName && user?.firstName) {
    userFirstletterToUpperCase = {
      firstName:
        user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.slice(1) ??
        "",
      lastName:
        user?.lastName.charAt(0).toUpperCase() + user?.lastName.slice(1) ?? "",
    };
  }
  useEffect(() => {
    if (isUninitialized) {
      const fetchData = async () => {
        if (localStorage.getItem("token") !== null) {
          let tokenToDispatch: IResponseToken<DataToken> = {
            message: "Sending token through",
            status: 200,
            body: { token: localStorage.getItem("token") as string },
          };
          dispatch(setToken(tokenToDispatch));
        }
        try {
          const responseGetData = await getUser().unwrap();
          if (responseGetData.status === 200) {
            dispatch(setUser(responseGetData));
          } else {
            throw new Error("Could not get user data");
          }
          console.log("fulfilled", responseGetData);
        } catch (error) {
          console.error("rejected", error);
        }
      };
      fetchData();
    }
  }, [dispatch, getUser, isUninitialized]);
  return (
    <>
      {isError && <p>Error user</p>}
      {isLoading && <p>"Loading..."</p>}
      {isError && <p>{JSON.stringify(token)}</p>};
      {isSuccess && (
        <main className="user__main">
          <div className="user__header">
            <h1>
              Welcome back
              <br />
              {`${userFirstletterToUpperCase?.firstName},  ${userFirstletterToUpperCase?.lastName}`}
            </h1>
          </div>
          <FormEditName />
          <Account />
        </main>
      )}
    </>
  );
};

export default UserRouter;
