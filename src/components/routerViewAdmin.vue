<template>
    <div class="pages">
        <div class="page-header">
            <div class="left">
                <!--        <img src="../../static/logo.png" alt="">-->
                <span>管理后台</span>
            </div>
            <div class="right">
                <el-dropdown trigger="click" class="right-item" @command="handleCommand">
          <span class="el-dropdown-link">
            您好，{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-edit" command="updatePwd">修改密码</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-close" command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="page-container">
            <el-dialog :destroy-on-close="true" :close-on-click-modal="false" title="修改密码" :visible.sync="flag"
                       width="850px">
                <el-form>
                    <el-form-item label="原密码：" prop="oldPwd">
                        <el-input placeholder="请输入原密码" v-model="form.password" type="password">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="pwd">
                        <el-input placeholder="请输入新密码" v-model="form.newPassword" type="password">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码：" prop="rePwd">
                        <el-input placeholder="请确认新密码" v-model="form.reNewPassword" type="password">
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
    name: 'routerViewAdmin',
    data () {
      return {
        userInfo: '',
        flag: false,
        form: {
          password: '',
          newPassword: '',
          reNewPassword: '',
        },
      }
    },
    components: {
      leftMenuBar,
    },
    watch: {},
    methods: {
      logout () {
        // API.account.logout(null).then(da => {
        //   if (da.data > 0) {
        //     this.$webStorage.setItem('userInfo', null)
        //     this.$VueCookies.remove('authKey')
        //     this.$router.push({ name: 'login' })
        //   } else {
        //     this.$message.warning('退出失败，请稍后。')
        //   }
        // })
        this.$webStorage.setItem('userInfo', null)
        this.$VueCookies.remove('authKey')
        this.$router.push({ name: 'login' })
      },
      updatePwd () {
        this.flag = true
        this.form = {
          password: '',
          newPassword: '',
          reNewPassword: '',
        }
      },
      handleCommand (c) {
        if (c === 'logout') {
          this.logout()
        } else if (c === 'updatePwd') {
          this.updatePwd()
        }
      },
      save () {
        if (!this.form || !this.form.password || !this.form.newPassword || !this.form.reNewPassword) {
          this.$message.warning('输入不能为空')
          return
        }
        if (this.form.newPassword.length < 6 || this.form.reNewPassword.length < 6) {
          this.$message.warning('密码长度不能小于6位')
          return
        }
        if (this.form.newPassword !== this.form.reNewPassword) {
          this.$message.warning('两次密码不一致')
          return
        }
        this.form.password = md5(this.form.password)
        this.form.newPassword = md5(this.form.newPassword)
        this.form.reNewPassword = md5(this.form.reNewPassword)
        let params = Object.assign({}, this.form, { account: this.userInfo.account })
        API.account.updatePwd(params).then(da => {
          if (da.status) {
            this.$message.success('修改成功')
            this.$router.push({ name: 'login' })
          } else {
            // this.$message.error('修改失败')
          }
          this.form = {
            password: '',
            newPassword: '',
            reNewPassword: '',
          }
        })
      },
      cancel () {
        this.flag = false
        this.form = {
          password: '',
          newPassword: '',
          reNewPassword: '',
        }
      },
    },
    created () {
      this.userInfo = this.$webStorage.getItem('userInfo') || {}
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

    $page_c_aside_w: 200px;

    #app {
        .pages {
            .page-header {
                height: 50px;
                background-color: #00838f;
                z-index: 0;
                color: #FFFFFF;

                .right {
                    float: right;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    margin-right: 50px;

                    .right-item {
                        color: #FFFFFF;
                        margin: 0 10px;
                        cursor: pointer;
                    }

                    span {

                    }

                    a {
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
                    background-color: #FFFFFF;
                    height: 100%;
                    box-sizing: border-box;
                    overflow: auto;
                    box-shadow: 3px 0 5px rgba(0, 0, 0, 0.1);
                }

                .page-main {
                    margin-left: $page_c_aside_w;
                    background-color: #f5f5f5;
                    height: 100%;
                    box-sizing: border-box;
                    overflow: auto;
                    padding: 0 20px 0px 20px;
                }
            }
        }
    }
</style>
