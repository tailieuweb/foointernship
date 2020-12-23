<template>
  <v-app>
  <!-- <User /> -->
  <Header/>
    <router-view></router-view>
    <Footer/>
  </v-app>
</template>

<script>
// import User from "./components/NhatKyThucTap/User";
import Footer from"./components/Footer";
import Header from"./components/Header";
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
Footer,
Header
  },
};
</script>

<style>

</style>