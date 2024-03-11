<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <h2>Thông tin khách hàng</h2>
        <div class="card bg-light p-4 rounded">
          <div v-if="user" class="card-body">
            <p class="mb-0 h4"><strong>Họ và tên: </strong> {{ user.name }}</p>
            <p class="mb-0 h4">
              <strong>Số điện thoại: </strong> {{ user.phone }}
            </p>
            <p class="mb-0 h4"><strong>Địa chỉ: </strong> {{ user.address }}</p>
          </div>
        </div>
        <router-link
          v-if="userId"
          :to="{
            name: 'user.edit',
            params: { id: userId },
          }"
        >
          <button class="h4 btn btn-warning">
            <h5>
              <i class="fa-regular fa-pen-to-square"></i> Cập nhật thông tin
            </h5>
          </button>
        </router-link>
      </div>
      <div class="col-12 mt-4">
        <h2>Lịch sử mua hàng</h2>
        <ul class="list-unstyled">
          <li v-for="order in orders" :key="order.id" class="mb-4">
            <div class="card bg-light p-4 rounded">
              <div class="card-body">
                <h4 class="mb-3">Ngày đặt: {{ formatime(order.time) }}</h4>
                <ul class="list-group">
                  <li
                    v-for="detail in order.data"
                    :key="detail.detailId"
                    class="list-group-item"
                  >
                    <div class="row">
                      <div class="col-md-3">
                        <p class="mb-0 h5">
                          <strong>Tác phẩm </strong> <br />
                          {{ detail.product.name }}
                        </p>
                      </div>
                      <div class="col-md-3">
                        <p class="mb-0 h5">
                          <strong>Giá: </strong> <br />
                          {{ formatNum(detail.cost) }}đ
                        </p>
                      </div>
                      <div class="col-md-3">
                        <p class="mb-0 h5">
                          <strong>Số lượng</strong> <br />
                          x{{ detail.count }}
                        </p>
                      </div>
                      <div class="col-md-3">
                        <p class="mb-0 h5">
                          <strong>Tổng:</strong> <br />
                          {{ formatNum(detail.cost * detail.count) }}đ
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>

                <p class="mt-3 h4">
                  <strong>Tổng tiền:</strong>
                  {{ formatNum(calculateTotalCost(order.data)) }}đ
                </p>
                <p class="mt-3 h4">
                  <strong>Trạng thái đơn hàng:</strong>
                  {{ getStatus(order.status) }}
                </p>
                <button
                  v-if="order.status == 0"
                  @click="Cancel(order._id)"
                  class="btn btn-danger"
                >
                  Hủy đơn
                </button>
              </div>
            </div>
          </li>
        </ul>
        <p class="mt-4 h3">
          <strong>Giá trị mua hàng:</strong> {{ calculateSumTotal(orders) }} đ
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from "@/services/order.service";
import UserService from "@/services/user.service";

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
      user: null,
      userId: "",
      orders: [],
      carts: [],
    };
  },
  mounted() {
    this.userId = this.getuserId;
    this.getProfile();

    this.fetchUserOrders();
  },

  methods: {
    check() {
      if (!this.hasToken) {
        this.$router.push({ name: "notfound" });
      }
    },

    formatNum(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatime(time) {
      var dateObj = new Date(time);
      return dateObj.toLocaleString();
    },

    async fetchUserOrders() {
      try {
        const response = await OrderService.getAll({ userId: this.userId });
        this.orders = response;
      } catch (error) {
        console.error(" failed:", error);
      }
    },
    async getProfile() {
      try {
        this.user = await UserService.getId(this.userId);
      } catch (error) {
        console.error(" failed:", error);
      }
    },
    async Cancel(id) {
      if (confirm("Xác nhận hủy đơn ?")) {
        try {
          await OrderService.delete(id);
        } catch (error) {
          console.log(error);
        }
      }
      this.fetchUserOrders();
    },

    getStatus(status) {
      if (status == 0) {
        const name = "Chưa duyệt";
        return name;
      }
      if (status == 1) {
        const name = "Đang giao hàng";
        return name;
      }
      if (status == 2) {
        const name = "Đã nhận hàng";
        return name;
      }
    },

    calculateTotalCost(details) {
      let totalCost = 0;
      details.forEach((detail) => {
        totalCost += detail.cost * detail.count;
      });
      return totalCost;
    },
    calculateSumTotal(orders) {
      let sumTotal = 0;
      orders.forEach((order) => {
        sumTotal += this.calculateTotalCost(order.data);
      });
      return this.formatNum(sumTotal);
    },
    getCartTotal(cart) {
      // Add logic here to calculate the total for a single cart
      // Example:
      let total = 0;
      cart.items.forEach((item) => {
        total += item.price * item.quantity;
      });
      return this.formatNum(total);
    },
  },
  created() {
    this.check();
  },
};
</script>
