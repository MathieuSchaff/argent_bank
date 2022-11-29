import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCurentTokenAuth, selectCurentUserAuth } from "../auth/authSlice";
import { useGetUserMutation } from "./userApiSlice";
import { Link } from "react-router-dom";
const UserRouter = () => {
  const token = useAppSelector(selectCurentTokenAuth);

  const myget = useGetUserMutation();
  const [getUser, { isLoading, data: user, isError, isSuccess }] =
    useGetUserMutation();
  console.log(isLoading);
  console.log(user);
  console.log(isError);
  console.log(isSuccess);
  return (
    <>
      <h1>Je suis le h1 du userprofile</h1>
      {/* {error && <p>Error user router</p>}
      {isLoading && <p>"Loading..."</p>}
      {isSuccess && (
        <section className="users">
          <h1>Users List</h1>
          {JSON.stringify(users)}
          <Link to="/">Back to HOME</Link>
        </section>
      )}
      {isError && <p>{JSON.stringify(error)}</p>}; */}
    </>
  );
};

export default UserRouter;
