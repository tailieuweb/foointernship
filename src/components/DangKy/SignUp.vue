<template>
  <!-- header -->
  <v-app>
    <div class="user">
      <div class="text-left">
        <v-img
          src="../../assets/logo1.jpg"
          max-height="100"
          max-width="100"
        ></v-img>
        <h3>Username</h3>
      </div>
      <div class="text-center">
        <div class="khung">
          <v-btn rounded color="blue" dark class="haha">Home </v-btn>
          <v-btn class="haha">Student </v-btn>
          <v-btn class="haha">Company </v-btn>
        </div>
      </div>
      <div class="text-right">
        <v-img
          src="../../assets/ungvien.png"
          max-height="100"
          max-width="100"
        ></v-img>
        <h3>Username</h3>
      </div>
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
        <div class="text-center3">
          <v-img
            src="../../assets/maytinh.jpg"
            max-height="90"
            max-width="90"
          ></v-img>
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
.text-right3 h3{
  padding-top: 50px;
}
.footer {
  background: #bdbdf9;
  border: 1px solid black;
}
.text-left1 {
  margin-bottom: -28px;
}
.text-right3 {
         padding-left: 1100px;
    padding-top: -27px;
    margin-top: -83px;
    padding-bottom: 14px;
}
.text-center2 {
  padding-left: 500px;
}
.text-center3 {
 margin-bottom: -76px;
    padding-left: 800px;
    padding-bottom: -67px;
    margin-top: -16px;
    padding-bottom: 50px;
}
.khung1 {
  margin-right: 50px;
}
.khung {
  margin-right: 250px;
}
.haha {
  padding-left: -100px;
  margin-left: 100px;
}
.v-responsive__content {
  margin-top: 5px;
}
.text {
  font-size: 12px;
  font-family: cursive;
  padding-left: 5px;
}
.text-right {
  margin-top: -85px;
  width: 26%;
  margin-left: auto;
  margin-right: 0px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
}
.user h3 {
  margin-right: 124px;
  margin-top: -52px;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #564fef !important;
}
</style>
