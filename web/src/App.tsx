import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import './index.scss';
import Personal from "./Pages/Personal";
import Add from "./Pages/AddTitle/index";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/add" element={<Add/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
  );
}

export default App;
