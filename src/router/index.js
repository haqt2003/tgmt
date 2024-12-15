import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import { auth } from "@/configs/firebase";

const requireAuth = (to, from, next) => {
  const user = auth.currentUser;
  const loggedIn = localStorage.getItem("email-kyc");
  if (!user && !loggedIn) next({ name: "login", params: {} });
  else next();
};

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
