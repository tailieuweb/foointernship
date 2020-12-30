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
            Tạo báo cáo
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="#e9ecef">
            <v-btn color="#1976d2" icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title style="color: #1976d2; font-weight: bold"
              >Tạo báo cáo kết quả thực tập</v-toolbar-title
            >
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

           
            <v-form>

              <v-container style="padding-left: 50px; padding-right: 50px; padding-top: 55px; padding-bottom: 50px;">
                
                <div class="vinh">
                <br /><br />
                
                <h1 style="text-align: center; font-weight: bold">
                  BÁO CÁO KẾT QUẢ THỰC TẬP
                </h1>
                
                
                <br /><br />
                <!-- tenDN -->
                <v-row
                  style="
                    padding-left: 43px;
                    padding-right: 43px;
                    margin-top: 50px;
                  "
                >
                  <v-col md="3">
                   
                    <h3 style="margin-top: 17px" id="tendn1">Tên doanh nghiệp:</h3>
                   
                  </v-col>
                  <v-col md="9">
                    
                    <v-text-field
                      clearable
                      placeholder="Nhập vào tên  doanh nghiệp"
                      id="tendn2"
                    ></v-text-field>
                 
                  </v-col>
                </v-row>

                <!-- diachi -->
                <v-row style="padding-left: 43px; padding-right: 43px">
                  <v-col md="3">
                    <h3 style="margin-top: 17px">Địa chỉ:</h3>
                    
                  </v-col>
                  <v-col md="9">
                    <v-text-field
                      clearable
                      placeholder="Nhập vào địa chỉ doanh nghiệp"
                      id="diachi"
                    ></v-text-field>
                    
                  </v-col>
                </v-row>
                <!-- ngay -->
                <v-row style="padding-left: 43px; padding-right: 43px">
                  <v-col md="3">
                    <h3 style="margin-top: 17px">Ngày:</h3>
                    
                  </v-col>
                  <v-col md="9">
                    <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="yy/mm/dd"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        style="padding-right: 350px;"
        id="ngay"
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
                
                <v-row style="padding-left: 43px; padding-right: 43px">
                  <v-col md="3">
                    <h3 style="margin-top: 17px">Thực tập:</h3>
                    
                  </v-col>
                  <v-col md="6">
                    <v-select id="thuctap" style="margin-top: 13px"
          :items="items"
          label="Chọn loại thực tập"
          dense
          solo
        ></v-select>
                    
                  </v-col>
                </v-row>
                    
                  
                
                <v-row style="margin-top: 70px">
                  <table
                    style="
                      width: 100%;
                      margin-left: 50px;
                      margin-right: 50px;
                      margin-bottom: 100px;
                    "
                  >
                    <tr>
                      <th>GVHD</th>
                      <td>
                        <v-text-field
                          style="
                            margin-left: 20px;
                            margin-right: 20px;
                            margin-top: 10px;
                          "
                          placeholder="Giảng viên hướng dẫn"
                          id="gvhd"
                        ></v-text-field>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>HSSV</th>
                      <td>
                        <v-text-field
                          style="
                            margin-left: 20px;
                            margin-right: 20px;
                            margin-top: 10px;
                          "
                          placeholder="Họ tên sinh viên"
                          id="hssv"
                        ></v-text-field>
                      </td>
                      <th>MS HSSV</th>
                      <td>
                        <v-text-field
                          style="
                            margin-left: 20px;
                            margin-right: 20px;
                            margin-top: 10px;
                          "
                          placeholder="Mã số sinh viên"
                          id="mssv"
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <th>Lớp</th>
                      <td>
                        <v-text-field
                          style="
                            margin-left: 20px;
                            margin-right: 20px;
                            margin-top: 10px;
                          "
                          placeholder="Lớp"
                          id="lop"
                        ></v-text-field>
                      </td>
                      <th>Khóa</th>
                      <td>
                        <v-text-field
                          style="
                            margin-left: 20px;
                            margin-right: 20px;
                            margin-top: 10px;
                          "
                          placeholder="Khóa học"
                          id="khoa"
                        ></v-text-field>
                      </td>
                    </tr>
                  </table>
                </v-row>
                </div>

                <v-row class="title" style="margin-top: 130px">
                  <v-toolbar
                    flat
                    color="#1976d2"
                    dark
                    class="pa-0.7 text-no-wrap rounded-lg"
                    
                  >
                    <h4><i class='fas fa-feather-alt' style='font-size:24px; padding-right: 20px;'></i>LỜI MỞ ĐẦU</h4>
                  </v-toolbar>
                  <v-card-text>
                    <!-- <v-textarea
      v-model="title"
      counter
      maxlength="1000"
      full-width
      single-line 
      style="text-color: grey;"
    ></v-textarea> -->
                    <v-textarea
                      outlined
                      name="input-7-4"
                      label="Lời mở đầu"
                      v-model="title"
                      maxlength="1500"
                      single-line
                      counter
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      rows="4"
                      row-height="80"
                      id="loimodau"
                    ></v-textarea>
                  </v-card-text> </v-row
                ><br /><br /><br><br>
                <v-row class="title">
                  <v-toolbar
                    flat
                    color="#1976d2"
                    dark
                    class="pa-0.7 text-no-wrap rounded-lg"
                  >
                    <h4><i class='fas fa-feather-alt' style='font-size:24px; padding-right: 20px;'></i>CHƯƠNG 1: NỘI DUNG THỰC TẬP</h4>
                  </v-toolbar>
                  <v-card-text style="text-align: center">
                    <!-- testttttttttttttttttttt -->
                    <!-- <h3 style="float: left; font-weight: bold;">Mô tả quy trình thực tập và công việc thực tế nơi đang thực tập
