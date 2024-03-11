<script>
export default {
  props: {
    users: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    formatNum(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<template>
  <div class="container mt-4">
    <table class="table table-striped">
      <thead class="table-warning">
        <tr>
          <th scope="col">Tên khách hàng</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Số điện thoại</th>
          <th>Số đơn hàng</th>
          <th>Giá trị khách hàng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.count }}</td>
          <td>{{ formatNum(user.value) }} VND</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
