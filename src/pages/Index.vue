<template>
  <el-container>
    <el-header><my-title></my-title></el-header>
    <el-container>

      <el-aside width="180px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <!-- <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu> -->
              <router-link class="list-group-item" to="/dep">
                <el-menu-item index="1" >
                  <i class="el-icon-s-grid"></i>
                  <span slot="title">
                    部门
                  </span>
                </el-menu-item>
              </router-link>
              <router-link class="list-group-item" to="/emp">
                <el-menu-item index="2">
                  <i class="el-icon-user"></i>
                  <span slot="title">
                    员工
                  </span>
                </el-menu-item>
              </router-link>
              <el-menu-item index="3" disabled>
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import MyTitle from '../components/MyTitle.vue';
export default {
  name: "index",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    MyTitle
  }
}
</script>


<style>
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 100px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
