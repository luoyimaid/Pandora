<template>
  <div class="main">
    <headerBar text="服务中心"></headerBar>
    <div class="center">
      <div class="center-center" @click="Tocomplaints">
        <p>提供投诉</p>
        <img src="./img/Right-arrow.png" alt="哦，图片丢失了" width="25" height="25">
      </div>
      <hr id="hr-bg">
      <div class="center-center">
        <p>版本回退</p>
        <img src="./img/Right-arrow.png" alt="哦，图片丢失了" width="25" height="25">
      </div>
    </div>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'  //引入头部组件
  export default {
    data () {
      return {

      }
    },
    methods: {
      Tocomplaints: function () {
        this.$router.push({
          path: '/complaints'
        })
      }
    },
    components:{
      headerBar
    }
  }
</script>

<style lang="scss" scoped>
  .center{
    background-color: #f2f2f2;
    padding-top: 30px;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 70px;
    .center-center{
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 30px;
      height: 50px;
    }
    #hr-bg{
      height: 0px;
    }
  }
</style>
