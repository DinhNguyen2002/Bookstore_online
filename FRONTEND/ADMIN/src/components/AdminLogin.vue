<template>
  <div>
    <div class="container my-5 py-5 px-5">
      <section class="text-center text-lg-start">
        <div class="card mb-3 bg-light">
          <div class="row g-0 d-flex align-items-center">
            <div class="col-lg-4 d-none d-lg-flex">
              <img
                src="https://maisonoffice.vn/wp-content/uploads/2020/01/business-adventures-cua-john-brooks.jpg"
                alt="Trendy Pants and Shoes"
                class="w-75 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
              />
            </div>
            <div class="col-lg-8">
              <div class="card-body py-5 px-md-5">
                <p class="text-danger">{{ message }}</p>

                <form @submit.prevent="login">
                  <div class="form-floating mb-4">
                    <input
                      placeholder="Username"
                      type="text"
                      id="username"
                      v-model="username"
                      class="form-control "
                    />
                    <label for="username">Username</label>
                  </div>

                  <!-- Password input -->
                  <div class="form-floating mb-4">
                    <input
                      placeholder="Password"
                      type="password"
                      id="password"
                      v-model="password"
                      class="form-control"
                    />
                    <label for="password">Password</label>
                  </div>

                  <div class="form-check mb-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="form2Example31"
                      checked
                    />
                    <label class="form-check-label" for="form2Example31">
                      Remember me
                    </label>
                  </div>

                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <a href="#!" class="text-primary">Forgot password?</a>
                  </div>

                  <!-- Submit button -->
                  <button type="submit" class="btn btn-primary btn-block mb-4">
                    Đăng nhập
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<style>
.rounded-t-5 {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

@media (min-width: 992px) {
  .rounded-tr-lg-0 {
    border-top-right-radius: 0;
  }

  .rounded-bl-lg-5 {
    border-bottom-left-radius: 0.5rem;
  }
}
</style>
<script>
import AdminService from "@/services/admin.service";

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  // computed:{
  //   hasToken() {
  //   if(localStorage.getItem("token") !== null){
  //               this.$router.push('/');

  //   };
  // },
  // },
  methods: {
    async login() {
      try {
        const response = await AdminService.login({
          username: this.username,
          password: this.password,
        });

        // Assuming your API returns a token upon successful login
        const token = response.token;
        const adname = response.admin.name;
        const adminId = response.admin._id;

        // Store the token in local storage or Vuex for later use
        localStorage.setItem("token", token);
        localStorage.setItem("adminId", adminId);
        localStorage.setItem("adname", adname);

        // this.$router.push("/");
        alert("Welcom " + adname);
        window.location.reload();
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("adname");
        localStorage.removeItem("adminId");

        console.error("Login failed:", error);
        this.message = "Login failed. Please check your credentials.";
      }
    },
  },
};
</script>
