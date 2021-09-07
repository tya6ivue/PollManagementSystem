// import AddUsers from './pages/AddUsers.vue'
import CreateAccount from "./pages/CreateAccount.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login";
import AddPolls from "./components/AddPolls";

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
];
