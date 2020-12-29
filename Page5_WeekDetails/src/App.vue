<template>
  <v-app>
    <Header />
    <!-- <user /> -->
    <WeekDetails />
    <!-- <dsnhatky /> -->
    <Footer />
  </v-app>
</template>

<script>
// import dsnhatky from "./components/dsnhatky.vue";
// import user from "./components/user";
import WeekDetails from "./components/WeekDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  data: () => ({
    step: 1,
  }),
  props: {
    source: String,
  },

  components: {
    Footer,
    Header,
    WeekDetails,
    // dsnhatky,
    // user,
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
