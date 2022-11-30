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
import FormEditName from "../FormEditName/FormEditName";
// After successfully logging in, a user should be able to:

//  See their profile page
//  See their first name on the profile page
//  See placeholder bank account information

const UserRouter = () => {
  const token = useAppSelector(selectCurentTokenAuth);
  const user = useAppSelector(selectCurentUserAuth);
  const dispatch = useAppDispatch();
  const [getUser, { data, isUninitialized, isError, isLoading, isSuccess }] =
    useGetUserMutation();
  // console.log("data", data);
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
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default UserRouter;
