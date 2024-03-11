import { createWebHistory, createRouter } from "vue-router";
import Admin from "@/views/Homepage.vue";

const routes = [
  {
    path: "/",
    name: "adminpage",
    component: Admin,
  },

  {
    path: "/popular",
    name: "popular",
    component: () => import("@/views/BookHot.vue"),
  },
  {
    path: "/sumary",
    name: "sumary",
    component: () => import("@/views/Sumary.vue"),
  },

  {
    path: "/product/:id",
    name: "product.edit",
    component: () => import("@/views/BookEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/products/add",
    name: "product.add",
    component: () => import("@/views/BookAdd.vue"),
  },

  // + user manager
  {
    path: "/user",
    name: "user.list",
    component: () => import("@/views/UserList.vue"),
  },

  {
    path: "/user/vip",
    name: "user.vip",
    component: () => import("@/views/UserVIP.vue"),
  },

  {
    path: "/user/loyal",
    name: "user.loyal",
    component: () => import("@/views/UserLoyal.vue"),
  },

  {
    path: "/order/new",
    name: "order.new",
    component: () => import("@/views/OrderNew.vue"),
  },
  {
    path: "/order/done",
    name: "order.done",
    component: () => import("@/views/OrderDone.vue"),
  },

  {
    path: "/order/checked",
    name: "order.checked",
    component: () => import("@/views/OrderChecked.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
