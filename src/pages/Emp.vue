
<template>
  <div>
    <el-form ref="searchEmp" :model="searchEmp" label-width="80px" :inline="true" @keyup.enter.native="enterSearch"
      align="left">
      <el-form-item label="编号">
        <el-input v-model="searchEmp.id" placeholder="输入编号查询"></el-input>
      </el-form-item>

      <el-form-item label="姓名">
        <el-input v-model="searchEmp.name" placeholder="输入姓名查询"></el-input>
      </el-form-item>

      <el-form-item label="部门" ref="refdepArr">
        <el-select v-model="searchEmp.dep.id" placeholder="选择部门查询" clearable>
          <el-option v-for="dep in depArr" :label="dep.name" :value="dep.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="" @click="clear">清除</el-button>
        <el-button @click="toEmpAdd"><i class="el-icon-plus"></i>新添员工</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="page.content" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="280">
      </el-table-column>
      <el-table-column prop="dep.name" label="部门" width="280">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



    <el-dialog title="修改员工信息" :visible.sync="dialogFormVisible">
      <el-form :model="updateEmp" :inline="true" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="updateEmp.id" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="updateEmp.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="updateEmp.dep.id">
            <el-option v-for="dep in depArr" :label="dep.name" :value="dep.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateCancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination ref="refPag" background layout="sizes, prev, pager, next" :page-count="page.totalPages"
      :page-size="pageSize" :page-sizes="[5, 10, 100, 400]" @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>


<script>
export default {
  name: "Emp",
  data() {
    return {
      dialogFormVisible: false,
      updateEmp: {//修改的 emp
        id: '',
        name: '',
        dep: {
          id: '',
          name: ''
        }
      },

      searchEmp: {//查询的条件
        id: '',
        name: '',
        dep: {
          id: '',
          name: ''
        }
      },
      depArr: [],//部门下拉框的预选项
      page: '',//查询的分页结果
      pageSize: 5
    }
  },
  methods: {
    //添加页面
    toEmpAdd() {
      this.$router.push({
        path: '/empAdd',
        query: {
          depArr: this.depArr
        }
      })
    },
    //编辑记录
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.updateEmp = row;
    },

    //删除记录
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {//点击确定后执行的函数，发送请求
        this.$axios.delete("/emp/" + row.id
        ).then(resp => {
          this.$message.success('删除成功');
          this.getEmp(this.$refs.refPag.internalCurrentPage,this.pageSize);//删除后刷新页面
        }).catch(error => {
          this.$message.error('删除失败');
        })
      }).catch(() => {//点击取消后执行的函数
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //刷新记录
    getEmp(pageNum, pageSize) {//这种传参方法为 json 后端将此 json 封装成为一个对象
      this.$axios.post(`/emp/${pageNum}/${pageSize}`,
        this.searchEmp
      ).then(resp => {
        this.page = resp.data;
        console.log(this.page)
      }).catch(error => {
        console.log(error)
        if (error.response.status === 401) {
          this.$router.push("/login");
          this.$message.warning("未登录");
        } else if (error.response.status === 403) {
          this.$message.warning("未获得emp权限");
        }
      })
    },
    //更新 emp
    update() {
      this.$axios.put("/emp", this.updateEmp
      ).then(resp => {
        this.getEmp(this.$refs.refPag.internalCurrentPage, this.pageSize);//修改成功后刷新页面
        this.dialogFormVisible = false;
        this.$message.success('修改成功');
      }).catch(error => {
        this.$message.error('请求错误');
      })
      
    },
    updateCancel() {
      this.dialogFormVisible = false
      this.$message('取消修改');
    },
    //分页组件页码改变事件
    handleCurrentChange(pageNum) {
      this.getEmp(pageNum, this.pageSize);
    },
    //分页组件页码大小改变事件
    handleSizeChange(val) {
      this.pageSize = val;
      this.$refs.refPag.internalCurrentPage = 1;
      this.getEmp(1, this.pageSize)
    },
    //点击查询事件
    onSubmit() {
      this.getEmp(1, this.pageSize)
    },
    //键盘 enter 事件
    enterSearch() {
      this.onSubmit()
    },
    //清除条件查询
    clear() {
      this.searchEmp = {
        id: '',
        name: '',
        dep: {
          id: '',
          name: ''
        }
      }
    },
    //获取所有的部门信息
    getAllDep() {
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
      })
    }

  },
  //挂载完成
  mounted() {
    this.getAllDep();
    this.getEmp(1, this.pageSize);
  }
}
</script>

<style>
.el-form {
  /* background-color: aqua; */
  line-height: 30px;
  /* padding: 40px; */
}

.el-dialog {
  width: 600px;
}

.el-pagination {
  /* background-color: aqua; */
  line-height: 60px;
  padding: 40px;
}
</style>