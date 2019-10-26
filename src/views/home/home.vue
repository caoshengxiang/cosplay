<template>
    <div class="com-pages home-page">
        <header-bar active="home"></header-bar>
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
            <div class="com-item-con">
                <div class="bg-01">
                    <img src="../../../public/img/bg01.png" alt="">
                </div>
                <div class="products">
                    <div class="title">PRODUCTS</div>
                    <div class="show-pro">
                        <el-image
                                v-for="(item, index) in productList_4"
                                :key="index"
                                class="pro-img"
                                :src="item.listImg"
                                fit="fill"></el-image>
                    </div>
                    <router-link :to="{name: 'product'}"><div class="pro-more">MORE+</div></router-link>
                </div>
                <div class="choose">
                    <div style="text-align: right">
                        <div class="title">WHY CHOOSE US</div>
                    </div>
                    <div class="choose-box">
                        <div class="choose-row">
                            <div class="choose-item">
                                <div class="index">01</div>
                                <div class="name">
                                    Quality <br>
                                    Control
                                </div>
                            </div>
                            <div class="choose-item">
                                <div class="index">03</div>
                                <div class="name">
                                    All <br>
                                    Handmade
                                </div>
                            </div>
                            <div class="choose-item">
                                <div class="index">05</div>
                                <div class="name">
                                    After-sales <br>
                                    Service
                                </div>
                            </div>
                        </div>
                        <div class="choose-row">
                            <div class="choose-item">
                                <div class="index">02</div>
                                <div class="name">
                                    Professional <br>
                                    Team
                                </div>
                            </div>
                            <div class="choose-item">
                                <div class="index">04</div>
                                <div class="name">Light Weight <br> &nbsp;</div>
                            </div>
                            <div class="choose-item">
                                <div class="index">06 <br></div>
                                <div class="name">Fast shipping <br> &nbsp;</div>
                            </div>
                        </div>
                    </div>
                    <router-link :to="{name: 'about'}"><div class="choose-more">MORE+</div></router-link>
                </div>
            </div>
        </div>

        <div class="com-item-fill">
            <div class="com-item-con faqs">
                <div class="title">FAQS</div>
                <div class="con">
                    <img   class="f-img" src="../../../public/img/home-1.png" alt="">
<!--                    <el-image-->
<!--                            class="f-img"-->
<!--                            src="../../../public/img/home-1.png"-->
<!--                            fit="fill"></el-image>-->
                    <div class="faqs-box">
                        <div class="line-1"></div>
                        <div class="line-2"></div>
                        <div class="line-3"></div>
                        <div class="line-4"></div>
                        <div class="l-yinhao">“</div>
                        <div class="faq-list">
                            <div class="faq" v-for="(item, index) in faqsList_4" :key="index">
                                <div class="index">{{index + 1}}</div>
                                <div class="text">
                                    <div class="q">{{item.q}}</div>
                                    <div class="a">{{item.a}}</div>
                                </div>
                            </div>
