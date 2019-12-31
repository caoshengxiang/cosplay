<template>
    <div class="page-footer">
        <div class="com-item-fill">
            <div class="com-item-con">
                <el-row :gutter="42">
                    <el-col :span="6" class="col-1">
                        <div><img class="logo" src="../assets/logo.png" alt=""></div>
                        <div>Chengdu Gauss Power Technology Co., Ltd</div>
                        <div>Phone: +8618628067519</div>
                        <div><a href="mailto:info@armor4cos.com">Emai: info@armor4cos.com</a></div>
                        <div>
                            Floor 7, Area B, Building 1, No. 200, Tianfu 5th Street,High-tech Zone,Chengdu,
                            China (Sichuan) Pilot Free Trade Zone
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
                            <router-link :to="{name: 'contact'}">Contact</router-link>
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
                            contact us to know more
                        </div>
                        <div class="contact">
                            <router-link :to="{name: 'contact'}"><el-button>contact us</el-button></router-link>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <floatbar></floatbar>
        </div>
        <div class="copyright">Copyright © Chengdu Gauss Power Technology Co.,Ltd All Rights Reserved. Sichuan ICP No. 19033486</div>
    </div>
</template>

<script>
  import API from '../utils/api'
  import floatbar from './floatbar'

  export default {
    name: 'pageFooter',
    components: {
      floatbar,
    },
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
