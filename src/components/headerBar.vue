<template>
    <div class="com-item-fill header-bar">
        <div class="com-item-con header-bar-con">
            <div class="l"><img src="../assets/logo.png" alt=""></div>
            <div class="r">
                <ul>
                    <li @click="navPage('home')" :class="{active: active=='home'}">HOME</li>
                    <li @click="navPage('product')" :class="{active: active=='product'}">PRODUCT</li>
                    <li @click="navPage('news')" :class="{active: active=='news'}">NEWS</li>
                    <li @click="navPage('faqs')" :class="{active: active=='faqs'}">FAQS</li>
                    <li @click="navPage('about')" :class="{active: active=='about'}">ABOUT US</li>
                    <li @click="navPage('contact')" :class="{active: active=='contact'}">CONTACT US</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'headerBar',
    props: {
      active: {
        default: 'home',
      }
    },
    methods: {
      navPage (name) {
        this.$router.push({ name: name })
      }
    }
  }
</script>

<style scoped lang="less">
    @import "../styles/common";

    .header-bar {
        height: 80px;
        line-height: 80px;
        box-sizing: border-box;
        overflow: hidden;

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
            }

            .r {
                ul {
                    display: flex;

                    li {
                        padding: 0 20px;
                        font-weight: bold;
                        font-size: 23px;
                        cursor: pointer;

                        &:hover {
                            background-color: #171717;
                            color: #F3C13C;
                        }

                        &.active {
                            background-color: #171717;
                            color: #F3C13C;
                        }
                    }
                }
            }
        }
    }
</style>
