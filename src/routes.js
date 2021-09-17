import CreateAccount from "./pages/CreateAccount.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login";
import Poll from "./pages/Poll.vue";
import AddPolls from "./components/AddPolls";
import Header from "./components/Header";
import EditPolls from "./components/EditPolls";
import Vote from './pages/Vote'

export default [
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/CreateAccount",
    name: "CreateAccount",
    component: CreateAccount,
  },
  {
    path: "/AddPolls",
    name: "AddPolls",
    component: AddPolls,
  },
  {
    path: "/Poll",
    name: "Poll",
    component: Poll,
  },
  {
    path: "/Vote",
    name: "Vote",
    component: Vote,
  },
  {
    path: "/Header",
    name: "Header",
    component: Header,
  },
  {
    path: "/EditPolls",
    name: "EditPolls",
    component: EditPolls,
  },
];
