<template>
  <div class="pages">
    <div class="page-header">
      <div class="left">
        <img src="../../static/logo.png" alt="">
        <span>服务平台</span>
      </div>
      <div class="right">
        <span style="color: #666666">您好，{{userInfo.account}}</span>
        <span  style="color: #666666" >未读消息数<span style="color: red;margin-left: 0px">{{"("+noReadMsgCounts+")"}}</span></span>
        <a @click="updatePwd" style="margin-right: 10px">修改密码</a>
        <a @click="logout">退出登录</a>
      </div>
    </div>
    <div class="page-container">
      <el-dialog title="修改密码" :visible.sync="flag" width="850px">
        <el-form>
          <el-form-item label="原密码：" prop="oldPwd">
            <el-input placeholder="请输入原密码" v-model="form.oldPwd" type="password">
            </el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="pwd">
            <el-input placeholder="请输入新密码" v-model="form.pwd" type="password">
            </el-input>
          </el-form-item>
          <el-form-item label="确认新密码：" prop="rePwd">
            <el-input placeholder="请确认新密码" v-model="form.rePwd" type="password">
            </el-input>
          </el-form-item>
          <div class="agreement-box" style="text-align: right;">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <div class="page-aside">
        <left-menu-bar></left-menu-bar>
      </div>
      <div class="page-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import leftMenuBar from '../components/leftMenuBar'
  import API from '../utils/api'
  import md5 from 'js-md5'

  export default {
    name: 'index',
    data () {
      return {
        userInfo: '',
        flag: false,
        form: {},
        noReadMsgCounts: 0
      }
    },
    components: {
      leftMenuBar,
    },
    watch: {},
    methods: {
      logout () {
        API.account.logout(null, da => {
          if (da.data > 0) {
            this.$router.push({ name: 'signin' })
          } else {
            this.$message.warning('退出失败，请稍后。')
          }
        })
        this.$webStorage.removeItem('userInfo', )
        this.$router.push({ name: 'signin' })
      },
      updatePwd () {
        this.flag = true
      },
      save () {
        if (!this.form || !this.form.oldPwd || !this.form.pwd || !this.form.rePwd) {
          this.$message.warning('输入不能为空')
          return
        }
        if (this.form.pwd.length < 6 || this.form.rePwd.length < 6) {
          this.$message.warning('密码长度不能小于6位')
          return
        }
        if (this.form.pwd !== this.form.rePwd) {
          this.$message.warning('两次密码不一致')
          return
        }
        this.form.pwd = md5(this.form.pwd)
        this.form.rePwd = md5(this.form.rePwd)
        this.form.oldPwd = md5(md5(this.form.oldPwd))
        let params = Object.assign({}, this.form, { id: this.userInfo.id })
        API.account.updatePwd(params, da => {
          console.log(da)
          if (da.status) {
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
        })
        this.cancel()
      },
      cancel () {
        this.flag = false
        this.form = {}
      },
      getNoReadMsgCounts () {
        API.account.msgCounts(null, da => {
          console.log(da)
          if (da.status) {
            this.noReadMsgCounts = da.data
          }
        })
      }
    },
    created () {
      this.userInfo = this.$webStorage.getItem('userInfo') || {}
      this.getNoReadMsgCounts()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../styles/var";

  $page_c_aside_w: 200px;

  #app {
    .pages {
      .page-header {
        height: 50px;
        background-color: #b3c0d1;
        z-index: 0;

        .right {
          float: right;
          height: 100%;
          display: flex;
          align-items: center;
          margin-right: 50px;

          span {
            margin: 0 10px;
          }

          a {
            color: #1E88E5;
            cursor: pointer;
          }
        }

        .left {
          float: left;
          height: 100%;
          display: flex;
          align-items: center;
          margin-left: 26px;

          img {
            width: 40px;
          }

          span {
            margin-left: 20px;
            font-weight: bold;
            font-size: 18px;
          }
        }
      }

      .page-container {
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        right: 0;
        box-sizing: border-box;

        .page-aside {
          width: $page_c_aside_w;
          float: left;
          background-color: #D3DCE6;
          height: 100%;
          box-sizing: border-box;
          overflow: auto;
        }

        .page-main {
          margin-left: $page_c_aside_w;
          background-color: #e9eef3;
          height: 100%;
          box-sizing: border-box;
          overflow: auto;
        }
      }
    }
  }
</style>
