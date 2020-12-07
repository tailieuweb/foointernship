<template>
  <v-app>
    <v-main>
      <User />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import User from "./components/NhatKyThucTap/User";
export default {
  name: "App",

  components: {
    User
  },

  data: () => ({
    //
  })
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