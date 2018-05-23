<template>
  <div class="good-details">
    <header-bar :text="this.details.goodsName"></header-bar>
    <!-- 轮播图 -->
    <div class="slider">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item in swipeData" :key="item.pic">
          <img :src="item.pic">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="good-content">
      <div class="good-name">{{details.goodsName}}</div>
      <div class="good-sale">月售{{details.goodsSales}}份&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;好评率{{details.praiseRate * 100}}%</div>
      <div class="good-price">￥{{details.nowPrice}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>￥{{details.goodsPrice}}</span></div>
      <div class="good-discount">{{details.discountRate * 10}}折</div>
      <div class="icon-gather">
        <div class="icon-cart-f"><div class="icon-cart" @click="fullCart" ><img src="./img/cart1.png"></div></div>
        <div class="icon-favor-f"><div class="icon-favor" @click="fullFavor"><img src="./img/favor1.png"></div></div>
        <div class="back-store" @click="toStoreDetails">返回店铺</div>
      </div>
    </div>
    <div class="good-commit-f">
      <div class="good-commit">
        <div class="all-commits">全部评价<span>(267)</span></div>
        <img src="./img/trans.png" class="trans" @click="toAllComment">
        <div class="nav">
          <mt-button size="small" @click.native.prevent="active = 'tab-container1'" class="mt-button" v-on:click="changeColor(0)">全部</mt-button>
          <mt-button size="small" @click.native.prevent="active = 'tab-container2'" class="mt-button" v-on:click="changeColor(1)">最新</mt-button>
          <mt-button size="small" @click.native.prevent="active = 'tab-container3'" class="mt-button" v-on:click="changeColor(2)">晒图评价</mt-button>
        </div>
        <div class="good-tag">
          <div class="border">味道赞 267</div>
          <div class="border">服务热情 177</div>
          <div class="border">味道好 164</div>
        </div>
        <div class="line"></div>
        <div class="page-tab-container">
          <mt-tab-container class="page-tabbar-tab-container" v-model="active">
            <mt-tab-container-item id="tab-container1">
              <div v-for="item in noPic">
                <div class="tab1">
                  <img :src="item.userPhoto" class="left-img">
                  <div class="right-content">
                    <div class="name">{{item.userNickname}}</div>
                    <div class="second-block">
                      <div class="star">
                        <img src="./img/redstar.png" v-for="n in item.praiseLevel">
                      </div>
                      <div class="time">{{item.createTime}}</div>
                    </div>
                    <div class="commit">{{item.commentInfo}}</div>
                  </div>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
              <div v-for="item in newest">
                <div class="tab1">
                  <img :src="item.userPhoto" class="left-img">
                  <div class="right-content">
                    <div class="name">{{item.userNickname}}</div>
                    <div class="second-block">
                      <div class="star">
                        <img src="./img/redstar.png" v-for="n in item.praiseLevel">
                      </div>
                      <div class="time">{{item.createTime}}</div>
                    </div>
                    <div class="commit">{{item.commentInfo}}</div>
                    <img class="commentPic" v-for="item in item.photoURL" :src="item">
                  </div>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container3">
              <div v-for="item in havePic">
                <div class="tab1">
                  <img :src="item.userPhoto" class="left-img">
                  <div class="right-content">
                    <div class="name">{{item.userNickname}}</div>
                    <div class="second-block">
                      <div class="star">
                        <img src="./img/redstar.png" v-for="n in item.praiseLevel">
                      </div>
                      <div class="time">{{item.createTime}}</div>
                    </div>
                    <div class="commit">{{item.commentInfo}}</div>
                    <img class="commentPic" v-for="item in item.photoURL" :src="item">
                  </div>
                </div>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var btn1 = true;
  var btn2 = true;
  import headerBar from '@/components/base/headerbar/headerbar'
  import axios from 'axios'
  export default {
    name: 'page-tab-container',
    data () {
      return {
        active: 'tab-container1',
        swipeData: [],
        details:[],
        noPic:[],
        havePic:[],
        newest:[],
        cart:[],
        data2:[],
        data3: []
      }
    },
    components:  {
      headerBar
    },
    methods:{
      toAllComment:function(){
        this.$router.push({
          path:"./allOderComments",
          query:{
            type : this.details.storeId
          }
        })
      },
      toStoreDetails:function(){
        this.$router.push({
          path:"./storeDetails",
          query:{
            storeId : this.details.storeId
          }
        });
      },
      fullFavor:function () {
        let iconFavor = document.getElementsByClassName("icon-favor")[0];
        let starURL = "http://192.168.0.114:8080/rener/colleState/changeState";
        axios.get(starURL,{params:{
          storeId:this.details.storeId
        }}).then(resp => {
          if(this.data3.state){
            if(btn2 && this.details.colleState === 0){
              iconFavor.style.top = -25 + "px";
              this.details.colleState = 1;
              btn2 = !btn2;
            }else if(!btn2 && this.details.colleState === 1){
              btn2 = !btn2;
              iconFavor.style.top = 0;
              this.details.colleState = 0;
            }
          }
         else{
            let a = confirm("还没有登录,确认跳转到登录");
            if (a == true) {
              this.$router.push({
                path: '/login'
              })
            }
          }

        }).catch(err => {
          console.log(err);
        });
      },
      fullCart:function () {
        let iconCart = document.getElementsByClassName("icon-cart")[0];
        let cartURL1 = "http://192.168.0.114:8080/rener/goodsBasket/addGoods";
        let cartURL2 = "http://192.168.0.114:8080/rener/goodsBasket/offMark";
        if(this.data3.state){
          if(btn1){
            axios.get(cartURL1,{params:{
              goodsId:this.details.goodsId
            }}).then(resp => {
              console.log(this.details.goodsId);
              iconCart.style.top = -25 + "px";
              btn1 = !btn1;
            }).catch(err => {
              console.log(err);
            });
          }else if(!btn1){
            axios.get(cartURL2,{params:{
              goodsId:this.details.goodsId
            }}).then(resp => {
              btn1 = !btn1;
              iconCart.style.top = 0;
            }).catch(err => {
              console.log(err);
            })
          }
        }else{
          let a = confirm("还没有登录,确认跳转到登录");
          if (a === true) {
            this.$router.push({
              path: '/login'
            })
          }
        }
      },
      changeColor:function (message) {
        let aButton = document.getElementsByClassName("mt-button");
        for(let i=0;i<aButton.length;i++){
          aButton[i].style.backgroundColor = "#fff";
          aButton[i].style.color = "#9bb1c8";
        }
        aButton[message].style.backgroundColor = "#9bb1c8";
        aButton[message].style.color = "#fff";
      },
      _initComments (){
        let that = this;
        function getDetails(){
          return axios.get('http://192.168.0.114:8080/rener/goods/showOneGoods',{
            params : {
            goodsId : that.$route.query.goodsId
          }})
        }
        function getComments() {
          return axios.get('http://192.168.0.114:8080/rener/comment/selectAllByGoodsIdPlus',{params:{
            goodsId:that.$route.query.goodsId,
            page:0
          }})
        }
        axios.all([getDetails(),getComments()]).then(
          axios.spread(function(resp,com){
            let data1 = resp.data;
            let data2 = com.data;
            console.log(data1);
            console.log(data2);
            that.details = Object.assign([], data1);
            that.noPic = Object.assign([],data2.NoPic);
            that.havePic = Object.assign([],data2.Pic);
            that.newest = Object.assign([],data2.newest);
            for(let i = 0; i < data1.goodsPicDetail.length; i++){
              let obj = {};
              obj.pic = data1.goodsPicDetail[i];
              that.swipeData.push(obj);
            }
          })
        ).catch(err1 => {console.log(err1)},err2 => {console.log(err2)})
      },
      _initData: function () {
        axios.get('http://192.168.0.114:8080/rener/nineGG/selectCounts').then(resp =>{
          let data = resp.data;
          this.data3 = Object.assign({},data);
          console.log(data);
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created (){
      this._initComments(),
        this._initData()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .good-details{
    background-color: $color-light-blue;
    /*position: fixed;*/
    height:100%;
    width:100%;
    .slider{
      width:100%;
      height:400px;
      img{
        width:100%;
        height:400px;
      }
    }
    .good-content{
      height:180px;
      padding:0 30px;
      position: relative;
      background-color: #fff;
      padding-top: 10px;
      padding-bottom: 10px;
      .good-name{
        line-height: 54px;
        color: $color-dark-pink;
        font-size: $font-size-two;
        margin-bottom: 20px;
      }
      .good-sale{
        line-height: 40px;
        font-size: $font-size-three;
      }
      .good-price{
        color: $color-dark-pink;
        font-size: $font-size-two;
        span{
          font-size: 16px;
          color: #000;
          text-decoration: line-through;
        }
      }
      .good-discount{
        font-size: $font-size-three;
        color: $color-dark-pink;
        line-height: 40px;
      }
      .icon-gather{
        width:120px;
        height:100px;
        position: absolute;
        right:30px;
        top:15px;
        .back-store {
          width: 120px;
          height: 40px;
          background-color: $color-dark-pink;
          color: #fff;
          border-radius: 5px;
          text-align: center;
          line-height: 40px;
          margin-top: 60px;
        }
        .icon-cart-f,.icon-favor-f{
          width:50px;
          height:50px;
          overflow: hidden;
          position: relative;
          display: inline-block;
        }
        .icon-cart-f{
          margin-right: 10px;
          .icon-cart{
            position: absolute;
            width: 50px;
            height: 100px;
            left:0;
            top:0;
            img{
              width:50px;
              height:100px;
            }
          }
        }
        .icon-favor-f{
          .icon-favor{
            position: absolute;
            left:0;
            top:0;
            img{
              width:50px;
              height:100px;
            }
          }
        }
      }
    }
    .good-commit-f{
      padding:30px;
      .good-commit{
        background-color: #fff;
        width:100%;
        height:100%;
        position: relative;
        .all-commits{
          padding:40px 15px 15px;
          font-size: $font-size-one;
          color: $color-dark-pink;
          margin-bottom: 50px;
          span{
            font-size: $font-size-three;
            color: $color-dark-blue;
          }
        }
        .trans{
          position: absolute;
          width:13px;
          height: 21px;
          top:50px;
          right:15px;
        }
        .nav{
          margin:0 auto;
          text-align: center;
          .mt-button{
            width: 150px;
            height:56px;
            background-color: #fff;
            color: $color-dark-blue;
            font-size: $font-size-two;
          }
          .mt-button:nth-child(1){
            background-color: $color-dark-blue;
            color: #fff;
          }
        }
        .good-tag{
          width:510px;
          display: flex;
          justify-content: start;
          margin:40px 15px;
          .border{
            width:166px;
            height:44px;
            font-size: $font-size-three;
            border:2px solid #ccc;
            color: #999;
            border-radius:22px;
            margin-right:10px;
            text-align: center;
            line-height: 44px;
          }
        }
        .line{
          width:663px;
          height:1px;
          background-color: #ccc;
          margin:0 auto;
          margin-bottom: 30px;
        }
        .page-tab-container{
          .tab1{
            margin-bottom: 20px;
            width:660px;
            display: flex;
            justify-content: space-around;
            .left-img{
              width:73px;
              height:73px;
              border-radius: 50%;
            }
            .right-content{
              width:550px;
              .name{
                line-height: 40px;
                font-size: $font-size-three;
              }
              .second-block{
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                img{
                  width:26px;
                  height:26px;
                }
              }
              .commit{
                line-height: 26px;
                font-size: $font-size-three;
                color: #000;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .commentPic{
                width:100px;
                height:100px;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }

</style>
