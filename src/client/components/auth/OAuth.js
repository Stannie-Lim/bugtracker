import React from "react";

// assets
import github from "../../../../static/assets/github.svg";
import google from "../../../../static/assets/btn_google_dark_normal_ios.png";

// TODO take the url out

const OAuth = () => {
  return (
    <div className="oauth">
      <a
        href="http://bug-tracker.us/api/oauth/github/login"
        className="github-oauth-icon"
      >
        <img src={github} alt="github" />
      </a>

      <a
        href="http://bug-tracker.us/api/oauth/google/login"
        className="google-oauth-icon"
      >
        <img src={google} alt="google" />
      </a>
      {/* <a
        href="http://localhost:3000/api/oauth/github/login"
        className="github-oauth-icon"
      >
        <img src={github} alt="github" />
      </a>

      <a
        href="http://localhost:3000/api/oauth/google/login"
        className="google-oauth-icon"
      >
        <img src={google} alt="google" />
      </a> */}
    </div>
  );
};

export default OAuth;
