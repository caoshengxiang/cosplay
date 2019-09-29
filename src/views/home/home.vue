<template>
  <div class="com-pages">
    <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" v-for="i in 10" :key="i" style="text-align: center">
      <div style="max-width: 300px;width: 100%;height:200px;border: 1px solid red;box-sizing: border-box;display: inline-block;">{{i+1}}</div>
    </el-col>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import API from '../../utils/api'

  export default {
    components: {},
    name: 'home',
    data () {
      return {
      }
    },
    computed: {},
    methods: {
    },
    beforeCreate () {

    },
    created () {
    },
  }
</script>

<style scoped lang="less">
  @import "../../styles/common";

  .history-search {
    margin-bottom: 20px;
  }
</style>
