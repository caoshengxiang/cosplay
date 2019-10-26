<template>
    <div class="com-admin-pages" v-loading="loading" element-loading-text="加载中...">
        <div class="com-page-pos">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>FAQ管理</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="com-page-box">
            <div class="com-page-bar"></div>
            <div class="com-page-con">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="问题" prop="q">
                        <el-input v-model="ruleForm.q"></el-input>
                    </el-form-item>
                    <el-form-item label="回答" prop="a">
                        <el-input v-model="ruleForm.a"></el-input>
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
    name: 'faqsDetail',
    data () {
      return {
        loading: false,
        ruleForm: {
          q: '',
          a: '',
          weight: 0,
          status: 1
        },
        rules: {
          q: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          a: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          // weight: [
          //   { required: true, message: '请输入', trigger: 'blur' },
          // ],
          status: [
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
              API.faqs.update(this.ruleForm).then(da => {
                if (da.status) {
                  this.$message.success('编辑成功')
                  this.$router.push({name: 'faqsAdmin'})
                }
                setTimeout(() => {
                  this.loading = false
                }, 200)
              })
            } else {
              API.faqs.add(this.ruleForm).then(da => {
                if (da.status) {
                  this.$message.success('添加成功')
                  this.$router.push({name: 'faqsAdmin'})
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
        API.faqs.detail({ _id: this.$route.query._id }).then(da => {
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
