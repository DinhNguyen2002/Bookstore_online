<template>
  <div class="container py-5">  
    <h2 class="text-center">ĐĂNG KÝ</h2>

    <UserForm
      :user="user"
      @submit:user="addUser"
    />
  </div>
</template>
<script>
import UserForm from "@/components/RegisterForm.vue";
import UserService from "@/services/user.service";
export default {
  components: {
    UserForm,
  },  
  data() {
    return {
      user: {},
    };
  },
  methods: {   
    async addUser(data) {
      try {
        await UserService.create(data);
        alert ("Đăng ký thành công.");
      } catch (error) {
        console.log(error);
      }
    },    
  },  
};
</script>
