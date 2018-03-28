<template>
  <div class="pay">
    <!--头部-->
    <headerbar text="结算"></headerbar>
    <!--收货人-->
    <div class="addr-de" @click="toshipping_address">
      <img src="./img/定位.png" alt="图标加载失败" width="35" height="35">
      <div class="address-de">
        <div class="per">
          <div class="person">收货人:{{orderPayDetailsList.consignee}}</div>
          <div class="num">{{orderPayDetailsList.consigneeTel}}</div>
        </div>
        <div class="addr">
          <div class="addresss">收货地址:{{orderPayDetailsList.consigneeAddress}}</div>
          <div class="more"> > </div>
        </div>
      </div>
    </div>
    <div class="section">
      <!--订单信息-->
      <div class="num order-message" v-for="item in orderPayList">
        <div class="tit">订单商品信息</div>
        <div class="res" @click="tostoreDetails">
          <div class="pic">
            <img :src="item.tbStores.storeIcon" alt="图片加载失败" width="60" height="60">
            <div class="res-name">&nbsp;&nbsp;&nbsp;&nbsp;{{item.tbStores.storeName}}</div>
          </div>
          <!--<div class="more"> > </div>-->
        </div>
        <div class="good" v-for="item in item.orderPageDetails" @click="togoodDetails">
          <div class="good-left">
            <img :src="item.tbGoods.goodsPic" alt="图片加载失败" width="50" height="50">
            <div class="number">&nbsp;&nbsp;&nbsp;*{{item.goodsNumber}}</div>
          </div>
          <div class="good-right">
            <div class="good-name">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.tbGoods.goodsName}}</div>
            <div class="good-price">
              <div class="black">¥ {{item.goodsTotalprice}}</div>
              <div class="red">&nbsp;&nbsp;&nbsp;¥ {{item.nowPrice}}</div>
            </div>
          </div>
        </div>
        <div class="send">
          <div>配送费</div>
          <div>¥0</div>
        </div>
        <div class="send">
          <!--<div>买家留言:&nbsp;<input type="text" placeholder="填写内容与买家协商决定"I></div>-->
        </div>
        <div class="send">
          <div>下单时间:&nbsp;&nbsp;&nbsp;{{item.createTime}}</div>
        </div>
        <div class="sum">合计:¥{{item.orderNowprice}}</div>
        <div class="money">优惠0元&nbsp;&nbsp;&nbsp;
          <span style="color: #000000">成交金额:</span>
          <span style="font-size: 14px; color: firebrick">¥{{item.orderNowprice}}</span>
        </div>
      </div>
    </div>
    <!--底部-->
    <div class="footer">
      <div>合计:<span>¥{{price}}</span></div>
      <input type="submit" value="提交订单"  @click="toorderDetails">
    </div>
  </div>
</template>

<script>
  import headerbar from '@/components/base/headerbar/headerbar'
  import { MessageBox } from  'mint-ui';
  import axios from 'axios'
  export default {
    components:{
      headerbar
    },
    data () {
      return {
        orderPayDetailsList:[],
        orderPayList:[],
        orderPayList1:[],
        price:0,
        id:[],
        ids:''
      }
    },
    methods:{
      toshipping_address:function () {
        this.$router.push({
          path:'./shippingAddress'
        })
      },
      tostoreDetails:function () {
        this.$router.push({
          path:'./storeDetails'
        })
      },
      togoodDetails:function () {
        this.$router.push({
          path:'./goodDetails'
        })
      },
      toorderDetails:function () {
        axios.get('http://192.168.0.114:8080/rener/order/receivePay',{
          params:{
            orderIds:this.ids
          }
        }).then(res => {
        }).catch(err => {
          console.log("结算页面请求失败!")
        })
        MessageBox.alert('操作成功').then(action => {
          this.$router.push({
            path:'./LyIndex'
          })
        })
      },
      // 初始化列表数据
      _initPayListData () {
        axios.get('http://192.168.0.114:8080/rener/order/pay',{
          params:{
            ids:this.$route.query.ids
          }
        }).then(res => {
          console.log(res.data)
          for(let i=0;i<res.data.payMsg.orderPages.length;i++){
            this.price+=Number(res.data.payMsg.orderPages[i].orderNowprice);
            this.id.push(res.data.payMsg.orderPages[i].orderId);
          }
          this.ids = this.id.join(",");
          this.orderPayList=Object.assign({},res.data.payMsg.orderPages);
          this.orderPayDetailsList=Object.assign({},res.data.payMsg.address);
        }).catch(err => {
          console.log("结算页面请求失败!")
        })
      }
    },
    created(){
      // 初始化列表数据
      this._initPayListData()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .pay{
    .addr-de{
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 50px;
      .address-de{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100px;
        margin-left: 10px;
        .per{
          width: 600px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 26px;
        }
        .addr{
          width: 600px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 22px;
        }
      }
    }
    .section{
      width: 100%;
      height: 100%;
      background-color: #e3e3e8;
      padding-bottom: 90px;
      .order-message{
        border-top: 30px solid #e3e3e8;
        margin: 0 30px 30px 30px;
        padding: 30px;
        color: #868686;
        font-size: 24px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .sum,.money{
          display: flex;
          justify-content: flex-end;
          line-height: 50px;
        }
        .sum{
          color: #000000;
          line-height: 40px;
        }
        .send{
          display: flex;
          justify-content: space-between;
          line-height: 80px;
          color: #000000;
        }
        .res{
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #e3e3e8;
          padding: 15px 0;
          .pic{
            display: flex;
            align-items: center;
            .res-name{
              color: #000000;
            }
          }
          .more{
            color: #000000;
          }
        }
        .good{
          margin-top: 20px;
          width: 100%;
          height: 100px;
          background-color: #f8f8f8;
          display: flex;
          justify-content: flex-start;
          .good-left{
            display: flex;
            align-items: flex-end;
            color: #000000;
          }
          .good-right{
            width: 900px;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            .good-name{
              color: #000000;
            }
            .good-price{
              display: flex;
              .black{
                color: #000000;
                text-decoration: line-through;
              }
              .red{
                color: firebrick;
              }
            }
          }
        }
      }
    }
    .footer{
      background-color: #f2f2f4;
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: flex-end;
      line-height: 90px;
      font-size: 26px;
      position: fixed;
      bottom: 0;
      span{
        color: firebrick;
        margin-right: 10px;
      }
      input{
        font-size: 26px;
        width: 180px;
        height: 90px;
        text-align: center;
        background-color: $color-dark-blue;
        border: 1px solid $color-dark-blue;
        color: #ffffff;
        outline:none;
      }
    }
  }
</style>
