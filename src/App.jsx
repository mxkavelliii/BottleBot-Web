import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";
// ? FOR TESTING PURPOSES ONLY
import SampleAdminRewardsCrud from "./samples/SampleAdminRewardsCrud";

//Providers
import { AuthProvider } from "./context/AuthProvider";
import { UsersProvider } from "./context/UsersProvider";
import { HistoryProvider } from "./context/HistoryProvider";
import { RewardsProvider } from "./context/RewardsProvider";

//Admin-Pages
import AdminProfile from "./Pages/Admin/Profile";
import AdminUsers from "./Pages/Admin/Users";
import AdminHistory from "./Pages/Admin/History";
import AdminRedeem from "./Pages/Admin/Redeem";
import AdminDashboard from "./Pages/Admin/Dashboard";

//Staff-Pages
import StaffDashboard from "./Pages/Staff/Dashboard";
import StaffUsers from "./Pages/Staff/Users";
import StaffHistory from "./Pages/Staff/History";
import StaffRedeem from "./Pages/Staff/Redeem";
import StaffProfile from "./Pages/Staff/Profile";

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <HistoryProvider>
          <RewardsProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />

              {/* admin */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/history" element={<AdminHistory />} />
              <Route path="/admin/redeem" element={<AdminRedeem />} />

              {/* staff */}
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/staff/profile" element={<StaffProfile />} />
              <Route path="/staff/users" element={<StaffUsers />} />
              <Route path="/staff/history" element={<StaffHistory />} />
              <Route path="/staff/redeem" element={<StaffRedeem />} />

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
