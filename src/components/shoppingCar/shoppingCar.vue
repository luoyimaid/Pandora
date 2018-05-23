<template>
  <div class="shoppingCar">
    <div class="header">
      <img src="./img/menu.png" class="menu" @click="backToMenuBar">
      {{text}}
      <div class="functionBtn" @click="turnFunction"><img src="./img/change.png" class="changeFunction"></div>
    </div>
    <div class="main">
      <div class="oneStore" v-for="item in shoppingCar.first">
        <div class="name" @click="turnToStore(item)">
          <div class="left">
            <div class="storeName"><img src="./img/store.png"><span>{{item.storeName}}</span></div>
          </div>
          <div class="right"><img src="./img/tiaozhuan.png"></div>
        </div>
        <div class="oneGood" v-for="(item,index) in item.goodsList
" :index="index">
          <label class="circle1" @mouseup="checkOne(item)"><input type="checkbox" class="checkoutGood"><span class="good"></span></label>
          <div class="pic"><img :src="item.goodsPic"  @click="turnToGoodDetails(item)"></div>
          <div class="message">
            <div class="goodName">{{item.goodsName}}</div>
            <div class="price">
              <div class="nowPrice">现价￥<span class="trueNowPrice">{{item.nowPrice}}</span></div>
              <div class="pastPrice">原价：<span>￥<span>{{item.prePrice}}</span></span></div>
            </div>
            <div class="countall">
              数量：
              <span @click="numChange(item,index , -1)" class="minus">-</span>
              <div class="amount">{{item.count}}</div>
              <span @click="numChange(item,index , 1)" class="plus1">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <label class="chooseAll" @mouseup="checkAll"><input type="checkbox" class="checkAllGoods"><span></span>全选</label>
      <div class="allPrice">合计：<span>￥<span>{{allPrice}}</span></span></div>
      <div class="toSettle" @click="addppp">去结算</div>
      <div class="delete" @click="deletea">删除</div>
    </div>
    <div style="display: none;">{{shoppingCar1}}</div>
  </div>
</template>

<script>
  import axios from 'axios'
//  全选需要的按钮
  var allCheck = document.getElementsByTagName("input");
  var checkAllGood = document.getElementsByClassName("checkAllGoods");
  var bcheck = true;
  var k = 0;
//  商品选择框需要的按钮
  var aCheckGood = document.getElementsByClassName("checkoutGood");
//  数量加减
  var allChoosePrice = document.getElementsByClassName("trueNowPrice");
  var aAmount = document.getElementsByClassName("amount");
