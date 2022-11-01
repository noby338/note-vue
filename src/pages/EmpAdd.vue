
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" :rules="rules">
      <el-breadcrumb-item :to="{ path: '/emp' }">员工</el-breadcrumb-item>
      <el-breadcrumb-item>员工添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="emp" :model="emp" label-width="80px" :inline="false" class="demo-form-inline" align="">
      <el-form-item label="姓名" prop="name">
        <el-col :span="3">
          <el-input v-model="emp.name" placeholder="请输入员工姓名" size="small"></el-input>
        </el-col>
      </el-form-item>


      <el-form-item label="部门" prop="dep">
        <el-col :span="3">
          <el-select v-model="emp.dep.id" placeholder="请选择部门" size="small" style="width: 100%;">
            <el-option v-for="dep in depArr" :label="dep.name" :value="dep.id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="insert('emp')">添加</el-button>
        <el-button @click="cancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>
<script>
export default {
  name: 'EmpAdd',
  data() {
    return {
      emp: {
        name: '',
        dep: {
          id: '',
          name: ''
        }
      },
      depArr: this.$route.query.depArr,
      rules: {
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        dep: {
          id: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ]
        }
        ,

      }
    }
  },
  methods: {
    insert(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/emp", 
          this.emp
          ).then(resp => {
            this.$message.success('添加成功');
          }).catch(error => {
            this.$message.error('请求错误');
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });



    },
    cancel() {
      this.$router.go(-1)
    },
  },
  mounted() {
  }
}
</script>