<template>
  <v-app>
    <v-container>
      <div class="row">
        <div class="col-xs-12 col-sm-8">
          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <v-select label="Course" outlined clearable></v-select>
              <v-select label="Teacher" outlined clearable></v-select>
            </div>
            <div class="col-xs-12 col-sm-6">
              <v-select
                label="Class"
                outlined
                clearable
                :items="columnValueList('class')"
                v-model="filters['class']"
              >
                ></v-select
              >
              <v-select
                label="Company"
                outlined
                clearable
                :items="columnValueList('company')"
                v-model="filters['company']"
              ></v-select>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-4">
          <v-text-field
            class="mt-3"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            outlined
            hide-details
          ></v-text-field>
        </div>
      </div>
      <v-data-table
        :headers="headers"
        :items="filteredStudentsWithIndex"
        :search="search"
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
                        <v-select
                          v-model="selectedStatus"
                          :items="status"
                          label="Status"
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
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
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
        <template v-slot:[`item.diaryDetails`]>
          <router-link :to="'/diaryDetails'" class="link">
            See details</router-link
          >
        </template>
        <template v-slot:[`item.cv`]>
          <a class="link" outlined href="cv.pdf" download>
            cv.pdf
          </a>
          <v-icon small class="mr-2">
            mdi-download
          </v-icon>
        </template>
        <template v-slot:[`item.report`]>
          <a class="link" outlined href="report.pdf" download>
            report.pdf
          </a>
          <v-icon small class="mr-2">
            mdi-download
          </v-icon>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ changeStatus(item) }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="list_students"> Reset </v-btn>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
        class="mb-10"
      ></v-pagination>
      <div class="row">
        <div class="col-md-4">
          <template>
            <v-btn color="primary" dark class="mb-2 mr-5 w-150">
              Submit CV
            </v-btn>
          </template>
          <template>
            <v-btn color="primary" dark class="mb-2 mr-5 w-150">
              Create CV
            </v-btn>
          </template>
        </div>
        <div class="col-md-4">
          <template>
            <v-btn color="primary" dark class="mb-2 mr-5 w-150">
              Submit Report
            </v-btn>
          </template>
          <template>
            <v-btn color="primary" dark class="mb-2 mr-5 w-150">
              Create Report
            </v-btn>
          </template>
        </div>
        <div class="col-md-4">
          <template>
            <v-btn color="primary" dark class="mb-2 w-150" @click="clickExport">
              Export
            </v-btn>
          </template>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
const RESOURCE_STUDENT =
  "https://5fc9e4df3c1c22001644136d.mockapi.io/api/internship/students";
export default {
  data: () => ({
    search: "",
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    dialogDelete: false,
    status: ["Approved", "Not Approved"],
    selectedStatus: "",
    headers: [
      {
        text: "#",
        value: "index",
      },
      {
        text: "ID",
        value: "id",
      },
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "Class", value: "class" },
      { text: "Company", value: "company" },
      { text: "Internship Diary", value: "diaryDetails" },
      { text: "CV", value: "cv" },
      { text: "Report", value: "report" },
      { text: "Status", value: "status", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    students: [],
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
    filters: {
      class: [],
      company: [],
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    filteredStudentsWithIndex() {
      return this.filteredStudents.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
    filteredStudents() {
      return this.students.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
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

  methods: {
    list_students() {
      this.axios.get(`${RESOURCE_STUDENT}`).then((response) => {
        this.students = response.data;
      });
    },

    changeStatus(item) {
      return item.status === true ? "Approved" : "Not Approved";
    },

    editItem(item) {
      this.editedIndex = this.filteredStudentsWithIndex.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.filteredStudentsWithIndex.indexOf(item);
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
      if (this.selectedStatus === "Approved") {
        this.editedItem.status = true;
      } else {
        this.editedItem.status = false;
      }

      if (this.editedIndex > -1) {
        Object.assign(
          this.filteredStudentsWithIndex[this.editedIndex],
          this.editedItem
        );
        this.axios
          .put(`${RESOURCE_STUDENT}/${this.editedItem.id}`, this.editedItem)
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        this.axios
          .post(`${RESOURCE_STUDENT}`, this.editedItem)
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
        setTimeout(this.list_students, 500);
      }
      this.close();
    },
    columnValueList(val) {
      return this.students.map((d) => d[val]);
    },

    getColor(status) {
      if (status === true) return "green";
      else return "red";
    },

    clickExport() {
      this.$router.push("/ExportStudents");
    },
  },
};
</script>
