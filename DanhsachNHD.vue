<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      sort-by="calories"
      class="elevation-1"
      :hide-default-footer="true"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>DANH SÁCH NGƯỜI HƯỚNG DẪN</v-toolbar-title>
          <v-spacer></v-spacer>
           <v-select class="mb-2" :items="items" label="Công Ty"></v-select>
          <v-dialog v-model="dialog" max-width="500px">
            
            <template v-slot:activator="{ on, attrs }">
             
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Thêm Người
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
                        v-model="editedItem.name"
                        label="Nhập tên"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.chucvu"
                        label="Nhập chức vụ"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Nhập Phone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Nhập Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                       <v-select class="mb-2" :items="items"  v-model="editedItem.idcyv" label="Công Ty"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Hủy </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Lưu </v-btn>
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
    <div class="text-center pt-2">
     <v-pagination
      v-model="page"
      :length="3"
      circle
    ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    dialogDelete: false,
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    headers: [
      {
        text: "#",
        align: "start",
        sortable: false,
        value: "idm",
      },
      { text: "Tên Người hướng dẫn", value: "name", sortable: true },
      { text: "Chức vụ", value: "chucvu", sortable: false },
      { text: "Phone", value: "phone", sortable: false },
      { text: "Email", value: "email" , sortable: false},
      { text: "Tên Công Ty", value: "namecv", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
     
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      chucvu: "",
      phone: "",
      email: "",
      idcyv:"",
    },
    defaultItem: {
      name: "",
      chucvu: "",
      phone: "",
      email: "",
      idcyv:"",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm Người Hướng Dẫn" : "Sữa Người Hướng Dẫn";
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
          idm:"1",
          name: "Trần Ngọc Nghĩa",
          chucvu: "Lập Trình Viên",
          phone: "0123456789",
          email: "Toikhongbiet@gmail.com",
          namecv:"Công Ty Bầu Trời Mới"
        },
        {
          idm:"2",
          name: "Trần Ngọc Nghĩa",
          chucvu: "Lập Trình Viên",
          phone: "0123456789",
          email: "Toikhongbiet@gmail.com",
          namecv:"Công Ty Bầu Trời Mới"
        },
        {
          idm:"3",
          name: "Trần Ngọc Nghĩa",
          chucvu: "Lập Trình Viên",
          phone: "0123456789",
          email: "Toikhongbiet@gmail.com",
          namecv:"Công Ty Bầu Trời Mới"
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
.v-toolbar__content {
  border: 1px solid white;
  height: 56px;
  text-align: center;
  padding-left: 197px;
  color: red;
  height: 56px;
  padding-left: 167px;
}
.v-application {
  text-align: center;
  border: 2px solid;
}
.v-data-table-header {
  background: #6699FF;
  color: white;
}
.v-toolbar__title {
  padding-left: 480px;
}
.class {
  background: #3366cc;
}
.text-start {
  border: 1px solid #0066ff;
}
.theme--light.v-data-table .v-data-table-header th.sortable:hover, .theme--light.v-data-table .v-data-table-header th.sortable.active {
  font-size: 14px;
  color: black !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 14px;
  color: black !important;
}
.v-data-table{
  margin-top: 100px;
}
.v-input__control{
  width: 2px !important;
  margin-top: 20px;
  margin-right: 40px;
}

</style>