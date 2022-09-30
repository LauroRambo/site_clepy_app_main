import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import AdminPanel from "../views/AdminPanel.vue";
import Profile from "../views/Profile.vue";
import SetAdmin from "../views/SetAdmin.vue";
import RegisterProduct from "../views/RegisterProduct.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
    },
  },
  {
    path: "/admin-panel",
    name: "AdminPanel",
    component: AdminPanel,
    meta: {
      title: "Admin Panel",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/set-admin",
    name: "SetAdmin",
    component: SetAdmin,
    meta: {
      title: 'Set Admin',
    }
  },
  {
    path: "/register-product",
    name: "RegisterProduct",
    component: RegisterProduct,
    meta: {
      title: 'Register Product',
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
