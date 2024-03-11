<template>
  <div class="container">
    <h4 class="text-center bg-info py-5">Sản phẩm bán chạy</h4>
    <div class="my-3 w-50">
      <InputSearch v-model="searchText" />
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
        const { name, type, author, pages } = product;
        return [name, type, author, pages].join("");
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
        this.products.sort((a, b) => a.number - b.number);
        this.products = this.products.slice(0,15);
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveProducts();
      this.activeIndex = -1;
    },
    async removeAllProducts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ProductService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async removeProduct(id) {
      if (confirm("Bạn muốn xóa sản phẩm này?")) {
        try {
          await ProductService.delete(id);
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deleteProduct() {
      if (confirm("Bạn muốn xóa sản phẩm này?")) {
        try {
          await ProductService.delete(this.product._id);
          this.$router.push({ name: "adminpage" });
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
<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
