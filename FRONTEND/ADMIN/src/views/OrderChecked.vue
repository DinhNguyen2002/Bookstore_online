<template>
  <div class="container">
    <h4 class="text-center bg-info py-5">Đơn đã duyệt</h4>
    <div class="container mt-4">
      <table
        v-if="orders.length != 0"
        class="table table-striped table-bordered"
      >
        <thead>
          <tr>
            <th>Ngày đặt</th>
            <th>Ngày nhận hàng</th>
            <th>Địa chỉ</th>
            <th>Tên khách hàng</th>
            <th>Số điện thoại</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td>{{ formatTime(order.time) }}</td>
            <td>{{ formatTime(order.timeOut) }}</td>
            <td>{{ order.user.address }}</td>
            <td>{{ order.user.name }}</td>
            <td>{{ order.user.phone }}</td>
            <td><p class="text-danger">Đã duyệt</p></td>
            <td>
              <button @click="Check(order._id)" class="btn btn-danger">
                Đã nhận hàng
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else>Không có đơn hàng mới</div>
    </div>
  </div>
</template>

<script>
import OrderService from "@/services/order.service";

export default {
  data() {
    return {
      orders: [],
      name: "",
    };
  },
  methods: {
    async Check(id) {
      const ad = localStorage.getItem("adminId");
      try {
        await OrderService.update(id, {
          adminId: ad,
          status: 2,
        });
        alert("Đơn đã giao");
        this.resetOrders();
      } catch (error) {
        console.log(error);
      }
    },

    formatNum(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatTime(time) {
      var dateObj = new Date(time);
      return dateObj.toLocaleString();
    },
    async showOrders() {
      try {
        this.orders = await OrderService.getCheck();
        this.orders.sort((a, b) => a.time - b.time);

      } catch (error) {
        console.log(error);
      }
    },
    async resetOrders() {
      try {
        this.orders = await OrderService.getCheck();
        this.orders.sort((a, b) => a._id - b._id);

      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.showOrders();
  },
};
</script>
