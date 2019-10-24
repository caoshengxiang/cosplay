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
                        <el-input v-model="ruleForm.sub"></el-input>
                    </el-form-item>
                    <el-form-item label="详细介绍" prop="content">
                        <el-input type="textarea" v-model="ruleForm.content"></el-input>
                    </el-form-item>
                    <el-form-item label="产品分类" prop="productCateName">
                        <el-select v-model="ruleForm.productCateName" placeholder="请选择分类" clearable>
                            <el-option v-for="(item, index) in productTypeList" :key="index" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="列表图" prop="listImg">

                    </el-form-item>
                    <el-form-item label="详情图片" prop="detailImgs">

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
    </div>
</template>

<script>
  import API from '../../utils/api'

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
          listImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          detailImgs: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg,https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
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
                    this.$router.push({name: 'productAdmin'})
                  }
                })
            } else {
              API.product.add(this.ruleForm).then(da => {
                if (da.status) {
                  this.$message.success('添加成功')
                  this.$router.push({name: 'productAdmin'})
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
      }
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
