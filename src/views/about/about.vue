<template>
    <div class="com-pages home-page">
        <header-bar active="about"></header-bar>
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
                    <div class="nav-pos">HOME  >  ABOUT US</div>
                    <div class="box">
                        <div class="l">
                            <div class="b">
                                <div class="title">CONTACT US</div>
                                <contactItemBox></contactItemBox>
                            </div>
                        </div>
                        <div class="r">
                            <div class="p-list">
                                <el-row>
                                    <el-col :span="24">
                                        <div class="p-item p-item-1">
                                            <div class="title">Our History</div>
                                            <div class="intro"  style="text-align: justify">
                                                Chengdu Gauss Power Technology Co., Ltd is a professional production-manufacturing enterprise specialized in cosplay costume design and production. Our company has been established since 2015 to grow up to be a team of high-quality, united, hard-working and truth-seeking characters. We own an independent studio, professional team with ten years of experience in China;All the costumes are handmade and we win a good reputation in Cosplay field.
                                            </div>
<!--                                            <el-image-->
<!--                                                    class="fix-img"-->
<!--                                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"-->
<!--                                                    fit="contain"></el-image>-->
                                            <img class="fix-img" src="../../../public/img/images/about-1.jpg" fit="contain" alt="">
                                        </div>
                                        <div class="p-item p-item-2">
                                            <div class="title">Our studio</div>
                                            <div class="intro">Our studio has 10 years of experience in making props costumes and we own many experienced designers, drafters, tailors and packing staff.
                                            </div>
<!--                                            <el-image-->
<!--                                                    class="fix-img"-->
<!--                                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"-->
<!--                                                    fit="contain"></el-image>-->
                                            <img class="fix-img" src="../../../public/img/images/about-2.jpg" fit="contain" alt="">
                                        </div>
                                        <div class="p-item p-item-3">
                                            <div class="title">our products</div>
                                            <div class="intro">
                                                1.Including Transformers costumes,Iron man costumes,Thanos costumes,Star wars costumes and other game roles.
                                                The all costumes can be customized as customers’ demands.
                                            </div>
<!--                                            <el-image-->
<!--                                                    class="fix-img"-->
<!--                                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"-->
<!--                                                    fit="contain"></el-image>-->
                                            <img class="fix-img" src="../../../public/img/images/about-3.jpg" fit="contain" alt="">
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
  import contactItemBox from '../../components/contactItemBox'
  import shareBar from '../../components/shareBar'

  export default {
    components: {
      headerBar,
      pageFooter,
      contactItemBox,
      shareBar,
    },
    name: 'about',
    metaInfo: {
      title: 'ABOUT US', // set a title
      meta: [{ // set meta
        name: 'keyWords',
        content: 'cosplay costumes,Transformers costumes,Iron man costumes,Armor prop'
      }],
      // link: [{ // set link
      //   rel: 'asstes',
      //   href: 'https://assets-cdn.github.com/'
      // }]
    },
    data () {
      return {
        bannerList: [],
        initialIndex: 0,
      }
    },
    computed: {},
    methods: {
      getBanner () {
        API.banner.list({
          page: 1,
          size: 100,
          flag: 5, // banner位置，1.首页 2.产品页 3.新闻 4.faqs 5. about 6. 联系页面
        }).then(da => {
          this.bannerList = da.data.data
        })
      },
      carouselChange (index) {
        console.info(index)
        this.initialIndex = index
      },
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
                        width: 640px;

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

                            &.p-item-2 {
                                .title {
                                    text-align: right;

                                    &:after {
                                        content: '';
                                        display: inline-block;
                                        position: absolute;
                                        right: 0;
                                        bottom: -20px;
                                        width: 160px;
                                        height: 8px;
                                        background-color: @main-color;
                                    }
                                }

                                .intro {
                                    text-align: right;
                                }
                            }

                            .title {
                                /*font-weight: bold;*/
                                font-size: 49px;
                                position: relative;
                                margin-bottom: 40px;
                            }

                            .intro {
                                font-size: 16px;
                                font-family: PingFang SC;
                                /*font-weight: bold;*/
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
    }
</style>
