<template>
  <div class="container">
    <h4 class="text-center bg-info py-5">Doanh thu các tháng</h4>
    <div class="mb-3 w-25">
      <label for="yearSelect" class="form-label h5">Chọn năm:</label>
      <select
        v-model="selectedYear"
        @change="onYearChange"
        id="yearSelect"
        class="form-select"
      >
        <option v-for="year in availableYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <div v-if="datas && datas.length > 0">
      <table class="table">
        <thead class="text-center table-dark">
          <tr>
            <th scope="col">Tháng</th>
            <th scope="col">Đã bán</th>
            <th scope="col">Doanh thu</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            v-for="data in datas"
            :key="data._id"
            :class="{
              'table-success': data.total > 400000000,
              'table-warning':
                data.total > 300000000 && data.total <= 400000000, // Example: yellow for 3 to 5 orders
              'table-danger': data.total <= 300000000, // Example: red for 2 or fewer orders
            }"
          >
            <td>{{ data.month }}</td>
            <td>{{ data.number }}</td>
            <td>{{ formatNum(data.total) }} VND</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p class="text-center">No data available.</p>
    </div>
  </div>
</template>
<script>
import AdminService from "@/services/admin.service";

export default {
  data() {
    return {
      datas: [],
      selectedYear: 2023,
    };
  },
  computed: {
    availableYears() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, index) => currentYear - index);
    },
  },

  methods: {
    formatNum(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async getData(year) {
      try {
        this.datas = await AdminService.sumary({ year: year });
        this.datas.sort((a, b) => a.month - b.month);
      } catch (error) {
        console.error(error);
      }
    },
    onYearChange() {
      this.getData(this.selectedYear);
    },
  },

  mounted() {
    this.getData(this.selectedYear);
  },
};
</script>
