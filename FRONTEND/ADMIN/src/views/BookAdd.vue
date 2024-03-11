<template>
  <div class="container">
    <h4  class="text-center bg-info py-5">Thêm tác phẩm mới</h4>
    <ProductForm
      :product="product"
      @submit:product="addProduct"
    />
    <p>{{ message }}</p>
  </div>

</template>
<script>
import ProductForm from "@/components/ProductForm.vue";

import ProductService from "@/services/product.service";
export default {
  components: {
    ProductForm,
  },
  // props: {
  //   id: { type: String, required: true },
  // },
  data() {
    return {
      product: {},
      message: "",
    };
  },
  methods: {   
    async addProduct(data) {
      try {
        await ProductService.create(data);
        alert("Đã thêm thành công.");
      } catch (error) {
        console.log(error);
      }
    },    
  },  
};
</script>
