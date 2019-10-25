<template>
    <div class="com-admin-pages" v-loading="loading" element-loading-text="加载中...">
        <div class="com-page-pos">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>联系查看</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="com-page-box">
            <div class="com-page-bar">
                <div class="com-page-bar">
                    <div class="com-page-search">
<!--                        <div class="search-item">产品名称：-->
<!--                            <el-input style="width: 200px" v-model="searchForm.title" clearable></el-input>-->
<!--                        </div>-->
<!--                        <div class="search-item">-->
<!--                            <el-button @click="setLoading" style="width: 120px;margin-left: 20px" type="primary">查询-->
<!--                            </el-button>-->
<!--                        </div>-->
                    </div>
<!--                    <div class="com-page-opt">-->
<!--                        <el-button @click="addData" style="width: 120px;margin-left: 20px" type="primary">添加-->
<!--                        </el-button>-->
<!--                    </div>-->
                </div>
            </div>
            <div class="com-page-con">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="名字"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="邮箱"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="电话">
                    </el-table-column>
                    <el-table-column
                            prop="company"
                            label="公司">
                    </el-table-column>
                    <el-table-column
                            prop="subject"
                            label="标题">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="内容">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
<!--                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>-->
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
</template>

<script>
  import API from '../../utils/api'
  export default {
    name: 'email',
    data () {
      return {
        loading: false,
        currentPage: 1,
        pageSizes: [5, 10, 20],
        pageSize: 10,
        searchForm: {
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
        // this.$router.push({ name: 'faqsDetailAdmin', query: { _id: row._id } })
      },
      handleDelClick (row) {
        console.log(row)
        this.$confirm('此操作将永久删, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.email.del({_id: row._id}).then((da) => {
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
        // this.$router.push({ name: 'faqsDetailAdmin' })
      },
      getData (callback) {
        this.loading = true
        API.email.list(Object.assign({}, this.searchForm, {
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
