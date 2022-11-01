<!-- 一般的非路由组件存放在components -->
<template>
  <el-row  type="flex" justify="end">
    <el-col :span="18">
      <div>vue及springboot分离项目的综合练习</div>
    </el-col>
    <el-col :span="3">
      <router-link to="/login">登录</router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "MyTitle"
}
</script>
