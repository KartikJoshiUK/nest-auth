"use client";
import React, { useEffect, useState } from "react";

type Props = {};
interface User {
  email: string;
  username: string;
  userId: string;
}
export default function page({}: Props) {
  const [user, setuser] = useState<User | null>(null);
  const fetchData = async () => {
    const response = await fetch("http://localhost:1000/users/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    console.log("HERE", response);

    const data = (await response.json()) as User;
    setuser(data);
    console.log("HERE", data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (user === null) return <p>Loading...</p>;
  return (
    <div>
      <h1>{user.email}</h1>
      <h2>{user.username}</h2>
      <h3>{user.userId}</h3>
    </div>
  );
}
