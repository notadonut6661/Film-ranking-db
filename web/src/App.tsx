import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import './index.scss';
import Personal from "./Pages/Personal";
import Add from "./Pages/AddTitle/index";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/add" element={<Add/>} />
    </Routes>
  );
}

export default App;
