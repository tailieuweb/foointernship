<template>
  <!-- header -->
  <v-app>
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
            max-height="100"
            max-width="100"
          ></v-img>
          <h3>Username</h3>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- header -->
    <!-- footer -->
    <div class="footer">
      <div class="text-left1">
        <h3>Trường Cao Đẳng Công Nghệ Thủ Đức</h3>
      </div>
      <div class="text-center2">
        <div class="khung1">
          <h3>Khoa công nghệ thông tin</h3>
        </div>
      </div>
      <div class="text-right3">
        <h3>Copyright (©) Team F,H,J</h3>
      </div>
    </div>
    <!-- footer -->
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
.text-left1 .h3 {
  padding-top: 5000px;
}
.footer {
  margin-top: 50px;
  background: #dae8fc;
}
.v-image.v-responsive.theme--light {
  padding-right: -16px;
  margin-right: 25px;
}
.text-right3 {
  padding-left: 1000px;
  margin-top: -39px;
}
.text-center2 {
  padding-left: 550px;
  margin-top: -36px;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #564fef !important;
}
</style>
