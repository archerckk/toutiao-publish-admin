<template>
  <div class="header-container">
    <div class="title-wrap">
      <i :class="{'el-icon-s-fold':isCollapse,'el-icon-s-unfold':!isCollapse}"
      @click="sendCollapse"
      ></i>
      <span>前端测试科技有限公司</span>
    </div>

      <el-dropdown>
        <div class="avatar-warp">
          <img class="avatar" src="../user.jpg" alt="用户头像">
          <span>{{ user.name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import Public from '@/public'

export default {
  name: 'AppHeader',
  components: {},
  props: [],
  data () {
    return {
      user: {},
      isCollapse: false
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
        // console.log(`test: ${this.user}`)
      })
    },
    sendCollapse () {
      this.isCollapse = !this.isCollapse
      Public.$emit('is-collapse', this.isCollapse)
    },
    handleLogout () {
      this.$confirm('是否退出账号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
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
