<template>
  <!-- header -->
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
            <b-nav-item-dropdown text="Sinh viên" right>
              <b-dropdown-item href="#">Sinh viên</b-dropdown-item>
              <b-dropdown-item href="#">Giảng viên</b-dropdown-item>
              <b-dropdown-item href="#">Người hướng dẫn</b-dropdown-item>
              <b-dropdown-item href="#">Khách</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="#" color="blue">Công ty</b-nav-item>
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
</template>

