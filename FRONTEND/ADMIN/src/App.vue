<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import AppLogin from "./components/AdminLogin.vue";
import AppSideNav from "./components/AppSideNav.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    AppLogin,
    AppSideNav,
  },
  computed: {
    hasToken() {
      return localStorage.getItem("token") !== null;
    },
  },
  
};
</script>
<template>
  <div id="app">
    <div v-if="hasToken">
      <AppHeader />
      <div id="layoutSidenav">
        <AppSideNav />
        <div id="layoutSidenav_content">
          <router-view />
        </div>
      </div>
      <AppFooter />
    </div>
    <div v-else>
      <AppLogin />
    </div>
  </div>
</template>
<style scoped>
body {
  margin: 0px;
}
</style>
