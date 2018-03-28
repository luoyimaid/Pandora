<template>
  <div class="order">
    <tabbar text="我的订单"></tabbar>
    <!--选项卡导航 近一个月 进行中 待点评-->
    <div class="nav">
      <mt-button size="small" @click.native.prevent="active = 'tab-container1'" class="mt-button1 mt-button" v-on:click="check(0,'近一个月订单')">近一个月</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container2'" class="mt-button2 mt-button" v-on:click="check(1,'进行中订单')">进行中</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container3'" class="mt-button3 mt-button" v-on:click="check(2,'待点评订单')">待点评</mt-button>
    </div>
    <!--分割线-->
    <div class="line"></div>
    <!--已付款 已取消 进行中状态-->
    <div class="state">
      <div class="payment" v-on:click="check(3,'已付款订单')">
        <img src="./img/已完成.png" alt="图片加载失败" width="40" height="40">
        <div class="payment-name">已付款</div>
      </div>
      <div class="process" v-on:click="check(4,'进行中订单')">
        <img src="./img/进行中.png" alt="图片加载失败" width="40" height="35">
        <div class="progress-name">进行中</div>
      </div>
      <div class="cancel" v-on:click="check(5,'已取消订单')">
        <img src="./img/已取消.png" alt="图片加载失败" width="40" height="28">
        <div class="cancel-name">已取消</div>
      </div>
    </div>
    <!--分割线-->
    <div class="line"></div>
    <!--近一個月訂單head-->
    <div class="one-month-order">
      <div class="head">
        <div id="one">{{text}}</div>
        <span v-on:click="check(6,'全部订单')" >全部订单</span>
      </div>
    </div>
    <!--一个月订单列表-->
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active">
        <mt-tab-container-item id="tab-container1">
          <div class="order-details" v-for="(item,index) in orderListOneMonth" @click="toorderDetails(item,index)">
            <div class="order-shop">
              <img :src="item.tbStores.storeIcon" alt="图片加载失败" width="80px" height="80px">
              <div class="write">
                <div class="shop-name">{{item.tbStores.storeName}}</div>
                <div class="time">下单时间:{{item.payTime}}</div>
                <div class="price">总价:¥{{item.orderTotalprice}}</div>
              </div>
            </div>
            <div class="order-state">{{item.stateMessage}}</div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <div class="order-details" v-for="(item,index) in orderListLoading" @click="toorderDetails(item,index)">
            <div class="order-shop">
              <img :src="item.tbStores.storeIcon" alt="图片加载失败" width="80px" height="80px">
              <div class="write">
                <div class="shop-name">{{item.tbStores.storeName}}</div>
                <div class="time">下单时间:{{item.payTime}}</div>
                <div class="price">总价:¥{{item.orderTotalprice}}</div>
              </div>
            </div>
            <div class="order-state">{{item.stateMessage}}</div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <div class="order-details" v-for="(item,index) in orderListComment" @click="toorderDetails(item,index)">
            <div class="order-shop">
              <img :src="item.tbStores.storeIcon" alt="图片加载失败" width="80px" height="80px">
              <div class="write">
                <div class="shop-name">{{item.tbStores.storeName}}</div>
                <div class="time">下单时间:{{item.payTime}}</div>
                <div class="price">总价:¥{{item.orderTotalprice}}</div>
              </div>
            </div>
            <div class="order-state">{{item.stateMessage}}</div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div id="none">暂无订单信息</div>
    <div class="footer">已经到底啦</div>
  </div>
</template>

