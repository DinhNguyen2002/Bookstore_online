<template>
  <Form @submit="submitUser" :validation-schema="userFormSchema">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div
          class="card mt-0 p-1 border-0"
          style="border-radius: 1rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)"
        >
          <div class="card-body">
            <div class="mb-3">
              <label for="name" class="form-label">Họ tên</label>
              <Field
                name="name"
                type="text"
                class="form-control"
                v-model="userLocal.name"
              />
              <ErrorMessage name="name" class="error-feedback" />
            </div>

            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <Field
                name="username"
                type="text"
                class="form-control"
                v-model="userLocal.username"
              />
              <ErrorMessage name="username" class="error-feedback" />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <Field
                name="password"
                type="password"
                class="form-control"
                v-model="userLocal.password"
              />
              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label">Điện thoại</label>
              <Field
                name="phone"
                type="text"
                class="form-control"
                v-model="userLocal.phone"
              />
              <ErrorMessage name="phone" class="error-feedback" />
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">Địa chỉ</label>
              <Field
                name="address"
                type="text"
                class="form-control"
                v-model="userLocal.address"
              />
              <ErrorMessage name="address" class="error-feedback" />
            </div>

            <div class="mb-3">
              <button type="submit" class="btn btn-primary btn-block">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
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
  emits: ["submit:user"],
  props: {
    user: { type: Object, required: true },
  },
  data() {
    const userFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(5, "Tên phải ít nhất 5 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),

      username: yup
        .string()
        .required("username phải có giá trị.")
        .min(5, "username phải ít nhất 5 ký tự.")
        .max(10, "username có nhiều nhất 10 ký tự."),

      password: yup
        .string()
        .required("password phải có giá trị.")
        .min(3, "password phải ít nhất 3 ký tự.")
        .max(10, "password có nhiều nhất 10 ký tự."),
      // email: yup
      //   .string()
      //   .email("E-mail không đúng.")
      //   .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string().min(1, "Địa chỉ tối thieu 1 ký tự."),
      // phone: yup
      //   .string()
      //   .matches(
      //     /((09|03|07|08|05)+([0-9]{8})\b)/g,
      //     "Số điện thoại không hợp lệ."
      //   ),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // userLocal để liên kết với các input trên form
      userLocal: this.user,
      userFormSchema,
    };
  },
  methods: {
    submitUser() {
      this.$emit("submit:user", this.userLocal);
    },
    deleteUser() {
      this.$emit("delete:user", this.userLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