</h3><br> -->
                    <br />
                    <details>
                      <summary>
                        1.1. Mô tả quy trình thực tập và công việc thực tế nơi
                        đang thực tập
                      </summary>
                      <p style="text-align: left">
                        Vẽ lại sơ đồ mô tả quy trình các công việc trong quá
                        trình thực tập của mình. Có thể mô tả thêm công việc
                        thực tập của mình giữ vai trò như thế nào trong quy
                        trình chung lớn của toàn công ty.
                      </p>
                    </details>
                    <br /><br />
                    <h4
                      style="
                        float: left;
                        font-style: italic;
                        font-size: 17px;
                        padding-left: 20px;
                      "
                    >
                      • 1.1.1. Quy trình thực tập:
                    </h4>
                    <br /><br /><br /><br />
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
                      style="size: 200px 200px;"                
                    >
                      <label for="fileInput" slot="upload-label" >
                        
                        <!-- <figure>
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
                        </figure> --><br>
                        <span class="upload-caption">{{
                          hasImage ? "Replace" : "Choose image"
                        }}</span>
                        
                      </label>
                    </image-uploader>
                    
                    <br /><br /><br /><br>
                    <h4
                      style="
                        float: left;
                        font-style: italic;
                        font-size: 17px;
                        padding-left: 20px;
                      "
                    >
                      • 1.1.2. Công việc tìm hiểu được về thực tế:
                    </h4>
                    <br /><br />
                    <v-textarea
                      outlined
                      name="input-7-4"
                      label="Mô tả công việc"
                      value="Mô tả chi tiết lại các công việc mình đã làm, các kiến thức/kỹ năm mình đã học thêm được."
                      maxlength="2000"
                      single-line
                      counter
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      rows="4"
                      row-height="90"
                    ></v-textarea>
                    <br><br>
                    <details>
                    <summary>
                      1.2. Học hỏi và viết báo cáo nghiệp vụ chuyên môn tại Cơ
                      quan về chuyên ngành của mình.
                    </summary>
                    </details>
                    
                    <br /><br />
                    <v-textarea
                      outlined
                      name="input-7-4"
                      value="Trong quá trình thực tập, sinh viên có tham gia viết report/document gì để nộp cho công ty thì mô tả tại đây. (Báo cáo hàng ngày/hàng tuần/hàng tháng? Báo cáo công việc hay báo cáo chuyên môn/chuyên ngành? Nộp các báo cáo này cho ai? Báo cáo được đánh giá như thế nào? V.v… Nếu không vi phạm tính bảo mật của công ty, sinh viên có thể đính kèm theo một vài mẫu báo cáo mình đã thực hiện).
