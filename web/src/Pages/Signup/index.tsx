import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import './style.scss';

export default function Signup(): JSX.Element {
  const nickname:  React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [nicknameVal, setNicknameVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [confrimPasswordVal, setConfirmPasswordVal] = useState('');


  useEffect(() => {
    if(nicknameVal.length === 0) {
      nickname.current?.classList.add('empty');
      return;  
    }

    nickname.current?.classList.remove('empty');
  }, [nicknameVal])

  return (<>
  <div className="body" id="signup">
    <div className="signup-wrapper">
      <div className="TextForm">
        <input type="text" id="nickname" placeholder="Your nickname" value={nicknameVal} 
            onChange={({target}) => setNicknameVal(target.value)} pattern="^[A-z]+ [A-z]+$" ref={nickname}/>
      </div>
      <div className="TextForm">
        <input type="email" id="email" placeholder="Your email"/>
      </div>  
      <div className="TextForm">
        <input type="password" id="password" placeholder="Your password" pattern="^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).{8,}$"/>
      </div>
      <div className="TextForm">
        <input type="password" id="confirm-password" placeholder="Confirm password"/>
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
