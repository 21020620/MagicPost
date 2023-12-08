import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import LoginLayout from "./components/Layout/LoginLayout";
import ForgottenPassword from "./components/ForgetPassword";
import { history } from "./hooks/myHistory";
import CEOLayout from "./components/Layout/CEOLayout";
import CEOmanagerAccount from "./components/Layout/CEOmanagerAccount";
import CEOStatistic from "./components/Layout/CEOStatistic";
import CEOtransaction from "./components/Layout/CEOtransaction";
import CEOgathering from "./components/Layout/CEOgathering";
import HomeLayout from "./components/HomeLayout";

export default function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/CEO" element={<CEOLayout />}>
          <Route index element={<HomeLayout />} />
          <Route path="account" element={<CEOmanagerAccount />} />
          <Route path="statistic" element={<CEOStatistic />} />
          <Route path="transaction" element={<CEOtransaction />} />
          <Route path="gathering" element={<CEOgathering />} />
        </Route>
      </Routes>
  );
}