"
                      maxlength="1500"
                      single-line
                      counter
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      rows="4"
                      row-height="70"
                    ></v-textarea>
                  </v-card-text> </v-row
                ><br /><br /><br><br>
                <v-row class="title">
                  <v-toolbar
                    flat
                    color="#1976d2"
                    dark
                    class="pa-0.7 text-no-wrap rounded-lg"
                  >
                    <h4><i class='fas fa-feather-alt' style='font-size:24px; padding-right: 20px;'></i>CHƯƠNG 2: TỰ ĐÁNH GIÁ VÀ NHẬN XÉT THỰC TẬP</h4>
                    
                  </v-toolbar>
                  <v-card-text
                    ><br />
                    <details>
                    <summary>
                      2.1. Nhận thức của HSSV sau thời gian tìm hiểu và tham gia
                      thực tập tại đơn vị.
                    </summary>
                    <p></p>
                    </details>
                    <br /><br />
                    <v-textarea
                      outlined
                      name="input-7-4"
                      value="Nội dung phần này có thể bao gồm:
• Những khó khăn và thuận lợi khi nhận nhiệm vụ được giao ?
• Cách giải quyết nội dung công việc được giao ?
• HSSV cần chuẩn bị những kiến thức, tài liệu gì để giải quyết công việc được giao?
• Để nâng hiệu quả cao hơn trong khâu, công đoạn hay bộ phận đó, HSSV có cách giải quyết nào sáng tạo hơn không? Nêu giải pháp của mình để cải tiến và chứng minh tính hiệu quả (nếu có).
• Trường hợp HSSV không có cải tiến theo hướng nhìn nhận của mình và đồng ý với cách giải quyết có sẵn thì cần lý giải những vấn đề chặt chẽ và khoa học của khâu, công đoạn hay bộ phận đó.

"
                      maxlength="1500"
                      single-line
                      counter
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      rows="4"
                      row-height="80"
                    ></v-textarea>
                  </v-card-text>

                  <v-card-text
                    ><br />
                    <details>
                    <summary>
                      2.2. Mối quan hệ giữa các đồng nghiệp trong tổ hay bộ phận
                      và đơn vị nơi thực tập
                    </summary>
                    <p></p>
                    </details>
                    <br /><br />
                    <v-textarea
                      outlined
                      name="input-7-4"
                      value="• HSSV cần những kỹ năng nào để tạo lập các mối quan hệ giữa các đồng nghiệp, cấp trên, cấp dưới để hoàn thành nhiệm vụ được giao. 
• HSSV đánh giá được những ưu điểm, nhược điểm từ mối quan hệ này như thế nào nhằm mang đến hiệu quả công việc?"
                      maxlength="1000"
                      single-line
                      counter
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      rows="4"
                      row-height="50"
                    ></v-textarea>
                  </v-card-text>

                  <v-card-text
                    ><br />
                    <details>
                    <summary>2.3. Học hỏi từ các quy định nơi thực tập</summary>
                    <p></p>
                    </details>
                    <br /><br />
                    <h4
                      style="
                        float: left;
                        font-style: italic;
                        font-size: 17px;
                        padding-left: 20px;
                      "
                    >
                      • 2.3.1. Nội quy lao động, học tập, nghỉ ngơi và an toàn lao
                      động
                    </h4>
                    <br /><br />
                    <v-textarea
                      outlined
                      name="input-7-4"
                      value="• Học hỏi được những gì từ các quy định trong nội quy lao động, học tập, nghỉ ngơi và an toàn lao động tại Cơ quan mình đang thực tập? 
