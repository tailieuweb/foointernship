<template>
  <div class="container">
    <div class="user">
      <tbody>
        <tr>
          <td>
            <v-img
              src="../../assets/ungvien.png"
              max-height="100"
              max-width="100"
            ></v-img>
          </td>
          <td>
            <tr>
              <td class="text">Trường:................</td>
            </tr>
            <tr>
              <td class="text">Khóa:...........</td>
            </tr>
            <tr>
              <td class="text">Họ và tên:..........</td>
            </tr>
            <tr>
              <td class="text">Ngày Sinh:...........</td>
            </tr>
          </td>
        </tr>
      </tbody>
    </div>
  </div>
</template>
<style>
.text {
    font-size: 12px;
    font-family: cursive;
    padding-left: 5px;
}
.user{
    width: 26%;
    margin-left: auto;
    margin-right: 0px;
    border: 1px solid;
    padding-bottom: 5px;
    padding-top: 5px;
    padding-left: 5px;
}
</style>