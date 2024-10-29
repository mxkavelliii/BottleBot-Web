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
import { HistoryProvider } from "./context/HistoryProvider";
import { RewardsProvider } from "./context/RewardsProvider";

//Admin-Pages
import Profile from "./Pages/Admin/Profile";
import Users from "./Pages/Admin/Users";
import History from "./Pages/Admin/History";
import Redeem from "./Pages/Admin/Redeem";

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <HistoryProvider>
          <RewardsProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/profile" element={<Profile />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/history" element={<History />} />
              <Route path="/admin/redeem" element={<Redeem />} />
              <Route
                path="/samples/rewards/admin"
                element={<SampleAdminRewardsCrud />}
              />
            </Routes>
          </RewardsProvider>
        </HistoryProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
