<template>
  <div class="login-head">
    <div class="logo"></div>
    <div class="title"></div>
  </div>
</template>

<script>
export default {
  name: 'LoginHeader',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.login-head {
  //width: 200px;
  //height: 57px;
  display: flex;
  justify-content: center;
  //background: url("header1.png") no-repeat;

  .title{
    width: 200px;
    height: 57px;
    background: url('../header1.png') no-repeat;
    background-size: contain;
    justify-content: center;
    padding: 0;

  }

  .logo {
    width: 50px;
    height: 57px;
    padding: 0;
    background: url('../logo_index.png') no-repeat;
    background-size: contain;
  }
}

.login-form {
  .login-btn {
    width: 100%;
  }
}

</style>
