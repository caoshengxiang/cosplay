<template>
  <div class="com-pages"
       v-loading="loading"
       element-loading-text="加载中...">
    <!--<div class="com-page-pos">-->
    <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
    <!--<el-breadcrumb-item>首页</el-breadcrumb-item>-->
    <!--<el-breadcrumb-item>系统设置</el-breadcrumb-item>-->
    <!--<el-breadcrumb-item></el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <!--</div>-->
    <div class="com-page-box">
      <!--<div class="com-page-bar">bar</div>-->
      <div class="com-page-con">
        <!--        <div class="history-search">-->
        <!--              <span class="search-item">-->
        <!--               <el-button type="primary" icon="el-icon-plus">添加</el-button>-->
        <!--              </span>-->
        <!--        </div>-->
        <div class="table">
          <el-table
            :data="tableData"
            stripe
            border
            :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
            style="width: 100%">
            <el-table-column
              prop="k"
              label="设置项"
            >
            </el-table-column>
            <el-table-column
              prop="v"
              label="设置时间"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="300">
              <template slot-scope="scope">
                <el-button v-if="roleId == '93'" icon="el-icon-edit" type="primary" size="small" @click="editDialog(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pag" style="text-align: right;margin: 20px 0;">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="配置" :visible.sync="dialogFormVisible">
      <el-form :model="formData" v-loading="formLoading"
               element-loading-text="处理中...">
        <!--        <el-form-item label="人员姓名" label-width="120px">-->
        <!--          <el-input v-model="formData.personName" autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item :label="formData.k" label-width="160px">
          <el-time-picker
            value-format="HH:mm:ss"
            v-model="formData.v"
            placeholder="请选择时间">
          </el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit" :disabled="formLoading">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // @ is an alias to /src
  import API from '../../utils/api'

  export default {
    components: {},
    name: 'setAccount',
    data () {
      return {
        userInfo: this.$webStorage.getItem('userInfo'),
        roleId: this.$VueCookies.get('roleId'),
        loading: false,
        currentPage: 1,
        pageSize: 200,
        total: 0,
        tableData: [],

        formLoading: false,
        dialogFormVisible: false,
        formData: {
          id: '',
          k: '',
          v: '',
        },
      }
    },
    computed: {},
    methods: {
      handleSizeChange (val) {
        this.currentPage = 1
        console.log(`每页 ${val} 条`)
        this.getData()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getData()
      },
      getData () {
        this.loading = true
        API.attendance.configList(Object.assign({}, {
          current: this.currentPage,
          size: this.pageSize
        })).then(da => {
          this.tableData = da.data.records
          this.total = da.data.total
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      editDialog (row) {
        this.formData = JSON.parse(JSON.stringify(row))
        this.dialogFormVisible = true
      },
      edit () {
        this.formLoading = true
        API.attendance.configModify(this.formData).then(da => {
          if (da.status) {
            this.$message({
              type: 'success',
              message: '设置成功!',
            })
            this.formLoading = false
            this.dialogFormVisible = false
            this.getData()
          }
        })
      }
    },
    beforeCreate () {

    },
    created () {
      this.getData()

      API.attendance.region(null).then(da => {
        this.regionOptions = da.data
      })
    },
  }
</script>

<style scoped lang="less">
  @import "../../styles/common";
  .history-search {
    .search-item {
      margin-right: 20px;
      margin-bottom: 10px;
      display: inline-block;
    }
  }

  .table {
    margin-top: 20px;
  }
</style>
