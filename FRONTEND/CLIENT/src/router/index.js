import { createWebHistory, createRouter } from "vue-router";
import User from "@/views/Homepage.vue";

const routes = [

  // home user
  {
    path: "/",
    name: "homebook",
    component: User,    
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/UserOrder.vue"),    
  },
  {
    path: '/search/:query',
    name: "search",
    component: () => import("@/views/Search.vue"),
 
  },

  {
    path: "/shop",
    name: "shop",
    component: () => import("@/views/Shop.vue"),    
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/Contact.vue"),    
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),    
  },

  {
    path: "/register",
    name: "user.add",
    component: () => import("@/views/UserAdd.vue"),
  },

  {
    path: "/users/:id",
    name: "user.edit",
    component: () => import("@/views/UserEdit.vue"),
    props: true,
  },


  {
    path: "/login",
    name: "user.login",
    component: () => import("@/views/UserLogin.vue"),
  },
  {
    path: "/detail/:id",
    name: "product.detail",
    component: () => import("@/views/BookDetail.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/carts",
    name: "user.cart",
    component: () => import("@/views/UserCart.vue"),
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
