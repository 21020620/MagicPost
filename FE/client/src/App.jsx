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
import TransactionManagerLayout from "./components/TransactionManagerLayout";
import TransactionManagerAccount from "./components/Layout/TransactionManagerAccount";
import TransactionManagerStatistic from "./components/Layout/TransactionManagerStatistic";
import HomeLayout from "./components/HomeLayout";
import ChangePassword from "./components/Layout/ChangePassword";
import RVHome from "./components/Layout/RVHome/RVHome";
import LayoutForSearching from "./components/Layout/RVHome/LayoutForSearching";

export default function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <Routes>
      <Route path="/search" element={<LayoutForSearching />}>
      </Route>

      <Route path="/home" element={<RVHome />}>
      </Route>

      <Route path="/" element={<LoginLayout />}>
        <Route index element={<Login />} />
      </Route>

      <Route path="/CEO" element={<CEOLayout />}>
        <Route index element={<HomeLayout />} />
        <Route path="account" element={<CEOmanagerAccount />} />
        <Route path="statistic" element={<CEOStatistic />} />
        <Route path="transaction" element={<CEOtransaction />} />
        <Route path="gathering" element={<CEOgathering />} />
        <Route path="changePassword" element={<ChangePassword />} />
      </Route>

      <Route path="/Transaction" element={<TransactionManagerLayout />}>
        <Route index element={<HomeLayout />} />
        <Route path="account" element={<TransactionManagerAccount />} />
        <Route path="statistic" element={<TransactionManagerStatistic />} />
      </Route>
    </Routes>
  );
}
