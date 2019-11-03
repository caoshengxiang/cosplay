<template>
    <div class="com-item-fill header-bar">
        <div class="com-item-con header-bar-con">
            <div class="l">
                <img src="../assets/logo.png" alt="">

                <div class="box">
                    <a href="tel:+8618628067519"><i class="el-icon-phone-outline"></i> +8618628067519</a>
                    <a href="mailto:info@armor4cos.com"><i class="el-icon-message"></i> info@armor4cos.com</a>
                </div>
            </div>
            <div class="r">
                <ul class="menu-main">
                    <li class="main-item hvr-underline-from-center" @click="navPage('home')"><span :class="{active: active=='home', notAc: active!=='home'}">HOME</span></li>
                    <li class="main-item" @click="navPage('product')">
                        <span :class="{active: active=='product', notAc: active!=='product'}">PRODUCT</span>

                        <ul class="sub-menu">
                            <li class="sub-item"
                                @click.stop="$router.push({name: 'product', query: {productCateName: item.name}})"
                                v-for="(item, index) in productCateList"
                                :key="index">{{item.name}}</li>
                        </ul>

                    </li>
                    <li class="main-item hvr-underline-from-center" @click="navPage('news')"><span :class="{active: active=='news', notAc: active!=='news'}">NEWS</span></li>
                    <li class="main-item hvr-underline-from-center" @click="navPage('faqs')"><span :class="{active: active=='faqs', notAc: active!=='faqs'}">FAQS</span></li>
                    <li class="main-item hvr-underline-from-center" @click="navPage('about')"><span :class="{active: active=='about', notAc: active!=='about'}">ABOUT US</span>
                    </li>
                    <li class="main-item hvr-underline-from-center" @click="navPage('contact')">
                        <span :class="{active: active=='contact', notAc: active!=='contact'}">CONTACT US</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import API from '../utils/api'

  export default {
    name: 'headerBar',
    props: {
      active: {
        default: 'home',
      }
    },
    data () {
      return {
        productCateList: [],
      }
    },
    methods: {
      navPage (name) {
        this.$router.push({ name: name })
      },
      getProductCateList () {
        API.params.list(Object.assign({}, {
          page: 1,
          size: 100,
          flag: 1,
        })).then(da => {
          this.productCateList = da.data.data
          if (this.$route.query.productCateName) {
            this.productCateName = this.$route.query.productCateName
          } else {
            this.productCateName = da.data.data[0].name
          }
        })
      },
    },
    created () {
      this.getProductCateList()
    }
  }
</script>

<style scoped lang="less">
    @import "../styles/common";

    .header-bar {
        height: 80px;
        line-height: 80px;
        box-sizing: border-box;
        /*overflow: hidden;*/

        .header-bar-con {
            display: flex;
            justify-content: space-between;

            .l {
                height: 80px;
                display: flex;
                align-items: center;

                img {
                    height: 60px;
                    width: 160px;
                }

                .box {
                    a {
                        margin-left: 30px;
                        font-size: 16px;
                    }
                }
            }

            .r {
                .menu-main {
                    display: flex;

                    .main-item {
                        padding: 0 16px;
                        /*font-weight: bold;*/
                        font-size: 23px;
                        cursor: pointer;
                        transition: all 0.2s;
                        position: relative;

                        span.notAc:hover {
                            /*background-color: #171717;*/
                            color: #F3C13C;
                            transform: scale(1.1);
                        }

                        span.active {
                            /*background-color: #171717;*/
                            color: #F3C13C;
                        }
                        &:hover {
                            .sub-menu {
                                display: block;
                                height: auto;
                            }
                        }
                        .sub-menu {
                            position: absolute;
                            top: 80px;
                            left: -30px;
                            background-color: #fff;
                            padding: 10px;
                            z-index: 9999;
                            width: 300px;
                            line-height: 40px;
                            font-size: 18px;
                            display: none;
                            height: 0;
                            transition: all 0.3s;
                            .sub-item {
                                &:hover {
                                    color: #F3C13C;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
