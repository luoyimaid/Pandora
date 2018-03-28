<template>
  <div class="personal-center">
    <tabBar text="个人中心"></tabBar>
   <div class="banner">
     <div class="banner-left">
       <div class="banner-left-center">
         <img :src="photoUrl" alt="哦,图片丢失了"    >
       </div>
     </div>
     <div class="banner-right" @click="TopersonalInformation">
       <p>{{data2.userNickname}}</p>
       <p>充值有礼(享受会员专享服务)</p>
     </div>
     <div class="right-arrow">
       <img src="./img/out.png" alt="这是一个箭头" width="25" height="25" @click = "ToOut">
     </div>
   </div>
    <div class="center">
      <div class="center-top">
        <div class="center-top-left">
          <p class="center-top-left-top">{{data2.userBalance}}元</p>
          <p class="center-top-left-bottom">我的余额</p>
        </div>
        <div class="center-top-mid">
          <p class="center-top-left-top">{{data2.redPackNum}}个</p>
          <p class="center-top-left-bottom">我的红包</p>
        </div>
        <div class="center-top-right">
          <p class="center-top-left-top">{{data2.userIntegral}}分</p>
          <p class="center-top-left-bottom">我的积分</p>
        </div>
      </div>
      <div class="center-center">
        <div class="center-center-1" @click="TofriendsShow">
          <div class="center-center-1-left">
            <img src="./img/friend.png" alt="哎呦，不见了" width="30" height="30">
            <span>我的好友</span>
          </div>
          <img src="./img/rightarrow.png" alt="哎呦，不见了" width="25" height="25">
        </div>
        <hr>
        <div class="center-center-1" @click="TophotoAlbum">
          <div class="center-center-1-left">
            <img src="./img/photo.png" alt="哎呦，不见了" width="25" height="22" >
            <span>我的相册</span>
          </div>
          <img src="./img/rightarrow.png" alt="哎呦，不见了" width="25" height="25">
        </div>
        <hr>
        <div class="center-center-1" @click="ToComments">
          <div class="center-center-1-left">
            <img src="./img/comments.png" alt="哎呦，不见了" width="25" height="25">
            <span>我的点评</span>
          </div>
          <img src="./img/rightarrow.png" alt="哎呦，不见了" width="25" height="25">
        </div>
        <hr>
        <div class="center-center-1" @click="ToIntegralcenter">
          <div class="center-center-1-left">
            <img src="./img/money.png" alt="哎呦，不见了" width="27" height="23">
            <span>积分中心</span>
          </div>
          <img src="./img/rightarrow.png" alt="哎呦，不见了" width="25" height="28">
        </div>
        <hr>
        <div class="center-center-1" @click="ToserviceCenter">
          <div class="center-center-1-left">
            <img src="./img/ic_local_laundry_service.png" alt="哎呦，不见了" width="24" height="19">
            <span>服务中心</span>
          </div>
          <img src="./img/rightarrow.png" alt="哎呦，不见了" width="25" height="25">
        </div>
        <hr>
      </div>
    </div>
    <footerBar></footerBar>
  </div>
</template>

<script>
  import tabBar from '@/components/base/tabbar/tabbar'//引入头部组件
  import footerBar from '@/components/base/footerbar/footerbar'//引入头部组件
  import  axios from 'axios'    //引入axios
  import headerBar from '@/components/base/headerbar/headerbar'//引入头部组件

  export default {
    data () {
      return {
        photoUrl: [],
        data2 : [],
        data3 : []
      }
    },
    methods: {
      TopersonalInformation: function () {
        this.$router.push({
          path: '/personalFormation'
        })
      },
      ToOut: function () {
        let a = confirm("您确认退出？？");
        if (a == true) {
          this.$router.push({
            path: '/manubar'
          })
          axios.get('http://192.168.0.114:8080/rener/exit').then(resp => {
            let data = resp.data;
          }).catch(err => {
            console.log(err)
          })
        }
      },
      TofriendsShow: function () {
        this.$router.push({
          path: '/friendsShow',
          query:{
           userName : this.data2.userNickname,
            userPhoto : this.data2.userPhoto
          }
        })
      },
      TophotoAlbum: function () {
        this.$router.push({
          path: '/photoAlbum'
        })
      },
      ToComments: function () {
        this.$router.push({
          path: '/allComments',
        })
      },
      ToIntegralcenter: function () {
        /*this.$router.push({
          path: '/integralCenter'
        })*/
        console.log('去积分商城')
      },
      ToserviceCenter: function () {
        this.$router.push({
          path: '/serviceCenter'
        })
      }, Tocollect: function () {
        this.$router.push({
          path: '/collect'
        })
      },
      _initData () {
        axios.get('http://192.168.0.114:8080/rener/userHome/findUserById').then(res => {
          let data = res.data.userHome;
          this.photoUrl = data.userPhoto;
          this.data2 = Object.assign({},data);
//          console.log(this.data2.userId)
//          if (res.data.code === 0) {
//            // this.seller = res.data.data
//
//            // 添加 ID 属性
//            this.seller = Object.assign({}, this.seller, res.data.data)
//          }
//          console.log(this.data2.userNickname);
        }).catch(err => {
          console.log('nill')
        })
      },
//    },
  },
    created () {
      // 初始化商家数据
      this._initData()
    },
    components:{
      tabBar,
      footerBar

    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .personal-center {
    .banner {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 150px;
      width: 100%;
      margin:15px 0 50px 0;
      .banner-left {
        height: 120px;
        float: left;
        display: flex;
        align-items: center;
        .banner-left-center {
          width: 90px;
          height: 90px;
          line-height: 130px;
          padding: 30px;
          text-align: center;
          border-radius: 50%;

          img {
            border-radius: 50%;
            height: 120px;
            width: 120px;
          }
        }

      }
      .banner-right {
        height: 120px;
        width: 485px;
        float: right;
        padding-top: 20px;
        position: relative;
        p {
          color: #000000;
          margin-top: 15px;
        }
        p:nth-of-type(1) {
          font-size: 30px;
        }
        .right-arrow {
          height: 50px;
          width: 50px;
          position: absolute;
          right: 20px;
          top: 50px;
          padding-right: 50px;

          img {
            height: 50px;
            width: 50px;
          }
        }
      }
    }
    .center {
      width: 100%;
      .center-top {
        display: flex;
        justify-content: space-around;
        font-size: $font-size-two;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 150px;
          background-color: #f2f2f2;
          border-radius: 5px;
          padding: 20px;
        }
        .center-top-left-top{
          color: red;

        }
        .center-top-left-bottom{
          color: #000000;
        }
      }
      .center-center{
        .center-center-1{
          height: 120px;
          padding: 0px 18px;
          line-height: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        .center-center-1-left{
          font-size: $font-size-two;
          display: flex;
          align-items: center;
          img{
            margin-right: 5px;
          }
        }
        }
      }
    }
  }

</style>
