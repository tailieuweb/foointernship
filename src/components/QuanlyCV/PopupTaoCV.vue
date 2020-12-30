<template>
  <v-app>
    <v-row justify="left">
      <v-dialog
        v-model="dialog"
        max-width="1000px"
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Tạo CV
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Tạo CV</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <!-- <v-btn
              dark
              text
              @click="dialog = false"
            >
              Save
            </v-btn> -->
            </v-toolbar-items>
          </v-toolbar>

          <!-- Sizes your content based upon application components -->
          <v-main>
            <template>
              <div ref="pdf">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <image-uploader
                        :preview="true"
                        :className="[
                          'fileinput',
                          { 'fileinput--loaded': hasImage },
                        ]"
                        capture="environment"
                        :debug="1"
                        doNotResize="gif"
                        :autoRotate="true"
                        outputFormat="verbose"
                        @input="setImage"
                      >
                        <label
                          for="fileInput"
                          slot="upload-label"
                          style="text-align: center; "
                        >
                          <figure>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                            >
                              <path
                                class="path1"
                                d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                              ></path>
                            </svg>
                            <p>Chọn ảnh CV</p>
                          </figure>
                          <!-- <span class="upload-caption">{{
                            hasImage ? "" : ""
                          }}</span> -->
                        </label>
                      </image-uploader>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        id="hoten"
                        style="font-size:19px;font-weight:bold;"
                        outlined
                        label="Họ tên"
                        placeholder="Nhập họ và tên của bạn"
                      ></v-text-field>
                      <v-text-field
                        id="vitri"
                        style="font-size:17px;font-weight:bold;"
                        outlined
                        label="Vị trí"
                        placeholder="Nhập vị trí muốn ứng tuyển"
                      ></v-text-field>
                      <v-row no-gutters>
                        <v-col cols="12" sm="6" md="8">
                          <v-text-field
                            id="phone"
                            dense
                            outlined
                            label="Phone"
                            Filled
                            placeholder="0123xxxxxxx"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="4">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <!-- prepend-icon="mdi-calendar" -->
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                id="ngaysinh"
                                style="margin-left:10px"
                                dense
                                v-model="date"
                                label="Ngày sinh"
                                prepend-icon="mdi-calendar"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              ref="picker"
                              v-model="date"
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="save"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="12" sm="6" md="8">
                          <v-text-field
                            id="email"
                            dense
                            outlined
                            label="Email"
                            Filled
                            placeholder="example@gmail.com"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" md="4">
                          <v-select
                            id="gioitinh"
                            style="margin-left:42px"
                            dense
                            :items="items"
                            label="Giới tính"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-text-field
                          id="diachi"
                          dense
                          label="Địa chỉ"
                          outlined
                          Filled
                          placeholder="Nhập vào địa chỉ của bạn"
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row class="duong">
                    <v-toolbar
                      flat
                      color="#008CFF"
                      dark
                      class="pa-0.7  text-no-wrap rounded-lg"
                      style="margin-right: 1000px;"
                    >
                      <v-toolbar-title>Mục tiêu nghề nghiệp</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-list shaped>
                        <v-list-item-group v-model="model" multiple>
                          <template v-for="(item, i) in itemschk">
                            <v-divider
                              v-if="!item"
                              :key="`divider-${i}`"
                            ></v-divider>
                            <v-list-item
                              v-else
                              :key="`item-${i}`"
                              :value="item"
                              active-class="blue--text text--accent-4"
                            >
                              <template v-slot:default="{ active }">
                                <v-list-item-action>
                                  <v-checkbox
                                    :input-value="active"
                                    color="#008CFF"
                                  ></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-text="item"
                                  ></v-list-item-title>
                                </v-list-item-content>
                              </template>
                            </v-list-item>
                          </template>
                        </v-list-item-group>
                      </v-list>
                    </v-card-text>
                  </v-row>
                  <v-row class="duong">
                    <v-toolbar
                      flat
                      color="#008CFF"
                      dark
                      class="pa-0.7  text-no-wrap rounded-lg"
                      style="margin-right: 1000px;"
                    >
                      <v-toolbar-title>Kỹ năng bản thân</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-list shaped>
                        <v-list-item-group v-model="model" multiple>
                          <template v-for="(item, i) in itemschk2">
                            <v-divider
                              v-if="!item"
                              :key="`divider-${i}`"
                            ></v-divider>
                            <v-list-item
                              v-else
                              :key="`item-${i}`"
                              :value="item"
                              active-class="blue--text text--accent-4"
                            >
                              <template v-slot:default="{ active }">
                                <v-list-item-action>
                                  <v-checkbox
                                    :input-value="active"
                                    color="#008CFF"
                                  ></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-text="item"
                                  ></v-list-item-title>
                                </v-list-item-content>
                              </template>
                            </v-list-item>
                          </template>
                        </v-list-item-group>
                      </v-list>
                    </v-card-text>
                  </v-row>
                  <v-row class="duong">
                    <v-toolbar
                      flat
                      color="#008CFF"
                      dark
                      class="pa-0.7  text-no-wrap rounded-lg"
                      style="margin-right: 1000px;"
                    >
                      <v-toolbar-title>Trình độ ngoại ngữ</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-card-actions class="pa-7">
                        <v-row>
                          <v-col cols="2">
                            <v-subheader style="font-size:19px"
                              >Tiếng Anh</v-subheader
                            >
                          </v-col>
                          <v-col cols="4">
                            <v-rating
                              v-model="rating"
                              icon-label="custom icon label text {0} of {1}"
                              color="yellow accent-4"
                              hover
                              size="28"
                            ></v-rating>
                          </v-col>
                        </v-row>
                      </v-card-actions>
                      <v-card-actions class="pa-7">
                        <v-row>
                          <v-col cols="2">
                            <v-subheader style="font-size:19px"
                              >Tiếng Nhật</v-subheader
                            >
                          </v-col>
                          <v-col cols="4">
                            <v-rating
                              v-model="rating"
                              icon-label="custom icon label text {0} of {1}"
                              color="yellow accent-4"
                              hover
                              size="28"
                            ></v-rating>
                          </v-col>
                        </v-row>
                      </v-card-actions>
                    </v-card-text>
                  </v-row>
                  <v-row class="duong">
                    <v-toolbar
                      flat
                      color="#008CFF"
                      dark
                      class="pa-0.7  text-no-wrap rounded-lg"
                      style="margin-right: 1000px;"
                    >
                      <v-toolbar-title
                        >Trình độ tin học văn phòng</v-toolbar-title
                      >
                    </v-toolbar>
                    <v-card-text>
                      <v-card-actions class="pa-7">
                        <v-row>
                          <v-col cols="2">
                            <v-subheader style="font-size:19px"
                              >MS Word</v-subheader
                            >
                          </v-col>
                          <v-col cols="4">
                            <v-rating
                              v-model="rating"
                              icon-label="custom icon label text {0} of {1}"
                              color="yellow accent-4"
                              hover
                              size="28"
                            ></v-rating>
                          </v-col>
                        </v-row>
                      </v-card-actions>
                      <v-card-actions class="pa-7">
                        <v-row>
                          <v-col cols="2">
                            <v-subheader style="font-size:19px"
                              >MS Excel</v-subheader
                            >
                          </v-col>
                          <v-col cols="4">
                            <v-rating
                              v-model="rating"
                              icon-label="custom icon label text {0} of {1}"
                              color="yellow accent-4"
                              hover
                              size="28"
                            ></v-rating>
                          </v-col>
                        </v-row>
                      </v-card-actions>
                      <v-card-actions class="pa-7">
                        <v-row>
                          <v-col cols="2">
                            <v-subheader style="font-size:19px"
                              >MS Powerpoint</v-subheader
                            >
                          </v-col>
                          <v-col cols="4">
                            <v-rating
                              v-model="rating"
                              icon-label="custom icon label text {0} of {1}"
                              color="yellow accent-4"
                              hover
                              size="28"
                            ></v-rating>
                          </v-col>
                        </v-row>
                      </v-card-actions>
                    </v-card-text>
                  </v-row>
                  <v-row class="duong">
                    <v-toolbar
                      flat
                      color="#008CFF"
                      dark
                      class="pa-0.7  text-no-wrap rounded-lg"
                      style="margin-right: 1000px;"
                    >
                      <v-toolbar-title>Học vấn/ Bằng cấp</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          id="hocvan"
                          style="margin-left: -12px"
                          outlined
                          placeholder="Tên bằng cấp, học vấn"
                        ></v-text-field>
                      </v-col>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-form>
                            <v-text-field
                              disabled
                              v-model="last"
                              label="Trường/Nơi đào tạo"
                              solo-inverted
                            ></v-text-field>
                          </v-form>
                          <!-- <v-text-field
              value="Trường/Nơi đào tạo"
              label="Regular"
              disabled
              solo
              class="thuoctinh"
            ></v-text-field> -->
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            label="Regular"
                            solo
                            placeholder="Nhập vào tên trường hoặc nơi đào tạo"
                            id="noidaotao"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-form>
                            <v-text-field
                              disabled
                              v-model="last"
                              label="Xếp loại"
                              solo-inverted
                            ></v-text-field>
                          </v-form>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            id="bangcap"
                            label="Regular"
                            solo
                            placeholder="Nhập loại bằng cấp"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-form>
                            <v-text-field
                              disabled
                              v-model="last"
                              label="Ngành"
                              solo-inverted
                            ></v-text-field>
                          </v-form>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            id="nganh"
                            label="Regular"
                            solo
                            placeholder="Nhập ngành"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-form>
                            <v-text-field
                              disabled
                              v-model="last"
                              label="Mô tả"
                              solo-inverted
                            ></v-text-field>
                          </v-form>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-textarea
                            id="mota1"
                            solo
                            placeholder="Nhập các thông tin chi tiết như hoạt động đoàn thể, ngoại khóa trong quá trình học tập"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-row>
                  <v-row class="duong">
                    <v-toolbar
                      flat
                      color="#008CFF"
                      dark
                      class="pa-0.7  text-no-wrap rounded-lg"
                      style="margin-right: 1000px;"
                    >
                      <v-toolbar-title>Kinh nghiệm làm việc</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          id="lamviec"
                          style="margin-left: -12px"
                          outlined
                          placeholder="Nhập chức danh, vị trí làm việc"
                        ></v-text-field>
                      </v-col>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            disabled
                            v-model="last"
                            label="Công ty"
                            solo-inverted
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            id="congty"
                            label="Regular"
                            solo
                            placeholder="Nhập tên công ty"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            disabled
                            v-model="last"
                            label="Mô tả"
                            solo-inverted
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-textarea
                            id="mota2"
                            solo
                            placeholder="Mô tả về các nhiệm vụ, trách nhiệm trong quá trình làm việc tại công ty. Các kỹ năng bạn học hỏi được hoặc các thành tựu đạt được..."
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-row>
                  <v-row class="duong">
                    <v-toolbar
                      flat
                      color="#008CFF"
                      dark
                      class="pa-0.7  text-no-wrap rounded-lg"
                      style="margin-right: 1000px;"
                    >
                      <v-toolbar-title>Người tham khảo</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          id="hotenthamkhao"
                          style="margin-left: -12px"
                          outlined
                          placeholder="Nhập họ và tên người tham khảo"
                        ></v-text-field>
                      </v-col>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            disabled
                            v-model="last"
                            label="Vị trí"
                            solo-inverted
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            id="chucvuthamkhao"
                            label="Regular"
                            solo
                            placeholder="Nhập vị trí, chức vụ"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            disabled
                            v-model="last"
                            label="Công ty"
                            solo-inverted
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            id="congtythamkhao"
                            label="Regular"
                            solo
                            placeholder="Nhập tên công ty"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            disabled
                            v-model="last"
                            label="Email"
                            solo-inverted
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            id="emailthamkhao"
                            label="Regular"
                            solo
                            placeholder="Nhập email liên hệ"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="2">
                          <v-text-field
                            disabled
                            v-model="last"
                            label="Phone"
                            solo-inverted
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            id="phonethamkhao"
                            label="Regular"
                            solo
                            placeholder="Nhập số điện thoại liên hệ"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-row>
                  <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        :items="itemsvb"
                        label="Loại văn bản lưu"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="space-around">
                    <v-btn
                      depressed
                      color="#D5E8D4"
                      @click="(dialog = false), downloadWithCSS()"
                    >
                      Lưu
                    </v-btn>
                    <v-btn depressed color="#FF0000" @click="dialog = false">
                      Hủy
                    </v-btn>
                  </v-row>
                </v-container>
              </div>
            </template>
            <div ref="content">
              <v-form> </v-form>
              <!-- Provides the application the proper gutter -->
              <v-container fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
              </v-container>
            </div>
          </v-main>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog3" persistent max-width="290">
        <v-card>
          <v-card-title class="font-weight-bold">
            Thông báo
          </v-card-title>
          <v-card-text class="font-weight-regular"
            >Báo cáo vẫn chưa được lưu. Bạn có muốn thoát?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#1976d2" text @click="dialog3 = false">
              Hủy
            </v-btn>
            <v-btn
              color="#1976d2"
              text
              @click="(dialog3 = false), (dialog = false)"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