<!--                            <div class="faq">-->
<!--                                <div class="index">2</div>-->
<!--                                <div class="text">-->
<!--                                    <div class="q">Q:The costumes are fit for adults or young?</div>-->
<!--                                    <div class="a">A.our all costumes fit for adults.</div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="faq">-->
<!--                                <div class="index">3</div>-->
<!--                                <div class="text">-->
<!--                                    <div class="q">Q:The costumes are fit for adults or young?</div>-->
<!--                                    <div class="a">A.our all costumes fit for adults.</div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="faq">-->
<!--                                <div class="index">4</div>-->
<!--                                <div class="text">-->
<!--                                    <div class="q">Q:The costumes are fit for adults or young?</div>-->
<!--                                    <div class="a">A.our all costumes fit for adults.</div>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                        <div class="r-yinhao">”</div>
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
      title: 'HOME', // set a title
      meta: [{ // set meta
        name: 'keyWords',
        content: 'GAUSS POWER'
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
    name: 'home',
    data () {
      return {
        bannerList: [],
        initialIndex: 0,
        productList_4: [],
        faqsList_4: [],
      }
    },
    computed: {},
    methods: {
      getBanner () {
        API.banner.list({
          page: 1,
          size: 100,
          flag: 1, // banner位置，1.首页 2.产品页 3.新闻 4.faqs 5. about 6. 联系页面
        }).then(da => {
          this.bannerList = da.data.data
        })
      },
      carouselChange (index) {
        console.info(index)
        this.initialIndex = index
      },
      getProductList_4 () {
        API.product.list(Object.assign({}, {
          page: 1,
          size: 4,
          status: 1,
        })).then(da => {
          this.productList_4 = da.data.data
        })
      },
      getFaqsList_4 () {
        API.faqs.list(Object.assign({}, {
          page: 1,
          size: 4,
          status: 1,
        })).then(da => {
          this.faqsList_4 = da.data.data
        })
      },
    },
    beforeCreate () {

    },
    created () {
      this.getBanner()
      this.getProductList_4()
      this.getFaqsList_4()
    },
  }
</script>

<style scoped lang="less">
    @import "../../styles/common";
    @import "../../styles/var";

    .home-page {
        .banner-box {
            position: relative;
        }

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

        .pro-bg {
            background-image: url("../../../public/img/bg02.png");
            background-size: 100% 750px;
            background-repeat: no-repeat;
            background-position: center bottom;

            .com-item-con {
                position: relative;
            }

            .bg-01 {
                img {
                    height: 650px;
                    position: absolute;
                    bottom: 47px;
                    left: 0;
                    z-index: 0;
                }
            }
        }

        .products {
            margin-top: 130px;
            margin-left: 140px;

            .title {
                font-weight: bold;
                font-size: 49px;
                position: relative;
                margin-bottom: 60px;

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

            .show-pro {
                padding-left: 50px;

                .pro-img {
                    margin-right: 32px;
                    width: 180px;
                    height: 220px;
                    cursor: pointer;
                }
            }

            .pro-more {
                background-color: #FBA423;
                font-size: 33px;
                width: 120px;
                height: 41px;
                line-height: 41px;
                text-align: center;
                border-radius: 20px;
                font-family: SimSun;
                font-weight: bold;
                margin-left: 50px;
                margin-top: 50px;
                cursor: pointer;
            }
        }

        .choose {
            margin-top: 31px;

            .title {
                font-weight: bold;
                font-size: 49px;
                position: relative;
                margin-bottom: 60px;
                display: inline-block;
                margin-right: 100px;

                &:after {
                    content: '';
                    display: inline-block;
                    position: absolute;
                    right: 0;
                    bottom: -20px;
                    width: 160px;
                    height: 8px;
                    background-color: @main-color;
                    clear: both;
                }
            }

            .choose-box {
                background-color: #FBA423;
                padding: 37px 44px;
                margin-left: 285px;
                margin-top: 60px;

                .choose-row {
                    &:nth-of-type(1) {
                        margin-bottom: 30px;
                    }

                    .choose-item {
                        width: 230px;
                        height: 100px;
                        display: inline-block;

                        .index {
                            width: 45px;
                            height: 45px;
                            background: rgba(23, 23, 23, 1);
                            border-radius: 50%;
                            font-size: 28px;
                            font-weight: bold;
                            color: rgba(243, 193, 60, 1);
                            text-align: center;
                            line-height: 45px;
                        }

                        .name {
                            font-size: 20px;
                            font-family: PingFang SC;
                            font-weight: bold;
                            color: rgba(23, 23, 23, 1);
                        }
                    }
                }
            }

            .choose-more {
                font-size: 33px;
                font-family: BebasNeueRegular;
                font-weight: bold;
                color: rgba(23, 23, 23, 1);
                text-align: right;
                margin-right: 100px;
                padding: 16px 0;
                cursor: pointer;
            }
        }

        .faqs {
            margin-top: 50px;

            .title {
                font-weight: bold;
                font-size: 49px;
                position: relative;
                margin-bottom: 60px;

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

            .con {
                position: relative;
                box-shadow: 0px 30px 20px -30px rgba(0, 0, 0, 0.3);
                margin-bottom: 90px;

                .f-img {
                    width: 285px;
                    height: 315px;
                    position: absolute;
                    bottom: -40px;
                    left: 80px;
                }

                .faqs-box {
                    margin-left: 450px;
                    position: relative;

                    .line-1 {
                        position: absolute;
                        top: 220px;
                        width: 280px;
                        height: 1px;
                        border-bottom: 1px dashed #888888;
                    }

                    .line-2 {
                        position: absolute;
                        top: 220px;
                        left: 420px;
                        width: 280px;
                        height: 1px;
                        border-bottom: 1px dashed #dedede;
                    }

                    .line-3 {
                        position: absolute;
                        left: 350px;
                        top: 80px;
                        width: 1px;
                        height: 81px;
                        border-right: 1px dashed #888888;
                    }

                    .line-4 {
                        position: absolute;
                        left: 350px;
                        top: 161px + 120px;
                        width: 1px;
                        height: 81px;
                        border-right: 1px dashed #dedede;
                    }

                    .l-yinhao {
                        width: 39px;
                        font-size: 102px;
                        font-family: SimHei;
                        font-weight: bold;
                        color: rgba(23, 23, 23, 1);
                        position: absolute;
                        left: -120px;
                    }

                    .r-yinhao {
                        width: 40px;
                        font-size: 102px;
                        font-family: SimHei;
                        font-weight: bold;
                        color: rgba(23, 23, 23, 1);
                        position: absolute;
                        right: 200px;
                        bottom: -30px;
                    }

                    .faq-list {
                        padding: 50px 0 20px 0;

                        .faq {
                            width: 300px;
                            height: 180px;
                            display: inline-block;
                            overflow: hidden;

                            &:nth-of-type(1) {
                                padding-right: 60px;
                            }

                            &:nth-of-type(2) {
                                padding-left: 60px;

                                .text {
                                }
                            }

                            &:nth-of-type(3) {
                                padding-right: 60px;
                                margin-top: 40px;
                            }

                            &:nth-of-type(4) {
                                margin-top: 40px;
                                padding-left: 60px;
                            }

                            .index {
                                font-size: 33px;
                                font-family: BebasNeueRegular;
                                font-weight: bold;
                                color: rgba(23, 23, 23, 1);
                                text-align: center;
                            }

                            .text {
                                height: 72px;
                                width: 300px;
                                font-size: 16px;
                                font-family: PingFang SC;
                                font-weight: bold;
                                color: rgba(23, 23, 23, 1);

                                .q {
                                }

                                .a {
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
