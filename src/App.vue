<template>
  <v-app>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </v-app>
</template>

<script>

import Footer from './components/Footer.vue';

import Header from './components/Header.vue';

export default {

  name: 'App',
 components: {
   Header,
   Footer,

 },
  data: () => ({
    //
  }),
};
</script>
