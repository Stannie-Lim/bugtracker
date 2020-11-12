import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(({ user }) => user);
  return (
    <div className="main">
      <h1>profile</h1>
      <img src={user.imageUrl} />
    </div>
  );
};

export default Profile;
