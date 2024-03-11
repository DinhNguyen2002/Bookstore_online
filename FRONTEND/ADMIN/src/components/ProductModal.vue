<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="'modal_' + product._id"
    tabindex="-1"
    :aria-labelledby="'modal_' + product._id + 'Label'"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" :id="'modal_' + product._id + 'Label'">
            {{ product.name }}
          </h3>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <img
                :src="'http://localhost:3000/' + product.image"
                class="card-img-top"
                :alt="product.name"
              />
            </div>

            <div class="col-6">
              <h5>
                Còn lại:
                <strong class="text-danger">{{ product.number }} </strong> quyển
              </h5>
              <h5>
                Tác giả: <strong>{{ product.author }}</strong>
              </h5>
              <h5>
                Nhà xuất bản: <strong>{{ product.nxb }}</strong>
              </h5>
              <h5>
                Thể loại: <strong>{{ product.type }}</strong>
              </h5>

              <h5>
                Giá:
                <strong class="text-danger"
                  >{{ formatNum(product.price) }}đ</strong
                >
              </h5>

              <h5>
                Năm xuất bản: <strong> {{ product.year }}</strong>
              </h5>
              <h5>
                Trọng lượng: <strong> {{ product.weight }}</strong>
              </h5>
              <h5>
                Kích thước: <strong>{{ product.size }}</strong>
              </h5>

              <h5>
                Số trang: <strong> {{ product.pages }}</strong>
              </h5>
              <h5>
                Danh mục sản phẩm: <strong> {{ product.type }}</strong>
              </h5>
            </div>

            <div class="col-12 mx-5">
              <h5>Mô tả:</h5>
              <textarea
                disabled
                cols="90"
                rows="10"
                :value="product.detail"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <router-link
            :to="{
              name: 'product.edit',
              params: { id: product._id },
            }"
          >
            <button class="btn btn-primary">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
          </router-link>

          <button @click="deleteProduct(product._id)" class="btn btn-danger">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: { type: Object, required: true },
  },
  emits: ["delete:activeIndex"],

  methods: {
    formatNum(number) {
      number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return number;
    },
    deleteProduct(id) {
      this.$emit("delete:activeIndex", id);
    },
  },
};
</script>

<style scoped>
/* Add your modal styles if needed */
</style>
