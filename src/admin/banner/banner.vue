<template>
    <div class="com-admin-pages" v-loading="loading" element-loading-text="加载中...">
        <div class="com-page-pos">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>配置管理</el-breadcrumb-item>
                <el-breadcrumb-item>banner管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="com-page-box">
            <div class="com-page-bar">
                <div class="com-page-search">
                    <div class="search-item">名称：
                        <el-input style="width: 200px" v-model="searchForm.title" clearable></el-input>
                    </div>
                    <div class="search-item">
                        <el-select v-model="searchForm.flag" placeholder="请选择banner位置">
                            <el-option label="首页" :value="1"></el-option>
                            <el-option label="产品页" :value="2"></el-option>
                            <el-option label="新闻页" :value="3"></el-option>
                            <el-option label="faqs页" :value="4"></el-option>
                            <el-option label="about页" :value="5"></el-option>
                            <el-option label="联系页" :value="6"></el-option>
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
                                prop="title"
                                label="名称"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="flag"
                                label="banner位置"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="created"
                                label="创建时间">
                        </el-table-column>
<!--                        <el-table-column-->
<!--                                prop="status"-->
<!--                                label="状态">-->
<!--                        </el-table-column>-->
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

<!--        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">-->
<!--            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">-->
<!--                <el-form-item label="名称" prop="title">-->
<!--                    <el-input v-model="ruleForm.title" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="banner图" prop="imgUrl">-->
<!--                    <el-input v-model="ruleForm.imgUrl"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="机器人图" prop="subImg">-->
<!--                    <el-input v-model="ruleForm.subImg"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="链接" prop="link">-->
<!--                    <el-input type="textarea" v-model="ruleForm.link"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="banner位置" prop="flag">-->
<!--                    <el-select v-model="ruleForm.flag" placeholder="请选择banner位置">-->
<!--                        <el-option label="首页" :value="1"></el-option>-->
<!--                        <el-option label="产品页" :value="2"></el-option>-->
<!--                        <el-option label="新闻页" :value="3"></el-option>-->
<!--                        <el-option label="faqs页" :value="4"></el-option>-->
<!--                        <el-option label="about页" :value="5"></el-option>-->
<!--                        <el-option label="联系页" :value="6"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--                <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="resetForm('ruleForm')">确 定</el-button>-->
<!--            </div>-->
<!--        </el-dialog>-->
    </div>
</template>

<script>
  import API from '../../utils/api'

  export default {
    name: 'banner',
    data () {
      return {
        loading: false,
        currentPage: 1,
        pageSizes: [10, 20],
        pageSize: 10,
        searchForm: {
          title: '',
          flag: '',
        },
        tableData: [],
        total: 0,
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
      handleClick (row) {
        this.$router.push({ name: 'bannerDetailAdmin', query: { _id: row._id } })
      },
      handleDelClick (row) {
        console.log(row)
        this.$confirm('此操作将永久删, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.banner.del({_id: row._id}).then((da) => {
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
      addData () {
        this.$router.push({ name: 'bannerDetailAdmin' })
      },
      getData (callback) {
        this.loading = true
        API.banner.list(Object.assign({}, this.searchForm, {
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
      }
    },
    created () {
      this.getData()
    }
  }
</script>

<style scoped lang="less">
    @import "../../styles/common";
</style>
