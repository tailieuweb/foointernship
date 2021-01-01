<template>
  <v-app>
    <v-container>
      <b class="mr-4">{{ numberofStudents }}</b>
      <label> Sinh viên</label>
      <v-spacer />
      <b class="mr-2">{{ numberofCompanies }}</b>
      <label> Công ty</label>
      <div class="row">
        <div class="col-xs-12 col-sm-4">
          <v-select label="Course" outlined clearable></v-select>
          <v-select label="Teacher" outlined clearable></v-select>
        </div>
        <div class="col-xs-12 col-sm-4">
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
        <div class="col-xs-12 col-sm-4">
          <v-select
            label="Choose export file"
            outlined
            clearable
            :items="file"
          ></v-select>
          <template>
            <v-btn color="primary" dark class="mb-2 mr-5 w-150">
              <download-excel
                class="btn btn-default"
                :data="filteredStudentsWithIndex"
                :fields="json_fields"
                worksheet="My Worksheet"
                name="listStudents.xls"
              >
                Export
              </download-excel>
            </v-btn>
          </template>
        </div>
      </div>
      <v-data-table
        :headers="headers"
        :items="filteredStudentsWithIndex"
        sort-by="id"
        class="elevation-1"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
      >
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
        class="mb-10"
      ></v-pagination>
    </v-container>
  </v-app>
</template>

<script>
const RESOURCE_STUDENT =
  "https://5fc9e4df3c1c22001644136d.mockapi.io/api/internship/students";
const RESOURCE_COMPANY =
  "https://5fc9e4df3c1c22001644136d.mockapi.io/api/internship/companies";
export default {
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    headers: [
      {
        text: "STT",
        value: "index",
      },
      {
        text: "MSSV",
        value: "id",
      },
      {
        text: "HỌ VÀ TÊN",
        align: "start",
        value: "name",
      },
      { text: "LỚP", value: "class" },
      { text: "TÊN, ĐỊA CHỈ, SDT CÔNG TY THỰC TÂP", value: "company" },
      { text: "NGƯỜI HƯỚNG DẪN TẠI CÔNG TY (KÈM SDT)", value: "company" },
    ],
    students: [],
    companies: [],
    filters: {
      class: [],
      company: [],
    },
    file: ["Excel", "PDF"],
    json_fields: {
      STT: "index",
      MSSV: "id",
      "Họ và tên": "name",
      Lớp: "class",
      "TÊN, ĐỊA CHỈ, SDT CÔNG TY THỰC TÂP": "company",
      "NGƯỜI HƯỚNG DẪN TẠI CÔNG TY (KÈM SDT)": "company",
    },
  }),
  computed: {
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
    numberofStudents() {
      return this.students.length;
    },
    numberofCompanies() {
      return this.companies.length;
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
    this.list_companies();
  },

  methods: {
    list_students() {
      this.axios.get(`${RESOURCE_STUDENT}`).then((response) => {
        this.students = response.data;
      });
    },
    list_companies() {
      this.axios.get(`${RESOURCE_COMPANY}`).then((response) => {
        this.companies = response.data;
      });
    },
    columnValueList(val) {
      return this.students.map((d) => d[val]);
    },
  },
};
</script>
