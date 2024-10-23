"use server";

export const getProfileData = async (request: Request) => {
  console.log(request.headers.getSetCookie());
  const response = await fetch("http://localhost:1000/auth/profile", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};
