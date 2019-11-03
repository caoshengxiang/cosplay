<template>
    <div class="float-bar">
        <div class="item">
            <a target="_blank"
               href="https://www.facebook.com/Gauss-Power-Armor-Cos-Costumes-102572031175840/?modal=admin_todo_tour">
                <img class="icon" src="../../public/img/icons/Facebook.png" alt="">
            </a>
            <a target="_blank" href="https://www.instagram.com/gausspower/">
                <img class="icon" src="../../public/img/icons/instagram.png" alt="">
            </a>
            <a target="_blank" href="https://www.youtube.com/channel/UCQS0j_O_mBICUCYaQd8ldyg?view_as=subscriber">
                <img class="icon" src="../../public/img/icons/youtube.png" alt="">
            </a>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'floatBar'
  }
</script>

<style scoped lang="less">
    @import "../styles/common";
    .float-bar {
        margin-top: 10px;
        margin-bottom: -60px;
        margin-left: 250px;
        position: fixed;
        bottom: 100px;
        right: 20px;
        .icon {
            width: 30px;
            height: 30px;
            margin-right: 5px;
        }
        .item {
            a {
                display: block;
            }
        }
    }
</style>
