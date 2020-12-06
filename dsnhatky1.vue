<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>DANH SÁCH CHI TIẾT TUẦN</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="STT"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Tiêu Đề"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Thời Gian"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Công Việc Được Giao"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Nội Dung Kết Qủa Thực Hiện"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Trạng Thái"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Nhật Kí Thực Tập"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Sự Kiện"
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
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
    <template>
      <div class="text-center">
        <v-pagination v-model="page" :length="6"></v-pagination>
      </div> </template >
      </v-data-table>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "STT",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Tiêu Đề", value: "tieude" },
      { text: "Thời Gian", value: "start" },
      { text: "Công Việc Được Giao", value: "cv" },
      { text: "Nội Dung Thực Hiện", value: "content" },
      { text: "Trạng Thái", value: "trangthai" },
      { text: "Nhật Kí Thực Tập", value: "nhatkithuctap" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
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
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "1",
          tieude: "Thứ 2",
          start: "7:15' - 11:15'",
          cv: "Thiết Kế Giao Diện",
          content: "Thiết kế 5 màn hình  ",
          trangthai: "Browser",
          nhatkithuctap: "....",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "2",
          tieude: "Thứ 3",
          start: "7:15' - 11:15'",
          cv: "Viết Content cho Website",
          content:
            "Trong khoảng thời gian yêu cầu viết content hoàn chình cho Web ",
          trangthai: "Browser",
          nhatkithuctap: "....",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "3",
          tieude: "Thứ 4",
          start: "7:15' - 11:15'",
          cv: "Viết Content cho Website",
          content: "Trong khoảng thời gian yêu cầu lấy ý kiến khách hàng ",
          trangthai: "Browser",
          nhatkithuctap: "....",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "4",
          tieude: "Thứ 5",
          start: "7:15' - 11:15'",
          cv: "Viết Content cho Website",
          content: "Trong khoảng thời gian yêu cầu báo cáo tiến độ ",
          trangthai: "Browser",
          nhatkithuctap: "....",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: "5",
          tieude: "Thứ 6",
          start: "7:15' - 11:15'",
          cv: ".......",
          content: ".......",
          trangthai: ".......",
          nhatkithuctap: "....",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: "6",
          tieude: "Thứ 7",
          start: "7:15' - 11:15'",
          cv: ".......",
          content: ".......",
          trangthai: ".......",
          nhatkithuctap: "....",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: "7",
          tieude: "Chủ Nhật",
          start: "7:15' - 11:15'",
          cv: ".......",
          content: ".......",
          trangthai: ".......",
          nhatkithuctap: "....",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
      ];
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
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style>
.v-toolbar__content{
  border: 1px solid black;
    height: 56px;
    text-align: center;
    padding-left: 197px;
    color: red;
height: 56px;padding-left: 167px;
}
.v-application{
  text-align: center;
  border: 2px solid blue;
}
.v-data-table-header{
background: #3333FF;
}
</style>