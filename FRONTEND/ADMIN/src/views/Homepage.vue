<template>
  <div class="container">
    <h4 class="text-center bg-info py-5">Danh sách các tác phẩm</h4>
    <div class="mt-3 w-50 ">
      <InputSearch v-model="searchText" />
    </div>
    <div class="row mt-2">
      <div
        class="col border border-white rounded bg-white justify-content-between"
      >
        <ul class="list-unstyled d-flex">
          <li>
            <button @click="Filter('')" class="btn btn-outline-secondary m-2">
              Tất cả
            </button>
          </li>
          <li>
            <button @click="Filter('ky-nang')" class="btn btn-outline-primary m-2">
              Sách kỹ năng
            </button>
          </li>
          <li>
            <button @click="Filter('tam-ly')" class="btn btn-outline-primary m-2">
              Tâm lý học
            </button>
          </li>
          <li>
            <button @click="Filter('kinh-te')" class="btn btn-outline-primary m-2">
              Sách kinh tế
            </button>
          </li>
          <li>
            <button @click="Filter('khoa-hoc')" class="btn btn-outline-primary m-2">
              Sách khoa học
            </button>
          </li>
          <li>
            <button @click="Filter('manga')" class="btn btn-outline-primary m-2">
              Truyện Manga
            </button>
          </li>
          
        </ul>
      </div>
    </div>

    
    <ProductList
      v-if="filteredProductsCount > 0"
      :products="filteredProducts"
      v-model:activeIndex="activeIndex"
      @delete:activeIndex="deleteProduct"
    />
    <p v-else>Không có tác phẩm nào.</p>
  </div>
</template>
<script>
import unidecode from "unidecode";

import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/ProductList.vue";
import ProductService from "@/services/product.service";

export default {
  components: {
    InputSearch,
    ProductList,
  },
  data() {
    return {
      products: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
    productStrings() {
      return this.products.map((product) => {
        const { name, category, author } = product;
        const normalizedString = [name, category, author].join("");
        const withoutDiacritics = unidecode(normalizedString).toLowerCase();
        return withoutDiacritics;
      });
    },

    // Trả về các product có chứa thông tin cần tìm kiếm.
    filteredProducts() {
      if (!this.searchText) return this.products;
      return this.products.filter((_product, index) =>
        this.productStrings[index].includes(this.searchText)
      );
    },
    activeProduct() {
      if (this.activeIndex < 0) return null;
      return this.filteredProducts[this.activeIndex];
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveProducts();
      this.activeIndex = -1;
    },

    Filter(text) {
      this.searchText= text;
      this.refreshList();

    },


    // async removeAllProducts() {
    //   if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
    //     try {
    //       await ProductService.deleteAll();
    //       this.refreshList();
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // },

    async deleteProduct(id) {
      if (confirm("Bạn muốn xóa Sách này?")) {
        try {
          await ProductService.delete(id);
          // this.$router.push({ name: "adminpage" });
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
