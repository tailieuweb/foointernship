<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Nộp Báo Cáo </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="font-weight-black" style="margin-left: 235px;">Nộp Báo Cáo</span>
        </v-card-title><br>
        
        <v-card-text>
          <p class="" style="margin-left: 10px;  color: black;" >Chọn file báo cáo</p>
        </v-card-text>
        
        
        <!-- file input -->
        <!-- <v-file-input accept="image/*" label="Choose file"></v-file-input> -->
        <v-file-input
          v-model="files"
          color="#1976d2"
          counter
          label="Choose file"
          multiple
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          outlined
          :show-size="1000"
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

            <span
              v-else-if="index === 2"
              class="overline grey--text text--darken-3 mx-2"
            >
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input><br>
        <v-card-actions>
         
          <v-btn depressed color="white" style="margin-left: 120px; background: rgb(235 82 82);" text @click="dialog = false">
            Hủy
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn :disabled="dialog2"
      :loading="dialog2" color="white" style="margin-right: 120px; background: #1976d2;" text @click="dialog2 = !dialog2, 'loading'">
            Nộp
          </v-btn>
          
        </v-card-actions>
        <br>
      </v-card>
    </v-dialog>

    <!-- dialog2 - uploading -->
    <v-dialog
      v-model="dialog2"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text style="text-align: center;">
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
export default {
  data: () => ({
    dialog: false,
    dialog2: false,
    loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
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

        setTimeout(() => (this.dialog2 = false), 1500)
      },
    },
};
</script>