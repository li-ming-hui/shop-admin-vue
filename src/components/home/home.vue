<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple"><img src="./logo.png" alt=""></div></el-col>
        <el-col :offset="16" :span="4"><div class="grid-content bg-purple"><a href="#">退出</a></div></el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style>
.container {
  height: 100%;
  line-height: 60px;
}

.header {
  background-color: #B3C0D1;
}
.container .header .el-row a {
  float: right;
  margin: 0 20px;
}
.aside {
  background-color: #D3DCE6;
}

.main {
  background-color: #E9EEF3;
  height: 100%;
}
</style>
