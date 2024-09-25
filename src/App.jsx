import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
// ? FOR TESTING PURPOSES ONLY
import SampleAdminRewardsCrud from "./samples/SampleAdminRewardsCrud";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/samples/rewards/admin"
        element={<SampleAdminRewardsCrud />}
      />
    </Routes>
  );
}

export default App;
