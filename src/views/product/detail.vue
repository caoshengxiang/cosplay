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
                                <div class="item-box">
                                    <div>
                                        Chengdu Gauss Power
                                        Art Co.,Ltd
                                    </div>
                                    <div>Mob：+860283928272</div>
                                    <div>Email：dkjfi@163.com</div>
                                    <div>
                                        Add：Room 1415, Floor
                                        14th,Unit 1 Building 2
                                        Wanda SquareQingyang
                                        district, Chengdu China
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="r">
                            <div class="p-list">
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
                                            <div class="ql-editor intro">
                                                <div v-html="detail.content"></div>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="p-item p-item-1">
                                            <div class="title">SEND INQUIRY</div>
                                            <div class="ql-editor intro">
                                                <div v-html="detail.content"></div>
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

  export default {
    metaInfo: {
      title: 'PRODUCT DETAILS', // set a title
      meta: [{ // set meta
        name: 'keyWords',
        content: 'My Example App'
      }],
      link: [{ // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    },
    components: {
      headerBar,
      pageFooter,
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
        fileList: []
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
          this.fileList = da.data.detailImgs.split(',').map(item => {
            return {
              url: item
            }
          })
          setTimeout(() => {
            this.loading = false
            callback && callback()
          }, 200)
        })
      },
    },
    beforeCreate () {

    },
    created () {
      this.getProductCateList()
      this.getBanner()
      this.getDetail()
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
                        &.p-item-1, &.p-item-3 {
                            .title {
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
                            }
                        }

                        .title {
                            font-weight: bold;
                            font-size: 49px;
                            position: relative;
                            margin-bottom: 40px;
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
                    }
                }
            }
        }
    }
</style>
