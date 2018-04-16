<template>
 <div class="user-list-wrap">
   <el-row>
     <el-col>
       <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
       </el-breadcrumb>
     </el-col>
   </el-row>
   <el-row class="user-list-search">
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="success" plain>添加用户</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
  </el-table>
  <!--
    :page-sizes="[1,2, 3, 4]" 每页大小
    一共有多少条记录 :total="10"
     loadUsersByPage(1, 每页大小)
     current-page 用来配置指定页码高亮
  -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="[1,2]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalSize">
  </el-pagination>
 </div>
 </template>

<script>

export default {
  async created () {
    this.loadUsersByPage(1, 1)
  },
  data () {
    return {
      searchText: '',
      tableData: [], // 表格列表数据
      totalSize: 0, // 总记录数据
      currentPage: 1, // 当前页码
      pageSize: 1 // 当前每页大小
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      console.log('每页大小：', pageSize)

      // 将用户选择的页码大小存储起来
      // 用于页码改变之后，再次点击页码的时候获取最新用户选择的每页大小
      this.pageSize = pageSize

      // 页码发生改变
      // 重新请求列表数据
      // 用户改变每页大小之后，我们请求新的数据，以新的每页大小的第1页为准
      this.loadUsersByPage(1, pageSize)

      // 页码改变之后，不仅让数据到了第1页
      // 同时也要让页码高亮状态也跑到第1页
      this.currentPage = 1
    },
    handleCurrentChange (currentPage) {
      console.log('页码：', currentPage)

      // 将 currentPage 更新为最新点击的页码
      // Element 插件的页码发生改变的时候，不会修改我们的数据 currentPage
      // 我们这里让其每一次页码变化的时候，手动将 currentPage 赋值为当前最新页码
      // this.currentPage = currentPage

      // 页码改变，请求当前页码对应的数据
      // 注意：这里我们请求的每页大小先写死
      //       为什么呢？
      //       我们的每页大小是会变化的
      this.loadUsersByPage(currentPage, this.pageSize)
    },

    // 根据页码加载用户列表数据
    async loadUsersByPage (page, pageSize = 1) {
      const res = await this.$http.get('/users', {
        params: { // 请求参数，对象会被转换为 k=v&k=v 的格式，然后拼接到请求路径 ? 后面发起请求
          pagenum: page,
          pagesize: pageSize
        }
      })
      const {users, total} = res.data.data
      this.tableData = users
      // 请求数据成功，我们从服务器得到了总记录数据
      // 然后我们就可以把总记录数据交给分页插件来使用
      this.totalSize = total
    }
  }
}
</script>

<style>
.user-list-breadcrumb {
  line-height: 3;
}
.user-list-search {
  margin: 5px 0;
}
.el-pagination {
  margin-top: 15px;
}
.user-list-search button {
  margin-left: 10px;
}
</style>
