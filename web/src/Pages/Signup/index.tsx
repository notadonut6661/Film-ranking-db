import { useRef, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import './style.scss';

export default function Signup(): JSX.Element {
  return (<>
  <div className="body" id="signup">
    <div className="login-wrapper">
      <div className="TextForm">
        <input type="text" id="nickname" placeholder="Your nickname" pattern="[A-z| ]+"/>
      </div>
      <div className="TextForm">
        <input type="email" id="email" placeholder="Your email"/>
      </div>  
      <div className="TextForm">
        <input type="password" id="password" placeholder="Your password" pattern="^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).{8,}$"/>
      </div>
      <div className="TextForm">
        <input type="text" id="confirm-password" placeholder="Confirm password"/>
      </div>
      <div id="create-account">
        <input type="button" value="Create an account" className="create-account"/>
      </div>
        <a href="../login" className="login">
       Already have an account? Login
      </a>
    </div>
  </div>
  <Footer />
  <Navbar />
  </>);
}
