<template>
  <div class="container p-5">
    <Form @submit="submitProduct" :validation-schema="productFormSchema">
      <div class="row">
        <div class="col-12 col-xl-6">
          <div class="form-group">
            <label for="name">Tên tác phẩm</label>
            <Field
              name="name"
              type="text"
              class="form-control"
              v-model="productLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="image"
              >Ảnh bìa
              <p >(New File)</p></label
            >
            <Field
              name="image"
              type="file"
              class="form-control"
              v-model="productLocal.image"
            />
            <ErrorMessage name="image" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="author">Tác giả</label>
            <Field
              name="author"
              type="text"
              class="form-control"
              v-model="productLocal.author"
            />
            <ErrorMessage name="author" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="nxb">Nhà xuất bản</label>
            <Field
              name="nxb"
              type="text"
              class="form-control"
              v-model="productLocal.nxb"
            />
            <ErrorMessage name="nxb" class="error-feedback" />
          </div>
        </div>

        <div class="col-12 col-xl-6">
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label for="number">Số lượng:</label>
                <Field
                  name="number"
                  type="number"
                  min="10"
                  class="form-control"
                  v-model="productLocal.number"
                />
                <ErrorMessage name="number" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="type">Thể loại</label>
                <Field
                  name="type"
                  type="text"
                  class="form-control"
                  v-model="productLocal.type"
                />
                <ErrorMessage name="type" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="pages">Năm phát hành:</label>
                <Field
                  name="year"
                  type="year"
                  class="form-control"
                  v-model="productLocal.year"
                />
                <ErrorMessage name="year" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="weight">Trọng lượng (g):</label>
                <Field
                  name="weight"
                  type="number"
                  min="80"
                  class="form-control"
                  v-model="productLocal.weight"
                />
                <ErrorMessage name="weight" class="error-feedback" />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="price">Giá bán</label>
                <Field
                  name="price"
                  type="number"
                  min="1000"
                  class="form-control"
                  v-model="productLocal.price"
                />
                <ErrorMessage name="price" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="category">Category</label>
                <select
                  v-model="productLocal.category"
                  class="form-control"
                  name="category"
                >
                <option v-if="product.category" 
                :value="product.category">
                __ {{ product.category }} __ </option>
                  <option value="ky-nang">Sách kỹ năng</option>
                  <option value="tam-ly">Sách tâm lý</option>
                  <option value="kinh-te">Sách kinh tế</option>
                  <option value="khoa-hoc">Sách khoa học</option>
                  <option value="tieu-thuyet">Tiểu thuyết</option>
                  <option value="manga">Truyện tranh Manga</option>

                </select>
                <ErrorMessage name="category" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="pages">Số trang</label>
                <Field
                  name="pages"
                  type="number"
                  min="50"
                  class="form-control"
                  v-model="productLocal.pages"
                />
                <ErrorMessage name="pages" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="size">Kích thước:</label>
                <select
                  v-model="productLocal.size"
                  class="form-control"
                  name="size"
                >
                  <option v-if="productLocal.size" :value="productLocal.size">
                    __{{ productLocal.size }}__
                  </option>
                  <option value="27 x 18">27 x 18</option>
                  <option value="24 x 16">24 x 16</option>
                  <option value="20.5 x 14.5">20.5 x 14.5</option>
                  <option value="20.5 x 13">20.5 x 13</option>

                </select>
                <ErrorMessage name="size" class="error-feedback" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="detail">Mô tả:</label>
            <Field name="detail">
              <textarea
                class="form-control"
                v-model="productLocal.detail"
                rows="10"
              ></textarea>
            </Field>
            <ErrorMessage name="detail" class="error-feedback" />
          </div>
        </div>
      </div>

      <div class="form-group my-2">
        <button class="btn btn-primary">
           Lưu thông tin
        </button>
      </div>
    </Form>
  </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:product"],
  props: {
    product: { type: Object, required: true },
  },
  data() {
    const productFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(100, "Tên có nhiều nhất 100 ký tự."),
      // email: yup
      //   .string()
      //   .email("E-mail không đúng.")
      //   .max(50, "E-mail tối đa 50 ký tự."),
      // address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      // phone: yup
      //   .string()
      //   .matches(
      //     /((09|03|07|08|05)+([0-9]{8})\b)/g,
      //     "Số điện thoại không hợp lệ."
      //   ),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // productLocal để liên kết với các input trên form
      productLocal: this.product,
      productFormSchema,
      newimage: false,
    };
  },
  methods: {
    submitProduct() {
      this.$emit("submit:product", this.productLocal);
    },
  },
};
</script>
<!-- <style scoped>
  @import "@/assets/form.css";
  </style> -->
