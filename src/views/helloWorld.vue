<template>
    <div class="hello">
        hello
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    metaInfo: {
      title: '测试动态路由预渲染', // set a title
      meta: [{ // set meta
        name: 'keyWords',
        content: 'My Example App'
      }],
      link: [{ // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    },
    props: {
      msg: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
