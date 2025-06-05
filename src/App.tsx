import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";

import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas por login */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute role="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route element={<RoleRoute role="user" />}>
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