<script>
  import tabbar from '@/components/base/tabbar/tabbar'//引入头部组件
  import axios from 'axios'

  var id;
  export default {
    components:{
      tabbar
    },
    name: 'page-tab-container',
    data () {
      return {
        active: 'tab-container1',
        text: '近一个月订单',
        orderListOneMonth:[],
        orderListLoading:[],
        orderListComment:[],
        mess:0
      }
    },
    methods:{
      check: function(message,t){
        var aButton=document.getElementsByClassName('mt-button');
        for(var i=0;i<aButton.length;i++){
          aButton[i].style.backgroundColor='#f69d9d';
        }
        if(-1<message&&message<3){
          aButton[message].style.backgroundColor='#f27473';
        }
        this.text=t;
        if(message == 0){
          this.mess=0;
          axios.get("http://192.168.0.114:8080/order/getOrder?status=1").then(res => {
            if(res.data.msg.items.length==0){
              document.getElementsByClassName('footer')[0].style.display="none";
            }else{
              document.getElementsByClassName('footer')[0].style.display="block"
            }
            this.orderListOneMonth=Object.assign({},res.data.msg.items);
          }).catch(err => {
            console.log("近一个月点击请求失败!")
          })
        }else if(message == 1){
          this.mess=1;
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=2").then(res => {
            if(res.data.msg.items.length==0){
              document.getElementsByClassName('footer')[0].style.display="none";
            }else{
              document.getElementsByClassName('footer')[0].style.display="block"
            }
            this.orderListLoading=Object.assign({},res.data.msg.items);
          }).catch(err => {
            console.log("入口进行中请求失败!")
          })
        }else if(message == 2){
          this.mess=2;
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=3").then(res => {
            if(res.data.msg.items.length==0){
              document.getElementsByClassName('footer')[0].style.display="none";
            }else{
              document.getElementsByClassName('footer')[0].style.display="block"
            }
            this.orderListComment=Object.assign({},res.data.msg.items);
          }).catch(err => {
            console.log("入口待点评请求失败!")
          })
        }else if(message == 3){
          this.mess=3;
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=5").then(res => {
            if(res.data.msg.items.length==0){
              document.getElementsByClassName('footer')[0].style.display="none";
            }else{
              document.getElementsByClassName('footer')[0].style.display="block"
            }
            this.orderListComment=this.orderListOneMonth=this.orderListLoading=Object.assign({},res.data.msg.items);
          }).catch(err => {
            console.log("入口已付款请求失败!")
          })
        }else if(message == 4){
          this.mess=4;
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=2").then(res => {
            if(res.data.msg.items.length==0){
              document.getElementsByClassName('footer')[0].style.display="none";
            }else{
              document.getElementsByClassName('footer')[0].style.display="block"
            }
            this.orderListComment=this.orderListOneMonth=this.orderListLoading=Object.assign({},res.data.msg.items);
          }).catch(err => {
            console.log("入口进行中--黄色块请求失败!")
          })
        }else if(message == 5){
          this.mess=5;
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=4").then(res => {
            if(res.data.msg.items.length==0){
              document.getElementsByClassName('footer')[0].style.display="none";
            }else{
              document.getElementsByClassName('footer')[0].style.display="block"
            }
            this.orderListComment=this.orderListOneMonth=this.orderListLoading=Object.assign({},res.data.msg.items);
          }).catch(err => {
            console.log("入口已取消请求失败!")
          })
        }else{
          this.mess=6;
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=6").then(res => {
            if(res.data.msg.items.length==0){
              document.getElementsByClassName('footer')[0].style.display="none";
            }else{
              document.getElementsByClassName('footer')[0].style.display="block"
            }
            this.orderListComment=this.orderListOneMonth=this.orderListLoading=Object.assign({},res.data.msg.items);
          }).catch(err => {
            console.log("全部订单请求失败!")
          })
        }
      },
      toorderDetails :function (item,index){
        if(this.mess == 0){
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=1").then(res => {
            id=res.data.msg.items[index].orderId;
            this.$router.push({
              path: '/orderDetails',
              query:{
                orderId:id
              }
            })
          }).catch(err => {
            console.log("近一个月点击请求失败!")
          })
        }else if(this.mess == 1){
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=2").then(res => {
            id=res.data.msg.items[index].orderId;
            this.$router.push({
              path: '/orderDetails',
              query:{
                orderId:id
              }
            })
          }).catch(err => {
            console.log("入口进行中请求失败!")
          })
        }else if(this.mess == 2){
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=3").then(res => {
            id=res.data.msg.items[index].orderId;
            this.$router.push({
              path: '/orderDetails',
              query:{
                orderId:id
              }
            })
          }).catch(err => {
            console.log("入口待点评请求失败!")
          })
        }else if(this.mess == 3){
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=5").then(res => {
            id=res.data.msg.items[index].orderId;
            this.$router.push({
              path: '/orderDetails',
              query:{
                orderId:id
              }
            })
          }).catch(err => {
            console.log("入口已付款请求失败!")
          })
        }else if(this.mess == 4){
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=2").then(res => {
            id=res.data.msg.items[index].orderId;
            this.$router.push({
              path: '/orderDetails',
              query:{
                orderId:id
              }
            })
          }).catch(err => {
            console.log("入口进行中--黄色块请求失败!")
          })
        }else if(this.mess == 5){
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=4").then(res => {
            id=res.data.msg.items[index].orderId;
            this.$router.push({
              path: '/orderDetails',
              query:{
                orderId:id
              }
            })
          }).catch(err => {
            console.log("入口已取消请求失败!")
          })
        }else{
          axios.get("http://192.168.0.114:8080/rener/order/getOrder?status=6").then(res => {
            id=res.data.msg.items[index].orderId;
            this.$router.push({
              path: '/orderDetails',
              query:{
                orderId:id
              }
            })
          }).catch(err => {
            console.log("全部订单请求失败!")
          })
        }
      },
      // 初始化列表数据
      _initOrderListData () {
        axios.get('http://192.168.0.114:8080/rener/order/getOrder?status=1').then(res => {
          console.log(res.data);
          if(res.data.msg.items.length==0){
            document.getElementsByClassName('footer')[0].style.display="none";
            document.getElementById('none').style.display="block";
          }else{
            document.getElementsByClassName('footer')[0].style.display="block"
            document.getElementById('none').style.display="none";
          }
          this.orderListOneMonth=Object.assign({},res.data.msg.items);
        }).catch(err => {
          console.log("入口近一个月请求失败!")
        })
      }
    },
    created () {
      // 初始化列表数据
      this._initOrderListData()
    },
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .order {
    .item {
      display: inline-block;
    }
    .nav {
      display: flex;
      height: 96px;
      align-items: center;
      justify-content: space-around;
      .mt-button1 {
        background-color: $color-dark-pink;
        width: 230px;
        height: 62px;
      }
      .mt-button1, .mt-button2, .mt-button3 {
        font-size: 26px;
        color: #ffffff;
        border-radius: 6px;
      }
      .mt-button2, .mt-button3 {
        background-color: $color-light-pink;
        width: 230px;
        height: 62px;
      }
    }
    .line{
      height: 3px;
      background-color: $color-dark-blue;
    }
    .link {
      color: inherit;
      padding: 20px;
      display: block;
    }
    .state{
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 132px;
      font-size: 26px;
    }
    .payment{
      text-align: center;
    }
    .process{
      padding-top: 12px;
      text-align: center;
    }
    .cancel{
      padding-top: 12px;
      text-align: center;
      img{
        text-align: center;
        margin-bottom: 12px;
      }
      justify-content: center;
      align-items: center;
    }
    .one-month-order{
      font-size: 26px;
      color: #979797;
      .head{
        height: 72px;
        line-height:72px;
        padding: 0 30px 0 30px;
        display: flex;
        justify-content: space-between;
        background-color: #f2f2f2;
      }
    }
    #none{
      height: 700px;
      line-height: 700px;
      text-align: center;
      font-size: 30px;
      color: #868686;
    }
    .footer{
      display:none;
      font-size: 26px;
      color:#979797;
      background-color: #e3e3e8;
      height: 64px;
      width: 100%;
      border-top: 1px #d6d6d6 solid;
      line-height: 64px;
      text-align: center;
    }
    .order-details{
      height: 200px;
      border-bottom: 4px solid #f2f2f2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      .order-shop{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          margin-right: 30px;
        }
        .shop-name{
          font-size: 28px;
          font-weight: bold;
          line-height: 50px;
        }
        .time,.price{
          font-size: 22px;
          color: #979797;
          line-height: 48px;
        }
      }
      .order-state{
        color: $color-dark-blue;
      }
    }
  }
</style>
