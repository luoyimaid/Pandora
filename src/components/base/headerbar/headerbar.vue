<template>
  <div class="header-bar">
    {{text}}
    <img src="./back.png" class="header-bar-back">
    <div class="header-bar-left" @click="toBacka">BACK</div>
    <img src="./search.png" class="header-bar-search" @click="TosearchA">
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods:{
      TosearchA:function(){
        this.$router.push({
          path: '/search'
        })
      },
      toBacka: function(){
        this.$router.back(-1)
      }
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
  .header-bar{
    width: 100%;
    height:80px;
    overflow: hidden;
    /*padding:22px 15px 13px;*/
    color: #fff;
    text-align: center;
    line-height:80px;
    font-size: 34px;
    background-color: $color-dark-blue;
    position: relative;
    .header-bar-left{
      font-size: 30px;
      color: $color-dark-blue;
      text-align: center;
      line-height:40px;
    }
    .header-bar-back,.header-bar-left{
      width:113px;
      height:39px;
      position: absolute;
      left:15px;
      top:18px;
    }
    .header-bar-search{
      width:48px;
      height:48px;
      position: absolute;
      right:15px;
      top:15px;
    }
  }
</style>
