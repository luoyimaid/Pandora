<template>
  <div class="manu-bar">
    <div class="header">RENNER</div>
    <div class="main_f">
      <div class="main">
        <div class="row1">
          <div class="onsale" @click="turnToOnsale">
            <img src="./img/onsale.png">
            <p>优惠</p>
          </div>
          <div class="collect" @click="turnToCollect">
            <img src="./img/collect.png">
            <p>收藏</p>
            <span>{{data2.colleCounts}}</span>
          </div>
          <div class="grouppurchase" @click="turnToGrouppurchase">
            <img src="./img/grouppurchase.png">
            <p>团购</p>
          </div>
        </div>
        <div class="row2">
          <div class="hot" @click="turnToOnHot">
            <img src="./img/hot.png">
            <p>热门</p>
          </div>
          <div class="account" @click="turnToAccount">
            <img src="./img/account.png">
            <p>账户</p>
          </div>
          <div class="shoppingcar" @click="trunToShoppingcar">
            <img src="./img/trash.png">
            <p>购物车</p>
          </div>
        </div>
        <div class="row3">
          <div class="rankinglist" @click="turnToRankinglist">
            <img src="./img/rankinglist.png">
            <p>排行榜</p>
          </div>
          <div class="order" @click="turnToOrder">
            <img src="./img/order.png">
            <p>订单</p>
            <span>{{data2.orderCounts}}</span>
          </div>
          <div class="nearby" @click="trunToNearby">
            <img src="./img/nearby.png">
            <p>附近</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        data2 :[],
      }
    },
    methods: {
      turnToOnsale:function(){
        console.log("跳转到优惠");
      },
      turnToOnHot:function(){
        console.log("跳转到热门");
      },
      turnToRankinglist:function(){
        console.log("跳转到排行榜");
      },
      turnToCollect:function(){
        if(this.data2.state){
          this.$router.push({
            path: '/collect'
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
      turnToAccount:function(){
        if(this.data2.state){
          this.$router.push({
            path: '/personalCenter'
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
      turnToOrder:function(){
        if(this.data2.state){
          this.$router.push({
            path: '/order'
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
      turnToGrouppurchase:function(){
        this.$router.push({
          path: '/Lyindex'
        })
      },
      trunToShoppingcar:function(){
        if(this.data2.state){
          this.$router.push({
            path: '/shoppingCar'
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
      trunToNearby:function(){
        console.log("跳转到附近");
      },
      _initData: function () {
          axios.get('http://192.168.0.114:8080/rener/nineGG/selectCounts').then(resp =>{
            let data = resp.data;
            this.data2 = Object.assign({},data);
            console.log(data);
          }).catch(err => {
            console.log(err)
          })
      }
    },
    created () {
      // 初始化商家数据
      this._initData()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .manu-bar{
    width:100%;
    .header{
      width: 100%;
      height:140px;
      text-align: center;
      line-height:140px;
      background-color: $color-dark-blue;
      color: #fff;
      font-size:80px;
      z-index: 3;
      font-family: 'Magneto';
      position: fixed;
    }
    .main_f{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 40px;
      .main{
        height: 100%;
        background-color: $color-light-blue;
        padding:0px 57px 0px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        div{
          div{
            margin-top:35px;
            img{
              width:185px;
              height:185px;
              padding:10px;
              border-radius: 50%;
              background-color: #fff;
            }
            p{
              margin-top:30px;
              font-size: $font-size-one;
              color: $color-dark-pink;
              font-weight:bold;
              text-align: center;
            }
          }
          .collect{
            position: relative;
            span{
              z-index: 6;
              position: absolute;
              top:180px;
              left:80px;
              display: inline-block;
              width:40px;
              height:40px;
              border-radius: 50%;
              background-color: $color-dark-pink;
              color: #fff;
              font-size:17px;
              text-align: center;
              line-height:40px;
            }
          }
          .order{
            position: relative;
            span{
              z-index: 6;
              position: absolute;
              top:180px;
              left:80px;
              display: inline-block;
              width:40px;
              height:40px;
              border-radius: 50%;
              background-color: $color-dark-pink;
              color: #fff;
              font-size:17px;
              text-align: center;
              line-height:40px;
            }
          }
        }
      }
    }

  }
</style>
