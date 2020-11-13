import React from "react";
import { useSelector } from "react-redux";

// components
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector(({ user }) => user);
  console.log(user);
  return (
    <div className="main">
      <h1>Profile</h1>
      {/* <img src={user.imageUrl} /> */}
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
