<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="instructor"
      :search="search"
      :loading="isloading"
      multi-sort
      dense
      sort-by="calorie"
      class="elevation-"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
    >
    <!-- <template #item.stt="" v-for="(number, index) in 1">
        <span :key="index">{{++index }}</span> 
      </template> -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>DANH SÁCH NGƯỜI HƯỚNG DẪN</v-toolbar-title>
          <v-spacer></v-spacer>
           <v-autocomplete
            v-model="model"
            :items="instructor"
            :loading="isLoading"
            :search-input.sync="search"
            append-icon="mdi-account-search"
            v-bind="selected"
            dense
            chips
            small-chips
            filled
            clearable
            hide-selected
            item-text="name"
            label="Tìm kiếm...."
            solo
      >
       <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
             Tìm kiếm theo
              <strong>tên</strong>
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-autocomplete>
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
                        counter
                        maxlength="12"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.email"                    
                        label="Nhập Email"   
                        suffix="@gmail.com"                     
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        value="Công Ty"
                        v-model="editedItem.namecv"
                        label="Tên Công Ty"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  background-color="yellow"
                  color="blue darken-1"
                  text
                  @click="close"               >
                  Hủy
                </v-btn>
                <v-btn background-color="yellow" color="blue darken-1" text @click="save">
                  Lưu
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Bạn có chắc chắn muốn xóa ?</v-card-title>
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    search: null,
    tab: null,
    isLoading: false,
    model: null,
    numbers: [],
    selected:[],
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    dialogDelete: false,
    delete:0,
    headers: [
      {
        text: "#",
        align: "start",
        value: "id",
      },
      // { text: "ID", value: "id" },":item-text="item => `${item.id} ${item.name} ${item.phone} ${item.namecv} ${item.email}`"
      { text: "Tên Người hướng dẫn", value: "name", sortable: true },
      { text: "Chức vụ", value: "chucvu", sortable: false },
      { text: "Phone", value: "phone", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Tên Công Ty", value: "namecv", sortable: false },
      { text: "Sự Kiện", value: "actions", sortable: false },
    ],
    instructor: [],
    editedIndex: -1,
    editedItem: { 
      id:'',
      name: "",
      chucvu: "",
      phone: "",
      email: "",
      namecv: "Công Ty",
    },
    defaultItem: {
      name: "",
      chucvu: "",
      phone: "",
      email: "",
      namecv: "",
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
    model (val) {
      if (val != null) this.tab = 0
      else this.tab = null
    },
    search () {
        // Items have already been loaded
        if (this.instructor.length > 0) return
        this.isLoading = true
        // Lazily load input items
        fetch('https://api.coingecko.com/api/v3/coins/list')
          .then(res => res.clone().json())
          .then(res => {
            this.instructor = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      axios
        .get("https://5fd03fca1f2374001663149f.mockapi.io/instructor")
        .then((response) => {
          this.instructor = response.data;
        });
    },
    editItem(item) {
      this.editedIndex = this.instructor.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedID = this.editedItem.id;
      this.dialog = true;

    },
    deleteItem(item) {
      this.editedIndex = this.instructor.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      
    },
    deleteItemConfirm() {
      axios.delete(`https://5fd03fca1f2374001663149f.mockapi.io/instructor/`+`${this.editedItem.id}`).then((response) => {
         console.log(response);
          console.log(this.editedItem.id);
        });
      {
        this.instructor.splice(this.editedIndex, 1);
      this.closeDelete();
      }
    }
    ,
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
      // setInterval( function() {
      //              window.location.reload();
 
      //     },1000);
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
// setInterval( function() {
//                    window.location.reload();
 
//           },1000);
    },
    save() {
        if(this.editedItem.name!="" && this.editedItem.namecv!="" && this.editedItem.phone!="" && this.editedItem.namecv!="" && this.editedItem.email!=""){
          console.log("Yêu cầu Hợp Lệ ?")
          try {
             if (this.editedIndex > -1) {
                Object.assign(this.instructor[this.editedIndex], this.editedItem);
                axios
                  .put(
                  "https://5fd03fca1f2374001663149f.mockapi.io/instructor/" +this.editedItem.id,this.editedItem)
          .catch((error) => {
            console.log(error.response);
          });
     }
      else{
        this.instructor.push(this.editedItem);
        axios
          .post("https://5fd03fca1f2374001663149f.mockapi.io/instructor", this.editedItem)
          .catch((error) => {
            console.log(error.response);
          });
      }
      } catch (error) {
        console.log(error)
      }  
       }
else{
  alert("Yêu Cầu Không Hợp Lệ ?")
  console.log("Yêu Cầu Không Hợp Lệ ?")
}
      this.close();
      // setInterval( function() {
      //              window.location.reload();
 
      //     },1000);
    },
  },
};
 init_reload();
    function init_reload(){
        setInterval( function() {
                   window.location.reload();
 
          },150000);
    }
</script>
<style>
/* && this.editedItem.phone!=""&& this.editedItem.email!=""&& this.editedItem.namecv!="" */
.v-toolbar__content {
  height: 56px;
  text-align: center;
  padding-left: 197px;
  color: black !important;
  height: 56px;
  padding-left: 0px;
}
.v-toolbar__title {
  font-weight: 700;
  padding-left: 38% !important;
}
.v-application {
  text-align: center;
  border: 2px solid;
}
.v-data-table-header {
  background: #6699ff;
  color: white;
}
.v-toolbar__title {
  padding-left: 480px;
}
.class {
  background: #3366cc;
}

.theme--light.v-data-table .v-data-table-header th.sortable:hover,
.theme--light.v-data-table .v-data-table-header th.sortable.active {
  font-size: 14px;
  color: black !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 14px;
  color: black !important;
}
.v-data-table {
  margin-top: 100px;
}
.v-input__control {
  width: 2px !important;
  margin-top: 20px;
  margin-right: 5px;
}
.v-btn {
  background: yellow !important;
  padding: 10px 20px;
  border-radius: 3px;
}
.v-application .elevation-1 {
  box-shadow: none;
}
.theme--light.v-application {
  background: #ffffff;
  color: white !important;
}

.v-data-table__wrapper {
  margin: 15px 30px;
  border-radius: 3px;
}
.mb-2 {
  margin-right: 30px;
}
.headline {
  margin-left: 77px;
}
.theme--light.v-input {
 padding: 0px !important;
}
.col-12 {
  padding: 0px !important;
}
.v-text-field__slot {
  border: solid 1px;
  border-radius: 3px;
  padding: 5px;
}
.theme--light.v-label {
  padding-left: 5px;
}
.v-card__actions{
  padding: 0px !important;
  padding-bottom: 8px !important;
  display: flow-root !important;
}
.v-card__actions > .v-btn.v-btn {
    margin-right: 16px;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: blue !important;
}
.v-application .text-center {
    margin-bottom: 30px;
}
</style>
