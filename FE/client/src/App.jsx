import "./App.css";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./components/MainPage/Login/Login";
import LoginLayout from "./components/MainPage/Login/LoginLayout";
import { history } from "./hooks/myHistory";
import CEOLayout from "./components/Layout/CEOLayout";
import CEOmanagerAccount from "./components/MainPage/CEO/AccountManage/CEOmanagerAccount";
import CEOStatistic from "./components/MainPage/CEO/Statistic/CEOStatistic";
import CEOtransaction from "./components/MainPage/CEO/PointManage/CEOtransaction";
import CEOcentral from "./components/MainPage/CEO/PointManage/CEOcentral";
import CentralManagerLayout from "./components/Layout/CentralManagerLayout";
import CentralManagerAccount from "./components/MainPage/Central/Manager/Account/CentralManagerAccount";
import CentralManagerStatistic from "./components/MainPage/Central/Manager/Statistic/CentralManagerStatistics";
import TransactionManagerLayout from "./components/Layout/TransactionManagerLayout";
import TransactionManagerAccount from "./components/MainPage/Transaction/Manager/Account/TransactionManagerAccount";
import TransactionManagerStatistic from "./components/MainPage/Transaction/Manager/Statistic/TransactionManagerStatistic";
import TransactionEmployeeLayout from "./components/Layout/TransactionEmployeeLayout";
import CreateOrder from "./components/MainPage/Transaction/Employee/CreateOrder";
import MainPageLayout from "./components/MainPageLayout";
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
        <Route index element={<MainPageLayout />} />
        <Route path="account" element={<CEOmanagerAccount />} />
        <Route path="statistic" element={<CEOStatistic />} />
        <Route path="transaction" element={<CEOtransaction />} />
        <Route path="central" element={<CEOcentral />} />
        <Route path="changePassword" element={<ChangePassword />} />
      </Route>

      <Route path="/Transaction" element={<TransactionManagerLayout />}>
        <Route index element={<MainPageLayout />} />
        <Route path="account" element={<TransactionManagerAccount />} />
        <Route path="statistic" element={<TransactionManagerStatistic />} />
        <Route path="changePassword" element={<ChangePassword />} />
      </Route>

      <Route path="/TE" element={<TransactionEmployeeLayout />}>
        <Route index element={<MainPageLayout />} />
        <Route path="order" element={<CreateOrder />} />
        <Route path="changePassword" element={<ChangePassword />} />
      </Route>

      <Route path="/Central" element={<CentralManagerLayout />}>
        <Route index element={<MainPageLayout />} />
        <Route path="account" element={<CentralManagerAccount />} />
        <Route path="statistic" element={<CentralManagerStatistic />} />
        <Route path="changePassword" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}
