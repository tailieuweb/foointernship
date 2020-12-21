<template>
  <v-container>
    <v-app id="inspire">
        <Header />
        <v-row wrap>
          <v-col md="3">
              <v-select label="Năm học" outlined clearable :items="namhocs"></v-select>
              <v-select label="Giảng viên" outlined clearable :items='giangviens'></v-select>
          </v-col>
           <v-col md="3">
              <v-select label="Học kì" outlined clearable :items="hockis"></v-select>
          </v-col>
        </v-row>
      <v-card-title
        class="justify-center mb-2"
      >
        <span> DANH SÁCH BIỂU MẪU </span>
        
        
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
import Header from './Header'
import PopupBM from './PopupBM'
  export default {
      components: { Header, PopupBM },
    data: () => ({
        namhocs: ['2020-2021', '2019-2020', '2018-2019', '2017-2018'],
        hockis: ['Học Kì I', 'Học Kì II', 'Học Kì hè'],
        giangviens: [ 'Phan Thanh Nhuần', 'Nguyễn Huy Hoàng', 'Lê Minh Thịnh'],
      dialog: false,
      dialogDelete: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 8,
      dateStart: new Date().toISOString().substr(0, 10),
      dateEnd: new Date().toISOString().substr(0, 10),
      modalStart: false,
      modalEnd: false,
      status: ['Approved', 'Not Approved'],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'stt',
          class: 'primary white--text' ,
        },
        { text: 'Năm học', value: 'namhoc', class: 'primary white--text',},
        { text: 'Học kì', value: 'hocki', class: 'primary white--text',},
        { text: 'Mã GV', value: 'magv', class: 'primary white--text',},
        { text: 'Tên GV', value: 'tengv', class: 'primary white--text',},
        { text: 'Biểu mẫu', value: 'bieumau', class: 'primary white--text',},
        { text: 'Ghi chú', value: 'ghichu', class: 'primary white--text',},
        { text: 'Actions', value: 'actions', sortable: false, class: 'primary white--text',},
        
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        stt: '',
        namhoc: '',
        hocki: '',
        magv: '',
        tengv: '',
        bieumau: '',
        ghichu: 'See details',
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
        return this.editedIndex === -1 ? 'Thêm Biểu Mẫu' : 'Sửa Biểu Mẫu'
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
            stt: '1',
            namhoc: '2020-2021',
            hocki:'Học kì I',
            magv: 'GV001',
            tengv: 'Phan Thanh Nhuần',
            bieumau: 'CV.pdf',
            ghichu: 'See details'
          },
          {
            stt: '2',
            namhoc: '2020-2021',
            hocki:'Học kì I',
            magv: 'GV001',
            tengv: 'Phan Thanh Nhuần',
            bieumau: 'BC.pdf',
            ghichu: 'See details'
          },
          {
            stt: '3',
            namhoc: '2020-2021',
            hocki:'Học kì I',
            magv: 'GV001',
            tengv: 'Phan Thanh Nhuần',
            bieumau: 'CV.pdf',
            ghichu: 'See details'
          },
          {
            stt: '4',
            namhoc: '2020-2021',
            hocki:'Học kì I',
            magv: 'GV001',
            tengv: 'Phan Thanh Nhuần',
            bieumau: 'CV.pdf',
            ghichu: 'See details'
          },
          {
            stt: '5',
            namhoc: '2020-2021',
            hocki:'Học kì I',
            magv: 'GV001',
            tengv: 'Phan Thanh Nhuần',
            bieumau: 'CV.pdf',
            ghichu: 'See details'
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
