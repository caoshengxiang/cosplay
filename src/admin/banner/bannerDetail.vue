<template>
    <div class="com-admin-pages" v-loading="loading" element-loading-text="加载中...">
        <div class="com-page-pos">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>配置管理</el-breadcrumb-item>
                <el-breadcrumb-item>banner管理</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="com-page-box">
            <div class="com-page-bar"></div>
            <div class="com-page-con">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="title">
                        <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="banner图" prop="imgUrl">
                        <el-input v-model="ruleForm.imgUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="机器人图" prop="subImg">
                        <el-input v-model="ruleForm.subImg"></el-input>
                    </el-form-item>
                    <el-form-item label="链接" prop="link">
                        <el-input v-model="ruleForm.link"></el-input>
                    </el-form-item>
                    <el-form-item label="banner位置" prop="flag">
                        <el-select v-model="ruleForm.flag" placeholder="请选择banner位置">
                            <el-option label="首页" :value="1"></el-option>
                            <el-option label="产品页" :value="2"></el-option>
                            <el-option label="新闻页" :value="3"></el-option>
                            <el-option label="faqs页" :value="4"></el-option>
                            <el-option label="about页" :value="5"></el-option>
                            <el-option label="联系页" :value="6"></el-option>
                        </el-select>
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
    name: 'bannerDetail',
    data () {
      return {
        loading: false,
        ruleForm: {
          title: '',
          imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 图片地址
          subImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 机器人图
          link: '',
          flag: 1 // banner位置，1.首页 2.产品页 3.新闻 4.faqs 5. about 6. 联系页面
        },
        rules: {
          title: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          sub: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          imgUrl: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          // subImg: [
          //   { required: true, message: '请选择', trigger: 'change' }
          // ],
          // weight: [
          //   { required: true, message: '请输入', trigger: 'blur' },
          // ],
          flag: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.$route.query._id) { // 编辑
              API.banner.update(this.ruleForm).then(da => {
                if (da.status) {
                  this.$message.success('编辑成功')
                  this.$router.push({ name: 'bannerAdmin' })
                }
              })
            } else {
              API.banner.add(this.ruleForm).then(da => {
                if (da.status) {
                  this.$message.success('添加成功')
                  this.$router.push({ name: 'bannerAdmin' })
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
        API.banner.detail({ _id: this.$route.query._id }).then(da => {
          this.ruleForm = da.data
          setTimeout(() => {
            this.loading = false
            callback && callback()
          }, 200)
        })
      },
    },
    created () {
      this.getDetail()
    }
  }
</script>

<style scoped lang="less">
    @import "../../styles/common";
</style>
