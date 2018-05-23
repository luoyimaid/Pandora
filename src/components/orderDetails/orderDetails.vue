<template>
  <div class="orderDetails">
    <!--头部组件-->
    <headerBar text="订单详情"></headerBar>
    <!--中间部分-->
    <div class="section">
      <!--订单已完成-->
      <div class="sec-order">
        <div class="orderFinsh">
          <!--两道杠-->
          <div class="tiao"></div>
          <!--文字-->
          <div class="word">
            <div class="finish">订单{{statusOrder}}</div>
            <div class="thank">感谢您对我们的支持,欢迎再次光临。</div>
            <div class="sub" @click="again">{{button}}</div>
          </div>
        </div>
      </div>
      <!--订单信息-->
      <div class="orderDe" v-for="item in orderListDetails">
        <div class="num-div">
          <div class="num">订单编号&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <span>{{item.orderNum}}</span>
        </div>
        <div class="num-div">
          <div class="num">用 户 名&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <span>&nbsp;&nbsp;{{item.userNickname}}</span>
        </div>
        <div class="num-div">
          <div class="num">提交时间&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <span>{{item.createTime}}</span>
        </div>
        <div class="num-div">
          <div class="num">付款时间&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <span>{{item.payTime}}</span>
        </div>
      </div>
      <!--订单信息-->
      <div class="num order-message" v-for="item in orderListDetails">
        <div class="tit">订单商品信息</div>
        <div class="res" @click="tostoreDetails(item)">
          <div class="pic">
            <img :src="item.tbStores.storeIcon" alt="图片加载失败" width="60" height="60">
            <div class="res-name">&nbsp;&nbsp;&nbsp;&nbsp;{{item.userNickname}}</div>
          </div>
          <div class="more"> > </div>
        </div>
        <div class="good" @click="togoodDetails(item,index)" v-for="(item,index) in orderGoodsDetails">
          <div class="good-left">
            <img :src="item.tbGoods.goodsPic" alt="图片加载失败" width="50" height="50">
            <div class="number">&nbsp;&nbsp;&nbsp;*{{item.goodsNumber}}</div>
          </div>
          <div class="good-right">
            <div class="good-name">{{item.tbGoods.goodsName}}</div>
            <div class="good-price">
              <div class="black">¥ {{item.goodsTotalprice}}</div>
              <div class="red">&nbsp;&nbsp;&nbsp;¥ {{item.goodsTotalprice}}</div>
            </div>
          </div>
        </div>
        <div class="send">
          <div>配送费</div>
          <div>¥0</div>
        </div>
        <div class="sum" v-for="item in orderListDetails">合计:¥{{item.orderTotalprice}}</div>
        <div class="money">优惠0元&nbsp;&nbsp;&nbsp;
          <span style="color: #000000">成交金额:</span>
          <span style="font-size: 14px; color: firebrick">¥{{item.orderTotalprice}}</span>
        </div>
        <!--<div class="contact">-->
          <!--<img src="./img/联系我们.png" alt="图片加载失败" width="18" height="18">-->
          <!--<span class="contact-div">&nbsp;&nbsp;联系商家</span>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'//引入头部组件
  import axios from 'axios'
  export default {
    components:{
      headerBar
    },
    data () {
      return {
        statusOrder:'',
        orderListDetails:[],
        orderGoodsDetails:[],
        button:'再来一单'
      }
    },
    methods:{
      again:function () {
        if(this.button=='去付款'){
          this.$router.push({
            path:'/pay'
          })
        }else if(this.button=='再来一单'){
          this.$router.push({
            path:'/Lyindex'
          })
        }else if(this.button=='去点评'){
          this.$router.push({
            path:'/addComments'
          })
        }else{
        }
      },
      togoodDetails:function (item,index) {
        this.$router.push({
          path:'/goodDetails',
          query:{
            goodsId:this.orderGoodsDetails[index].tbGoods.goodsId
          }
        })
      },
      tostoreDetails:function (item) {
        this.$router.push({
          path:'/storeDetails',
          query:{
            storeId:item.tbStores.storeId
          }
        })
      },
      //初始化数据
      _initOrderDetails(){
        axios.get('http://192.168.0.114:8080/rener/orderDetail/getOrderDetail',{
          params:{
            orderId:this.$route.query.orderId
          }
        }).then(res=>{
          console.log(res.data);
          if(res.data.orderDetail.orderState==4){
            this.statusOrder="已取消";
          }else if(res.data.orderDetail.orderState==2){
            this.statusOrder="进行中";
            this.button="去付款"
          }else if(res.data.orderDetail.orderState==3){
            this.statusOrder="待点评";
            this.button="去点评"
          }else{
            this.statusOrder="已付款";
          }
          this.orderListDetails=Object.assign({},res.data);
          this.orderGoodsDetails=Object.assign({},res.data.orderDetail.orderPageDetails);
        }).catch (err=>{
          console.log("订单详情请求失败!")
        })
      }
    },
    created(){
      //初始化数据
      this._initOrderDetails();
    }
  }
</script>

<style lang="scss" scoped>
.orderDetails{
  .section{
    width: 100%;
    height: 100%;
    background-color: #e3e3e8;
    .sec-order{
      padding: 30px;
      padding-bottom: 0;
      .orderFinsh{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 210px;
        background-color: #ffffff;
        position: relative;
        .tiao{
          width: 40px;
          height: 8px;
          border-top: 3px solid #e4e4e4;
          border-bottom: 3px solid #e4e4e4;
          position: absolute;
          top: 8px;
        }
        .word{
          text-align: center;
          line-height: 45px;
          font-size: 26px;
          .thank{
            color: #868686;
          }
          .finish{
            font-size: 28px;
          }
          .sub{
            text-align: center;
            line-height: 45px;
            width: 170px;
            height: 45px;
            background-color: #ffd161;
            position: relative;
            left: 127px;
          }
        }
      }
    }
    .orderDe{
      height: 160px;
      background-color: #ffffff;
      margin: 30px;
      padding: 30px;
      line-height: 24px;
      font-size: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .num-div{
        display: flex;
      }
      .num{
        color: #868686;
      }
    }
    .order-message{
      margin: 30px;
      padding: 30px;
      color: #868686;
      font-size: 24px;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .contact{
        color:#000000;
        display: flex;
        justify-content: center;
        border-top: 1px solid #cccccc;
        padding-top: 30px;
      }
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
        justify-content: space-between;
        .good-left{
          display: flex;
          align-items: flex-end;
          color: #000000;
        }
        .good-right{
          width: 450px;
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
}
</style>
