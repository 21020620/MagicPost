import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import LoginLayout from "./components/LoginLayout";
import ForgottenPassword from "./components/ForgetPassword";
import { history } from "./hooks/myHistory";

export default function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route index element={<Login />} />
          <Route path="forgotten-password" element={<ForgottenPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route path="/rv/" element={<AdminLayout />}>
          <Route index element={<RVHome />} />
          <Route path="centre-management" element={<CentreManagement />} />
          <Route
            path="registration-management"
            element={<RegistrationManagement />}
          />
          <Route
            path="registry-management"
            element={<RVRegistryManagement />}
          />
          <Route path="statistic" element={<RVStatistic />} />
          <Route path="car-management" element={<RVCarManagement />} />
          <Route path="forecast" element={<RVForecast />} />
          <Route path="car/:id" element={<CarById />} />
          <Route path="owner/:id" element={<OwnerById />} />
          <Route path="registry/:id" element={<RegistryById />} />
          <Route path="register/:id" element={<RegisterById />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="/centre/" element={<CenLayout />}>
          <Route index element={<RVHome />} />
          <Route path="registries" element={<RegistryListPage />} />
          <Route path="registry-management" element={<RegistryManagement />} />
          <Route path="statistic" element={<CentreStatistic />} />
          <Route path="car-management" element={<CarManagement />} />
          <Route path="forecast" element={<CentreForecast />} />
          <Route path="owner/:id" element={<OwnerById />} />
          <Route path="registry/:id" element={<RegistryById />} />
          <Route path="register/:id" element={<RegisterById />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="car/:id" element={<CarById />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