export default {
  name: "header",
  date: null,
  checkbox: false,
  rating: 4,
  imageData: null,
  hasImage: false,
  image: null,
  data() {
    return {
      dialog: false,
      dialog3: false,
      notifications: false,
      sound: true,
      widgets: false,
      items: ["Nam", "Nữ", "Khác"],
      itemschk: [
        "Mong muốn được chỗ làm ổn định lâu dài",
        "Mong muốn tìm được chỗ làm có cơ hội thăng tiến tốt",
        "Mong muốn tìm được chỗ làm có mức lưng tốt",
        "Mong muốn tim được chỗ ở có cơ hội thăng tiến bản thân tốt",
      ],
      itemschk2: [
        "Kỹ năng tổ chức",
        "Kỹ năng giao tiếp",
        "Kỹ năng làm việc theo nhóm",
        "Giải quyết vấn đề",
        "Kỹ năng lãnh đạo",
        "Kỹ năng thuyết trình",
        "Lập kế hoạch",
        "Quản lý thời gian hiệu quả",
        "Tư duy sáng tạo",
        "Dễ dàng thích nghi với môi trường mới",
      ],
      itemsvb: ["Word", "PDF", "Web Page", "Plane Text"],
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    setImage: function(output) {
      this.hasImage = true;
      this.image = output;
      console.log("Info", output.info);
      console.log("Exif", output.exif);
    },
    downloadWithCSS() {
      /** WITH CSS */
      domtoimage.toPng(this.$refs.pdf).then(function(dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        const doc = new jsPDF({
          orientation: "portrait",
          // unit: "pt",
          format: [1200, 1600],
        });
        doc.addImage(img, "JPEG", 500, 40);
        const date = new Date();
        const filename =
          "timechart_" +
          date.getFullYear() +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          ("0" + date.getDate()).slice(-2) +
          ("0" + date.getHours()).slice(-2) +
          ("0" + date.getMinutes()).slice(-2) +
          ("0" + date.getSeconds()).slice(-2) +
          ".pdf";
        doc.save(filename);
      });
    },
    huy() {
      if (
        document.getElementById("hoten").value != "" ||
        document.getElementById("vitri").value != "" ||
        document.getElementById("phone").value != "" ||
        document.getElementById("ngaysinh").value != "" ||
        document.getElementById("email").value != "" ||
        document.getElementById("gioitinh").value != "" ||
        document.getElementById("diachi").value != "" ||
        document.getElementById("hocvan").value != "" ||
        document.getElementById("noidaotao").value != "" ||
        document.getElementById("bangcap").value != "" ||
        document.getElementById("nganh").value != "" ||
        document.getElementById("mota1").value != "" ||
        document.getElementById("lamviec").value != "" ||
        document.getElementById("congty").value != "" ||
        document.getElementById("mota2").value != "" ||
        document.getElementById("hotenthamkkhao").value != "" ||
        document.getElementById("chucvuthamkhao").value != "" ||
        document.getElementById("congtythamkhao").value != "" ||
        document.getElementById("emailthamkhao").value != "" ||
        document.getElementById("phonethamkhao").value != ""
      ) {
        this.dialog3 = true;
      } else {
        this.dialog = false;
      }
    },
  },
};
</script>

<style>
.tieude {
  text-align: center;
}
.pa-7 {
  font-size: 20px;
}
.duong {
  border: 1px solid grey;
  border-radius: 12px;
  margin-bottom: 50px;
}
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
#fileInput {
  display: none;
}
img {
  width: 290px;
  height: 330px;
}
</style>
