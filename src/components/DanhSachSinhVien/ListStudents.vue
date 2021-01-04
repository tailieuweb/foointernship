<template>
<v-app>
  <v-container>
    <v-app id="inspire">
        <v-row wrap>
          <v-col md="3">
              <v-select label="Năm học" outlined clearable :items="namhocs"></v-select>
              <v-select label="Giảng viên" outlined clearable :items='giangviens'></v-select>
          </v-col>
           <v-col md="3">
              <v-select label="Học kì" outlined clearable :items="hockis"></v-select>
              <v-select label="Công ty" outlined clearable :items="congtys"></v-select>
          </v-col>
        </v-row>
      <v-card-title
        class="justify-center mb-2"
      >
        <span> DANH SÁCH SINH VIÊN </span>
        
        
      </v-card-title>
      
      <v-data-table
        :headers="headers"
        :search="search"
        :items="ListDiaryWithIndex"
        sort-by="calories"
        class="elevation-1"
        hide-default-footer
        :page.sync="page"
        @page-count="pageCount = $event"
        :items-per-page="itemsPerPage"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          ></v-text-field>
              <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-3 them"
                  v-bind="attrs"
                  v-on="on"
                >
                  Thêm
                </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.Mssv"
                        label="MSSV"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.Name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.Class"
                        label="Class"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.Company"
                        label="Company"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.InternshipDiary"
                        label="InternshipDiary"
                      ></v-text-field>
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
            <v-spacer></v-spacer>
            <PopupBM />
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
      <div class="Nut">
        <template>
          <v-btn color="primary" class="Export float-right">
              Export
          </v-btn>
      </template>
      <v-spacer></v-spacer>
      <template>
          <PopupCV />
      </template>
      <template>
          <v-btn color="success" class="NopBC">
              Nộp Báo Cáo
          </v-btn>
      </template>
      <v-spacer></v-spacer>
      <template>
          <v-btn color="primary" class="TaoCV">
              Tạo CV
          </v-btn>
      </template>
       <template>
          <v-btn color="success">
              Tạo Báo Cáo
          </v-btn>
      </template>
    </div>
    
      <div class="text-center mt-3">
         <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </div>
    </v-app>
  </v-container>
</v-app>
</template>

<script>
import axios from "axios";
import PopupCV from './PopupCV'
  export default {
    components: { PopupCV },
    data: () => ({
        namhocs: ['2020-2021', '2019-2020', '2018-2019', '2017-2018'],
        hockis: ['Học Kì I', 'Học Kì II', 'Học Kì hè'],
        giangviens: [ 'Phan Thanh Nhuần', 'Nguyễn Huy Hoàng', 'Lê Minh Thịnh'],
        congtys: [ 'Công ty cổ phần Vinhomes', 'Tập đoàn Điện lực Việt Nam', 'Công ty Cổ phần Đầu tư Thế giới Di động'],
      dialog: false,
      dialogDelete: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 4,
      modalStart: false,
      modalEnd: false,
      status: ['Approved', 'Not Approved'],
      search: '',
      headers: [
        {
          text: 'STT',
          align: 'start',
          value: "index",
          class: 'primary white--text' ,
        },
        { text: 'MSSV', value: 'Mssv', class: 'primary white--text',},
        { text: 'Name', value: 'Name', class: 'primary white--text',},
        { text: 'Class', value: 'Class', class: 'primary white--text',},
        { text: 'Company', value: 'Company', class: 'primary white--text',},
        { text: 'Intership Diary', value: 'InternshipDiary', class: 'primary white--text',},
        { text: 'CV', value: 'Cv', class: 'primary white--text',},
        { text: 'Report', value: 'Report', class: 'primary white--text',},
        { text: 'Status', value: 'Status', class: 'primary white--text',},
        { text: 'Actions', value: 'actions', sortable: false, class: 'primary white--text',},
        
      ],
      data: '',
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        Name: '',
        Class: '',
        Company: '',
        InternshipDiary: '',
      },
      defaultItem: {
        stt: '',
        namhoc: '',
        hocki: '',
        magv: '',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm Sinh Viên' : 'Sửa Sinh Viên'
      },
      ListDiaryWithIndex() {
      return this.desserts.map((items, index) => ({
        ...items,
        index: index + 1
      }));
    }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize() {
      axios
        .get("https://5fd6c5a3ea55c40016042339.mockapi.io/SV")
        .then(response => {
          this.desserts = response.data;
        });
    },
      editItem (item) {
        this.editedIndex = this.ListDiaryWithIndex.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedID = this.editedItem.id;
        this.dialog = true
        
      },
      deleteItem (item) {
        this.editedIndex = this.ListDiaryWithIndex.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      doMath: function(index) {
      return index + 1;
    },
      deleteItemConfirm () {
        {
          axios.delete("https://5fd6c5a3ea55c40016042339.mockapi.io/SV"+"/"+ this.editedItem.id)
        .then(res => {
        console.log(res);
        console.log(res.data);
      })
        }
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          axios.put("https://5fd6c5a3ea55c40016042339.mockapi.io/SV"+"/"+ this.editedItem.id,this.editedItem)
        .then(res => {
        console.log(res);
        console.log(res.data);
       
      })
        } else {
          this.desserts.push(this.editedItem)
          axios.post("https://5fd6c5a3ea55c40016042339.mockapi.io/SV",{
          Mssv: this.editedItem.Mssv,
          Name: this.editedItem.Name,
          Class: this.editedItem.Class,
          Company: this.editedItem.Company,
          InternshipDiary: this.editedItem.InternshipDiary,
          Cv: null,
          Report: null
        })
        .then(res => {
        console.log(res);
        console.log(res.data);
      })
       setTimeout(this.initialize, 500)
        }
        this.close()
      },
    },
  }
</script>
<style scoped>
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #01a1ff;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #01a1ff;
}
.theme--light.v-pagination .v-pagination__item--active {
    color: #ff0000;
}
.Export{
    margin-top: 5px;
}
.text-right3 h3{
  padding-top: 50px;
}
.footer {
  background: #bdbdf9;
  border: 1px solid black;
}
.text-left1 {
  margin-bottom: -28px;
}
.text-right3 {
         padding-left: 1100px;
    padding-top: -27px;
    margin-top: -83px;
    padding-bottom: 14px;
}
.text-center2 {
  padding-left: 500px;
}
.text-center3 {
 margin-bottom: -76px;
    padding-left: 800px;
    padding-bottom: -67px;
    margin-top: -16px;
    padding-bottom: 50px;
}
.khung1 {
  margin-right: 50px;
}
.khung {
  margin-right: 250px;
}
.haha {
  padding-left: -100px;
  margin-left: 100px;
}
.v-responsive__content {
  margin-top: 5px;
}
.text {
  font-size: 12px;
  font-family: cursive;
  padding-left: 5px;
}
.text-right {
  margin-top: -85px;
  width: 26%;
  margin-left: auto;
  margin-right: 0px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 5px;
}
.user h3 {
  margin-right: 124px;
  margin-top: -52px;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #564fef !important;
}
.Nut{
  margin-top: 10px;
}
.NopCV{
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 5px;
}
.TaoCV{
  margin-right: 5px;
}
.them{
  margin-left: 750px;
}
</style>