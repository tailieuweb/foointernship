<template>

  <v-app>
    <v-container >
      <div class="top" style="text-align: center;">
        <h1>Danh Sách Giảng Viên</h1>
      </div>

      <div class="col-4">
          <v-text-field
          class="mt-4"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </div>
      
      <v-data-table
        :headers="headers"
        :items="giangvien"
        sort-by="id"
        class="elevation-1 "
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
    
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px" >
              <template v-slot:activator="{ on, attrs }" >
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
                <v-card-title >
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container >
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.Name"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.Tranercode"
                          label="Mã Số GV"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.Class"
                          label="Lớp"
                        ></v-text-field>
                      </v-col>
                      <hr>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.DayStart"
                          label="Ngày Bắt Đầu"
                        ></v-text-field>
                      </v-col>
                       <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.DayEnd"
                          label="Ngày Kết Thúc"
                        ></v-text-field>
                      </v-col>
                      
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions >
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
            <v-dialog v-model="dialogDelete" max-width="500px" >
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
     
        <template v-slot:[`item.actions`]="{ item }" >
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data >
          <v-btn color="primary" @click="list_giangvien">
            Reset
          </v-btn>
        </template>
      </v-data-table>
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </v-container>
  </v-app>
  
</template>

<script>
const RESOURCE_GIANGVIEN =
  "https://5fd5d44966125e0016500945.mockapi.io/GiangVien";
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
        value: "id",
      },
      {
        text: "Name",
        align: "start",
        value: "Name",
      },
      { text: "Mã Số Giảng Viên", value: "Tranercode" },
      { text: "Lớp Phụ Trách", value: "Class" },
      { text: "Ngày Bắt Đầu", value: "DayStart" },
      {text: "Ngày Kết Thúc", value: "DayEnd"},
      { text: "Thao Tác", value: "actions", sortable: false },
    ],
    giangvien: [],
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
      return this.editedIndex === -1 ? "Thêm Giảng Viên" : "Edit Item";
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
    this.list_giangvien();
  },

  ready() {
    this.list_giangvien();
  },

  methods: {
    list_giangvien() {
      this.axios.get(`${RESOURCE_GIANGVIEN}`).then((response) => {
        this.giangvien = response.data;
        this.numbers = this.giangvien.length;
        console.log("numbers", this.numbers);
      });
      setTimeout(this.list_giangvien, 3000);
    },

    editItem(item) {
      this.editedIndex = this.giangvien.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.giangvien.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.axios
        .delete(`${RESOURCE_GIANGVIEN}/${this.editedItem.id}`)
        .then((response) => {
          console.log(response);
          console.log(this.editedItem.id);
        });
      this.giangvien.splice(this.editedIndex, 1);
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
        Object.assign(this.giangvien[this.editedIndex], this.editedItem);
        this.axios
          .put(RESOURCE_GIANGVIEN + "/" + this.editedItem.id, this.editedItem)
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        this.axios
          .post(`${RESOURCE_GIANGVIEN}`, self.editedItem)
          .then(function(response) {
           
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
.v-data-table-header{
  background: #564fef;
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
.v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
    background: yellow;
}
</style>

