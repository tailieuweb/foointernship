<template>
  <!-- header -->
  <v-app>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="">
        <v-img
          src="../../assets/logo1.jpg"
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
            src="../../assets/ungvien.png"
            max-height="100"
            max-width="100"
          ></v-img>
          <h3>Username</h3>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- header -->
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >
                          Sign in
                        </h1>
                        <div class="text-center" mt-4>
                          <v-btn class="mx-2" fab color="blue" outlined>
                            <span class="material-icons"> facebook </span>
                          </v-btn>
                          <v-btn class="mx-2" fab color="green" outlined>
                            <i class="fab fa-google"></i>
                          </v-btn>
                          <v-btn class="mx-2" fab color="purple" outlined>
                            <i class="fab fa-github"></i>
                          </v-btn>
                        </div>
                        <h4 class="text-center mlt-4">Login in another way</h4>
                        <v-form>
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            id="password"
                            label="Password"
                            name="Password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-form>
                        <h3 class="text-center mt-3">Forget your password</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="teal accent-3" dark>Login </v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-3">
                          Welcome to login page
                        </h1>
                        <h5 class="text-center">
                          If you dont have an account register here
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined="" dark @click="step++"
                          >Register
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Welcome to register page
                        </h1>
                        <h5 class="text-center">
                          If you had an account login here
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Login
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text--center display-2 teal--text text--accent-3"
                        >
                          Create Account
                        </h1>
                        <!-- <div class="text-center" mt-4>
                          <v-btn class="mx-2" fab color="blue" outlined>
                            <span class="material-icons"> facebook </span>
                          </v-btn>
                          <v-btn class="mx-2" fab color="green" outlined>
                            <i class="fab fa-google"></i>
                          </v-btn>
                          <v-btn class="mx-2" fab color="purple" outlined>
                            <i class="fab fa-github"></i>
                          </v-btn>
                        </div> -->
                        <!-- <h4 class="text-center mt-4">Login in another way</h4> -->
                        <v-form>
                          <v-text-field
                            label="Name"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            label="Password"
                            name="Password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          />
                          <v-text-field
                            label="Confirm Password"
                            name="Password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="teal accent-3" dark
                          >Register
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
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
