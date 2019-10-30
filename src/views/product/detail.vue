<template>
    <div class="com-pages home-page">
        <header-bar active="product"></header-bar>
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
                    <div class="nav-pos">HOME > PRODUCTS > {{detail.title}}</div>
                    <div class="box">
                        <div class="l">
                            <div class="b">
                                <div class="title">PRODUCTS</div>
                                <div class="item-box">
                                    <div
                                            class="cate"
                                            :class="{active: item.name === productCateName}"
                                            @click="productCateHandle(item)"
                                            v-for="(item, index) in productCateList"
                                            :key="index">{{item.name}}
                                    </div>
                                </div>
                            </div>
                            <div class="b">
                                <div class="title">CONTACT US</div>
                                <contactItemBox></contactItemBox>
                            </div>
                        </div>
                        <div class="r">
                            <div class="p-list">
                                <div class="detail-show">
                                    <div class="imgs">
                                        <goods-imgs :imgUrls="imgUrls" :init-index="0"></goods-imgs>
                                    </div>

                                    <div class="det">
                                        <div class="title">{{detail.title}}</div>
                                        <div class="sub">{{detail.sub}}</div>
                                        <div class="mes">
                                            <router-link :to="{name: 'contact'}"><img
                                                    style="width:245px;height: 56px;"
                                                    src="../../../public/img/send-message.png"></router-link>
                                        </div>
                                    </div>
                                </div>

                                <el-row>
                                    <el-col :span="24">
                                        <div class="p-item p-item-1">
                                            <div class="title">PRODUCT DETAILS</div>
                                            <div class="ql-editor intro">
                                                <div v-html="detail.content"></div>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="p-item p-item-1">
                                            <div class="title">RELATED PRODUCTS</div>
                                            <div class="related-pro">
                                                <el-row>
                                                    <el-col v-for="(item, index) in tableData" :key="index" :span="6">
                                                        <div :title="item.title" class="re-p-item"
                                                             @click="toDetail(item)">
                                                            <el-image
                                                                    class="pro-img"
                                                                    :src="item.listImg"
                                                                    fit="fit"></el-image>
                                                            <div class="name">{{item.title}}</div>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="p-item p-item-1">
                                            <div class="title">SEND INQUIRY</div>
                                            <div class="ql-editor intro">
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
                                                                @click="submitForm('ruleForm')"
                                                                style="width:245px;height: 56px;margin-left: 54px;"
                                                                src="../../../public/img/send-message.png"
                                                        >
                                                    </el-form-item>
                                                </el-form>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
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
  import goodsImgs from './goodsImgs'
  import contactItemBox from '../../components/contactItemBox'
  import shareBar from '../../components/shareBar'

  export default {
    metaInfo: {
      title: 'PRODUCT DETAILS', // set a title
      meta: [{ // set meta
        name: 'keywords',
        content: 'cosplay costumes,Transformers costumes,Iron man costumes,Armor prop'
      }],
      link: [{ // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    },
    components: {
      headerBar,
      pageFooter,
      goodsImgs,
      contactItemBox,
      shareBar,
    },
    name: 'detail',
    data () {
      return {
        bannerList: [],
        initialIndex: 0,
        productCateList: [],
        productCateName: '',
        loading: false,
        detail: {},
        tableData: [],
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
        },
        imgUrls: []
      }
    },
    computed: {},
    methods: {
      getBanner () {
        API.banner.list({
          page: 1,
          size: 100,
          flag: 2, // banner位置，1.首页 2.产品页 3.新闻 4.faqs 5. about 6. 联系页面
        }).then(da => {
          this.bannerList = da.data.data
        })
      },
      carouselChange (index) {
        console.info(index)
        this.initialIndex = index
      },
      getProductCateList () {
        API.params.list(Object.assign({}, {
          page: 1,
          size: 100,
          flag: 1,
        })).then(da => {
          this.productCateList = da.data.data
        })
      },
      productCateHandle (item) {
        this.productCateName = item.name
        this.$router.push({ name: 'product', query: { productCateName: this.productCateName } })
      },
      getDetail (callback) {
        if (!this.$route.query._id) {
          this.$router.go(-1)
          return
        }
        this.loading = true
        API.product.detail({ _id: this.$route.query._id }).then(da => {
          this.detail = da.data
          this.productCateName = da.data.productCateName
          this.imgUrls = da.data.detailImgs.split(',')
          setTimeout(() => {
            this.loading = false
            callback && callback()
          }, 200)
        })
      },
      getData () {
        API.product.list(Object.assign({}, {
          page: 1,
          size: 8,
          status: 1,
        })).then(da => {
          this.tableData = da.data.data
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.email.send(this.ruleForm).then(da => {
              if (da.status) {
                this.$message.success('消息发送成功！我们会尽快与你联系')
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
      },
      toDetail (item) {
        this.$router.push({ name: 'productDetail', query: { _id: item._id } })
        this.getDetail()
      },
    },
    beforeCreate () {

    },
    created () {
      this.getProductCateList()
      this.getBanner()
      this.getDetail()
      this.getData()
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
                min-height: 900px;
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
                                font-weight: bold;
                                color: rgba(23, 23, 23, 1);
                                margin-bottom: 30px;
                                line-height: 1.6;
                                cursor: pointer;

                                &.cate:hover {
                                    text-decoration: underline;
                                }

                                &.active {
                                    color: rgba(251, 164, 35, 1);
                                }
                            }
                        }
                    }
                }

                .r {
                    flex: 1;
                    padding-left: 16px;

                    .p-list {
                        .p-item {
                            width: 800px;
                            margin-bottom: 41px;

                            img {
                                max-width: 100%;
                            }

                            .name {
                                font-size: 16px;
                                font-family: PingFang SC;
                                font-weight: bold;
                                color: rgba(23, 23, 23, 1);
                                text-align: center;
                                height: 42px;
                            }
                        }
                    }

                    .p-item {

                        /*.title {
                            font-weight: bold;
                            font-size: 39px;
                            position: relative;
                            margin-bottom: 40px;
                            &:after {
                                content: '';
                                display: inline-block;
                                position: absolute;
                                left: 0;
                                bottom: -20px;
                                width: 160px;
                                height: 8px;
                                background-color: @main-color;
                            }
                        }*/
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

                        .intro {
                            font-size: 16px;
                            font-family: PingFang SC;
                            font-weight: bold;
                            color: rgba(23, 23, 23, 1);
                            margin-bottom: 10px;
                        }

                        .fix-img {
                            width: 100%;
                            margin-bottom: 30px;
                        }

                        .related-pro {
                            .re-p-item {
                                width: 178px;
                                margin-bottom: 41px;
                                cursor: pointer;

                                .pro-img {
                                    width: 178px;
                                    height: 229px;
                                }

                                .name {
                                    font-size: 16px;
                                    font-family: PingFang SC;
                                    font-weight: bold;
                                    color: rgba(23, 23, 23, 1);
                                    text-align: center;
                                    height: 42px;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                            }
                        }
                    }

                    .detail-show {
                        display: flex;
                        margin-bottom: 20px;

                        .imgs {
                            width: 310px;
                        }

                        .det {
                            flex: 1;
                            margin-left: 20px;

                            .title {
                                font-size: 20px;
                                font-family: PingFang SC;
                                font-weight: bold;
                                color: rgba(23, 23, 23, 1);
                            }

                            .sub {
                                font-size: 16px;
                                font-family: PingFang SC;
                                font-weight: bold;
                                color: rgba(85, 85, 85, 1);
                                line-height: 22px;
                                margin-top: 24px;
                                margin-bottom: 26px;
                            }

                            .msg {
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="less">
    .ql-editor {
        img {
            max-width: 100%;
        }
    }
</style>
