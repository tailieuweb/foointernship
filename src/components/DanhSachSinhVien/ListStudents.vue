<template>
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
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="ListDiary"
      sort-by="calories"
      class="elevation-1"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template #item.number="" >
        <span v-for="arr in numbers" :key="arr">
        </span>
        {{arr.stt}}
      </template>
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
                  New Item
                </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Student name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.class"
                        label="Class"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.company"
                        label="Company"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.status"
                        label="Status"
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
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <div>
        <template>
          <v-btn color="primary" class="Export float-right">
              Export
          </v-btn>
      </template>
      <v-spacer></v-spacer>
      <template>
          <v-btn color="primary" class="NopCV">
              Nộp CV
          </v-btn>
      </template>
      <template>
          <v-btn color="success" class="NopBC">
              Nộp Báo Cáo
          </v-btn>
      </template>
      <v-spacer></v-spacer>
      <template>
          <v-btn color="primary">
              Tạo CV
          </v-btn>
      </template>
    </div>
    
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
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
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    numbers: [],
    dialog: false,
    dialogDelete: false,
    delete: 0,
    page: 1,
    pageCount: 0,
    itemsPerPage: 4,
    headers: [
      {
        text: "STT",
        align: "start",
        value: "number"
      },
      { text: "ID", value: "id" },
      { text: "Name", value: "Name" },
      { text: "Class", value: "Class" },
      { text: "Company", value: "Company" },
      { text: "Internship Diary", value: "InternshipDiary" },
      { text: "CV", value:"Cv"},
      { text: "Report", value:"Report"},
      { text: "Status", value: "Status", sortable: false },
      { text: "Actions", value: "actions", sortable: false }
    ],
    ListDiary: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      class: "",
      company: "",
      status: false,
    },
    defaultItem: {
      id: "",
      name: "",
      class: "",
      company: "",
      status: false,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  created() {
    this.initialize();
    this.fornumber();
  },
  methods: {
    initialize() {
      axios
        .get("https://5fd6c5a3ea55c40016042339.mockapi.io/SV")
        .then(response => {
          this.ListDiary = response.data;
        });
    },
    fornumber() {
      axios
        .get("https://5fd6c5a3ea55c40016042339.mockapi.io/SV")
        .then(response => {
          for (this.num = 0; this.num < response.data.length; this.num++) {
            this.arr = {
              stt: this.num + 1
            }
            this.numbers.push(this.arr);
          }
          console.log(this.numbers);
        });
    },
    editItem(item) {
      this.editedIndex = this.ListDiary.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedID = this.editedItem.id;
      this.dialog = true;
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.editedIndex = this.ListDiary.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    deleteItemConfirm() {
      axios.delete(
        "https://5fd6c5a3ea55c40016042339.mockapi.io/SV" +
          this.editedItem.id
      );
      {
        this.ListDiary.splice(this.editedIndex, 1);
        this.closeDelete();
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.ListDiary[this.editedIndex], this.editedItem);
        axios
          .put(
            "https://5fd6c5a3ea55c40016042339.mockapi.io/SV" +
              this.editedItem.id,
            this.editedItem
          )
          .catch(error => {
            console.log(error.response);
          });
      } else {
        this.ListDiary.push(this.editedItem);
        axios
          .post(
            "https://5fd6c5a3ea55c40016042339.mockapi.io/SV",
            this.editedItem
          )
          .catch(error => {
            console.log(error.response);
          });
      }
      this.close();
    }
  }
};
</script>
<style scoped>
.NopCV{
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #01a1ff;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #01a1ff;
}
.theme--light.v-pagination .v-pagination__item--active {
    color: #ff0000;
}
.Export{
    margin-top: 5px;
}
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