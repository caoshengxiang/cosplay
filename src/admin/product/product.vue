<template>
    <div class="com-admin-pages" v-loading="loading" element-loading-text="加载中...">
        <div class="com-page-pos">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>产品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="com-page-box">
            <div class="com-page-bar">
<!--                <span>手机号：<el-input style="width: 200px" v-model="form.phone" clearable></el-input></span>-->
<!--                <span style="margin-left: 20px">是否正常停车<el-select v-model="form.is" placeholder="请选择" clearable>-->
<!--            <el-option label="是" value="1"></el-option>-->
<!--            <el-option label="否" value="2"></el-option>-->
<!--          </el-select></span>-->
                <el-button @click="setLoading" style="width: 120px;margin-left: 20px" type="primary">查询</el-button>
            </div>
            <div class="com-page-con">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="title"
                            label="产品名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="productType"
                            label="产品分类"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="created"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="padding-top: 20px;text-align: right">
                    <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'product',
    data () {
      return {
        loading: false,
        currentPage: 1,
        searchform: {
          phone: '',
          is: '',
        },
        tableData: [
          {
            id: 1,
            t1: 1,
            t2: '13847561523',
            t3: '2019-10-14  09:10:25',
            t4: '天府三街停车点',
            t5: '2019-10-14  09:30:28',
            t6: 'OCG国际中心停车点',
            t7: '否',
            t8: '乱停乱放',
            t9: '信息上报芝麻信用进行处理'
          },
        ]
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.currentPage = 1
        this.handleCurrentChange(this.currentPage)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
        this.setLoading()
      },
      handleClick (row) {
        this.$router.push({name: 'productDetailAdmin', query: {id: row.id}})
      },
      setLoading (callback) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          callback && callback()
        }, 2000)
      }
    },
    created () {
      this.setLoading()
    }
  }
</script>

<style scoped lang="less">
    @import "../../styles/common";
</style>
