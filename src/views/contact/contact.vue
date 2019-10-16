<template>
    <div class="com-pages home-page">
        <header-bar active="contact"></header-bar>
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
    name: 'contact',
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
                border: 1px solid red;
            }
        }
    }
</style>
