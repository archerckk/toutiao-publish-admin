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
      <image-list />
   </el-card>
  </div>
</template>

<script>
import ImageList from '@/components/image_list'

export default {
  name: 'ImageIndex',
  components: { ImageList },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">

</style>
