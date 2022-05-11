<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑控件 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to='/' >首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  /面包屑控件  -->

      <!--  表格控件-->
        <el-table
            :data="article"
            stripe
            style="width: 100%">
          <el-table-column
              prop="title"
              label="标题"
              >
          </el-table-column>
          <el-table-column
              prop="total_comment_count"
              label="评论总数"
              >
          </el-table-column>
          <el-table-column
              prop="fans_comment_count"
              label="粉丝评论数">
          </el-table-column>
          <el-table-column
              prop="address"
              label="状态">
            <template slot-scope="scope">
              {{scope.row.comment_status ? '打开' : '关闭'}}
            </template>
          </el-table-column>
          <el-table-column
              prop="address"
              label="操作">
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.comment_status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :disabled="scope.row.statusDisable"
                  @change="onStatusChange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <!--分页功能-->

        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange(page)"
            :current-page.sync="page"
            :page-sizes="[10, 20, 50]"
            :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total_count">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getArticles,
  updateCommentStatus
}
from '@/api/articles'

export default {
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      article: [],
      page: 1, // 控制当前页码
      pageSize: 10, // 每页显示的数据数量
      total_count: 0 // 总的消息条数
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadComment()
  },
  mounted () {},
  methods: {
    loadComment (page = 1) {
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        const results = res.data.data.results
        results.forEach(article => {
          article.statusDisable = false
        })
        this.article = results
        this.total_count = res.data.data.total_count
      })
    },
    onStatusChange (article) {
      // 设置开关状态为禁用
      article.statusDisable = true

      // 请求修改评论状态开关
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
        article.statusDisable = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启评论状态成功' : '关闭评论状态成功'
        })
      })
    },
    handleCurrentChange (page) {
      this.loadComment(page)
    },
    handleSizeChange (pageSize) {
      // 每次页码改变回到第一页，并且重新加载数据
      this.pageSize = pageSize
      this.page = 1
      this.loadComment(this.page)
    }
  }
}
</script>

<style scoped lang="less">

</style>