• HSSV học hỏi được những gì về tác phong công nghiệp, văn hóa doanh nghiệp so với lúc mình đang học tại Trường. Nếu thiếu các kiến thức này có làm việc lâu dài tại Cơ quan này được hay không? Hãy phân tích để thấy rõ tầm quan trọng đó?"
                      maxlength="1000"
                      single-line
                      counter
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      rows="4"
                      row-height="50"
                    ></v-textarea>

                    <h4
                      style="
                        float: left;
                        font-style: italic;
                        font-size: 17px;
                        padding-left: 20px;
                      "
                    >
                      • 2.3.2. Quy định về PCCC, Vệ sinh và môi trường
                    </h4>
                    <br /><br />
                    <v-textarea
                      outlined
                      name="input-7-4"
                      value="• Học hỏi được những gì từ các quy định về PCCC, Vệ sinh và môi trường tại Cơ quan mình đang thực tập? 
• Nếu thiếu các kiến thức này có làm việc lâu dài tại Cơ quan này được hay không? Hãy phân tích để thấy rõ tầm quan trọng đó?"
                      maxlength="1000"
                      single-line
                      counter
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      rows="4"
                      row-height="50"
                    ></v-textarea>
                    <br><br>
                    <details>
                    <summary>
                      2.4. Đánh giá mối liên hệ giữa lý thuyết và thực tiễn
                    </summary>
                    <p></p>
                    </details>
                    <br /><br />
                    <v-textarea
                      outlined
                      name="input-7-4"
                      value="• Nêu một số tình huống nảy sinh trong thời gian thực tập để minh chứng rằng cách học ở Trường khác với cách giải quyết, xử lý, quản lý… tại nơi thực tập? Phân tích vì sao có sự khác biệt trên để đưa ra ý kiến của mình?
• Để đạt được hiệu quả cao công việc được giao theo HSSV cần chuẩn bị những gì?
• Những môn học, kiến thức nào chưa được trang bị hoặc trang bị còn thiếu, các môn đã học có phù hợp không, sự khác biệt nào giữa lý thuyết và thực tiễn cần phải học thêm để bổ sung, hoàn chỉnh kiến thức?
• Nêu rõ trong quá trình tham gia thực tập HSSV đã làm được và thu hoạch được?
• Những gì HSSV chưa làm được?
• Trong quá trình thực tập đã giúp HSSV nâng cao những kỹ năng gì?
• Sự hỗ trợ nào từ cán bộ phụ trách tại nơi thực tập? Có học hỏi được gì không?
• Sự hỗ trợ, hướng dẫn nào từ giảng viên hướng dẫn tại trường? Học tập được gì từ giảng viên?"
                      maxlength="2000"
                      single-line
                      counter
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      rows="4"
                      row-height="100"
                    ></v-textarea>
                  </v-card-text>
                </v-row>
                <br /><br /><br><br>
                <v-row class="title">
                  <v-toolbar
                    flat
                    color="#1976d2"
                    dark
                    class="pa-0.7 text-no-wrap rounded-lg"
                  >
                    <h4><i class='fas fa-feather-alt' style='font-size:24px; padding-right: 20px;'></i>KẾT LUẬN</h4>
                  </v-toolbar>
                  <v-card-text>
                    <v-textarea
                      outlined
                      name="input-7-4"
                      label="Kết luận"
                      value="Nêu tổng kết một cách tóm tắt các kết quả đạt được sau quá trình thực tập và bài học rút ra cho bản thân. Không cần cảm ơn tại đây vì đã cảm ơn ở phần mở đầu. Viết gói gọn trong một trang A4."
                      maxlength="2000"
                      single-line
                      counter
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      rows="4"
                      row-height="100"
                    ></v-textarea>
                  </v-card-text> </v-row
                ><br /><br /><br><br>

                <v-row class="title">
                  <v-toolbar
                    flat
                    color="#1976d2"
                    dark
                    class="pa-0.7 text-no-wrap rounded-lg"
                  >
                    <h4><i class='fas fa-feather-alt' style='font-size:24px; padding-right: 20px;'></i>TÀI LIỆU THAM KHẢO</h4>
                  </v-toolbar>
                  <v-card-text>
                    <v-textarea
                      outlined
                      name="input-7-4"
                      label="Tài liệu tham khảo"
                      value="Nêu tên các tài liệu có tham khảo trong quá trình thực tập như tài liệu công ty cung cấp, tài liệu tìm kiếm online, tài liệu từ giáo trình, giáo viên cung cấp.
