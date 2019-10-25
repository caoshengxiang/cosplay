<template>
    <div class="page-footer">
        <div class="com-item-fill">
            <div class="com-item-con">
                <el-row :gutter="42">
                    <el-col :span="6" class="col-1">
                        <div><img class="logo" src="../assets/logo.png" alt=""></div>
                        <div>Chengdu chengdu Art Co.,Ltd</div>
                        <div>Mob:+8613800138000</div>
                        <div>E-mail:123456@qq.com</div>
                        <div>
                            Add:Room 1415, Floor 14th,<br>
                            Unit 1 Building 2 Wanda Square,<br>
                            Qingyang district, Chengdu China
                        </div>
                    </el-col>
                    <el-col :span="6" class="col-2">
                        <div class="title">Navigation</div>
                        <div>
                            <router-link :to="{name: 'product'}">Product</router-link>
                        </div>
                        <div>
                            <router-link :to="{name: 'news'}">News</router-link>
                        </div>
                        <div>
                            <router-link :to="{name: 'faqs'}">Faqs</router-link>
                        </div>
                        <div>
                            <router-link :to="{name: 'about'}">About Us</router-link>
                        </div>
                        <div>
                            <router-link :to="{name: 'contact'}">Contct</router-link>
                        </div>
                    </el-col>
                    <el-col :span="6" class="col-2">
                        <div class="title">Categories</div>
                        <div v-for="(item, index) in productCateList_6" :key="index">
                            <router-link :to="{name: 'product', query: {productCateName: item.name}}">{{item.name}}
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :span="6" class="col-4">
                        <div class="title">Contact Us</div>
                        <div class="text">
                            We offer not only priducts,but also
                            our after.sales service.Welcome to
                            ontact us to know more
                        </div>
                        <div class="contact">
                            <router-link :to="{name: 'contact'}"><el-button>contact us</el-button></router-link>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="copyright">Copyright © Chengdu Super Queen Art Co.,Ltd All Rights Reserved.</div>
    </div>
</template>

<script>
  import API from '../utils/api'

  export default {
    name: 'pageFooter',
    data () {
      return {
        productCateList_6: []
      }
    },
    methods: {
      getProductCateList_6 () {
        API.params.list(Object.assign({}, {
          page: 1,
          size: 6,
          flag: 1,
        })).then(da => {
          this.productCateList_6 = da.data.data
        })
      }
    },
    created () {
      this.getProductCateList_6()
    }
  }
</script>

<style scoped lang="less">
    @import "../styles/common";

    .page-footer {
        a {
            color: #ffffff;
        }

        .com-item-fill {
            background-image: url("../../public/img/footer-bg.png");
            background-position: center;
            background-size: cover;
            height: 340px;
            padding: 60px 0;
            color: #ffffff;
            box-sizing: border-box;
        }

        .col-1 {
            .logo {
                width: 110px;
                height: 40px;
                background-color: #ffffff;
                padding: 10px;
            }

            div {
                font-size: 12px;
                line-height: 1.9;
            }
        }

        .col-2 {
            .title {
                font-size: 23px;
                font-weight: bold;
                color: #FBA423;
                padding-bottom: 16px;
            }

            div {
                line-height: 2;
            }
        }

        .col-4 {
            .title {
                font-size: 23px;
                font-weight: bold;
                color: #FBA423;
                padding-bottom: 16px;
            }

            .text {
                margin-top: 14px;
                margin-bottom: 20px;
            }

            .contact {
                margin-bottom: 10px;
            }
        }

        .copyright {
            background-color: #FBA423;
            color: #171717;
            height: 60px;
            line-height: 60px;
            text-align: center;
        }
    }
</style>
