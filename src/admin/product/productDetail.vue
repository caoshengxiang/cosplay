<template>
    <div class="com-admin-pages" v-loading="loading" element-loading-text="加载中...">
        <div class="com-page-pos">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>产品管理</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="com-page-box">
            <div class="com-page-bar"></div>
            <div class="com-page-con">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="产品名称" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="sub">
                        <el-input type="textarea" v-model="ruleForm.sub"></el-input>
                    </el-form-item>
                    <el-form-item label="详细介绍" prop="content">
                        <!--                        <el-input type="textarea" v-model="ruleForm.content"></el-input>-->
                        <quill-editor
                                v-model="ruleForm.content"
                                ref="myQuillEditor"
                        >
                        </quill-editor>
                    </el-form-item>
                    <el-form-item label="产品分类" prop="productCateName">
                        <el-select v-model="ruleForm.productCateName" placeholder="请选择分类" clearable>
                            <el-option v-for="(item, index) in productTypeList" :key="index" :label="item.name"
                                       :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="列表图" prop="listImg">
                        <el-upload class="avatar-uploader" action="" :show-file-list="false"
                                   :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.listImg" :src="ruleForm.listImg" class="avatar"
                                 style="width: 178px;height: 229px;">
                            <i v-else class="el-icon-plus"
                               style="width: 178px;height: 229px;line-height:229px;text-align: center;border: 1px dashed #c0ccda;    border-radius: 6px;background-color: #fbfdff;"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="详情图片" prop="detailImgs">
                        <el-upload
                                :file-list="fileList"
                                :action="uploadExternalOsUrl"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :on-success="handleUploadSuccess"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="权重" prop="weight">
                        <el-input type="number" v-model.number="ruleForm.weight"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-radio-group v-model="ruleForm.status">
                            <el-radio :label="1">上线</el-radio>
                            <el-radio :label="2">下线</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
  import API from '../../utils/api'
  import { serverFileUrl, serverUrl, uploadExternalOsUrl } from '../../utils/const'

  export default {
    name: 'productDetail',
    data () {
      return {
        loading: false,
        ruleForm: {
          title: '',
          sub: '',
          content: '',
          productCateName: '',
          listImg: '',
          detailImgs: '',
          weight: 0,
          status: 1,
        },
        rules: {
          title: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          sub: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          productCateName: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          listImg: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          detailImgs: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          // weight: [
          //   { required: true, message: '请输入', trigger: 'blur' },
          // ],
          status: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
        },
        productTypeList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: []
      }
    },
    computed: {
      serverFileUrlCpt () {
        return serverFileUrl
      },
      serverUrl () {
        return serverUrl
      },
      uploadExternalOsUrl () {
        return uploadExternalOsUrl
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true

            if (this.$route.query._id) { // 编辑
              API.product.update(this.ruleForm).then(da => {
                if (da.status) {
                  this.$message.success('编辑成功')
                  this.$router.push({ name: 'productAdmin' })
                }
                setTimeout(() => {
                  this.loading = false
                }, 200)
              })
            } else {
              API.product.add(this.ruleForm).then(da => {
                if (da.status) {
                  this.$message.success('添加成功')
                  this.$router.push({ name: 'productAdmin' })
                }
                setTimeout(() => {
                  this.loading = false
                }, 200)
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      getDetail (callback) {
        if (!this.$route.query._id) {
          return
        }
        this.loading = true
        API.product.detail({ _id: this.$route.query._id }).then(da => {
          this.ruleForm = da.data
          this.fileList = da.data.detailImgs.split(',').map(item => {
            return {
              url: item
            }
          })
          setTimeout(() => {
            this.loading = false
            callback && callback()
          }, 200)
        })
      },
      getProductType () {
        API.params.list(Object.assign({}, this.searchForm, {
          page: 1,
          size: 10000
        })).then(da => {
          this.productTypeList = da.data.data
        })
      },
      beforeAvatarUpload (file) {
        const isImage = (file.type === 'image/jpeg' ||
          file.type === 'image/gif' ||
          file.type === 'image/png' ||
          file.type === 'image/bmp')
        const isLt2M = file.size / 1024 / 1024 < 10

        if (!isImage) {
          this.$message.error('上传图片只能是 JPG、JPEG、GIF、PNG、BMP 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!')
        }

        if (isImage && isLt2M) {
          let param = new FormData()
          param.append('file', file, file.name)

          // API.common.upload(param, (res) => { // 上传保存服务器
          //   if (res.status) {
          //     this.ruleForm.listImg = serverFileUrl + res.data.url
          //   }
          // })
          // API.common.uploadExternalOs(param).then(da => { // 直接三方接口上传
          //   console.log(da.data.url)
          //   this.ruleForm.listImg = da.data.url
          // })
          API.common.uploadOs(param).then(da => { // 上传aws
            console.log(da.data.url)
            this.ruleForm.listImg = da.data.url
          })
        }

        return false
      },
      handleUploadSuccess (response, file, fileList) {
        console.log(response, file, fileList)
        if (this.ruleForm.detailImgs) {
          // this.ruleForm.detailImgs += ',' + serverFileUrl + response.data.url
          this.ruleForm.detailImgs += ',' + response.data.url
        } else {
          // this.ruleForm.detailImgs = serverFileUrl + response.data.url
          this.ruleForm.detailImgs = response.data.url
        }
      },
      handlePictureCardPreview (file) {
        console.log(file)
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
        let list = this.ruleForm.detailImgs.split(',').filter(item => {
          return item !== file.url
        })
        this.ruleForm.detailImgs = list.join(',')
      },
    },
    created () {
      this.getDetail()
      this.getProductType()
    }
  }
</script>

<style scoped lang="less">
    @import "../../styles/common";
</style>