[1]
[2]
[3]
"
                      maxlength="700"
                      single-line
                      counter
                      clearable
                      clear-icon="mdi-close-circle"
                      auto-grow
                      rows="4"
                      row-height="70"
                    ></v-textarea>
                  </v-card-text> </v-row
                ><br />
                
                
                <v-row align="center">
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                      :items="itemsvb"
                      label="Chọn loại văn bản lưu"
                      outlined
                      
                    ></v-select>
                  </v-col>
                </v-row><br><br>
                <v-row align="center" justify="space-around">
                  
                  <v-btn depressed :disabled="dialog2" color="#D5E8D4" style="width: 100px; height: 28px" @click="dialog = false, createPDF()"> Lưu </v-btn>
                  <v-btn depressed :disabled="dialog3" color="#FF0000" style="width: 100px; height: 28px" @click="dialog3 = !dialog3">Hủy</v-btn> 
                  </v-row
                ><br /><br />
                
              </v-container>
            </v-form>
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
              <!-- If using vue-router -->
              <router-view></router-view>
            </v-container>
            
          </v-main>
          
        </v-card>
      </v-dialog>
      <!-- saving... -->
      <v-dialog
      v-model="dialog2"
      hide-overlay
      persistent
      width="120"
    >
      <v-card
        color="#dde2e7"
        dark
      >
        <h3 style="text-align: center; padding-top: 10px;padding-bottom: 10px; color: #126ec8;">
          Đã lưu
        </h3>
      </v-card>
    </v-dialog>
    <!-- ques -->
    <v-dialog
      v-model="dialog3"
      persistent
      max-width="290"
    >
      
      <v-card>
        <v-card-title class="font-weight-bold">
          Thông báo
        </v-card-title>
        <v-card-text class="font-weight-regular">Báo cáo vẫn chưa được lưu. Bạn có muốn thoát?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#1976d2"
            text
            @click="dialog3 = false"
          >
            Hủy
          </v-btn>
          <v-btn
            color="#1976d2"
            text
            @click="dialog3 = false,dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
    
    </v-row>

 </v-app>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script>
