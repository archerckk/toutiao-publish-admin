<template>
  <el-container class="container">
    <el-aside width="auto" class="aside" >
      <app-aside class="aside-child" ></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header" >
      <app-header></app-header>
      </el-header>
      <el-main class="main">
        <!--   路由出口     -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import AppAside from './components/aside'
import AppHeader from './components/header'

export default {
  name: 'layout',
  components: { AppAside, AppHeader },
  props: {},
  data () {
    return {
      // isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.container{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.aside{
  background: #D3DCE6;
  .aside-child{
    height: 100%;
  }
}
.header{
  background: #B2C0D0;

}
.main{
  background: #E9EEF2;
}

</style>
