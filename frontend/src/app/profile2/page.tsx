"use client";
import React, { useEffect } from "react";

type Props = {};

export default function page({}: Props) {
  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/users/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    console.log("HERE", response);

    const data = await response.json();
    console.log("HERE", data);
  };
  useEffect(() => {
    fetchData();
  });
  return <div>page</div>;
}
