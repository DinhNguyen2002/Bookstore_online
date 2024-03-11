<script>
import ProductModal from "./ProductModal.vue";

export default {
  components: {
    ProductModal,
  },
  props: {
    products: { type: Array, default: [] },
  },
  emits: ["update:activeIndex", "delete:activeIndex"],

  methods: {
    deleteProduct(id) {
      this.$emit("delete:activeIndex", id);
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="py-2 h5">
      Số lượng các tác phẩm: <strong>{{ products.length }}</strong>
    </div>
    <table class="table table-striped table-bordered">
      <thead class="text-center table-success">
        <tr>
          <th>Tên tác phẩm</th>
          <th>Tác giả</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(product, index, sum) in products"
          :key="product._id"
          :sum="sum + 1"
          :class="{ active: index === activeIndex }">
          <td data-bs-toggle="modal" :data-bs-target="'#modal_' + product._id">
            <strong class="text-decoration-underline text-primary">
              {{ product.name }}</strong>

            <ProductModal 
            @delete:activeIndex="deleteProduct"
            :product="product" />
          </td>
          <td>{{ product.author }}</td>

          <td>
            <router-link
              :to="{ name: 'product.edit', params: { id: product._id } }">
              <button class="btn btn-primary">
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
            </router-link>
          </td>
          <td>
            <button @click="deleteProduct(product._id)" class="btn btn-danger">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import "@/assets/styles.css";
</style>
