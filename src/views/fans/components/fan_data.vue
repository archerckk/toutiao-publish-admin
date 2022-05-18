<template>
  <div class="">
    <div class="action-head" >
    </div>
    <!--  图片控件-->
    <el-row>
      <!--<div></div>-->
      <el-col
          class="image_item"
          :span="4"
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
          v-for="(img,index) in images"
          :key="index"
      >
        <div class="image_style">
          <el-image
              :src="img.url"
              @click="selected=index"
              fit="cover">
            <div slot="error" class="image-slot">
              <i  class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <span style="margin-top: 5px" >我是粉丝</span>
          <el-button type="primary" size="mini" style="width:60px;margin-top: 5px">+关注</el-button>
        </div>
      </el-col>
    </el-row>

    <!--分页-->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total_images"
        @current-change="handlePageChange"
        :page-sizes="page_size"
        :current-page.sync="page"
    >
    </el-pagination>

    <el-dialog
        title="上传素材"
        :visible.sync="dialogUploadVisible"
        :append-to-body="true"
    >
      <el-upload
          class="upload-dialog"
          drag
          action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
          multiple
          :headers="uploadHeaders"
          name="image"
          :on-success="handleUploadSuccess"
          :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>

  </div>
</template>

<script>
import {
  getImage,
  collectImage,
  deleteImage
} from '@/api/image'

export default {
  name: 'ImageList',
  components: {},
  props: {
    isShowAdd: {
      type: Boolean,
      default: true
    },
    isActionShow: {
      type: Boolean,
      default: true
    },
    isSelectedShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const user = JSON.parse(window.localStorage.getItem(('user')))
    return {
      labelPosition: 'all',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      images: [],
      collect: false,
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      total_images: 0,
      page_size: [10],
      page: 1,
      selected: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImage()
  },
  mounted () {},
  methods: {
    loadImage (page = 1) {
      this.page = page
      getImage({
        page,
        per_page: this.page_size,
        collect: this.collect
      }).then(res => {
        // 往后端返回的结果里面添加变量，保证每个元素的控制变量独立
        const results = res.data.data.results
        results.forEach(img => {
          img.loading = false
        })
        this.images = results
        this.total_images = res.data.data.total_count
      })
    },
    handleUploadSuccess () {
      // 弹窗消失
      this.dialogUploadVisible = false
      // 刷新页面
      this.loadImage()
    },
    handlePageChange (page) {
      this.loadImage(page)
    },
    onCollect (img) {
      img.loading = true
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
        img.loading = false
      })
    },
    onDelete (img) {
      img.loading = true
      deleteImage(img.id).then(res => {
        this.loadImage(this.page)
        img.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.action-head{
  display: flex;
  padding-bottom: 20px;
  justify-content: space-between
}
.upload-dialog{
  padding-top: 0px;
  text-align: center;

  .el-upload__tip{
    text-align: center;
  }
}
.image_item{
  position: relative;
  margin-bottom: 10px;
  border: #187dee 1px;

  .image_style{
    height: 100px;
    width: 100px;
    padding-bottom: 5px;
    display: flex ;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    border: #B2C0D0 1px dashed;
  }
}

</style>
