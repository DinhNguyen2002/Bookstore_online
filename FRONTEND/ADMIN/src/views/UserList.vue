<template>
  <div class="container">   
    <h4 class="text-center bg-info py-5">
      Danh sách khách hàng
    </h4>
    <div class="my-3 w-50">
      <InputSearch v-model="searchText" />
    </div>
    <UserList
      v-if="filteredUsersCount > 0"
      :users="filteredUsers"
    />

  </div>
</template>
<script>

import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/UserList.vue";
import UserService from "@/services/user.service";
import unidecode from 'unidecode';

export default {
  components: {
    InputSearch,
    UserList,
  },
  data() {
    return {
      users: [],
      searchText: "",
    };
    
  },
  computed: {
    // Chuyển các đối tượng user thành chuỗi để tiện cho tìm kiếm.
    UserStrings() {
      return this.users.map((user) => {
        const { name, address, phone } = user;
        const normalizedString = [ name, address, phone].join("");
        const withoutDiacritics = unidecode(normalizedString).toLowerCase();
        return withoutDiacritics;
      });
    },
    // Trả về các user có chứa thông tin cần tìm kiếm.
    filteredUsers() {
      if (!this.searchText) return this.users;
      return this.users.filter((_user, index) =>
        this.UserStrings[index].includes(this.searchText)
      );
    },    
    filteredUsersCount() {
      return this.filteredUsers.length;
    },
  },
  methods: {
    async retrieveUsers() {
      try {
        this.users = await UserService.getAll();
        this.users.sort((a, b) => b._id - a._id);
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveUsers();
    },
    
    async removeUser(id) {
      if (confirm("Bạn muốn xóa tài khoản này?")) {
        try {
          await userService.delete(id);
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
