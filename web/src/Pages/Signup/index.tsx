import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./style.scss";

export default function Signup(): JSX.Element {
  const nickname: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const email: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const confirmPassword: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [nicknameVal, setNicknameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [confirmPasswordVal, setConfirmPasswordVal] = useState("");

  useEffect(() => {
    if (nicknameVal.length === 0) {
      nickname.current?.classList.add("empty");
      return;
    }

    nickname.current?.classList.remove("empty");
  }, [nicknameVal]);

  useEffect(() => {
    console.log(passwordVal);
    
    if (passwordVal !== confirmPasswordVal) {
      confirmPassword.current?.classList.remove("match-password");
      return;
    }

    confirmPassword.current?.classList.add("match-password");
  }, [passwordVal, confirmPasswordVal]);

  return (
    <>
      <div className="body" id="signup">
        <div className="signup-wrapper">
          <div className="TextForm">
            <input
              type="text"
              id="nickname"
              placeholder="Your nickname"
              value={nicknameVal}
              onChange={({ target }) => setNicknameVal(target.value)}
              pattern="^[A-z]+ [A-z]+$"
              ref={nickname}
            />
          </div>
          <div className="TextForm">
            <input type="email" id="email" placeholder="Your email" />
          </div>
          <div className="TextForm">
            <input
              type="password"
              id="password"
              placeholder="Your password"
              pattern="^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).{8,}$"
              value={passwordVal}
              onChange={({target}) => setPasswordVal(target.value)}
            />
          </div>
          <div className="TextForm">
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm password"
              ref={confirmPassword}
              value={confirmPasswordVal}
              onChange={({ target }) => setConfirmPasswordVal(target.value)}
              className="match-password"
            />
          </div>
          <div id="create-account">
            <input
              type="button"
              value="Create an account"
              className="create-account"
            />
          </div>
          <a href="../login" className="login">
            Already have an account? Login
          </a>
        </div>
      </div>
      <Footer />
      <Navbar />
    </>
  );
}
