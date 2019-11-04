<template>
    <div class="com-pages home-page web-page">
        <header-bar active="contact"></header-bar>
        <!--    <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" v-for="i in 10" :key="i" style="text-align: center">-->
        <!--      <div style="max-width: 300px;width: 100%;height:200px;border: 1px solid red;box-sizing: border-box;display: inline-block;">{{i+1}}</div>-->
        <!--    </el-col>-->
        <div class="banner-box">
            <el-carousel :interval="5000" height="500px" @change="carouselChange" :initial-index="initialIndex">
                <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                    <a v-if="item.link" :href="item.link" target="_blank">
                        <el-image style="height: 100%" fit="cover"
                                  :src="item.imgUrl"></el-image>
                    </a>
                    <el-image v-else style="height: 100%" fit="cover"
                              :src="item.imgUrl"></el-image>
                </el-carousel-item>
            </el-carousel>
            <div class="fix-img-box">
                <el-image
                        v-if="bannerList[initialIndex] && bannerList[initialIndex].subImg"
                        class="fix-img"
                        :src="bannerList[initialIndex].subImg"
                        fit="contain"></el-image>
            </div>
            <share-bar></share-bar>
        </div>
        <div class="com-item-fill pro-bg">
            <div class="com-item-con logo-bg">
                <div class="contain">
<!--                    <div class="nav-pos">HOME > CONTACT US</div>-->
                    <div class="nav-pos">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/' }">HOME</el-breadcrumb-item>
                            <el-breadcrumb-item>CONTACT US</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="box">
                        <div class="l">
                            <div class="b">
                                <div class="title">CONTACT US</div>
                                <contactItemBox></contactItemBox>
                            </div>
                        </div>
                        <div class="r">
                            <div class="p-list">
                                <el-form size="medium" :model="ruleForm" :rules="rules" ref="ruleForm"
                                         label-width="140px"
                                         class="demo-ruleForm">
                                    <el-form-item label="Your Name：" prop="name">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Company：" prop="company">
                                        <el-input v-model="ruleForm.company"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Email：" prop="email">
                                        <el-input v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Phone：" prop="phone">
                                        <el-input v-model="ruleForm.phone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Subject：" prop="subject">
                                        <el-input v-model="ruleForm.subject"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Your Message：" prop="content">
                                        <el-input :autosize="{ minRows: 4}" type="textarea"
                                                  v-model="ruleForm.content"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <img
                                                class="hvr-buzz-out"
                                                @click="submitForm('ruleForm')"
                                                style="width:245px;height: 56px;margin-left: 54px;"
                                                src="../../../public/img/send-message.png"
                                        >
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--页脚-->
        <page-footer></page-footer>
    </div>
</template>

<script>
  // @ is an alias to /src
  import API from '../../utils/api'
  import headerBar from '../../components/headerBar'
  import pageFooter from '../../components/pageFooter'
  import contactItemBox from '../../components/contactItemBox'
  import shareBar from '../../components/shareBar'

  export default {
    metaInfo: {
      title: 'CONTACT US', // set a title
      meta: [{ // set meta
        name: 'keyWords',
        content: 'cosplay costumes,Transformers costumes,Iron man costumes,Armor prop'
      }],
      // link: [{ // set link
      //   rel: 'asstes',
      //   href: 'https://assets-cdn.github.com/'
      // }]
    },
    components: {
      headerBar,
      pageFooter,
      contactItemBox,
      shareBar,
    },
    name: 'contact',
    data () {
      return {
        bannerList: [],
        initialIndex: 0,
        ruleForm: {
          name: '',
          company: '',
          email: '',
          phone: '',
          subject: '',
          content: '',
        },
        rules: {
          email: [
            { required: true, message: 'Please enter your email', trigger: 'blur' },
            { type: 'email', message: 'Please enter your email', trigger: ['blur', 'change'] }
          ],
          content: [
            { required: true, message: 'Please enter your message', trigger: 'blur' },
          ]
        }
      }
    },
    computed: {},
    methods: {
      getBanner () {
        API.banner.list({
          page: 1,
          size: 100,
          flag: 6, // banner位置，1.首页 2.产品页 3.新闻 4.faqs 5. about 6. 联系页面
        }).then(da => {
          this.bannerList = da.data.data
        })
      },
      carouselChange (index) {
        console.info(index)
        this.initialIndex = index
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.email.send(this.ruleForm).then(da => {
              if (da.status) {
                this.$message.success('Submit successfully,we will contact you soon!')
                this.ruleForm = {
                  name: '',
                  company: '',
                  email: '',
                  phone: '',
                  subject: '',
                  content: '',
                }
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    beforeCreate () {

    },
    created () {
      this.getBanner()
    },
  }
</script>

<style scoped lang="less">
    @import "../../styles/common";
    @import "../../styles/var";

    .home-page {
        .banner-box {
            position: relative;

            .fix-img-box {
                position: absolute;
                top: 0;
                right: 0;
                z-index: 88;

                .fix-img {
                    width: 550px;
                    height: 680px
                }
            }
        }

        .pro-bg {
            background-image: url("../../../public/img/bg02.png");
            background-size: 100% 750px;
            background-repeat: no-repeat;
            background-position: center bottom;
        }

        .logo-bg {
            background-image: url("../../../public/img/bg01.png");
            background-repeat: no-repeat;
            background-position: 0 calc(100% - 50px);
            background-size: 255px;
        }

        .contain {
            margin-left: 140px;

            .nav-pos {
                padding: 80px 0;
                font-size: 33px;
                font-family: BebasNeueRegular;
                font-weight: 400;
                color: rgba(85, 85, 85, 1);
            }

            .box {
                min-height: 650px;
                display: flex;
                padding-bottom: 40px;

                .l {
                    width: 250px;
                    padding-right: 16px;
                    border-right: 1px dashed #D3D3D3;

                    .b {
                        .title {
                            height: 68px;
                            line-height: 68px;
                            text-align: center;
                            background: rgba(251, 164, 35, 1);
                            font-size: 33px;
                            font-family: BebasNeueRegular;
                            font-weight: bold;
                            color: rgba(23, 23, 23, 1);
                        }

                        .item-box {
                            padding: 30px 0;

                            div {
                                font-size: 19px;
                                font-family: PingFang SC;
                                /*font-weight: bold;*/
                                color: rgba(23, 23, 23, 1);
                                margin-bottom: 20px;
                                line-height: 1.2;
                            }
                        }
                    }
                }

                .r {
                    flex: 1;
                    padding-left: 16px;

                    .p-list {
                        width: 540px;
                    }
                }
            }
        }
    }
</style>
