import CreateAccount from "./pages/CreateAccount.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login";
import Poll from "./pages/Poll.vue";
import AddPolls from "./components/AddPolls";
import Header from "./components/Header";
import EditPolls from "./components/EditPolls";

export default [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Login",
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
    path: "/Header",
    name: "Header",
    component: Header,
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
