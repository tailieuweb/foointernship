<template>
  <v-app>
    <v-main>
      <Header/>
      <user/>
      <dsnhatky/>
     <Footer/>
    </v-main>
  </v-app>
</template>

<script>

import dsnhatky from './components/NhatKyThucTap/dsnhatky';
import user from './components/NhatKyThucTap/user';
import Header from './components/header.vue';
import Footer from './components/footer.vue';

export default {
  name: 'App',

  components: {
    dsnhatky,
    user,
    Header,
   Footer,
  },
    

   
  data: () => ({
    //
  }),
};
</script>
