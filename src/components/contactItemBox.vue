<template>
    <div class="item-box">
        <div>
            Chengdu Gauss Power Technology Co., Ltd
        </div>
        <div>Phone: +8618628067519</div>
        <div style="word-wrap: break-word;word-break: break-all">Emai: gausspowermanager@163.com</div>
        <div style="text-align: justify;word-wrap: break-word;word-break: break-all">
            Address: 5, 6, 7, 8 Floor, Area C and 6, 7 Floor, Area B, Building 1, No. 200, Tianfu 5th Street,High-tech Zone,Chengdu,
            China (Sichuan) Pilot Free Trade Zone
        </div>
    </div>
</template>

<script>
  export default {
    name: 'contactItemBox'
  }
</script>

<style scoped lang="less">
    .item-box {
        padding: 30px 0;

        div {
            font-size: 19px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(23, 23, 23, 1);
            margin-bottom: 30px;
            line-height: 1.6;
            cursor: pointer;

            &.cate:hover {
                text-decoration: underline;
            }

            &.active {
                color: rgba(251, 164, 35, 1);
            }
        }
    }
</style>
