<template>
  <div ref="main" style="width: 600px;height:400px;"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 初始化图表
    var myChart = echarts.init(this.$refs.main)

    // 数据设置
    var option = {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25]
        }
      ]
    }

    // 使用刚刚配置的图表
    myChart.setOption(option)
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
