<template>
  <div class="footerBar">
    <div class="circle">
      <img src="./almaz.png" @click="popupIcon">
    </div>
    <div class="opacity"></div>
    <div class="pop">
      <img src="./boy.png" class="boy" @click="toPersonalCenter">
      <img src="./home.png" class="home" @click="toMenuBar">
      <img src="./heart.png" class="heart" @click="toCollect">
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  var btn = true;
  export default {
    data () {
      return {
        data2 : []
      }
    },
    methods:{
      popupIcon:function () {
        axios.get('http://192.168.0.114:8080/rener/nineGG/selectCounts').then(resp =>{
          let data = resp.data;
          this.data2 = Object.assign({},data);
          console.log(data);
        }).catch(err => {
          console.log(err)
        });
        if(btn){
          $(".boy").animate({left:"100px", bottom:"35px"},500);
          $(".home").animate({bottom:"75px"},500);
          $(".heart").animate({left:"225px", bottom:"35px"},500);
          $(".opacity").animate({bottom:"-70px"},500);
          btn = !btn;
        }else{
          btn = !btn;
          $(".boy").animate({left:"165px", bottom:"10px"},500);
          $(".home").animate({left:"155px", bottom:"10px"},500);
          $(".heart").animate({left:"165px", bottom:"10px"},500);
          $(".opacity").animate({bottom:"-420px"},500);
        }
      },
      toPersonalCenter:function () {
        if(this.data2.state){
          this.$router.push({
            path: "././personalCenter"
          })
        }else{
          let a = confirm("还没有登录,确认跳转到登录");
          if (a == true) {
            this.$router.push({
              path: '/login'
            })
          }
        }
      },
      toMenuBar:function () {
        this.$router.push({
          path: "././manubar"
        })
      },
      toCollect:function () {
        if(this.data2.state){
          this.$router.push({
            path: "././collect"
          })
        }else{
          let a = confirm("还没有登录,确认跳转到登录");
          if (a == true) {
            this.$router.push({
              path: '/login'
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .footerBar{
    position: fixed;
    left:0;
    bottom:0;
    .opacity{
      position: fixed;
      width:420px;
      height:420px;
      border-radius: 50%;
      left:165px;
      bottom:-420px;
      background-color: rgba(0,0,0,0.3);
    }
    .pop{
      width:100px;
      height:100px;
      img{
        width:100px;
        height:100px;
        position: fixed;
        bottom:20px;
        left:325px;
      }
    }
    .footer{
      width:750px;
      height:70px;
      background-color: $color-dark-blue;
    }
    .circle{
      position: fixed;
      left:305px;
      bottom:0;
      width:140px;
      height:140px;
      background-color: $color-dark-blue;
      border-radius: 50%;
      z-index: 2;
      img{
        width:120px;
        height:120px;
        position: fixed;
        left:315px;
        bottom:10px;

      }
    }
  }
</style>
