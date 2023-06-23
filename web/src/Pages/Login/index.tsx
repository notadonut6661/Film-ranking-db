import { useRef, useState } from "react";
import "./style.scss";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import config from "data/Json/config.json";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitButton: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

  const submitClickHandler = () => {
    if (document.querySelectorAll("#email:invalid").length > 0 ) {
      submitButton.current?.classList.add("invalid-inputs");
      return;
    }

    submitButton.current?.classList.add("pending-response");

    fetch(`${config.server_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        submitButton.current?.classList.remove("pending-response");
        return res.json();
      })
      .then((val) => {
        if (val?.isAuthorized) {
          localStorage.setItem("id", val?.id);
          localStorage.setItem("hash", val?.hash);
          window.location.replace('../');

          return;
        }
        submitButton.current?.classList.add("invalid-inputs");
      })
      .catch(() => {
        submitButton.current?.classList.remove("pending-response");
        submitButton.current?.classList.add("unsuccessful-request");

        setTimeout(() => {
          submitButton.current?.classList.remove("unsuccessful-request");
        }, config.default_annotation_fade_out_delay);
      });
  };

  return (
    <>
      <div className="body" id="login">
        <div className="login-wrapper">
          <div className="TextForm">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="TextForm">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div id="submit">
            <input
              type="button"
              onClick={submitClickHandler}
              ref={submitButton}
              value="Submit"
            />
          </div>
          <a href="../signup" className="signup">
            Don't have an account yet? Signup
          </a>
        </div>
      </div>
      <Footer />
      <Navbar />
    </>
  );
}
