<template>
    <div class="com-admin-pages" v-loading="loading" element-loading-text="加载中...">
        <div class="com-page-pos">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>配置管理</el-breadcrumb-item>
                <el-breadcrumb-item>参数管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="com-page-box">
            <div class="com-page-bar">
                <div class="com-page-search">
                    <div class="search-item">
                        <el-select v-model="searchForm.flag" placeholder="请选择参数名称" clearable>
                            <el-option label="产品分类" :value="1"></el-option>
                        </el-select>
                    </div>
                    <div class="search-item">
                        <el-button @click="getData" style="width: 120px;margin-left: 20px" type="primary">查询
                        </el-button>
                    </div>
                </div>
                <div class="com-page-opt">
                    <el-button @click="addData" style="width: 120px;margin-left: 20px" type="primary">添加</el-button>
                </div>
            </div>
            <div class="com-page-con">
                <div>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="flag"
                                label="参数名称"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag === 1">产品分类</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="created"
                                label="创建时间">
                            <template slot-scope="scope">
                                {{$moment(scope.row.created)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button @click="handleDelClick(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="padding-top: 20px;text-align: right">
                        <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="pageSizes"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>

                <el-dialog title="编辑/添加" :visible.sync="dialogFormVisible">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                        <el-form-item label="参数名称" prop="flag">
                            <el-select v-model="ruleForm.flag" placeholder="请选择参数名称">
                                <el-option label="产品分类" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    </div>
                </el-dialog>
    </div>
</template>

<script>
  import API from '../../utils/api'

  export default {
    name: 'params',
    data () {
      return {
        loading: false,
        currentPage: 1,
        pageSizes: [5, 10, 20],
        pageSize: 10,
        searchForm: {
          flag: 1,
        },
        tableData: [],
        total: 0,
        dialogFormVisible: false,
        ruleForm: {
          name: '',
          flag: 1 // 参数名 1：产品分类
        },
        rules: {
          name: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          flag: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.currentPage = 1
        this.pageSize = val
        this.handleCurrentChange(this.currentPage)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
        this.getData()
      },
      handleDelClick (row) {
        console.log(row)
        this.$confirm('此操作将永久删, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.params.del({_id: row._id}).then((da) => {
            if (da.status) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getData (callback) {
        this.loading = true
        API.params.list(Object.assign({}, this.searchForm, {
          page: this.currentPage,
          size: this.pageSize
        })).then(da => {
          this.tableData = da.data.data
          this.total = da.data.total
          setTimeout(() => {
            this.loading = false
            callback && callback()
          }, 200)
        })
      },
      addData () {
        this.dialogFormVisible = true
        this.ruleForm = {
          name: '',
          flag: 1 // 参数名 1：产品分类
        }
      },
      handleClick (row) {
        this.dialogFormVisible = true
        this.ruleForm = JSON.parse(JSON.stringify(row))
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.ruleForm._id) { // 编辑
              API.params.update(this.ruleForm).then(da => {
                if (da.status) {
                  this.$message.success('编辑成功')
                  this.getData()
                  this.dialogFormVisible = false
                }
              })
            } else {
              API.params.add(this.ruleForm).then(da => {
                if (da.status) {
                  this.$message.success('添加成功')
                  this.getData()
                  this.dialogFormVisible = false
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
    },
    created () {
      this.getData()
    }
  }
</script>

<style scoped lang="less">
    @import "../../styles/common";
</style>
