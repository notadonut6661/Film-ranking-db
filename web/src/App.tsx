import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import './index.scss';
import Personal from "./Pages/Personal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/personal" element={<Personal />} />
    </Routes>
  );
}

export default App;
