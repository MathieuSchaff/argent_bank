import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectCurentTokenAuth,
  selectCurentUserAuth,
  setUser,
} from "../auth/authSlice";
import { useGetUserMutation } from "./userApiSlice";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import FormEditName from "../FormEditName/FormEditName";
import Account from "../../components/Account/Account";
// After successfully logging in, a user should be able to:

//  See their profile page
//  See their first name on the profile page
//  See placeholder bank account information

const UserRouter = () => {
  const token = useAppSelector(selectCurentTokenAuth);
  const user = useAppSelector(selectCurentUserAuth);
  const dispatch = useAppDispatch();
  const [getUser, { isUninitialized, isError, isLoading, isSuccess }] =
    useGetUserMutation();
  console.log("user", user);
  useEffect(() => {
    console.log("enter useEffect");
    if (isUninitialized) {
      const fetchData = async () => {
        try {
          const responseGetData = await getUser().unwrap();
          if (responseGetData.status === 200) {
            dispatch(setUser(responseGetData));
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
        <main className="main bg-dark">
          <div className="header">
            <h1>
              Welcome back
              <br />
              {`${user?.firstName},  ${user?.lastName}`}
            </h1>
            <FormEditName />
          </div>
          <Account />
        </main>
      )}
    </>
  );
};

export default UserRouter;
