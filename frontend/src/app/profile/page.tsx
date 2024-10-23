import React from "react";
import { getProfileData } from "../actions/actions";

type Props = {};

export default async function page({}: Props) {
  const response = await fetch("http://localhost:1000/auth/profile", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  console.log("HERE", response);

  const responseData = await response.json();
  console.log("HERE2", responseData);
  // return responseData;

  return <div>page</div>;
}
