<template>
  <div class="row px-5">
    <div class="col-md-4 mb-4" v-for="product in products" :key="product._id">
      <div class="d-flex h-100">
        <div class="card">
          <img
            :src="'http://localhost:3000/' + product.image"
            class="card-img-top"
            :alt="product.name"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <h5 class="card-subtitle mb-2 text-danger h5">{{ formatNum(product.price) }}đ</h5>
            <p class="card-text">
              <strong>Mô tả:</strong> {{ LimitLenght(product.detail, 100) }}
            </p>
          </div>

          <div class="card-footer d-flex justify-content-between">
            <router-link
              :to="{ name: 'product.detail', params: { id: product._id } }"
            >
              <a class="nav-link">Xem chi tiết</a></router-link
            >
            <button class="btn btn-danger" @click="addToCart(product._id)">
              <i class="fa-solid fa-cart-shopping"></i>            
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "@/services/cart.service";

export default {
  props: {
    products: { type: Array, default: [] },
  },
  methods: {
    formatNum(number) {
      number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return number;
    },
    LimitLenght(description, maxLength) {
      if (description.length > maxLength) {
        const lastSpaceIndex = description.lastIndexOf(" ", maxLength);

        const truncatedText =
          lastSpaceIndex !== -1
            ? description.substring(0, lastSpaceIndex)
            : description.substring(0, maxLength);

        return truncatedText + "...";
      } else {
        return description;
      }
    },
    async addToCart(id) {
      if (!localStorage.getItem("userId")) {
        if (confirm("Vui lòng đăng nhập!")) {
          this.$router.push("/login");
        }
      }
      try {
        const userId = localStorage.getItem("userId");
        await CartService.create({
          userId: userId,
          productId: id,
        });
        alert("Đã thêm vào giỏ hàng.");
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },

    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #dee2e6;
  border-radius: 6px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.card-subtitle {
  font-size: 1rem;
}

.card-text {
  font-size: 0.9rem;
}
</style>
