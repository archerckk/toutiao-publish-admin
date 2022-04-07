<template>
  <div class="login-container">

    <div class="login-form-warp">
<!--      <div class="login-head">-->
<!--        <div class="logo"></div>-->
<!--        <div class="title"></div>-->
<!--      </div>-->
      <login-header></login-header>
      <el-form ref="login_form" :model="user" class="login-form" :rules="login_rule">
        <el-form-item  prop="mobile">
          <el-input
            v-model="user.mobile"
            placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item  prop="code">
          <el-input v-model="user.code" placeholder="请输入你的验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox
           v-model="user.agree">我已阅读并同意用户协议和隐私条款
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn"  type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import LoginHeader from './components/login_header'

export default {
  name: 'LoginIndex',
  components: { LoginHeader },
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      checked: false, // 是否选中同意协议
      loginLoading: false, // 展示登录中的控制变量
      login_rule: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '请输入格式正确的手机号', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码名称', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入6位验证码' }
        ],
        agree: [
          {
            // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    login () {
      this.loginLoading = true
      login(this.user).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.loginLoading = false

        // 跳转到首页
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败，验证码或者手机号错误')
        this.loginLoading = false
      })
    },
    onLogin () {
      // 验证表单
      this.$refs.login_form.validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin-top: 0;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-form-warp {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;

    .login-head {
      //width: 200px;
      //height: 57px;
      display: flex;
      justify-content: center;
      //background: url("header1.png") no-repeat;

      .title{
        width: 200px;
        height: 57px;
        background: url('header1.png') no-repeat;
        background-size: contain;
        justify-content: center;
        padding: 0;

      }

      .logo {
        width: 50px;
        height: 57px;
        padding: 0;
        background: url('./logo_index.png') no-repeat;
        background-size: contain;
      }
    }

    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
