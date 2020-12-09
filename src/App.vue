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
</style>