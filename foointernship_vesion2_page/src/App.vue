<template>
  <v-app>
    <v-main>  
      <Expordsnhatki/>
    </v-main>
  </v-app>
</template>
<script>
import Expordsnhatki from './components/NhatKyThucTap/Expordsnhatki';
export default {
  name: 'App',

  components: {
    Expordsnhatki
  },

  data: () => ({
    //
  }),
};
</script>
