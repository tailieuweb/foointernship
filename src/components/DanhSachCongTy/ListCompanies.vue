<template>
  <div class="container">
    <v-data-table
      :loading="isLoading"
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="arrCompanies"
      :search="search"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="green lighten-1"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                ><v-icon medium>mdi-plus</v-icon></v-btn
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

        <v-icon small @click="getIndexDelete(item)">mdi-delete</v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogConfirm" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">
              Xác nhận xóa
            </v-card-title>
            <v-card-text>Bạn có muốn xóa ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialogConfirm = false">
                Thoát
              </v-btn>
              <v-btn color="red darken-1" text @click="deleteItem()">
                Xóa
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
const RESOURCE_COMPANIES =
  "https://5fccb251603c0c0016487121.mockapi.io/companies";
export default {
  data: () => ({
    isLoading: true,
    search: "",
    indexDelete: -1,
    dialogConfirm: false,
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
        sortable: true,
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
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Company" : "Edit Company";
    },
    dataUpdate() {
      return this.initialize();
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
  methods: {
    initialize() {
      this.axios
        .get(`${RESOURCE_COMPANIES}`)
        .then((res) => {
          this.arrCompanies = res.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editItem(item) {
      this.editedIndex = this.arrCompanies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    getIndexDelete(item) {
      this.dialogConfirm = true;
      this.editedItem = Object.assign({}, item);
      this.indexDelete = this.arrCompanies.indexOf(item);
    },
    deleteItem() {
      this.dialogConfirm = false;
      this.axios
        .delete(`${RESOURCE_COMPANIES}/${this.editedItem.id}`)
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          this.initialize();
        });
      this.arrCompanies.splice(this.indexDelete, 1);
      this.indexDelete = -1;
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

        this.axios
          .put(`${RESOURCE_COMPANIES}/${this.editedItem.id}`, this.editedItem)
          .catch((error) => {
            console.log(error.response);
          })
          .then(() => {
            this.initialize();
          });
      } else {
        this.axios
          .post(`${RESOURCE_COMPANIES}`, this.editedItem)

          .catch(function(error) {
            console.log(error);
          })
          .then(() => {
            this.initialize();
          });
      }
      this.close();
    },
  },
};
</script>

<style></style>
