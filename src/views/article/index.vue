<template>
  <div class="article-container">

    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!--    面包屑控件 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to='/' >首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  /面包屑控件  -->
      </div>
      <!--    数据筛选表单-->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态" >
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="channelID" placeholder="请选择频道">
            <el-option
              label="全部"
              :value="null"
             >
            </el-option>

            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel,index) in channels"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="pubDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :default-time="['00:00:00','23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="loading"
            @click="loadArticles(null)">
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <!--    /数据筛选表单-->
    </el-card>

    <el-card >
      <!--    数据表格-->
      <div slot="header" class="clearfix">
        一共筛选了{{ totalCount }}条数据
      </div>
      <el-table
        :data="articles"
        stripe
        border
        class="content-table"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          label="封面"
          >
          <template slot-scope="scope">
<!--            <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" class="article-cover">-->
<!--            <img v-else src="./no-cover.jpeg" class="article-cover">-->
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="cover">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>

          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articles_status[scope.row.status].type" >{{articles_status[scope.row.status].text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template  slot-scope="scope">
            <el-button
              size="mini"
              circle
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              @click="handleDelArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--    /数据表格-->

      <!--    分页控件-->
      <el-pagination
        layout="prev, pager, next"
        background
        :page-size="pageSize"
        :total="totalCount"
        :disabled="loading"
        :current-page.sync="page"
        @current-change="onChangePage"
      >
      </el-pagination>
      <!--    /分页控件-->
    </el-card>

  </div>
</template>

<script>
import {
  getArticles,
  getArticleChannels,
  delArticle
} from '@/api/articles'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [],
      articles_status: [
        { status: 0, text: '草稿', type: 'warning' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'info' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0, // 总的数据条数
      pageSize: 10, // 每页的分页数量
      status: null, // 审核状态
      channels: [], // 频道列表
      channelID: null, // 筛选的频道
      pubDate: [], // 发布时间
      loading: true, // 控制loading状态
      page: 1 // 当前分页
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
    this.localArticleChannels()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticles (page) {
      this.loading = true
      getArticles({
        page,
        per_page: 10,
        status: this.status,
        channel_id: this.channelID,
        begin_pubdate: this.pubDate ? this.pubDate[0] : null,
        end_pubdate: this.pubDate ? this.pubDate[1] : null
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    onChangePage (page) {
      this.loadArticles(page)
    },
    localArticleChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    handleDelArticle (articleId) {
      this.$confirm('是否删除文章', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除文章逻辑
        delArticle(articleId).then(res => {
          console.log(res)
        })
        this.loadArticles(this.page) // 重新加载页面视图
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter-card{
  margin-bottom: 30px;
}
.content-table{
  margin-bottom: 20px;
}
.article-cover{
  width: 150px;
  background-size: cover;
}
</style>
