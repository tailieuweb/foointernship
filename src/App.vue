<template>
  <v-app>
    <!-- <User /> -->
    <div class="div">
      <Header />
    </div>
    <dir>
      <ManageBieuMau />
    </dir>
    <router-view></router-view>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";
import ManageBieuMau from "./components/QuanLyBieuMau/ManageBieuMau"
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
    ManageBieuMau,
  },
};
</script>

