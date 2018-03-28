<template>
  <div class="tab-bar">
    {{text}}
    <img src="./menu.png" class="tab-bar-menu" @click="backToMenuBar">
    <img src="./search.png" class="tab-bar-search" @click="TosearchA" >
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods:{
      backToMenuBar:function () {
        this.$router.push({
          path:'././manubar'
        })
      },
      TosearchA:function(){
        this.$router.push({
          path: '/search'
        })
      },
    },
    props: {
      text: {
        type: String,
        default: '团购'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .tab-bar{
    width: 100%;
    height:80px;
    overflow: hidden;
    color: #fff;
    text-align: center;
    line-height:80px;
    font-size: 34px;
    background-color: $color-dark-blue;
    position: relative;
    .tab-bar-menu{
      width:48px;
      height:48px;
      position: absolute;
      left:15px;
      top:12px;
    }
    .tab-bar-search{
      width:48px;
      height:48px;
      position: absolute;
      right:15px;
      top:15px;
    }
  }
</style>
