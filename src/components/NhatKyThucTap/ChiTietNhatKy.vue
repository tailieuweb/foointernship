<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template #item.nhatky="{ item }">
        <a target="_blank" :href="item.nhatky">
          {{ item.nhatky }}
        </a>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <div class="title" style="padding-left: 45%;">
            <v-toolbar-title>Chi Tiết Nhật Ký</v-toolbar-title>
          </div>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                style="margin-top: 10%;"
              >
                Ngày Mới
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
                        disabled
                        v-model="editedItem.id"
                        label="STT"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.tieude"
                        label="Tiêu đề"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.thoigian"
                        label="Thời gian"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-textarea
                        label="Công việc được giao"
                        auto-grow
                        outlined
                        rows="1"
                        row-height="20"
                        v-model="editedItem.congviec"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-textarea
                        label="Nội dung kết quả thực hiện"
                        auto-grow
                        outlined
                        rows="1"
                        row-height="20"
                        v-model="editedItem.noidung"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.trangthai"
                        label="Trang thái"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-file-input
                        counter
                        multiple
                        placeholder="Input file"
                        label="Nhật ký thực tập"
                        @change="onAddFiles"
                      ></v-file-input>
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
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    files: [],
    dialog: false,
    dialogDelete: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 4,
    headers: [
      {
        text: "STT",
        align: "start",

        value: "id"
      },
      { text: "Tiêu đề", value: "tieude" },
      { text: "Thời gian", value: "thoigian" },
      { text: "Công việc được giao", value: "congviec" },
      { text: "Nội dung kết quả thực hiện", value: "noidung" },
      { text: "Trạng thái", value: "trangthai", sortable: false },
      { text: "Nhật ký thực tập", value: "nhatky", sortable: false },
      { text: "Sự kiện", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      number: "",
      tieude: "",
      thoigian: "",
      congviec: "",
      noidung: "",
      trangthai: "Not approved",
      nhatky: ""
    },
    defaultItem: {
      number: "",
      tieude: "",
      thoigian: "",
      congviec: "",
      noidung: "",
      trangthai: "",
      nhatky: ""
    },
    origin: ""
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
  },

  methods: {
    initialize() {
      axios
        .get(
          "https://5fc999fb3c1c220016440daf.mockapi.io/user/nhatky/chitietnhatky/" /*+this.$http.get()*/
        )
        .then(response => {
          this.desserts = response.data;
        });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios.delete(
        "https://5fc999fb3c1c220016440daf.mockapi.io/user/nhatky/chitietnhatky/" +
          this.editedItem.id
      );
      this.desserts.splice(this.editedIndex, 1);
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
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        axios
          .put(
            "https://5fc999fb3c1c220016440daf.mockapi.io/user/nhatky/chitietnhatky/" +
              this.editedItem.id,
            this.editedItem
          )
          .catch(error => {
            console.log(error.response);
          });
      } else {
        this.desserts.push(this.editedItem);
        axios
          .post(
            "https://5fc999fb3c1c220016440daf.mockapi.io/user/nhatky/chitietnhatky/",
            this.editedItem
          )
          .catch(error => {
            console.log(error.response);
          });
      }
      this.close();
    },
    onAddFiles(files) {
      files.forEach(file => {
        this.editedItem.nhatky = file.name;
      });
    }
  }
};
</script>