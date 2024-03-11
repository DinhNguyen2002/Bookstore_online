<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <div class="container">
      <a href="/">
        <img src="@/assets/img/logo.png" alt="Logo" class="logo" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              :to="{ name: 'homebook' }"
              :class="{ active: isActiveTab === 'home' }"
              @click="setActiveTab('home')"
              class="nav-link text-white"
              >Trang chủ
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'shop' }" class="nav-link text-white"
              >Sách
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'contact' }" class="nav-link text-white"
              >Liên hệ
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'about' }" class="nav-link text-white"
              >Giới thiệu
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto mr-5">
          <li>
            <div class="input-group ">
              <input
                v-model="searchText"
                class="form-control mr-1"
                type="text"
                placeholder="Tìm kiếm..."
                aria-label="Tìm kiếm..."
                aria-describedby="btnNavbarSearch"
                @keyup.enter="Search()"
              />            
                <button @click="Search()" class="btn text-white  bg-primary rounded mr-2">
                  <i class="fas fa-search"></i>
                </button>
              </div>
          </li>
          <li v-if="hasToken" class="mx-1">
            <router-link
              :to="{ name: 'user.cart' }"
              class="nav-link text-white btn btn-outline-warning"
            >
              <i class="fa-solid fa-cart-shopping"></i>
              <span
                class="badge bg-danger text-white ms-1 rounded-pill cart-count"
                >{{ cartCount }}</span
              >
            </router-link>
          </li>
          <li v-if="hasToken">
            <div class="dropdown">
              <a
                class="btn btn-primary dropdown-toggle user-dropdown"
                type="button"
                id="userDrop"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ getUsername }}
              </a>
              <div class="dropdown-menu" aria-labelledby="userDrop">
                <router-link :to="{ name: 'order' }" class="dropdown-item"
                  >Hóa đơn
                </router-link>

                <a class="dropdown-item" @click="logout">Đăng xuất</a>
              </div>
            </div>
          </li>

          <li v-else class="nav-item">
            <router-link
              :to="{ name: 'user.login' }"
              class="nav-link text-white"
              >Đăng nhập
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import CartService from "@/services/cart.service";
import UserService from "@/services/user.service";

export default {
  computed: {
    getuserId() {
      return localStorage.getItem("userId");
    },
    hasToken() {
      return localStorage.getItem("token") !== null;
    },
    getUsername() {
      return localStorage.getItem("username");
    },
  },
  data() {
    return {
      isActive: "home",
      cartCount: 0,
      searchText: "",
    };
  },
  methods: {
    Search(){
      this.$router.push({
        name: 'search',
       params:{
        query: this.searchText}
    });
    this.searchText = "";
    },
    setActiveTab(tab) {
      this.isActiveTab = tab;
    },
    async count() {
      if (!localStorage.getItem("userId")) {
        this.cartCount = 0;
      }
      try {
        const response = await CartService.count({
          userId: this.getuserId,
        });
        this.cartCount = response.count;
      } catch (error) {
        console.log(error);
      }
    },
    startCountInterval() {
      setInterval(this.count, 2000);
    },

    async logout() {
      const log = await UserService.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      this.$router.push("/"); // Replace with your routing method

      await this.$router.push("/");
      window.location.reload(); // Replace with your actual token handling
      // Replace with your routing method
    },
  },

  created() {
    this.count(); // Initial count
    this.startCountInterval(); // Start the interval
  },
};
</script>

<style scoped>
.logo {
  max-width: 100px;
  max-height: 100px;
}

.navbar-toggler-icon {
  color: white;
}

.nav-link {
  color: white;
  font-weight: bold;
}

.nav-link.active {
  background-color: blue;
  color: white;
  border: 1px solid blue;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: blue;
  color: white;
  border-radius: 5px;
}

.navbar-toggler {
  border: none;
}

.user-dropdown {
  background-color: transparent;
  border: none;
  color: white;
}

.cart-count {
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 50%;
  font-weight: bold;
}
</style>
