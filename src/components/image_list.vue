<template>
  <div class="">
    <div class="action-head" >
      <!--单选按钮-->
      <el-radio-group
          v-model="collect"
          size="small"
          @change="loadImage(1)"
      >
        <el-radio-button :label="false" >全部</el-radio-button>
        <el-radio-button :label="true" >收藏</el-radio-button>
      </el-radio-group>
      <el-button
          v-if="isShowAdd"
          type="success"
          size="mini"
          @click="dialogUploadVisible = true"
      >
        上传图片
      </el-button>
    </div>
    <!--  图片控件-->
    <el-row>
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
        <el-image
            class="image_style"
            :src="img.url"
            @click="selected=index"
            fit="cover">
        </el-image>

        <!--图片选中-->
        <div class="selected" v-if="isSelectedShow&&selected===index"></div>

        <!--图片操作按钮-->
        <div v-if="isActionShow" class="image_action">
          <el-button type="warning"
                     :icon="img.is_collected ?'el-icon-star-on': 'el-icon-star-off'"
                     circle
                     size="mini"
                     @click.native="onCollect(img)"
                     :loading="img.loading">
          </el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle
                     size="mini"
                     @click="onDelete(img)"
                     :loading="img.loading">
          </el-button>
        </div>
      </el-col>
    </el-row>

    <!--分页-->
    <el-pagination
        style="padding-top: 20px"
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
  height: 100px;

  .image_action{
    background-color: rgba(204, 204, 204,.5);
    height: 30px;
    font-size: 20px;
    position: absolute;
    bottom: 5px;
    left: 0px;
    right: 3px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .image_style{
    height: 100px;
    width: 120px;
    display: flex;
  }
}
.selected{
  background-size: contain;
  background: url("../assets/selected.png") no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
