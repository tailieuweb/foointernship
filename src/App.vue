<template>
  <v-app>
    <Header />
    <router-view></router-view>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "App",

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
