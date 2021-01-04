<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="ListDiary"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      :hide-default-footer="true"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="padding-left: 558px"
            >DANH SÁCH CHI TIẾT TUẦN</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- SeachId -->
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <!-- End -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                ADD Student
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.TieuDe"
                        label="Tiêu Đề"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.ThoiGian"
                        label="Thời Gian"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.CongViecDuocGiao"
                        label="Công Việc Được Giao"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.NoiDungKetQuaThucHien"
                        label="Nội Dung Kết Qủa Thực Hiện"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.TrangThai"
                        label="Trạng Thái"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.nhatkithuctap"
                        label="Nhật Kí Thực Tập"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Exits </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Bạn có chắc chắn muốn xóa ?</v-card-title
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
   <template>
            <v-btn color="primary" dark class="mb-2 w-150" @click="clickExport">
              Export
            </v-btn>
          </template>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="4" circle></v-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    search: "",
    numbers: [],
    dialog: false,
    dialogDelete: false,
    delete: 0,
    page: 1,
    pageCount: 0,
    itemsPerPage: 8,
    // Seach
    headers: [
      {
        text: "STT",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Tiêu Đề", value: "TieuDe" },
      { text: "Thời Gian", value: "ThoiGian" },
      { text: "Công Việc Được Giao", value: "CongViecDuocGiao" },
      { text: "Nội Dung Thực Hiện", value: "NoiDungKetQuaThucHien" },
      { text: "Trạng Thái", value: "TrangThai" },
      { text: "Nhật Kí Thực Tập", value: "nhatkithuctap" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    ListDiary: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      TieuDe: "",
      ThoiGian: "",
      CongViecDuocGiao: "",
      NoiDungKetQuaThucHien: "",
      trangthai: "Not approved",
      nhatkithuctap: "See detail",
    },

    defaultItem: {
      id: "",
      TieuDe: "",
      ThoiGian: "",
      CongViecDuocGiao: "",
      NoiDungKetQuaThucHien: "",
      trangthai: "Not approved",
      nhatkithuctap: "See detail",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm Tuần" : "Sửa Tuần";
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
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get(
          "https://5fd5c68f66125e0016500831.mockapi.io/api/project/Dairylist"
        )
        .then((Response) => {
          this.ListDiary = Response.data;
        });
    },

    editItem(item) {
      this.editedIndex = this.ListDiary.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedID = this.editedItem.id;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.ListDiary.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios.delete(
        "https://5fd5c68f66125e0016500831.mockapi.io/api/project/Dairylist/" +
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
            "https://5fd5c68f66125e0016500831.mockapi.io/api/project/Dairylist/" +
              this.editedItem.id,
            this.editedItem
          )
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        this.ListDiary.push(this.editedItem);
        axios
          .post(
            "https://5fd5c68f66125e0016500831.mockapi.io/api/project/Dairylist/",
            this.editedItem
          )
          .catch((error) => {
            console.log(error.response);
          });
      }
      this.close();
    },
    clickExport() {
      this.$router.push("/ExportDairyDetail");
    },
  },
};
</script>
<style>
.v-toolbar__content {
  height: 56px;
  text-align: center;
  padding-left: 197px;
  color: red;
  height: 56px;
  padding-left: 167px;
}
.v-application {
  text-align: center;
}
.v-data-table-header {
  background: #6699ff;
  color: white;
}
.v-toolbar__title {
  padding-left: 587px;
}
.class {
  background: #3366cc;
}
.text-start {
  border-radius: 1px solid #0066ff;
}
</style>
