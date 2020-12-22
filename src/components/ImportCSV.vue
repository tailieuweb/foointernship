<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right"> </v-flex>
    </v-layout>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-else>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title>
            <div>
              <h4>CSV file to import</h4>
            </div>
          </v-card-title>
          <v-card-actions>
            <div class="form-group">
              <div class="col-sm-9">
                <v-btn raised class="primary" @click="onPickFile"
                  >Upload CSV</v-btn
                >
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  class="form-control"
                  accept="csvFile/*"
                  @change="loadCSV"
                />
              </div>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :pagination.sync="pagination"
          :items="contacts"
          hide-actions
          class="elevation-1"
          :loading="loading"
        >
          <v-progress-linear
            slot="progress"
            color="blue"
            indeterminate
          ></v-progress-linear>
          <template slot="items" slot-scope="props">
            <td class="text-xs-middle">{{ props.item.ID }}</td>
            <td class="text-xs-middle">
              {{ props.item.MSSV | capitalize }}
            </td>
            <td class="text-xs-middle">
              {{ props.item.Name | capitalize }}
            </td>
            <td class="text-xs-middle">{{ props.item.Class }}</td>
            <td class="text-xs-middle">
              {{ props.item.Leturer | capitalize }}
            </td>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
              Sorry, nothing to display here :(
            </v-alert>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination
            v-model="pagination.page"
            :length="pages"
          ></v-pagination>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12> </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      contacts: [],
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "ID",
        },
        {
          text: "MSSV",
          align: "left",
          sortable: false,
          value: "MSSV",
        },
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "Name",
        },
        {
          text: "Class",
          align: "left",
          sortable: false,
          value: "Class",
        },
        {
          text: "Leturer",
          align: "left",
          sortable: false,
          value: "Leturer",
        },
      ],
      pagination: {},
    };
  },
  filters: {
    capitalize(str) {
      return str != undefined
        ? str.charAt(0).toUpperCase() + str.slice(1)
        : str;
    },
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;
      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    csvJSON(csv) {
      var lines = csv.split("\n");
      var result = [];
      var headers = lines[0].split(",");

      lines.map((line, indexLine) => {
        if (indexLine < 1) return; // Jump header line

        const obj = {};
        var currentline = line.split(",");

        headers.map((header, indexHeader) => {
          obj[header.trim()] = currentline[indexHeader];
        });

        result.push(obj);
      });

      result.pop(); // remove the last item because undefined values
      //console.log(result)
      return result; // JavaScript object
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    loadCSV(e) {
      var vm = this;
      let files = e.target.files;
      let file = files[0];

      if (window.FileReader) {
        let reader = new FileReader();
        // when the file is read it triggers the onload event above.
        reader.readAsText(file, "UTF-8");
        // Handle errors load
        reader.onload = function () {
          let csv = reader.result;
          vm.contacts = vm.csvJSON(csv);
        };

        reader.onerror = function (evt) {
          if (evt.target.error.name == "NotReadableError") {
            alert("Canno't read file !");
          }
        };
      } else {
        alert("FileReader are not supported in this browser.");
      }
    },
  },
};
</script>
