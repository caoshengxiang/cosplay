<template>
    <div class="com-pages home-page">
        <header-bar active="news"></header-bar>
        <!--    <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" v-for="i in 10" :key="i" style="text-align: center">-->
        <!--      <div style="max-width: 300px;width: 100%;height:200px;border: 1px solid red;box-sizing: border-box;display: inline-block;">{{i+1}}</div>-->
        <!--    </el-col>-->
        <div class="banner-box">
            <el-carousel :interval="5000" height="500px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <el-image style="height: 100%" fit="cover"
                              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                </el-carousel-item>
            </el-carousel>
            <div class="fix-img-box">
                <el-image
                        class="fix-img"
                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                        fit="fit"></el-image>
            </div>
        </div>
        <div class="com-item-fill">
            <div class="com-item-con logo-bg">
                <div class="contain">
                    <div class="nav-pos">HOME > PRODUCTS > Iron Man Costumes</div>
                    <div class="box">
                        <div class="l">
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
                                    <el-col v-for="i in 5" :key="i" :span="24">
                                        <div class="p-item">
                                            <div class="f-i">
                                                <el-image
                                                        class="pro-img"
                                                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                                        fit="fit"></el-image>
                                            </div>
                                            <div class="detail">
                                                <div class="name com-a-line">New Bumblebee Cosplay Costume</div>
                                                <div class="text">
                                                    Four instruments - Instance failure resolution
                                                    Measuring instruments are one of the most
                                                    important instruments on the whole.
                                                    Four instruments - Instance failure resolution
                                                    Measuring instruments are one of the most
                                                    important instruments on the whole.
                                                    Four instruments - Instance failure resolution
                                                    Measuring instruments are one of the most
                                                    important instruments on the whole.
                                                    Four instruments - Instance failure resolution
                                                    Measuring instruments are one of the most
                                                    important instruments on the whole.
                                                </div>
                                                <div class="time">2019-03-12</div>
                                            </div>

                                        </div>
                                    </el-col>
                                </el-row>
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
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
  // import API from '../../utils/api'
  import headerBar from '../../components/headerBar'
  import pageFooter from '../../components/pageFooter'

  export default {
    components: {
      headerBar,
      pageFooter,
    },
    name: 'news',
    data () {
      return {}
    },
    computed: {},
    methods: {},
    beforeCreate () {

    },
    created () {
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

        .logo-bg {
            background-image: url("../../../public/img/bg01.png");
            background-repeat: no-repeat;
            background-position: 0 100%;
            background-size: 255px;
            margin-bottom: 50px;
        }
        .contain {
            margin-left: 140px;
            .nav-pos {
                padding: 80px 0;
                font-size:33px;
                font-family:BebasNeueRegular;
                font-weight:400;
                color:rgba(85,85,85,1);
            }
            .box {
                min-height: 900px;
                display: flex;

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
                                font-size:19px;
                                font-family:PingFang SC;
                                font-weight:bold;
                                color:rgba(23,23,23,1);
                                margin-bottom: 30px;
                                line-height: 1.6;
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
                                width: 178px;
                                height: 229px;
                            }
                            .detail {
                                margin-left: 33px;
                                .name {
                                    font-size:19px;
                                    font-family:PingFang SC;
                                    font-weight:bold;
                                    color:rgba(23,23,23,1);
                                }
                                .text {
                                    font-size:16px;
                                    font-family:PingFang SC;
                                    font-weight:bold;
                                    color:rgba(85,85,85,1);
                                    line-height:22px;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 3;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    padding: 23px 0;
                                }
                                .time {
                                    font-size:16px;
                                    font-family:PingFang SC;
                                    font-weight:bold;
                                    color:rgba(85,85,85,1);
                                    line-height:22px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
