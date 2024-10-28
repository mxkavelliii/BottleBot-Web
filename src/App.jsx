import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";
import Dashboard from "./Pages/Admin/Dashboard";
// ? FOR TESTING PURPOSES ONLY
import SampleAdminRewardsCrud from "./samples/SampleAdminRewardsCrud";

//Providers
import { AuthProvider } from "./context/AuthProvider";
import { UsersProvider } from "./context/UsersProvider";

//Admin-Pages
import Profile from "./Pages/Admin/Profile";
import Users from "./Pages/Admin/Users";

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/users" element={<Users />} />
          <Route
            path="/samples/rewards/admin"
            element={<SampleAdminRewardsCrud />}
          />
        </Routes>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
