<template>
    <div class="com-item-fill share-bar">
        <div class="com-item-con">
            <a target="_blank"
               href="https://www.facebook.com/armor4cos/">
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
    name: 'shareBar'
  }
</script>

<style scoped lang="less">
    @import "../styles/common";
    .share-bar {
        margin-top: 10px;
        margin-bottom: -60px;
        margin-left: 250px;
        .icon {
            width: 50px;
            height: 50px;
            margin-right: 5px;
        }
    }
</style>
