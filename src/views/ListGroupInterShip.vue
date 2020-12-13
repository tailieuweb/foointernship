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
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              chips
              clearable
              hide-details
              hide-selected
              item-text="name"
              item-value="symbol"
              label="Search for a coin..."
              solo
            >
            </v-autocomplete>

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
                          v-model="editedItem.calories"
                          label="Mã Lớp"
                        ></v-text-field>
                      </v-col>
                      
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.fat"
                          label="Tên Đề Tài"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.khoa"
                          label="Khóa"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.namhoc"
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
                              v-model="dateStart"
                              label="Ngày Bắt Đầu"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="dateStart"
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
                              v-model="dateEnd"
                              label="Ngày Kết Thúc"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="dateEnd"
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
                          v-model="editedItem.magv"
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
      dateStart: new Date().toISOString().substr(0, 10),
      dateEnd: new Date().toISOString().substr(0, 10),
      modalStart: false,
      modalEnd: false,
      magv: ['GV01', 'GV02', 'GV03', 'GV04'],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'ID',
          class: 'primary white--text' ,
        },
        { text: 'Mã Lớp', value: 'calories', class: 'primary white--text',},
        { text: 'Tên Đề Tài', value: 'fat', class: 'primary white--text',},
        { text: 'Khóa', value: 'khoa', class: 'primary white--text',},
        { text: 'Năm Học', value: 'namhoc', class: 'primary white--text',},
        { text: 'Ngày Bắt Đầu', value: 'carbs', class: 'primary white--text',},
        { text: 'Ngày Kết Thúc', value: 'protein', class: 'primary white--text',},
        { text: 'Mã GVHD', value: 'magv',class: 'primary white--text',},
        { text: 'Actions', value: 'actions', sortable: false, class: 'primary white--text',},
        
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        ID: '',
        calories: '',
        fat: '',
        khoa: '',
        namhoc: '',
        magv: '',
      },
      defaultItem: {
        ID: '',
        calories: '',
        fat: '',
        magv: '',
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
        this.desserts = [
          {
            ID: '1',
            calories: 'NH01',
            fat:'Thực Tập Doanh Nghiệp',
            khoa: '2018 - 2021',
            namhoc: '2019 - 2020',
            carbs: '09/09/2020',
            protein: '12/12/2020',
            magv: 'GV01'
          },
          {
            ID: '2',
            calories: 'NH02',
            fat:'Thực Tập Doanh Nghiệp',
            khoa: '2018 - 2021',
            namhoc: '2019 - 2020',
            carbs: '09/09/2020',
            protein: '12/12/2020',
            magv: 'GV01'
          },
          {
            ID: '3',
            calories: 'NH03',
            fat: 'Thực Tập Doanh Nghiệp',
            khoa: '2018 - 2021',
            namhoc: '2019 - 2020',
            carbs: '09/09/2020',
            protein: '12/12/2020',
            magv: 'GV01'
          },
          {
            ID: '4',
            calories: 'NH04',
            fat:'Thực Tập Doanh Nghiệp',
            khoa: '2018 - 2021',
            namhoc: '2019 - 2020',
            carbs: '09/09/2020',
            protein: '12/12/2020',
            magv: 'GV01'
          },
          {
            ID: '5',
            calories: 'NH05',
            fat: 'Thực Tập Doanh Nghiệp',
            khoa: '2018 - 2021',
            namhoc: '2019 - 2020',
            carbs: '09/09/2020',
            protein: '12/12/2020',
            magv: 'GV01'
          },
          {
            ID: '6',
            calories: 'NH06',
            fat:'Thực Tập Doanh Nghiệp',
            khoa: '2018 - 2021',
            namhoc: '2019 - 2020',
            carbs: '09/09/2020',
            protein: '12/12/2020',
            magv: 'GV01'
          },
          {
            ID: '7',
            calories: 'NH07',
            fat:'Thực Tập Doanh Nghiệp',
            khoa: '2018 - 2021',
            namhoc: '2019 - 2020',
            carbs: '09/09/2020',
            protein: '12/12/2020',
            magv: 'GV01'
          },
          {
            ID: '8',
            calories: 'NH08',
            fat:'Thực Tập Doanh Nghiệp',
            khoa: '2018 - 2021',
            namhoc: '2019 - 2020',
            carbs: '09/09/2020',
            protein: '12/12/2020',
            magv: 'GV01'
          },
          {
            ID: '9',
            calories: 'NH09',
            fat: 'Thực Tập Doanh Nghiệp',
            khoa: '2018 - 2021',
            namhoc: '2019 - 2020',
            carbs: '09/09/2020',
            protein: '12/12/2020',
            magv: 'GV01'
          },
          {
            ID: '10',
            calories: 'NH10',
            fat: 'Thực Tập Doanh Nghiệp',
            khoa: '2018 - 2021',
            namhoc: '2019 - 2020',
            carbs: '09/09/2020',
            protein: '12/12/2020',
            magv: 'GV01'
          },
        ]
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
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
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>