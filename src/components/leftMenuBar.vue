<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      @select="selectHandle"
      background-color="#D3DCE6"
      :unique-opened="true"
    >
      <el-menu-item index="home">注册码</el-menu-item>
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
