<template>
    <div class="com-pages home-page">
        <header-bar active="news"></header-bar>
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
                    <div class="nav-pos">HOME > NEWS > {{detail.title}}</div>
                    <div class="box">
                        <div class="l">
                            <div class="b">
                                <div class="title">CONTACT US</div>
                                <contactItemBox></contactItemBox>
                            </div>
                        </div>
                        <div class="r">
                            <div class="p-list">
                                <div class="ql-editor p-item">
                                    <div v-html="detail.content"></div>
                                </div>
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
  import API from '../../utils/api'
  import headerBar from '../../components/headerBar'
  import pageFooter from '../../components/pageFooter'
  import contactItemBox from '../../components/contactItemBox'
  import shareBar from '../../components/shareBar'

  export default {
    metaInfo: {
      title: 'NEWS DETAILS', // set a title
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
      contactItemBox,
      shareBar,
    },
    name: 'newsDetail',
    data () {
      return {
        bannerList: [],
        initialIndex: 0,
        loading: false,
        detail: {},
      }
    },
    methods: {
      getBanner () {
        API.banner.list({
          page: 1,
          size: 100,
          flag: 3, // banner位置，1.首页 2.产品页 3.新闻 4.faqs 5. about 6. 联系页面
        }).then(da => {
          this.bannerList = da.data.data
        })
      },
      carouselChange (index) {
        console.info(index)
        this.initialIndex = index
      },
      getDetail (callback) {
        if (!this.$route.query._id) {
          this.$router.go(-1)
          return
        }
        this.loading = true
        API.news.detail({ _id: this.$route.query._id }).then(da => {
          this.detail = da.data
          setTimeout(() => {
            this.loading = false
            callback && callback()
          }, 200)
        })
      },
    },
    created () {
      this.getBanner()
      this.getDetail()
    }
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
                            width: 660px;
                            margin-bottom: 41px;
                            overflow: hidden;

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
