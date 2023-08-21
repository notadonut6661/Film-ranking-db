import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Personal from "./Pages/Personal";
import Add from "./Pages/AddTitle/index";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Search from "Pages/Search";
import './index.scss';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/search/*" element={<Search />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
