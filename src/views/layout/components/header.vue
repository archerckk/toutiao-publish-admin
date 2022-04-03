<template>
  <div class="header-container">
    <div class="title-wrap">
      <i class="el-icon-s-fold"></i>
      <span>前端测试科技有限公司</span>
    </div>

      <el-dropdown>
        <div class="avatar-warp">
          <img class="avatar" :src="user.photo" alt="用户头像">
          <span>{{ user.name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'

export default {
  name: 'AppHeader',
  components: {},
  props: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">

.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;

  .avatar-warp {
    display: flex;
    align-items: center;

    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
