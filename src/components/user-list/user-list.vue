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
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"></el-button>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button
        type="success"
        plain
        @click="dialogFormVisible = true">添加用户</el-button>
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
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      label="用户状态"
      width="100">
      <template slot-scope="scope">
        <!-- 我们在这里可以通过 scope.row 拿到当前遍历行对象 -->
        <el-switch
          v-model="scope.row.mg_state"
          @change="(val) => { handleStateChange(val, scope.row) }"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
      </template>
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
    :page-sizes="[5,8]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalSize">
  </el-pagination>

  <!-- 添加用户对话框 -->
  <el-dialog
    title="添加用户"
    :visible.sync="dialogFormVisible">
    <!--
      表单验证
      1. 为 el-form 增加 rules 验证规则配置对象
      2. 为 el-form-item 元素配置 prop 属性，值是验证对象中对应的字段名称

      如果想要使用 JavaScript 来强行验证。那么我们就需要做：
      1. 为 el-form 增加 ref 属性，给 ref 起一个名字（类似于给元素起 id）
      2. 在 JavaScript 代码中使用 this.$refs['ref名字'].validate() 验证表单
    -->
    <el-form
      :model="userForm"
      :rules="addUserFormRules"
      ref="addUserForm">
      <el-form-item label="用户名" label-width="120px" prop="username">
        <el-input v-model="userForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="120px"  prop="password">
        <el-input prop="password" v-model="userForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="120px" prop="email">
        <el-input prop="password" v-model="userForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="120px" prop="mobile">
        <el-input v-model="userForm.mobile" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAddUser">确 定</el-button>
    </div>
  </el-dialog>
  <!-- /添加用户对话框 -->
 </div>
 </template>

<script>

export default {
  async created () {
    this.loadUsersByPage(1)
  },
  data () {
    return {
      searchText: '',
      tableData: [], // 表格列表数据
      totalSize: 0, // 总记录数据
      currentPage: 1, // 当前页码
      pageSize: 5, // 当前每页大小
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      dialogFormVisible: false,
      // 1. 添加 rules 验证规则
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 处理分页页码大小改变
     */
    async handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadUsersByPage(1, pageSize)

      // 每页大小改变之后，数据回归到了第1页
      // 我们的页码的高亮状态也应用回归到第1页
      // 我们这里就可以使用 this.currentPage 来控制
      this.currentPage = 1
    },

    /**
     * 处理分页页码改变
     */

    async handleCurrentChange (currentPage) {
      this.loadUsersByPage(currentPage)
    },

    /**
     * 处理用户搜索
     */

    handleSearch () {
      this.loadUsersByPage(1)
    },
    /**
     * 分页加载用户列表数据
     */

    async loadUsersByPage (page) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: this.pageSize,
          query: this.searchText // 根据搜索文本框的内容来搜索
        }
      })
      const {users, total} = res.data.data

      this.tableData = users

      // 把真实的总记录交给分页插件
      // 分页插件会根据总记录数和每页大小自动完成分页效果
      this.totalSize = total
    },

    /**
     * 处理用户状态改变
     */
    async handleStateChange (state, user) {
      const {id: userId} = user
      const res = await this.$http.put(`/users/${userId}/state/${state}`)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态${state ? '开启' : '禁用'}成功`
        })
      }
    },

    /**
     * 处理添加用户
     */
    async handleAddUser () {
      // 1. 获取表单数据
      // 2. 表单验证
      // 3. 发起请求添加用户
      // 4. 根据响应做交互
      //    添加用户成功，给出提示
      //    关闭对话框
      //    重新加载当前列表数据
      this.$refs['addUserForm'].validate(async (valid) => {
        if (!valid) {
          return false
        }
        // 代码执行到这里就表示表单验证通过了，我们可以提交表单了
        const res = await this.$http.post('/users', this.userForm)
        if (res.data.meta.status === 201) {
          // 添加成功提示消息
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })

          // 关闭对话框
          this.dialogFormVisible = false

          // 重新加载用户列表数据
          this.loadUsersByPage(this.currentPage)

          // 清空表单内容
          for (let key in this.userForm) {
            this.userForm[key] = ''
          }
        }
      })
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
