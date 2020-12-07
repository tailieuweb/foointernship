<template>
  <v-app><ListCompanies></ListCompanies></v-app>
</template>

<script>
import ListCompanies from "./components/DanhSachCongTy/ListCompanies.vue";

export default {
  name: "App",

  components: {
    ListCompanies,
  },

  data: () => ({
    //
  }),
};
</script>
