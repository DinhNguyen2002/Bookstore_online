<template>
  <div class="container">
    <div class="row">
      <div
        class="col border border-white rounded bg-white my-3 pt-3 pb-0 justify-content-between"
      >
        <ul class="list-unstyled d-flex">
          <li>
            <button @click="resetFilter"   :class="{ active: isActiveTab === 'tab1' }"       
            class="btn btn-outline-danger m-2">
              Tất cả
            </button>
          </li>
          <li v-for="(category, index) in categories" :key="index">
            <button
              @click="filterProducts(category)" 
              :class="{ active: isActiveTab === category }"  
              class="btn btn-outline-primary m-2"
            >
              {{ category.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="length(filteredProducts)"
      class="row border border-white rounded bg-white px-3 pt-3"
    >
      <h3 class="text-center" v-if="categoryName">Sách {{ categoryName }}</h3>
      <ProductList :products="filteredProducts" />
   
    </div>
    <div
      v-else
      class="row border border-white rounded bg-white px-5 py-5 text-center"
    >
      Không có sản phẩm nào
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";

import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      isActive: 'tab1',
      userId: "",
      products: [],
      categories: [
        { name: "Tâm lý học", code: "tam-ly" },
        { name: "Kinh tế", code: "kinh-te" },
        { name: "Kỹ năng", code: "ky-nang" },
        { name: "Khoa học", code: "khoa-hoc" },
        { name: "Manga", code: "manga" },
        { name: "Sách củ", code: "sach-cu" },
      ],
      selectedCategory: null,
      categoryName: null,
    };
  },
  created() {
    this.getProducts();
  },
  computed: {
    hasToken() {
      return localStorage.getItem("token") !== null;
    },
    getuserId() {
      this.userId = localStorage.getItem("userId");
    },
    filteredProducts() {
      if (this.selectedCategory === null) {
        return this.products;
      } else {
        return this.products.filter(
          (product) => product.category === this.selectedCategory
        );
      }
    },
  },
  methods: {  
    length(list) {
      return list.length > 0;
    },
    async addToCart(id) {
      try {
        const userId = localStorage.getItem("userId");
        await CartService.create({
          userId: userId,
          productId: id,
        });
        alert("Đã thêm vào giỏ hàng."); // Use alert or a notification library
        // Optionally update the state here without a full page reload
      } catch (error) {
        console.log(error);
      }
    },

    async getProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    filterProducts(category) {
      this.selectedCategory = category.code;
      this.categoryName = category.name;
      this.isActiveTab = category;
    },
    resetFilter() {
      this.selectedCategory = null;
      this.categoryName = null;
      this.isActiveTab = 'tab1';

    },
  },  
};
</script>
