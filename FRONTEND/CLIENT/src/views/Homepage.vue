<template>
  <div>
    <Banner />
    <div class="container mb-5 justify-content-center">
      <div class="product-list border-danger">
        <h2 class="mb-3">Sự kiện tháng này</h2>

        <div class="row justify-content-center">
          <div class="col-lg-2 col-md-3 col-sm-4 col-5 col-5 mx-2 text-center">
            <img
              class=""
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/F3T11_120x120.png"
              alt=""
            />
            <h5 class="mt-3">Sale thứ 3</h5>
          </div>

          <div class="col-lg-2 col-md-3 col-sm-4 col-5 col-5 mx-2 text-center">
            <img
              class=""
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/Icon20_11_120x120.png"
              alt=""
            />

            <h5 class="mt-3">Tri ân thầy cô</h5>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5 col-5 mx-2 text-center">
            <img
              class=""
              src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_FlashSale_Thuong_120x120.png"
              alt=""
            />

            <h5 class="mt-3">Flash sale</h5>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5 col-5 mx-2 text-center">
            <img
              class=""
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/Icon_MangaT11_120x120_1.png"
              alt=""
            />
            <h5 class="mt-3">Manga</h5>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-4 col-5 col-5 mx-2 text-center">
            <img
              class=""
              src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_PhienChoCu_8px_1.png"
              alt=""
            />

            <h5 class="mt-3">Phiên chợ sách cũ</h5>
          </div>
        </div>
      </div>

      <div class="product-list">
        <h2 class="mb-3">Bán Chạy Tuần</h2>
        <ProductList :products="getPopular()" />
        <div class="d-flex justify-content-center mt-3">
          <a
            v-if="!showOne"
            @click="showAll(1)"
            class="nav-link h5 animate-color"
          >
            __Xem thêm__
          </a>
          <a v-else @click="unShow(1)" class="nav-link h5 animate-color">
            __Thu gọn__
          </a>
        </div>
      </div>
      <div class="product-list">
        <h2 class="mb-3">Được Yêu Thích</h2>
        <ProductList :products="getFavorites()" />

        <div class="d-flex justify-content-center mt-3">
          <a
            v-if="!showTwo"
            @click="showAll(2)"
            class="nav-link h5 animate-color"
          >
            __Xem thêm__
          </a>
          <a v-else @click="unShow(2)" class="nav-link h5 animate-color">
            __Thu gọn__
          </a>
        </div>
      </div>
      <div class="product-list">
        <h2 class="mb-3">Sách Mới</h2>
        <ProductList :products="getNew()" />
        <div class="d-flex justify-content-center mt-3">
          <a
            v-if="!showThree"
            @click="showAll(3)"
            class="nav-link h5 animate-color"
          >
            __Xem thêm__
          </a>
          <a v-else @click="unShow(3)" class="nav-link h5 animate-color">
            __Thu gọn__
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductList from "@/components/ProductList.vue";
import Banner from "@/components/Banner.vue";

import ProductService from "@/services/product.service";
export default {
  components: {
    ProductList,
    Banner,
  },
  data() {
    return {
      newProducts: [],
      favorites: [],
      populars: [],
      rowOne: 3,
      rowTwo: 3,
      rowThree: 3,
      showOne: false,
      showTwo: false,
      showThree: false,
    };
  },

  methods: {
    showAll(listType) {
      if (listType === 1) {
        this.rowOne = 6;
        this.showOne = true;
      } else if (listType === 2) {
        this.rowTwo = 10;
        this.showTwo = true;
      } else if (listType === 3) {
        this.rowThree = 10;
        this.showThree = true;
      }
    },
    unShow(listType) {
      if (listType === 1) {
        this.rowOne = 3;
        this.showOne = false;
      } else if (listType === 2) {
        this.rowTwo = 3;
        this.showTwo = false;
      } else if (listType === 3) {
        this.rowThree = 3;
        this.showThree = false;
      }
    },

    getPopular() {
      return this.populars.slice(0, this.rowOne);
    },
    getFavorites() {
      return this.favorites.slice(0, this.rowTwo);
    },
    getNew() {
      return this.newProducts.slice(0, this.rowThree);
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

    async retrieveProducts() {
      try {
        this.populars = await ProductService.getAll();
        this.populars.sort((a, b) => a.number - b.number);

        this.favorites = await ProductService.getAll();

        this.newProducts = await ProductService.getAll();
        this.newProducts.sort((a, b) => b.id - a.id);
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveProducts();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.animate-color {
  animation: changeColor 2s infinite alternate;
}

@keyframes changeColor {
  0% {
    color: rgb(56, 56, 239);
  }
  25% {
    color: rgb(0, 229, 255);
  }
  50% {
    color: rgb(0, 255, 0);
  }
  75% {
    color: rgb(255, 0, 200);
  }
  100% {
    color: red;
  }
}
.product-list {
  background-color: white;
  padding: 10px; /* Add padding for spacing */
  border-radius: 10px;
  margin: 50px; /* Add margin for spacing between product lists */

  /* Add an animation for the border color */
  animation: borderAnimation 4s infinite;
  border: 5px solid transparent; /* Set a transparent initial border */

  /* Use a linear gradient for the colorful border */
  /* background-clip: padding-box; */
  /* background-image: linear-gradient(45deg, #FF5733, #FFC300, #FF5733, #FFC300, #FF5733, #FFC300); */
}

/* Define the animation keyframes for border color change */
@keyframes borderAnimation {
  0% {
    border-color: #ff5733;
  }
  25% {
    border-color: #ffc300;
  }
  50% {
    border-color: #ff5733;
  }
  75% {
    border-color: #ffc300;
  }
  100% {
    border-color: #ff5733;
  }
}
</style>
