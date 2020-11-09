import React from "react";
import { GoogleLogin } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../secrets";

const OAuth = () => {
  const onSuccess = (ev) => {
    console.log(ev);
    console.log("hello");
  };

  const onFailure = () => {};

  return (
    <div>
      <a href="/api/oauth/github/login" className="github-icon">
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/25/25231.svg"
          alt="github"
        />
      </a>

      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
      />
    </div>
  );
};

export default OAuth;
