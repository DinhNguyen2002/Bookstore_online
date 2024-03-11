<template>
  <div class="container px-5 py-5">
    <div class="row">
      <div class="col-lg-6">
        <img
          class="img-fluid rounded"
          :src="'http://localhost:3000/' + product.image"
          alt="Product Image"
        />
      </div>
      <div class="col-lg-6">
        <h3 class="card-title font-weight-bold">
          {{ product.name }}
        </h3>
        <h6>
          Tác giả: <strong>{{ product.author }}</strong>
        </h6>
        <h6>
          Nhà xuất bản: <strong>{{ product.nxb }}</strong>
        </h6>
        <h6>
          Thể loại: <strong>{{ product.type }}</strong>
        </h6>

        <h3 class="text-danger mt-4">{{ formatNum(product.price) }}đ</h3>

        <div class="mt-4">
          <h3 v-if="message.length > 0" class="text-danger">({{ message }})</h3>

          <button
            v-else
            class="btn btn-outline-danger px-5"
            @click="addToCart(product._id)"
          >
            <h5><i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ</h5>
          </button>
        </div>
      </div>
    </div>

    <div v-if="list.length > 0" class="row mt-5">
      <h3>Sản phẩm liên quan</h3>
      <div class="col-md-4 mb-4" v-for="item in list" :key="item._id">
        <div class="d-flex h-100">
          <div class="card">
            <img
              :src="'http://localhost:3000/' + item.image"
              class="card-img-top"
              :alt="item.name"
            />
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <h5 class="card-subtitle mb-2 text-danger h5">
                {{ formatNum(item.price) }}đ
              </h5>
            </div>

            <div class="card-footer d-flex justify-content-between">
              <!-- <a @click="refresh(item._id)" class="nav-link">Xem chi tiết</a> -->
              <router-link
                :to="{ name: 'product.detail', params: { id: item._id } }"
              >
                <a @click="refresh(item._id)" class="nav-link"
                  >Xem chi tiết</a
                ></router-link
              >
              <button class="btn btn-danger" @click="addToCart(item._id)">
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <h3>Thông tin sản phẩm</h3>

      <div class="table-responsive">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td class="text-muted">Tác giả:</td>
              <td class="text-muted">{{ product.author }}</td>
            </tr>
            <tr>
              <td class="text-muted">Nhà xuất bản:</td>
              <td class="text-muted">{{ product.nxb }}</td>
            </tr>
            <tr>
              <td class="text-muted">Năm xuất bản:</td>
              <td class="text-muted">{{ product.year }}</td>
            </tr>
            <tr>
              <td class="text-muted">Trọng lượng:</td>
              <td class="text-muted">{{ product.weight }}</td>
            </tr>
            <tr>
              <td class="text-muted">Kích thước:</td>
              <td class="text-muted">{{ product.size }}</td>
            </tr>
            <tr>
              <td class="text-muted">Số trang:</td>
              <td class="text-muted">{{ product.pages }}</td>
            </tr>
            <tr>
              <td class="text-muted">Sản phẩm hiển thị trong mục:</td>
              <td class="text-muted">{{ product.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row">
      <h4>Mô tả:</h4>
      <pre>{{ product.detail }}</pre>
    </div>

    <div class="row">
      <div class="col-lg-12 mt-4">
        <h3 class="font-weight-bold mb-4">Đánh giá và bình luận</h3>
        <div v-if="reviews.length > 0" class="mb-4">
          <h4 class="mb-3">
            Đánh giá trung bình:
            <strong class="p-1 btn-warning"
              >{{ calculateAverageRating() }}
            </strong>
            sao
          </h4>
        </div>
        <div class="mb-4">
          <span
            v-for="star in 5"
            :key="star"
            @click="setRating(star)"
            :class="{
              'text-warning': star <= userRating,
              'cursor-pointer': canRate,
            }"
            class="me-1 fs-4"
          >
            &#9733;
          </span>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <h4 class="mb-4">Bình luận của bạn</h4>
            <form @submit.prevent="submitComment">
              <div class="mb-3">
                <label for="commentContent" class="form-label"
                  >Nội dung bình luận</label
                >
                <textarea
                  v-model="newcontent"
                  class="form-control"
                  id="commentContent"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                class="btn btn-primary"
                @click="addComment()"
              >
                Gửi bình luận
              </button>
            </form>
          </div>

          <!-- Display Comments Column -->
          <div class="col-lg-6">
            <div class="mt-4">
              <h4>Bình luận trước đó</h4>
              <div v-if="reviews.length > 0">
                <ul class="list-unstyled">
                  <li v-for="(review, index) in reviews" :key="index">
                    <div class="d-flex align-items-center mb-3">
                      <!-- Avatar -->
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4FRdJhLdEEhFbcIuR-DEGYsFMjn-6QUGZ7A&usqp=CAU"
                        alt="Avatar"
                        class="rounded-circle me-2"
                        style="width: 40px; height: 20px"
                      />
                      <div>
                        <strong>{{ review.name }}</strong
                        >: {{ review.content }} ({{ review.evalue }} sao)
                        <i
                          @click="delCmt(review._id)"
                          v-if="userId == review.userId"
                          class="fa-solid fa-minus"
                        ></i>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-else>
                <p>Chưa có bình luận nào</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      message: "",
      product: null,
      userId: "",
      list: [],
      category: "",
      reviews: [],
      newcontent: "",
      userRating: 0,
      canRate: true,
    };
  },
  computed: {
    hasToken() {
      return localStorage.getItem("token") !== null;
    },
    getuserId() {
      this.userId = localStorage.getItem("userId");
    },
  },

  methods: {
    formatNum(number) {
      number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return number;
    },
    async getProduct(id) {
      try {
        const data = await ProductService.get(id);
        this.product = data;
        if (this.product.number == 0) {
          this.message = "Đã hết hàng";
        }
        this.category = this.product.category;
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async getComment(id) {
      try {
        const data = await UserService.getComment(id);
        this.reviews = data;
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async addComment() {
      const id = this.$route.params.id;
      if (!localStorage.getItem("userId")) {
        if (confirm("Vui lòng đăng nhập!")) {
          this.$router.push("/login");
        }
      } else if (this.newcontent == "") {
        alert("vui lòng nhập nội dung bình luận");
      } else if (this.userRating == 0) {
        alert("vui lòng đánh giá số sao");
      } else {
        try {
          const name = localStorage.getItem("username");
          this.userId = localStorage.getItem("userId");
          await UserService.addComment({
            productId: id,
            name: name,
            userId: this.userId,
            content: this.newcontent,
            evalue: this.userRating,
          });
          this.newcontent = "";
          this.refresh(id);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async delCmt(id) {
      try {
        if (confirm("Xóa bình luận?")) {
          await UserService.delComment(id);
        }
        this.refresh();
      } catch (error) {
        console.log(error);
      }
    },

    async getGroup(id, category) {
      try {
        this.list = await ProductService.getGroup(id, {
          category: category,
        });
        this.list = this.list.slice(0, 3);
      } catch (error) {
        console.log(error);
      }
    },
    async addToCart(id) {
      if (!localStorage.getItem("userId")) {
        if (confirm("Vui lòng đăng nhập!")) {
          this.$router.push("/login");
        }
      }
      try {
        const userId = localStorage.getItem("userId");
        await CartService.create({
          userId: userId,
          productId: id,
        });
        alert("Đã thêm vào giỏ hàng.");
      } catch (error) {
        console.log(error);
      }
    },

    refresh() {
      const id = this.$route.params.id;

      this.getProduct(id).then(() => {
        this.getComment(id);
        this.getGroup(id, this.category);
        this.getuserId(); // Call the method
      });
    },

    calculateAverageRating() {
      const totalRating = this.reviews.reduce(
        (sum, review) => sum + parseFloat(review.evalue),
        0
      );
      return (totalRating / this.reviews.length).toFixed(1);
    },
    setRating(evalue) {
      if (this.canRate) {
        this.userRating = evalue;
      }
    },
  },
  created() {
    this.refresh();
  },
};
</script>
<style scoped>
pre {
  font-size: 20px;
  white-space: pre-wrap;
}
</style>
