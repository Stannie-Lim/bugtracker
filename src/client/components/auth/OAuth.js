import React from "react";

const OAuth = () => {
  return (
    <div>
      {/* <a href="/api/oauth/github/login" className="github-icon">
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/25/25231.svg"
          alt="github"
        />
      </a> */}
      <a href="/api/oauth/google/login">Login with google</a>
    </div>
  );
};

export default OAuth;
