"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch("http://localhost:1000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email, password });
    if (email && password) {
      const response = await handleLogin(email, password);
      if (response.success) {
        router.push("/profile");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-16 bg-gray-200 text-black">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        <label className="flex flex-col">
          email:{" "}
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </label>
        <br />
        <label className="flex flex-col">
          Password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </label>
        <br />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
