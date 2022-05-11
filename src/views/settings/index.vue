<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--    面包屑控件 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to='/' >首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  /面包屑控件  -->
      </div>
      <div>
        <el-form ref="user_info_form" :model="user" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="15">
              <el-form-item label="编号" >
                {{user.id}}
              </el-form-item>
              <el-form-item label="手机">
                {{user.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称" prop="name" >
                <el-input v-model="user.name" ></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input type="textarea" v-model="user.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">保存</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="2">
            <label for="file">
                <el-avatar
                    shape="square"
                    :size="200"
                    :src="user.photo"
                >
                </el-avatar>
                <p>点击修改头像</p>
            </label>
              <input
                  id="file"
                  type="file"
                  hidden ref="file"
                  @change="onImageChange"
              >
            </el-col>
          </el-row>
        </el-form>
      </div>
      </el-card>

    <!--图片弹层-->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        append-to-body
        @opened="onOpenedDialog"
        >
      <div class="image-container">
        <img class="image-container-img" :src="previewImage"  height="200px" ref="preview-Image">
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"
               @click="onImageCrop"
               :loading="imageUpdateLoading"
    >确 定
    </el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto, updateUser } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global_bus'

export default {
  name: 'SettingsIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        email: '',
        id: 1,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      dialogVisible: false,
      previewImage: '',
      cropper: null,
      imageUpdateLoading: false,
      userSaveLoading: false,
      rules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserInfo()
  },
  mounted () {},
  methods: {
    saveUser () {
      this.userSaveLoading = true
      updateUser(this.user).then(res => {
        this.userSaveLoading = false
        this.$message({
          type: 'success',
          message: '修改用户资料成功'
        })
        globalBus.$emit('updateUser', this.user)
      })
    },
    loadUserInfo () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onImageChange () {
      const file = this.$refs.file
      this.previewImage = window.URL.createObjectURL(file.files[0])

      this.dialogVisible = true

      this.$refs.file.value = '' // 处理上传同一张图片无法识别
    },
    onOpenedDialog () {
      const image = this.$refs['preview-Image']
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop (event) {
        }
      })
    },
    onImageCrop () {
      this.imageUpdateLoading = true
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        console.log(file)
        const fd = new FormData()
        fd.append('photo', file)

        // 请求更新用户头像请求fd
        updateUserPhoto(fd).then(res => {
          console.log(res)

          // 弹窗处理
          this.dialogVisible = false

          // 更新本地视图
          this.user.photo = window.URL.createObjectURL(file)
          this.imageUpdateLoading = false
          this.$message({
            type: 'success',
            message: '更新头像成功'
          })
          globalBus.$emit('updateUser', this.user)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.image-container{
  .image-container-img{
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
