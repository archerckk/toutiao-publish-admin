<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑控件 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to='/' >首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id ? '修改文章': '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  /面包屑控件  -->
      </div>
      <div >
        <el-form ref="publish-form" :model="article" label-width="80px" :rules="publish_rules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
<!--            <mavon-editor v-model="article.content"/>-->
            <el-tiptap v-model="article.content" :extensions="extensions" />
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="2">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
                :label="channel.name"
                :value="channel.id"
                v-for="(channel,index) in channels"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onPublish(draft=false)">{{$route.query.id ? '修改': '发布'}}</el-button>
            <el-button @click="onPublish(draft=true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle, getArticle, editArticle } from '@/api/articles'
import { imageUpload } from '@/api/image'
import {
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image
} from 'element-tiptap'

export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image({
          uploadRequest (file) {
            console.log('123', file)
            const fd = new FormData()
            fd.append('image', file)
            return imageUpload(fd).then(res => {
              return res.data.data.url
            })
          }
        })
      ],
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
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: null,
      publish_rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '标题长度为5到30个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }

    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    onPublish (draft = false) {
      this.$refs['publish-form'].validate(valid => {
        console.log(valid)
        if (!valid) {
          return false
        } else {
          const articleID = this.$route.query.id
          if (articleID) {
            editArticle(articleID, this.article, draft).then(res => {
              // console.log(res)
              this.$message({
                type: 'success',
                message: `${draft ? '存入草稿' : '修改'} 成功`
              })
              this.$router.push('/article')
            })
          } else {
            addArticle(this.article, draft).then(res => {
              this.$message({
                type: 'success',
                message: `${draft ? '存入草稿' : '发布'} 成功`
              })
              this.$router.push('/article')
            })
          }
        }
      })
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
