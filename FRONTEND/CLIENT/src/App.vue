<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<style scoped>
#app {
  background-color: #f0f0f0;
}
</style>
