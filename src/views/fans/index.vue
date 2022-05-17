<template>
  <div class="fans-container">
    <h2>图表展示</h2>
    <echarts-demo />
  </div>

</template>

<script>
import echartsDemo from './components/echarts_demo'

export default {
  name: 'FansIndex',
  components: { echartsDemo },
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

</style>
