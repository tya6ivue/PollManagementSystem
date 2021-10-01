import SignUp from "./pages/SignUp.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login";
import Poll from "./pages/Poll.vue";
import AddPolls from "./components/AddPolls";
import Header from "./components/Header";
import EditPolls from "./components/EditPolls";
import Vote from "./pages/Vote";

function guardMyroute(to, from, next) {
  let LoginDatacreD = localStorage.getItem("SetData");
  if (LoginDatacreD) {
    if (
      to.fullPath == "/" ||
      to.fullPath == "/Poll" ||
      to.fullPath === "/Home" ||
      to.fullPath === "/EditPolls" ||
      to.fullPath === "/Vote"
    ) {
      next();
    } else {
      next("/");
    }
  } else {
    if (to.fullPath == "/SignUp") {
      next();
    } else {
      next("/"); // go to '/login';
    }
  }
}

function isLoggedInOrNot(to, from, next) {
  let LocalStrData = localStorage.getItem("SetData");
  if (LocalStrData) {
    if (to.fullPath == "/" || to.fullPath == "/SignUp") {
      next(); // allow to enter login page
    } else {
      next("/SignUp");
    }
  } else {
    if (to.fullPath == "/" || to.fullPath == "/SignUp") {
      next();
    }
  }
}

export default [
  {
    path: "/Home",
    name: "Home",
    component: Home,
    beforeEnter: guardMyroute,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: isLoggedInOrNot,
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
    beforeEnter: isLoggedInOrNot,
  },
  {
    path: "/AddPolls",
    name: "AddPolls",
    component: AddPolls,
    beforeEnter: guardMyroute,
  },
  {
    path: "/Poll",
    name: "Poll",
    component: Poll,
    beforeEnter: guardMyroute,
  },
  {
    path: "/Vote",
    name: "Vote",
    component: Vote,
    beforeEnter: guardMyroute,
  },
  {
    path: "/Header",
    name: "Header",
    component: Header,
    beforeEnter: guardMyroute,
  },
  {
    path: "/EditPolls",
    name: "EditPolls",
    component: EditPolls,
    beforeEnter: guardMyroute,
  },
  { path: "/:catchAll(.*)", beforeEnter: guardMyroute, component: Login },
];
