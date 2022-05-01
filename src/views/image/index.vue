<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑控件 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to='/' >首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  /面包屑控件  -->
      </div>
      <div >
        <!--单选按钮-->
        <el-radio-group v-model="labelPosition" size="small" style="padding-bottom: 20px">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="collect">收藏</el-radio-button>
        </el-radio-group>

      <!--  图片控件-->
        <el-row>
          <el-col :span="4" :xs="12" :sm="6" :md="6" :lg="4" >
            <el-image
                style=" height: 100px"
                :src="url"
                :fit="cover"></el-image>
          </el-col>
          <el-col :span="4" :xs="12" :sm="6" :md="6" :lg="4">
            <el-image
                style=" height: 100px"
                :src="url"
                :fit="cover"></el-image>
          </el-col>
          <el-col :span="4" :xs="12" :sm="6" :md="6" :lg="4">
            <el-image
                style=" height: 100px"
                :src="url"
                :fit="cover"></el-image>
          </el-col>
          <el-col :span="4" :xs="12" :sm="6" :md="6" :lg="4">
            <el-image
                style=" height: 100px"
                :src="url"
                :fit="cover"></el-image>
          </el-col>
          <el-col :span="4" :xs="12" :sm="6" :md="6" :lg="4">
            <el-image
                style=" height: 100px"
                :src="url"
                :fit="cover"></el-image>
          </el-col>
          <el-col :span="4" :xs="12" :sm="6" :md="6" :lg="4">
            <el-image
                style=" height: 100px"
                :src="url"
                :fit="cover"></el-image>
          </el-col>
          <el-col :span="4" :xs="12" :sm="6" :md="6" :lg="4">
            <el-image
                style=" height: 100px"
                :src="url"
                :fit="cover"></el-image>
          </el-col>
          <el-col :span="4" :xs="12" :sm="6" :md="6" :lg="4">
            <el-image
                style=" height: 100px"
                :src="url"
                :fit="cover"></el-image>
          </el-col>
        </el-row>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      labelPosition: 'all',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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

</style>
