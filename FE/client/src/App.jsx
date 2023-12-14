import "./App.css";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import LoginLayout from "./components/Layout/LoginLayout";
import { history } from "./hooks/myHistory";
import CEOLayout from "./components/Layout/CEOLayout";
import CEOmanagerAccount from "./components/Layout/CEOmanagerAccount";
import CEOStatistic from "./components/Layout/CEOStatistic";
import CEOtransaction from "./components/Layout/CEOtransaction";
import CEOgathering from "./components/Layout/CEOgathering";
import HomeLayout from "./components/HomeLayout";
import TransactionManagerLayout from "./components/TransactionManagerLayout";
import TransactionmanagerAccount from "./components/Layout/TransactionAccountManage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
localStorage.getItem('token') ? localStorage.removeItem('token') : null;
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";

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

      <Route path="/Transaction" element={<TransactionManagerLayout />}>
        <Route index element={<HomeLayout />} />
        <Route path="account" element={<TransactionmanagerAccount />} />
      </Route>
    </Routes>
  );
}
