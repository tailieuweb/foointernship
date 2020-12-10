<template>
  <div class="container">
    <v-data-tabl
      :headers="headers"
      :items="LitDiary"
      sort-by="calorie"
      class="elevation-"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template #item.numbe="" v-for="arr in numbers">
        <span :key="arr"></span>
        {{ arr.stt }}
      </template>

      <template #item.nhatky="{ item }">
        <router-link :to="'/chitietnhatky/id=' + item.idchitiet">
          {{ item,nhatky }}</router-link
        >
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <div class="title" style="padding-left: 45%;">
            <v-toolbar-title>Danh Sách Tuần</v-toolbar-title>
          </div>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                style="margin-top: 10%;"
              >
                Tuần Mới
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline" style="padding-left: 35%;">{{
                  formTitle
                }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.tieude"
                        label="Tiêu đề tuần"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.ngaybatdau"
                        label="Ngày bắt đầu"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.ngayketthuc"
                        label="Ngày kết thúc"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.trangthai"
                        label="Trạng Thái"
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
        <v-icon small class="m-2" click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @lick="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>

    <div class="export">
      <v-btn
        style="margin-top: 2%;margin-left: 70%; color: white;background-color: #4f9aef;"
      >
        Export
      </v-btn>
    </div>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    numbers: [],
    dialog: fals
    dialogDelete: false,
    delete: 0,
    page: 1,
    pageCount: 
    itemsPerPage: 4,
    headers: [
      {
        text: "STT",
        align: "start",

        value: "number"
      },
      { text: "ID", value: "id" },
      { text: "Tiêu đề", value: "tieude" },
      { text: "Ngày bắt đầu", value: "ngaybatdau" },
      { text: "Ngày kết thúc", value: "ngayketthuc" },
      { text: "Trạng thái", value: "trangthai", sortable: false },
      { text: "Nhật ký theo tuần", value: "nhatky" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    ListDiary: [],
    editedIndex: -1,
    editedItem: {
      number: "",
      tieude: "",
      ngaybatdau: "",
      ngayketthuc: "",
      trangthai: "Not approved",
      nhatky: "See detail"
    },
    defaultItem: {
      number: "",
      tieude: "",
      ngaybatdau: "",
      ngayketthuc: "",
      trangthai: "Not approved",
      nhatky: "See detail"
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm Tuần" : "Sửa Tuần";
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
        .get("https://5fc999fb3c1c220016440daf.mockapi.io/user/nhatky/dstuan/")
        .then( => {
          this.ListDiary;
        });
    },
    fornumber() {
      axios
        .get("https://5fc999fb3c1c220016440daf.mockapi.io/user/nhatky/dstuan/")
        .then( => {
          for (this.num = 0; this.num < length; this.num++) {
            this.arr = {
              stt: this.num + 1
            };
            this.numbers.push(this.arr);
          }
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
        "https://5fc999fb3c1c220016440daf.mockapi.io/user/nhatky/dstuan/"
      );
      {
        this.ListDia.spli(this.editedIndex, 1);
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
            "https://5fc999fb3c1c220016440daf.mockapi.io/user/nhatky/dstuan/" 
            this.editedItem
          )
          .catch(error => {
            console.log(error.response);
          });
      } else {
        this.ListDiary.push(this.editedItem);
        axios
          .post(
            "https://5fc999fb3c1c220016440daf.mockapi.io/user/nhatky/dstuan/",
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
<style>
.v-data-table__wrapper {
  padding-top: 5%;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #4f9aef !important;
}
.v-data-table-header {
  background-color: cornflowerblue;
}
.v-application a {
  color: #3c3c3c !important;
}
</style>
