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
import EditProduct from "../views/EditProduct.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
      requiresAuth: false,
    },
  },
  {
    path: "/admin-panel",
    name: "AdminPanel",
    component: AdminPanel,
    meta: {
      title: "Admin Panel",
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/set-admin",
    name: "SetAdmin",
    component: SetAdmin,
    meta: {
      title: 'Set Admin',
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: "/register-product",
    name: "RegisterProduct",
    component: RegisterProduct,
    meta: {
      title: 'Register Product',
      requiresAuth: true,
    }
  },
  {
    path: "/edit-product",
    name: "EditProduct",
    component: EditProduct,
    meta: {
      title: 'EditProduct',
      requiresAuth: true,
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) =>{
  let user = firebase.auth().currentUser;
  let admin = null;
  if (user) {
    let token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }
  if (to.matched.some((res) => res.meta.requiresAuth)){
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)){
        if (admin) {
          return next();
        }
        return next({name: "Home"});
      }
      return next();
    } 
    return next({name: "Home"});
  } 
  return next();
});

export default router;
