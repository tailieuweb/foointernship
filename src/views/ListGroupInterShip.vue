<template>
  <v-container>
    <v-app id="inspire">
      <v-card-title
        class="justify-center mb-2"
      >
        <span> DANH SÁCH LỚP THỰC TẬP </span>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="calories"
        class="elevation-3 pt-3"
        hide-default-footer
        :page.sync="page"
        @page-count="pageCount = $event"
        :items-per-page="itemsPerPage"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-col
            md="4"
            sm="4">
             <v-card>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="pa-3"
              ></v-text-field>
             </v-card>
            </v-col>

            <v-col
            md="2"
            sm="2">
              <v-select
                :items="magv"
                v-model="search"
                label="Mã GVHD"
                solo
                class="mt-6"
              ></v-select>
            </v-col>
            
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="800px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Thêm
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="success"
                    @click="save"
                    class="ml-3"
                  >
                    Save
                  </v-btn>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.codeClass"
                          label="Mã Lớp"
                        ></v-text-field>
                      </v-col>
                      
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.nameTopic"
                          label="Tên Đề Tài"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.course"
                          label="Khóa"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.year"
                          label="Năm Học"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-dialog
                          ref="dialog1"
                          v-model="modalStart"
                          :return-value.sync="date"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.dateStart"
                              label="Ngày Bắt Đầu"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.dateStart"
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="modalStart = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog1.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-dialog
                          ref="dialog2"
                          v-model="modalEnd"
                          :return-value.sync="date"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.dateEnd"
                              label="Ngày Kết Thúc"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.dateEnd"
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="modalEnd = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog2.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>

                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-select
                          :items="magv"
                          v-model="editedItem.codeTeacher"
                          label="Mã GVHD"
                          solo
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-row
                  class="p-0"
                >
                  <v-col
                    md="12"
                    class="text-right pr-6"
                  >
                    <v-btn
                      color="primary"
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="success"
                      @click="save"
                      class="ml-3"
                    >
                      Save
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
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
            
          <v-row
          class="px-4 ma-0 mt-3">
            <v-col
              md="4"
              sm="4">
                <v-file-input
                  accept=".xls,.xlsx"
                  label="Chọn file"
                  id="input_file"
                  @change="onChange"
                  class="pa-0"
                ></v-file-input>
              </v-col>

              <v-col
              md="2"
              sm="2">
                <v-btn
                  color="primary"
                  class="btn-insert"
                  @click="convertJson">
                    Import
                </v-btn>
            </v-col>
            <v-spacer>
            </v-spacer>
            <v-btn
              color="error"
              class="mr-2"
              @click="cancelImport">
              Hủy
            </v-btn>
            <v-btn
              color="primary"
              @click="importExcel">
              Lưu
            </v-btn>
          </v-row>
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
    
      <div class="text-center mt-3">
         <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </div>
    </v-app>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 8,
      modalStart: false,
      modalEnd: false,
      magv: [],
      search: '',
      selectedFile: {},
      dataa: [{
        "name":"jayanth",
        "data":"scd",
        "abc":"sdef"
      }],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
          class: 'primary white--text' ,
        },
        { text: 'Mã Lớp', value: 'codeClass', class: 'primary white--text',},
        { text: 'Tên Đề Tài', value: 'nameTopic', class: 'primary white--text',},
        { text: 'Khóa', value: 'course', class: 'primary white--text',},
        { text: 'Năm Học', value: 'year', class: 'primary white--text',},
        { text: 'Ngày Bắt Đầu', value: 'dateStart', class: 'primary white--text',},
        { text: 'Ngày Kết Thúc', value: 'dateEnd', class: 'primary white--text',},
        { text: 'Mã GVHD', value: 'codeTeacher',class: 'primary white--text',},
        { text: 'Actions', value: 'actions', sortable: false, class: 'primary white--text',},
        
      ],
      desserts: [],
      editedIndex: -1,
      id: -1,
      url: 'https://5fdf7b26eca1780017a30cc8.mockapi.io/api/gp/classIntership',
      editedItem: {
        id: '',
        codeClass: '',
        nameTopic: '',
        course: '',
        year: '',
        dateStart: '',
        dateEnd: '',
        codeTeacher: '',
      },
      defaultItem: {
        id: '',
        codeClass: '',
        nameTopic: '',
        codeTeacher: '',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm Nhóm' : 'Sửa Nhóm'
      },
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
      initialize () {
        this.axios.get(this.url).then((response)=>{
         this.desserts=response.data;
         this.desserts.forEach(el=>{
           this.magv.push(el.codeTeacher)
         })
        });
      },
      editItem (item) {
        this.id = item.id
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.id = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.axios.delete(`${this.url}/${this.id}`).then((response)=>{
         this.initialize()
        });
        
        //this.desserts.splice(this.editedIndex, 1)
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
          this.axios.put(`${this.url}/${this.id}`,this.editedItem).then((response)=>{
             //sửa
              this.initialize()
          });
          //Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.axios.post(this.url,this.editedItem).then((response)=>{
            //thêm
             this.initialize()
          });
          //this.desserts.push(this.editedItem)
        }
        this.close()
      },
      onChange(event){
        this.selectedFile = event;
      },
      convertJson(){
        XLSX.utils.json_to_sheet(this.dataa, 'out.xlsx');
          if(this.selectedFile){
              let fileReader = new FileReader();
              fileReader.readAsBinaryString(this.selectedFile);
              fileReader.onload = (event)=>{
              let dataaa = event.target.result;
              let workbook = XLSX.read(dataaa,{type:"binary"});
              console.log(workbook);
              workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    console.log( JSON.stringify(rowObject,undefined,4))
                    this.desserts = rowObject;
              });
              }
          }
      },
      importExcel() {

        for(let i = 0; i < this.desserts.length; i++) {
            let obj = this.desserts[i];
            this.editedItem.codeClass = obj.codeClass
            this.editedItem.nameTopic = obj.nameTopic
            this.editedItem.course = obj.course
            this.editedItem.year = obj.year
            this.editedItem.dateStart = obj.dateStart
            this.editedItem.dateEnd = obj.dateEnd
            this.editedItem.codeTeacher = obj.codeTeacher
            this.axios.post(this.url,this.editedItem).then((response)=>{
              this.initialize()
            });
        }
      },
      cancelImport(){
        this.initialize();
      }
    },
  }
</script>

<style>
.v-data-table__wrapper{
  padding-top: 1%;
}
</style>