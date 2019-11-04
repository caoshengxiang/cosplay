<template>
    <div class="com-pages home-page web-page">
        <header-bar active="news"></header-bar>
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
<!--                    <div class="nav-pos">HOME > NEWS</div>-->
                    <div class="nav-pos">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/' }">HOME</el-breadcrumb-item>
                            <el-breadcrumb-item>NEWS</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="box">
                        <div class="l">
                            <div class="b">
                                <div class="title" @click="$router.push({name: 'contact'})">CONTACT US</div>
                                <contactItemBox></contactItemBox>
                            </div>
                        </div>
                        <div class="r">
                            <div class="p-list">
                                <el-row>
                                    <el-col v-for="(item, index) in tableData" :key="index" :span="24">
                                        <router-link :to="{name: 'newsDetail', query: {_id: item._id}}">
                                            <div class="p-item">
                                                <div class="f-i">
                                                    <el-image
                                                            class="pro-img hvr-grow"
                                                            :src="item.listImg"
                                                            fit="fit"></el-image>
                                                </div>
                                                <div class="detail">
                                                    <div class="name com-a-line">{{item.title}}</div>
                                                    <div class="text">
                                                        {{item.sub}}
                                                    </div>
                                                    <div class="time">{{$moment(item.created, 'YYYY-MM-DD')}}</div>
                                                </div>

                                            </div>
                                        </router-link>
                                    </el-col>
                                </el-row>
                                <el-pagination
                                        :hide-on-single-page="true"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-size="pageSize"
                                        background
                                        layout="prev, pager, next"
                                        :total="total">
                                </el-pagination>
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
      title: 'NEWS', // set a title
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
    name: 'news',
    data () {
      return {
        bannerList: [],
        initialIndex: 0,
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 12,
        loading: false,
      }
    },
    computed: {},
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
      getData (callback) {
        this.loading = true
        API.news.list(Object.assign({}, {
          page: this.currentPage,
          size: this.pageSize,
          status: 1
        })).then(da => {
          this.tableData = da.data.data
          this.total = da.data.total
          setTimeout(() => {
            this.loading = false
            callback && callback()
          }, 200)
        })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
        this.getData()
      },
    },
    beforeCreate () {

    },
    created () {
      this.getBanner()
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
                        .p-item {
                            margin-bottom: 41px;
                            display: flex;

                            .pro-img {
                                width: 163px;
                                height: 163px;
                            }

                            .detail {
                                margin-left: 33px;

                                .name {
                                    font-size: 19px;
                                    font-family: PingFang SC;
                                    font-weight: bold;
                                    color: rgba(23, 23, 23, 1);
                                    margin-bottom: 23px;
                                }

                                .text {
                                    font-size: 16px;
                                    font-family: PingFang SC;
                                    font-weight: bold;
                                    color: rgba(85, 85, 85, 1);
                                    line-height: 22px;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 3;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }

                                .time {
                                    font-size: 16px;
                                    font-family: PingFang SC;
                                    font-weight: bold;
                                    color: rgba(85, 85, 85, 1);
                                    line-height: 22px;
                                    margin-top: 23px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
