<template>
  <v-app>
    <v-container>
       <v-row>
      <v-col md="6">
        TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THỦ ĐỨC <br />
        KHOA CÔNG NGHỆ THÔNG TIN
      </v-col>

      <v-col md="6">
        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM <br />
        Độc Lập - Tự Do- Hạnh Phúc
      </v-col> </v-row
    ><br />
    <v-row>
      <v-col md="6"> </v-col>
      <v-col md="6"> TP.Hồ Chí Minh Ngày....Tháng....Năm 20.... </v-col> </v-row
    ><br />
    <v-row>
      <v-col md="4"> </v-col>
      <v-col md="5">
        DANH SÁNH NHẬT KÍ THỰC TẬP <br />
        <div class="a">KHÓA 2018 - 2020</div>
        <div class="b">Chuyên Nghành: CÔNG NGHỆ THÔNG TIN</div>
      </v-col>
      <v-col md="3"> </v-col><br />
      <v-col md="0"> Giảng viên:..... </v-col> </v-row
    ><br />
      <b class="mr-4">{{ numberofStudents }}</b>
      <label>Nhat Ki</label>
      <v-spacer />
      <b class="mr-2">10</b>
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
                :data="filteredDairyDetailListsWithIndex"
                :fields="json_fields"
                worksheet="My Worksheet"
                name="nhatkithuctap.xls"
              >
                Export
              </download-excel>
            </v-btn>
          </template>
        </div>
      </div>
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
        text: "Tiêu Đề",
        value: "id",
      },
      {
        text: "Trạng Thái",
        align: "start",
        value: "name",
      },
      { text: "Thời Gian Bắt Đầu", value: "class" },
      { text: "Thời Gian Kết Thúc", value: "company" },
      { text: "Nội Dung Nhật kí", value: "company" },
    ],
    students: [],
    filters: {
      class: [],
      company: [],
    },
    file: ["Excel", "PDF"],
    json_fields: {
      STT: "index",
      TieuDe: "id",
      "TrangThai": "name",
     "Thời Gian Bắt Đầu": "class",
      "Thời Gian Kết Thúc": "company",
      "Nội Dung Nhật kí": "company",
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
    columnValueList(val) {
      return this.students.map((d) => d[val]);
    },
  },
};
</script>