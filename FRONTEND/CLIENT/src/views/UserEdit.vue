<template>
  <div v-if="user" class="container py-5">
    <h2 class="text-center">Cập nhật thông tin</h2>

    <UserForm :user="user" @submit:user="updateUser" />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import UserForm from "@/components/RegisterForm.vue";
import UserService from "@/services/user.service";
export default {
  components: {
    UserForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      user: null,
      message: "",
    };
  },

  methods: {
    async getUser(id) {
      try {
        this.user = await UserService.getId(id);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateUser(data) {
      try {
        await UserService.update(this.id, data);
        alert("Tài khoản được cập nhật thành công.");
        this.$router.push({ name: "order" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getUser(this.id);
    this.message = "";
  },
};
</script>
