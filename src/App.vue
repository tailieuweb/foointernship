<template>
  <v-app>
    <!-- <User /> -->
    <div class="div">
      <Header />
    </div>
  
    <router-view></router-view>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";

export default {
  data: () => ({
    step: 1,
  }),
  props: {
    source: String,
  },
  components: {
    Footer,
    Header
  },
};

</script>

