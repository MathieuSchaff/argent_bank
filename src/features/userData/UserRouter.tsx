import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectCurentTokenAuth,
  selectCurentUserAuth,
  setUser,
} from "../auth/authSlice";
import { useGetUserMutation } from "./userApiSlice";
import { Link } from "react-router-dom";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
// After successfully logging in, a user should be able to:

//  See their profile page
//  See their first name on the profile page
//  See placeholder bank account information

const UserRouter = () => {
  const token = useAppSelector(selectCurentTokenAuth);
  const userSec = useAppSelector(selectCurentUserAuth);
  const dispatch = useAppDispatch();
  const [
    getUser,
    { data, isUninitialized, isError, isLoading, isSuccess, error },
  ] = useGetUserMutation();

  console.log("aaa");

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
      <h1>Je suis le h1 du userprofile</h1>
      {/* {isError && <p>Error user</p>}
      {isLoading && <p>"Loading..."</p>}
      {isSuccess ||
        (token && (
          <section className="users">
            <h1>userSec</h1>
            {JSON.stringify(userSec)}
            <h1>User</h1>
            {JSON.stringify(user)}
            <Link to="/">Back to HOME</Link>
          </section>
        ))}
      {isError && <p>{JSON.stringify(token)}</p>}; */}
      <ProfilePage />
    </>
  );
};

export default UserRouter;
