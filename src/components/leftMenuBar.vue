<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      @select="selectHandle"
      background-color="#D3DCE6"
      :unique-opened="true"
    >
      <el-menu-item index="productAdmin">产品管理</el-menu-item>
      <el-menu-item index="newsAdmin">新闻管理</el-menu-item>
      <el-menu-item index="faqsAdmin">FAQ管理</el-menu-item>
      <el-menu-item index="emailAdmin">联系查看</el-menu-item>
      <el-submenu index="1">
        <template slot="title">
<!--          <i class="el-icon-setting"></i>-->
          <span>配置管理</span>
        </template>
        <el-menu-item index="bannerAdmin">banner管理</el-menu-item>
        <el-menu-item index="paramsAdmin">参数管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

  export default {
    name: 'leftMenuBar',
    data () {
      return {
        defaultActive: 'news',
      }
    },
    methods: {
      selectHandle (index, indexPath) {
        // console.log(index, indexPath)
        this.$router.push({ name: index })
      },
    },
    created () {
      this.defaultActive = this.$route.name
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
