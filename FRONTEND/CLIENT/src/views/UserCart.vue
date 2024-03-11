<script>
import CartService from "@/services/cart.service";

export default {
  computed: {
    hasToken() {
      return localStorage.getItem("token") !== null;
    },
    getuserId() {
      return localStorage.getItem("userId");
    },
    cartTotal() {
      return this.carts.reduce(
        (total, cart) => total + this.getCartTotal(cart),
        0
      );
    },
  },
  data() {
    return {
      message: "",
      carts: [],
      userId: "",
      isUpdateActive: false,
    };
  },

  methods: {
    check() {
      if (!this.hasToken) {
        this.$router.push({ name: "notfound" });
      }
    },

    formatNum(number) {
      number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return number;
    },
    async retrieveCarts() {
      try {
        this.userId = this.getuserId;

        this.carts = await CartService.getAll({ userId: this.userId });
      } catch (error) {
        console.log(error);
      }
    },
    async checkout() {
      if (this.carts.length === 0) {
        alert("Không có hàng trong giỏ!");
      } else {
        this.userId = this.getuserId;
        try {
          await CartService.checkOut({ userId: this.userId });
          this.refreshList();
          alert("Đã đặt hàng thành công");
        } catch (error) {
          console.error("Error during checkout:", error);
        }
      }
    },
    refreshList() {
      this.retrieveCarts();
    },
    async removeCart(cartId) {
      if (confirm("Xoá khỏi giỏ hàng ?")) {
        try {
          await CartService.delete(cartId);
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async updateCart(index, cartId) {
      try {
        await CartService.update(cartId, { count: this.carts[index].count });
        this.refreshList();
        alert("Cập nhật thành công.");
        this.isUpdateActive = false;
      } catch (error) {
        console.log(error);
      }
    },

    getCartTotal(cart) {
      return cart.product.price * cart.count;
    },

    updateItemCount(index, action) {
      if (action === "decrease" && this.carts[index].count > 1) {
        this.carts[index].count--;
      } else if (action === "increase") {
        this.carts[index].count++;
      }
      this.isUpdateActive = true;
    },
  },
  mounted() {
    this.check();
    this.refreshList();
  },
};
</script>
<template>
  <div class="container cart my-3">
    <h1 class="mb-2">Giỏ hàng</h1>
    <div class="card mb-3" v-for="(cart, index) in carts" :key="cart._id">
      <div class="row no-gutters">
        <div class="col-md-3">
          <img
            :src="'http://localhost:3000/' + cart.product.image"
            alt="Product Image"
            class="img-fluid product-image pt-3"
          />
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h3 class="card-title">{{ cart.product.name }}</h3>
            <p class="card-text">
              <strong>Giá:</strong> {{ formatNum(cart.product.price) }}đ
            </p>
            <div class="count-control">
              <button
                @click="updateItemCount(index, 'decrease')"
                class="btn btn-primary btn-sm"
              >
                -
              </button>
              <span class="count">{{ cart.count }}</span>
              <button
                @click="updateItemCount(index, 'increase')"
                class="btn btn-primary btn-sm"
              >
                +
              </button>
            </div>
            <p class="card-text pt-2 product-total">
              Tổng: {{ formatNum(getCartTotal(cart)) }}đ
            </p>
            <button @click="removeCart(cart._id)" class="btn btn-danger">
              <i class="fa-regular fa-trash-can"></i>
            </button>
            <button
              @click="updateCart(index, cart._id)"
              :disabled="!isUpdateActive"
              class="mx-5 btn btn-primary"
            >
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-summary">
      <p class="total-text">Tổng tiền: {{ formatNum(cartTotal) }}đ</p>
      <button class="btn btn-primary checkout-btn" @click="checkout()">
        Đặt hàng
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-image {
  height: 150px;
}

.count-control {
  display: flex;
  align-items: center;
}

.count {
  font-size: 18px;
  margin: 0 10px;
}

.product-total {
  font-size: 18px;
  font-weight: bold;
}

.total-text {
  font-size: 18px;
  font-weight: bold;
}

.checkout-btn {
  font-size: 18px;
}
</style>
