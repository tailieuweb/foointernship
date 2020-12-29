<template>
  <!-- header -->
  <v-app>
    <header>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="">
        <v-img  
          src="../assets/logo1.jpg"
          max-height="100"
          max-width="100"
        ></v-img>
        <v-btn rounded color="blue" dark class="haha">Home </v-btn>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown text="Student" right>
              <b-dropdown-item href="#">Studen1</b-dropdown-item>
              <b-dropdown-item href="#">Studen2</b-dropdown-item>
              <b-dropdown-item href="#">Studen3</b-dropdown-item>
              <b-dropdown-item href="#">Studen4</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="#" color="blue">Company</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto"> </b-navbar-nav>
          <v-img
            src="../assets/ungvien.png"
            max-height="70"
            max-width="70"
          ></v-img>
          <h5>Username</h5>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- header -->
    </header>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    step: 1,
  }),
  props: {
    source: String,
  },
};
</script>

<style>
header{
  /* position: fixed; */
  height: 20%;
}
.v-image.v-responsive.theme--light {
  padding-right: -16px;
  margin-right: 25px;
}
</style>
