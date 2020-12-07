<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="arrCompanies"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >New Item</v-btn
              >
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >New Item</v-btn
              >
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
                        label="Tên"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.taxCode"
                        label="Mã số thuế"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.address"
                        label="Địa chỉ"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.website"
                        label="Website"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phoneNumber"
                        label="Số điện thoại"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.mail"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  data: () => ({
    dialog: false,
    arrCompanies: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      taxCode: "",
      address: "",
      website: "",
      phoneNumber: "",
      mail: "",
    },
    defaultItem: {
      id: 0,
      name: "",
      taxCode: "",
      address: "",
      website: "",
      phoneNumber: "",
      mail: "",
    },
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Tên công ty", value: "name" },
      { text: "Mã số thuế", value: "taxCode" },
      { text: "Địa chỉ", value: "address" },
      { text: "Website", value: "website" },
      { text: "SDT", value: "phoneNumber" },
      { text: "Mail", value: "mail" },
      { text: "Chức năng", value: "actions", sortable: false },
    ],
    // arrInStructor: [
    //   {
    //     id: 1,
    //     name: "Nguyễn Huy Hoàng",
    //     school: "TDC",
    //     companyId: 1,
    //     isEnable: false,
    //   },
    //   {
    //     id: 2,
    //     name: "Phan Thanh Nhuan",
    //     school: "TDC",
    //     companyId: 1,
    //     isEnable: false,
    //   },
    //   {
    //     id: 3,
    //     name: "Le Tho",
    //     school: "TDC",
    //     companyId: 3,
    //     isEnable: false,
    //   },
    // ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Company" : "Edit Company";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.initialize();
  },
  // mounted(){
  //   axios.get
  // }
  methods: {
    initialize() {
      this.arrCompanies = [
        {
          id: 1,
          name: "Công ty 1",
          taxCode: "1A",
          address: "p.Linh Đông, quận Thủ Đức",
          website: "congty1.com",
          phoneNumber: "01010101",
          mail: "congty1@gmail.com",
        },
        {
          id: 2,
          name: "Công ty 2",
          taxCode: "2A",
          address: "p.Linh Tây, quận Thủ Đức",
          website: "congty2.com",
          phoneNumber: "0202020202",
          mail: "congty2@gmail.com",
        },
        {
          id: 3,
          name: "Công ty 3",
          taxCode: "3A",
          address: "p.Linh Trung, quận Thủ Đức",
          website: "congty3.com",
          phoneNumber: "03030303",
          mail: "congty3@gmail.com",
        },
        {
          id: 4,
          name: "Công ty 4",
          taxCode: "4A",
          address: "p.Linh Đông, quận Thủ Đức",
          website: "congty4.com",
          phoneNumber: "0404040404",
          mail: "congty4@gmail.com",
        },
      ];
    },
    editItem(item) {
      this.editedIndex = this.arrCompanies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.arrCompanies.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.arrCompanies.splice(index, 1);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.arrCompanies[this.editedIndex], this.editedItem);
      } else {
        this.editedItem.id = this.arrCompanies.length + 1;
        this.arrCompanies.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style></style>
