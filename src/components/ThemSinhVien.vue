<template>
  <v-app>
    <v-container>
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
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.mssv"
                          label="MSSV"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Student name"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.class"
                          label="Class"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.company"
                          label="Company"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nguoihuongdan"
                          label="Người hướng dẫn"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedItem.status"
                          :items="status"
                          label="Status"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedItem.leturer"
                          label="Leturer"
                        ></v-select>
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
</template>

<script>
const RESOURCE_STUDENT =
  "https://5fcd0eb2603c0c0016487546.mockapi.io/api/users";
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
        text: "MSSV",
        value: "mssv",
      },
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "Class", value: "class" },
      { text: "Company", value: "company" },
      { text: "Người hướng dẫn", value: "nguoihuongdan" },
      { text: "Status", value: "status", sortable: true },
      { text: "Leturer", value: "leturer" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    students: [],
    numbers: 0,
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      class: "",
      company: "",
      status: false,
      nguoihuongdan: "",
      leturer: "",

    },
    defaultItem: {
      id: "",
      name: "",
      class: "",
      company: "",
      status: false,
      nguoihuongdan: "",
      leturer: "",
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
