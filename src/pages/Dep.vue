<template>
  <el-table :data="depArr.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column prop="id" label="编号" width="180">
    </el-table-column>
    <el-table-column prop="name" label="部门" width="280">
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>修改</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i
            class="el-icon-delete"></i>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
export default {
  name: "Dep",
  data() {
    return {
      depArr: [{
        id: '',
        name: ''
      }],
      search: '',

    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      console.log(row.did);
    },
    getAllDep() {
      //api表示前端配置使用了代理，执行跨域操作
      this.$axios.post("/dep/1/5",
        {}
      ).then(resp => {
        this.depArr = resp.data.content;
      }).catch(error => {
        if (error.response.status === 401) {
          this.$router.push("/login");
          this.$message.warning("未登录");
        } else if (error.response.status === 403) {
          this.$message.warning("未获得dep权限");
        }
      });
    }
  },
  mounted() {
    console.log(process.env.NODE_ENV)
    this.getAllDep();
  }
}
</script>

<style>
/* .el-input {
  background-color: aquamarine;
   size:"20" 
} */
</style>