export default {
  
  data() {
    return {
      dialog2: false,
      dialog3: false,
      date: null,
      menu: false,
      hasImage: false,
      image: null,
      title:
        "Ghi vắn tắt cảm nghĩ về quá trình thực tập. Quá trình thực tập diễn ra như thế nào. Có thể cảm ơn nếu cần. Lưu ý lời mở đầu chỉ nên gói gọn trong 1 trang A4.",
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,

      items: ['Thực tập doanh nghiệp', 'Thực tập tốt nghiệp'],
      itemsvb: ["Word", "PDF", "Web Page", "Plane Text"],
    };
  },
  watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      dialog2 (val) {
        if (!val) return

        setTimeout(() => (this.dialog2 = false), 1500)
      },
    },
  methods: {
   
    setImage: function (output) {
      this.hasImage = true;
      this.image = output;
      console.log("Info", output.info);
      console.log("Exif", output.exif);
    },
    save (date) {
        this.$refs.menu.save(date)
      },
    // exportHTML(){
    //    html2canvas(document.getElementById('tblCustomers'), {
    //             onrendered: function (canvas) {
    //                 var data = canvas.toDataURL();
    //                 var docDefinition = {
    //                     content: [{
    //                         image: data,
    //                         width: 500
    //                     }]
    //                 };
    //                 pdfMake.createPdf(docDefinition).download("Table.pdf");
    //             }
    //         });
   

    // }
    createPDF(){
    if( document.getElementById("tendn1").value == ""){
        alert("Không được để trống");
    }
    else{

      


        var doc = new jsPDF();
        
        doc.setFontType("bold");
        doc.setFontSize(21);
        doc.text(55, 20, 'BAO CAO KET QUA THUC TAP');
       
       doc.setFontSize(16);
       doc.setFontType("normal");
        doc.text(20, 50, 'Ten doanh nghiep:');
        doc.setFontType("italic");
        doc.text(document.getElementById("tendn2").value, 90, 50);
        doc.setFontType("normal");
        doc.text(20, 60, 'Dia chi:');
        doc.setFontType("italic");
        doc.text(document.getElementById("diachi").value, 90, 60);
        doc.setFontType("normal");
        doc.text(20, 70, 'Ngay:');
        doc.setFontType("italic");
        doc.text(document.getElementById("ngay").value, 90, 70);
        doc.setFontType("normal");
        doc.text(20, 80, 'Thuc tap:');
        doc.setFontType("italic");
        doc.text(document.getElementById('thuctap').value, 90, 80);
        
        doc.setFontType("normal");
        doc.text(25, 100, 'GVHD:');
        doc.text(document.getElementById("gvhd").value, 50, 100);
        doc.text(25, 110, 'HSSV:');
        doc.text(document.getElementById("hssv").value, 50, 110);
        doc.text(25, 120, 'Lop:');
        doc.text(document.getElementById("lop").value, 50, 120);

        doc.text(110, 110, 'MS HSSV:');
        doc.text(document.getElementById("mssv").value, 145, 110);
        doc.text(110, 120, 'Khóa:');
        doc.text(document.getElementById("khoa").value, 145, 120);

        doc.setFontSize(18);
        doc.setFontType("bold");
        doc.text(87, 160, 'Loi mo dau');
        doc.setFontType("normal");
        doc.setFontSize(15);
        doc.text(document.getElementById("loimodau").value, 20, 170);
        
        doc.setFontSize(18);
        doc.setFontType("bold");
        doc.text(65, 250, 'Chuong 1: Noi dung thuc tap');
        doc.setFontSize(15);
        doc.text(20, 260, '1.1. Mo ta quy trinh thuc tap va cong viec thuc te noi dang thuc tap');
        doc.setFontSize(15);
        doc.text(20, 270, '1.1.1. Quy trinh thuc tap');


       
        doc.save("BaoCaoThucTap.pdf");


        

    }
    }

}
//     huhu(){
//       var doc = new jsPDF();
// var elementHTML = $('#target').html();
// var specialElementHandlers = {
//     '#elementH': function (element, renderer) {
//         return true;
//     }
// };
// doc.fromHTML(elementHTML, 15, 15, {
//     'width': 170,
//     'elementHandlers': specialElementHandlers
// });

// // Save the PDF
// doc.save('sample-document.pdf');
//     }

  
}
</script>



<style >

#fileInput {
  display: none;
}

.pa-7 {
  font-size: 20px;
}
.title {
  border: 2.4px solid #1976d2;
  border-radius: 12px;
  margin-bottom: 50px;

}
.vinh{
  border: 3px solid #1976d2;
  border-style: double;
  border-radius: 10px;
  margin-bottom: 50px;
  padding-top: 100px;
  padding-bottom: 90px;
  border-width: 10px;
}
table,
th,
td {
  border: 1px solid rgb(150, 149, 149);
  border-collapse: collapse;
}
th {
  padding-left: 10px;
  padding-right: 10px;
}
details > summary {
  font-size: 18px;
  font-weight: bold;
  float: left;
  width: 10 00px;
  background-color: white;
  border: none;
  box-shadow: 1px 1px 2px white;
  cursor: pointer;
}
summary {
  font-size: 18px;
  font-weight: bold;
  float: left;
}
details > p {
  float: left;
  background-color: white;
  padding: 4px;
  margin: 0;
  box-shadow: 1px 1px 2px white;
}
.upload-caption{
  border: 1px solid rgb(105, 105, 105);
  border-radius: 6px;
  padding: 5px;
}

</style>
