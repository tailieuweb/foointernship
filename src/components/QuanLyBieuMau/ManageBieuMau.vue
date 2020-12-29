<template>
  <v-container>
    <v-app id="inspire">
        
      <v-card-title
        class="justify-center mb-2"
      >
        <span> DANH SÁCH BIỂU MẪU </span>
        
        
      </v-card-title>
        
      <v-data-table
        :headers="headers"
        :items="ListDiaryWithIndex"
        sort-by="calories"
        class="elevation-1"
        hide-default-footer
        :page.sync="page"
        @page-count="pageCount = $event"
        :items-per-page="itemsPerPage"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
                class="mt-3"
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <PopupBM v-on:childToParent="onChildClick" @changeUsername="save1" />
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Bạn có chắc muốn xóa biểu mẫu?</v-card-title>
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
import PopupBM from './PopupBM'
import axios from "axios";
  export default {
      components: { PopupBM },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      page: 1,
      search: '',
      pageCount: 0,
      itemsPerPage: 8,
      modalStart: false,
      modalEnd: false,
      status: ['Approved', 'Not Approved'],
      headers: [
        {
          text: 'STT',
          align: 'start',
          sortable: false,
          value: 'index',
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
        .get("https://5fe00f0eeca1780017a31142.mockapi.io/BieuMau")
        .then(response => {
          this.desserts = response.data;
        });
    },
      editItem (item) {
          this.id = item.id
          
        PopupBM.dialog = true
        
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
          axios.delete("https://5fe00f0eeca1780017a31142.mockapi.io/BieuMau"+"/"+ this.editedItem.id)
        .then(res => {
        console.log(res);
        console.log(res.data);
      })
        }
        console.log(this.editedItem.id)
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
      onChildClick (value) {
      this.editedItem = value
      console.log(this.editedItem)
      this.desserts.push(value)
      location.reload()
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