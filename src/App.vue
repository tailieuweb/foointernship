<template>
  <v-app>
  <!-- <User /> -->
  <Header/>
    <Quanlyuser/>
    <Footer/>
  </v-app>
</template>

<script>
// import User from "./components/NhatKyThucTap/User";
import Footer from"./components/Footer";
import Header from"./components/Header";
import Quanlyuser from '../src/components/Quanlyuser'
export default {
  data: () => ({
    step: 1,
  }),
  props: {
    source: String,
  },
  //   components: {
  //   User
  // },
  components: {
Quanlyuser,
Footer,
Header
  },
};
</script>

<style>
.v-data-table__wrapper {
  padding-top: 5%;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #ef4f4f !important;
}
.v-data-table-header {
  background-color: cornflowerblue;
}
.v-application a {
  color: #3c3c3c !important;
}
</style>