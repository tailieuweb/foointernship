<template>
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
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
      hide-default-footer
    ></v-data-table>
    <div>
      <v-col md="3"> </v-col>
      <v-col md="3"></v-col>
      <v-col md="3">
        <div class="ac">
          <v-select
            v-model="selection"
            :items="items"
            multiple
            label="Select an option"
          ></v-select>
          <div class="btn"><v-btn block> Export </v-btn></div>
        </div>
      </v-col>
      <v-col md="3"> </v-col>
    </div>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="4" circle></v-pagination>
    </div>
  </v-container>
</template>
<script>
import axios from 'axios';
export default { mounted() {
        axios
          .get(
            "https://5fd5c68f66125e0016500831.mockapi.io/api/project/Dairylist"
          )
          .then((response) => (this.info = response));
          console.log(this.info)
    
      },
  data() {
   
    return {
      info: null,
      page: 1,
      items: ["PDF", ".doc"],
      desserts: [],
      headers: [
        {
           
          text: "STT",
          align: "start",
          sortable: false,
          value: "STT",
        },
        { text: "Tiêu Đề", value: "tieude" },
        { text: "Trạng Thái", value: "all" },
        { text: "Thời Gian Bắt Đầu", value: "timestart" },
        { text: "Thời Gian Kết Thúc", value: "timefinish" },
        { text: "Nội Dung Nhật Kí Thực Tập", value: "contentdiary" },
      ],

    };
  }, 

}
</script>
<style>
.a {
  padding-left: 10%;
}
.b {
  padding-right: 10%;
}
.v-btn {
  background: blue;
}
</style>
