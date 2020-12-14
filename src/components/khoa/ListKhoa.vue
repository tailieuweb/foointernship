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
  <v-app>
    <v-container>
      <div class="top" style=" text-align: center;">
        <h1>Khoa</h1>
      </div>
      
      <v-data-table
        :headers="headers"
        :items="students"
        sort-by="id"
        class="elevation-1"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Thêm
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.khoa"
                          label="Tên Khoa"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Giảng Viên"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.class"
                          label="Lớp"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.mon"
                          label="Môn"
                        ></v-text-field>
                      </v-col>
                      
                      
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.numbers`] v-for="number in numbers">
          <div :key="number">{{ number }}</div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="list_students">
            Reset
          </v-btn>
        </template>
      </v-data-table>
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </v-container>
  </v-app>
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
const RESOURCE_STUDENT =
  "https://5fd5d44966125e0016500945.mockapi.io/Khoa";
export default {
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    dialogDelete: false,
    status: [true, false],
    headers: [
      {
        text: "#",
        value: "numbers",
      },
      {
        text: "Tên Khoa",
        align: "start",
        value: "khoa",
      },
      { text: "Giảng Viên", value: "name" },
      { text: "Lớp Phụ Trách", value: "class" },
      { text: "Môn Phụ Trách", value: "mon" },
      { text: "Thao Tác", value: "actions", sortable: false },
    ],
    students: [],
    numbers: 0,
    editedIndex: -1,
    editedItem: {
      Name: "",
      Tranercode: "",
      Class: "",
      DayStart: "",
      DayEnd:"",
      actions: false,
    },
    defaultItem: {
        Name: "",
      Tranercode: "",
      Class: "",
      DayStart: "",
      DayEnd:"",
      actions: false,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.list_students();
  },

  ready() {
    this.list_students();
  },

  methods: {
    list_students() {
      this.axios.get(`${RESOURCE_STUDENT}`).then((response) => {
        this.students = response.data;
        this.numbers = this.students.length;
        console.log("numbers", this.numbers);
      });
      setTimeout(this.list_students, 3000);
    },

    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.axios
        .delete(`${RESOURCE_STUDENT}/${this.editedItem.id}`)
        .then((response) => {
          console.log(response);
          console.log(this.editedItem.id);
        });
      this.students.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let self = this;
      if (self.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
        this.axios
          .put(RESOURCE_STUDENT + "/" + this.editedItem.id, this.editedItem)
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        this.axios
          .post(`${RESOURCE_STUDENT}`, self.editedItem)
          .then(function(response) {
            // if (response.status === 201) {
            //   self.students.push(self.editedItem);
            //   console.log(response);
            // }
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      this.close();
    },
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

