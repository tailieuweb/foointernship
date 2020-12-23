<template>
  <v-app>
    <!-- <router-view></router-view> -->
    <ListCompanies/>
    <!-- <template>
     
    </template> -->
  </v-app>
</template>

<script>
import ListCompanies from './components/DanhSachCongTy/ListCompanies'
export default {
  name: "App",
  components: {
    ListCompanies
  },
  data: () => ({
    // dialog: false,
  }),
  methods: {
    // deleteItem() {
    //   this.dialog = false;
    // },
  },
};
</script>
