import React from "react";
import { useSelector } from "react-redux";

export const User = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="user-panel" style={{ background: "#fff", padding: "1rem" }}>
      <h1>Xin chào {user.username}</h1>
      <p>Please take your course to survey or check your report !!!!!</p>
    </div>
  );
};
