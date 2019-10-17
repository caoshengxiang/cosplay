<template>
    <div class="com-pages home-page">
        <header-bar active="about"></header-bar>
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
        <div class="com-item-fill pro-bg">
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
                                    <el-col :span="24">
                                        <div class="p-item p-item-1">
                                           <div class="title">OUR HISTORY</div>
                                            <div class="intro">
                                                Chengdu Gauss Power Technology Co., Ltd.is a professional production-manufacturing enterprise specialized in cosplay costume design and peoduction. Our company has been established since 2014 to grow up to be a team of high-quality, united, hard-working and truth-seeking characters. We own an independent studio, professional team with ten years of experience in China;All the costumes are handmade, without any mass production.
                                            </div>
                                            <el-image
                                                    class="fix-img"
                                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                                    fit="contain"></el-image>
                                        </div>
                                        <div class="p-item p-item-2">
                                            <div class="title">OUR TEAM</div>
                                            <div class="intro">Our team has 10 years of experience in making props costumes and own designers, drafters, tailors and packing staff.</div>
                                            <el-image
                                                    class="fix-img"
                                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                                    fit="contain"></el-image>
                                        </div>
                                        <div class="p-item p-item-3">
                                            <div class="title">OUR PRODUCTS</div>
                                            <div class="intro">
                                                Including Transformers costumes,Iron man costumes,Thanos costumes,Star wars costumes and other game roles.The all costumes can be customized as customers’ demands.
                                            </div>
                                            <el-image
                                                    class="fix-img"
                                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                                    fit="contain"></el-image>
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
  // import API from '../../utils/api'
  import headerBar from '../../components/headerBar'
  import pageFooter from '../../components/pageFooter'

  export default {
    components: {
      headerBar,
      pageFooter,
    },
    name: 'about',
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
                font-size:33px;
                font-family:BebasNeueRegular;
                font-weight:400;
                color:rgba(85,85,85,1);
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
                        width: 540px;
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
                                font-weight: bold;
                                font-size: 49px;
                                position: relative;
                                margin-bottom: 40px;
                            }
                            .intro {
                                font-size:16px;
                                font-family:PingFang SC;
                                font-weight:bold;
                                color:rgba(23,23,23,1);
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
