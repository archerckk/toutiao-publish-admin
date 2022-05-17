<template>
  <div class="upload-cover" @click="onUploadCover" >
    <div class="upload-warp">
    <img class="cover-image" ref="cover-image" :src="value"  >
    </div>

    <!--弹层内容-->
    <el-dialog
        title="封面上传"
        :visible.sync="uploadCoverShow"
        width="70%"
        append-to-body
        >
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="素材库" name="first">
          <image-list
              :is-show-add="false"
              :is-action-show="false"
              is-selected-show
              ref="image-list"
          />
        </el-tab-pane>

        <el-tab-pane label="上传封面" name="second">
          <input type="file"
                 ref="file"
                 id="file"
                 @change="onUploadPreview"
          />
          <img  ref="preview-img"  height="150px" width="180px">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
    <el-button @click="uploadCoverShow = false">取 消</el-button>
    <el-button type="primary" @click="onUploadConfirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
import ImageList from '@/components/image_list'
import { imageUpload } from '@/api/image'

export default {
  name: 'UploadCover',
  components: { ImageList },
  props: ['value'],
  data () {
    return {
      uploadCoverShow: false,
      activeName: 'first',
      previewImg: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onUploadCover () {
      this.uploadCoverShow = true
    },
    onUploadPreview () {
      // 预览上传图片
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-img'].src = blob
    },
    onUploadConfirm () {
      // 确认上传图片
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]

        if (!file) {
          this.$message('请选择文件上传')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        imageUpload(fd).then(res => {
          // 弹窗关闭
          // console.log(res)
          this.uploadCoverShow = false
          this.$refs['cover-image'].src = res.data.data.url
          // 子传父通过emit传递自定义事件
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message('请选择图片')
        } else {
          this.uploadCoverShow = false
          this.$emit('input', imageList.images[selected].url)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.upload-cover{
  width: 180px;
  height: 150px;
  border: 1px solid slategray;
  .upload-warp{
    .cover-image{
      height: 150px;
      max-width: 100%;
    }
  }
}

</style>
