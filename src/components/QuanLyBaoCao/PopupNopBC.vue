<template>
    <v-dialog max-width="290px">
        <v-btn flat slot="activator" class="success">Nộp Báo Cáo</v-btn>
        <v-card>
            <v-card-title>
                <h2>Nộp Báo Cáo</h2>
            </v-card-title>
            <v-divider></v-divider>
        
            <v-card-text>
                <v-form class="px-3">
                   <v-file-input show-size label="Chọn file"></v-file-input>
                </v-form>
            </v-card-text>
            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Nộp
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Hủy
          </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data: () => ({
      dialog: false,
    }),
}
</script>