//  功能按键和删除按键互换
  var clickBtnFunction = document.getElementsByClassName("changeFunction");
  var addAll = document.getElementsByClassName("toSettle");
  var deleteOne = document.getElementsByClassName("delete");
  var btnFunction = false;
  //删除所需要的商品
  var good = document.getElementsByClassName("oneGood");
  import tabbar  from '@/components/base/tabbar/tabbar'//引入头部组件
  export default {
    components:{
      tabbar
    },
    data () {
      return {
        text: "购物车",
        allPrice:0,
        shoppingCar:[],
        shoppingCar1:[],
        chooseNum:[],
        goodCarId:[],
        goodCarIds:"",
      }
    },
    methods:{
      _initOrderListData () {
        const car = 'http://192.168.0.114:8080/rener/goodsBasket/showBasket';
        axios.post(car).then(res => {
          this.shoppingCar = Object.assign([],res.data);
          console.log(this.shoppingCar);
        }).catch(err => {
          console.log(err);
        })
      },
      backToMenuBar:function () {  //返回九宫格页面
        this.$router.push({
          path:'././manubar'
        })
      },
      checkAll:function(){
        if(!checkAllGood[0].checked){  //全选框被选中
          for(let i = 0 ; i<allCheck.length-1 ; i++){
            allCheck[i].checked = true;
            var all = 0;
          }
          for(let j = 0;j < allChoosePrice.length; j++){
            console.log(allChoosePrice.length);
            all += allChoosePrice[j].innerText * aAmount[j].innerText;
          }
          this.allPrice = parseInt(all);
        }else{
          for(let i = 0 ; i<allCheck.length-1 ; i++){
            allCheck[i].checked = false;
            k = 0;
            var all = 0;
          }
          this.allPrice = 0;
        }
      },
      numChange : function(index1, index, numChange) { //修改数量
        let count1 = index1.count;
        index1.count = count1;
        if(index1.count > 0){
          index1.count = count1+numChange;
          this.shoppingCar1.push(index1.count);
        }
        if(count1+numChange ==0){
          index1.count = 1;
        }
        let changePrice = index1.nowPrice * numChange; //勾选按钮修改数量需要在总价展现
        console.log(changePrice);
        if(aCheckGood[index1.n].checked){ //勾选按钮的时候
          this.allPrice += parseFloat(parseInt(changePrice));
        }
        axios.get("http://192.168.0.114:8080/rener/goodsBasket/modifyCnt?",{
          params:{
            cnt:index1.count,
            goodsCarId:index1.goodsCarId
          }
        }).then(res =>{
          console.log(res);
        });
      },
      turnFunction:function(){  //功能键与删除键互换
        if(btnFunction){

          clickBtnFunction[0].style.top = "-17px";
          addAll[0].style.display = "none";
          deleteOne[0].style.display = "block";
        }else{
          clickBtnFunction[0].style.top = "2px";
          addAll[0].style.display = "block";
          deleteOne[0].style.display = "none";
        }
        btnFunction = !btnFunction;
      },
      checkOne:function(index1){   //每个店铺的选框
        let allPri = index1.nowPrice * index1.count;
        if(!aCheckGood[index1.n].checked){ //勾选按钮的时候
          this.allPrice += parseFloat(parseInt(allPri));
          this.chooseNum.push(index1);
          for(let i = 0 ; i<aCheckGood.length ; i++){
            if(aCheckGood[i].checked){
              k++;
            }
          }
        }else{
            this.allPrice -= parseFloat(parseInt(allPri));
          this.chooseNum.pop();
        }

        console.log(k);
        console.log(aCheckGood.length);
//        console.log(checkAllGood[0].checked);
        k += 1;
        if(k == aCheckGood.length){
          checkAllGood[0].checked = true;
        }else{
          checkAllGood[0].checked = false;
          k = 0;
        }
      },
      deletea:function(){  //删除购物车里的东西
        for(let i = 0; i < aCheckGood.length; i++){
          if(aCheckGood[i].checked){
            console.log(i);
            good[i].style.display = "none";
            this.goodCarId = [];
          }
        }
        for(let j = 0; j < this.chooseNum.length; j++){
          this.goodCarId.push(this.chooseNum[j].goodsCarId);
        }
        this.goodCarIds = this.goodCarId.join(",");
        console.log("goodCarIds:"+this.goodCarIds);
        axios.get("http://192.168.0.114:8080/rener/goodsBasket/deleteGoods?",{
          params:{
            goodsCarIds:this.goodCarIds
          }
        }).then(res =>{
          console.log(res);
        });
        this.allPrice = 0;
        window.location.reload();
      },
      addppp:function(){   //去结算页面
        for(let j = 0; j < this.chooseNum.length; j++){
          this.goodCarId.push(this.chooseNum[j].goodsId);
        }
        this.goodCarIds = this.goodCarId.join(",");
        console.log(this.goodCarId);
        axios.get("http://192.168.0.114:8080/rener/order/save?",{
          params:{
            ids:this.goodCarIds
          }
        }).then(res =>{
          this.$router.push({
            path: '/pay',
            query:{
              ids:this.goodCarIds
            }
          })
          console.log(res);
        });
      },
      turnToStore:function(item){
        let id = item.storeId;
        console.log(item);
        this.$router.push({
          path : '/storeDetails',
          query : {
            storeId:id
          }
        })
      },
      turnToGoodDetails:function(item){
        let id = item.goodsId;
        this.$router.push({
          path: '/goodDetails',
          query : {
            goodsId : id
          }
        })
      }

    },
    created () {
      // 初始化列表数据
      this._initOrderListData()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .shoppingCar{
    .header{
      height: 70px;
      overflow: hidden;
      color: #fff;
      text-align: center;
      line-height: 70px;
      font-size: $font-size-one;
      background-color: $color-dark-blue;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 10px;
      .menu{
        width: 48px;
        height: 48px;
        left: 15px;
        top: 10px;
      }
      .functionBtn{
        width:40px;
        height: 40px;
        padding-top:5px;
        padding-right:25px;
        overflow: hidden;
        position: relative;
        img{
          top:5px;
          width:40px;
          height:80px;
          background-color: #fff;
          border-radius: 10%;
          position: absolute;
        }
      }
    }
    .main{
      background-color: $color-light-blue;
      padding:30px 30px 100px;
      .oneStore {
        background-color: #fff;
        padding: 10px;
        margin-bottom:20px;
        .name {
          display: flex;
          justify-content: space-between;
          padding-right: 5px;
          margin-bottom: 20px;
          .left {
            display: flex;
            justify-content: flex-start;
            .storeName {
              display: flex;
              align-items: center;
              img {
                width: 45px;
                height: 45px;
                margin-left: 42px;
              }
              span {
                font-size: 32px;
                color: #999;
                line-height: 45px;
                margin-left: 20px;
                display: inline-block;
              }
            }
          }
        }
        .oneGood {
          margin-bottom: 20px;
          display: flex;
          justify-content: flex-start;
          .circle1{
            width: 40px;
            height: 40px;
            input {
              display: none;
            }
            span {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: block;
              background-color: #E8E7E4;
            }
            input:checked ~ span {
              background: url("./img/check.png") #f27473 no-repeat -9px -17px;
            }
          }
          .pic {
            margin: 0 10px;
            img {
              width: 140px;
              height: 130px;
            }
          }
          .message {
            .goodName {
              font-size: 30px;
              color: #666;
            }
            .price {
              display: flex;
              justify-content: flex-start;
              .nowPrice {
                font-size: 28px;
                color: $color-dark-pink;
                margin-right: 30px;
              }
              .pastPrice {
                font-size: 28px;
                color: #ccc;
                margin-right: 30px;
              }
            }
            .countall {
              font-size: 32px;
              margin-right: -100px;
              span {
                display: inline-block;
                width: 45px;
                height: 45px;
                text-align: center;
                line-height: 45px;
                background-color: $color-light-blue;
                border-radius: 50%;
              }
              div{
                display: inline-block;
              }
            }
          }
        }
      }
    }
    .footer{
      width:100%;
      height:100px;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      padding:0 0 0 30px;
      align-items: center;
      .chooseAll{
        display: flex;
        justify-content: flex-start;
        font-size:$font-size-one;
        color: #666;
        input {
          display: none;
        }
        span {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: block;
          background-color: #E8E7E4;
          margin-right:5px;
        }
        input:checked~span{
          background: url("./img/check.png") #f27473 no-repeat -9px -15px;
        }
      }
      .allPrice{
        font-size:32px;
        color: #666;
        span{
          color: $color-dark-pink;
        }
      }
      .toSettle{
        width:250px;
        background-color: $color-dark-blue;
        height:100%;
        text-align: center;
        font-size:32px;
        line-height: 100px;
        color: #fff;
      }
      .delete{
        width:250px;
        background-color: $color-dark-blue;
        height:100%;
        text-align: center;
        font-size:32px;
        line-height: 100px;
        color: #fff;
        display: none;
      }
    }
  }

</style>
