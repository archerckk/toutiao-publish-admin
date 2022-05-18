<template>
  <div class="fans-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="粉丝数据" name="first">
        <fan-data />
      </el-tab-pane>

      <el-tab-pane label="粉丝画像" name="second">
        <h2>粉丝画像</h2>
        <echarts-demo />
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import echartsDemo from './components/echarts_demo'
import ImageList from '@/components/image_list'
import FanData from './components/fan_data'

export default {
  name: 'FansIndex',
  components: { echartsDemo, FanData },
  props: {},
  data () {
    return {
      activeName: 'first'
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
