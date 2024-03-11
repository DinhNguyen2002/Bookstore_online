<template>
  <div class="container">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            class="card p-4 border-0"
            style="
              border-radius: 1rem;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            "
          >
            <div class="card-body p-2 text-center">
              <h3 class="mb-4">ĐĂNG NHẬP</h3>
              <form @submit.prevent="login">
                <p class="text-danger">{{ message }}</p>
                <div class="mb-4">
                  <input
                    v-model="username"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Username"
                  />
                </div>

                <div class="mb-4">
                  <input
                    v-model="password"
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Password"
                  />
                </div>

                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-start mb-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    v-model="rememberMe"
                  />
                  <label class="form-check-label" for="rememberMe">
                    Remember username
                  </label>
                </div>

                <button
                  class="btn btn-primary btn-lg btn-block mb-3"
                  type="submit"
                >
                  Đăng nhập
                </button>
              </form>
              <hr class="my-4" />

              <!-- Register Button -->
              <router-link :to="{ name: 'user.add' }">
                <button class="btn btn-success btn-lg btn-block">
                  Đăng ký
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
      rememberMe: false,
    };
  },
  methods: {
    async login() {      
      try {
        const response = await UserService.login({
          username: this.username,
          password: this.password,
        });

        const token = response.token;
        const fullname = response.user.name;
        const userId = response.user._id;

        localStorage.setItem("token", token);
        localStorage.setItem("username", fullname);
        localStorage.setItem("userId", userId);
        await this.$router.push("/");

        window.location.reload(); // Replace with your actual token handling

        //this.message = 'ok.' + userId;
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

        this.message = "Username hoặc mật khẩu không hợp lệ!";
      }
    },
  },
};
</script>
