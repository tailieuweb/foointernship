<template>

  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="550px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Thêm </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="font-weight-black">Upload</span>
        </v-card-title><br>
        
        <v-card-text>
             <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
                
        <v-select
          :items="items2"
          v-model="selected1"
          label="Năm học"
          dense
          outlined
        ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
                <v-select
          :items="items1"
          v-model="selected"
          label="Học kì"
          dense
          outlined
        ></v-select>
            </v-col>
        </v-row>
          <p style="color: rgb(70 70 70 / 87%); font-weight: 450">Chọn file upload</p>
          <v-file-input
          v-model="files"
          color="#1976d2"
          
          label="File input"
          multiple
          placeholder="Choose file"
          prepend-icon="mdi-paperclip"
          outlined
         
        >
          <template v-slot:selection="{ index, text }">
            <v-chip
              v-if="index < 2"
              color="#1976d2"
              dark
              label
              small
            >
              {{ text }}
            </v-chip>

            
          </template>
        </v-file-input>
        
       
        <v-row>
            <v-col cols="12" sm="2">
                <p style="color: rgb(70 70 70 / 87%); font-weight: 450">Ghi chú:</p>
            </v-col>
            <v-col cols="12" sm="10">
                <v-textarea
          outlined
          v-model="note"
          placeholder="Ghi chú của Giảng viên"
        ></v-textarea>
            </v-col>
        </v-row>
        </v-card-text>
        
        
        <!-- file input -->
        <!-- <v-file-input accept="image/*" label="Choose file"></v-file-input> -->
        
        <v-card-actions>
         <v-spacer></v-spacer>
          <v-btn :disabled="dialog2"
      :loading="dialog2" color="black" style=" background: #D5E8D4; width: 100px; height: 28px" text @click="dialog2 = !dialog2,dialog = false, 'loading'">
            Upload
          </v-btn>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          
          
          <v-btn depressed color="black" style=" background: #FF0000; width: 100px; height: 28px" text @click="dialog = false">
            Hủy
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <br>
        <br>
      </v-card>
    </v-dialog>

    <!-- dialog2 - uploading -->
    <v-dialog
      v-model="dialog2"
      hide-overlay
      persistent
      width="250"
    >
      <v-card
        color="#1976d2"
        dark
      >
        <v-card-text style="text-align: center; color: white;">
          Uploading...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>   
  </v-row>
 
</template>

<script>
import axios from "axios";
export default {
 
  data: () => ({
    dialog: false,
    dialog2: false,
    selected: undefined,
    note: '',
    loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,

    items1: ['HK 1', 'HK 2'],
    items2: ['2017 - 2018', '2018 - 2019', '2019 - 2020'],
  }),
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 4000)

        this.loader = null
      },
      dialog2 (val) {
        if (!val) return
        axios.post("https://5fe00f0eeca1780017a31142.mockapi.io/BieuMau",{
          namhoc: this.selected1,
          hocki: this.selected,
          magv: null,
          tengv: null,
          bieumau: this.files[0].name,
          ghichu: this.note
        })
        .then(res => {
        console.log(res);
        console.log(res.data);
      })
        setTimeout(() => (this.dialog2 = false), 1500)
        this.$emit('childToParent', {
          namhoc: this.selected1,
          hocki: this.selected,
          magv: null,
          tengv: null,
          bieumau: this.files[0].name,
          ghichu: this.note
        })
      },
    },
    
};
</script>