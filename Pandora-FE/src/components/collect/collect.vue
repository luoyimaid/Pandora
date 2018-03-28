<template>
  <div class="collect">
    <!--引入头部组件-->
    <tabBar text="我的收藏"></tabBar>
    <!--下拉框-->
    <div class="choose">
      <div class="page-actionsheet-wrapper-choosePlace">
        <button class="mint-button mint-button--default mint-button--large" @click="choosePlace">
          <label class="mint-button-text">{{text1}}</label>
        </button>
      </div>
      <mt-actionsheet :actions="data1" v-model="sheetVisible1"></mt-actionsheet>
      <div class="page-actionsheet-wrapper-chooseKind">
        <button class="mint-button mint-button--default mint-button--large" @click="chooseKind">
          <label class="mint-button-text">{{text2}}</label>
        </button>
      </div>
      <mt-actionsheet :actions="data2" v-model="sheetVisible2"></mt-actionsheet>
      <div class="page-actionsheet-wrapper-chooseTime">
        <button class="mint-button mint-button--default mint-button--large" @click="chooseTime">
          <label class="mint-button-text">{{text3}}</label>
        </button>
      </div>
      <mt-actionsheet :actions="data3" v-model="sheetVisible3"></mt-actionsheet>
    </div>
    <!--店铺列表-->
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10" class="main">
        <li v-for="(item,index) in dataAll" class="list" @click="trunToStore(item,index)">
          <div class="pic">
          <img :src="item.storeIcon">
        </div>
          <div class="message">
            <p class="name">{{item.storeName}}</p>
            <p class="address">地址：<span>{{item.storeAddress}}</span></p>
            <p class="telephone">电话：<span>{{item.storeTel}}</span></p>
          </div>
        </li>
      </ul>
    <!--引入底部组件-->
  </div>
</template>

<script>
  import tabBar from '@/components/base/tabbar/tabbar'//引入头部组件
  import axios from 'axios'
  var bPlace = true;
  var bKind = true;
  var j = 0;
  export default {
    components:{
      tabBar
    },
    data() {
      return{
        text1:"按地区",
        text2:"按类别",
        text3:"按时间",
        dataAll:[],
        data1:[],
        data2:[],
        arrPlace : [this.choosePlace1,this.choosePlace2,this.choosePlace3,this.choosePlace4],
        arrKind : [this.chooseKind1,this.chooseKind2,this.chooseKind3,this.chooseKind4,this.chooseKind5,this.chooseKind6],
        linkList:[],
        data3:[{
          name:"近三天",
          method:this.chooseTime1
        },{
          name:"近一周",
          method:this.chooseTime2
        },{
          name:"近一月",
          method:this.chooseTime3
        }],
        // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        sheetVisible1: false,
        sheetVisible2: false,
        sheetVisible3: false,
        status:"",
        }
    },
    methods:{
      _initOrderListData () {
        const goodStore =  'http://192.168.0.114:8080/rener/colles/list.do';
        axios.get(goodStore).then(res => {
          this.dataAll = Object.assign([], res.data.storesInfo.first);
          this.linkList = Object.assign([], res.data.storesInfo.second);
          console.log(this.dataAll);
        }).catch(err => {
          console.log(err);
        })
      },
      changeAllText:function(){
        this.text1 = "按地区";
        this.text2 = "按类型";
        this.text3 = "按时间";
      },
      choosePlace:function(){
        const allPlace =  ' http://192.168.0.114:8080/rener/colles/selectAreaString';
        if(bPlace){
          axios.get(allPlace).then(res => {
            var data = Object.assign([], res.data);
            for(let i = 0;i < data.length;i++){
              var obj = {};
              obj.name = data[i];
              obj.method = this.arrPlace[i];
              this.data1.push(obj);
            }
          }).catch(err => {
            console.log(err);
          });
        }
        bPlace = false;
        this.sheetVisible1 = true;
      },
      chooseKind:function(){
        const allKind =  'http://192.168.0.114:8080/rener/colles/selectClassString';
        if(bKind){
          axios.get(allKind).then(res => {
            var data = Object.assign([], res.data);
            for(let i = 0;i < data.length;i++){
              var obj = {};
              obj.name = data[i];
              obj.method = this.arrKind[i];
              this.data2.push(obj);
            }
          }).catch(err => {
            console.log(err);
          });
        }
        bKind = false;
        this.sheetVisible2 = true;
      },
      chooseTime:function(){
        this.sheetVisible3 = true;
      },
      choosePlace1: function(place){
        this.text1 = place.name;
        this.text2 = "按类别";
        this.text3 = "按时间";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByArea.do?",{
          params:{
            area: this.text1
          }
        }).then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      choosePlace2: function(place){
        this.text1 = place.name;
        this.text2 = "按类别";
        this.text3 = "按时间";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByArea.do?",{
          params:{
            area: this.text1
          }
        }).then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      choosePlace3: function(place){
        this.text1 = place.name;
        this.text2 = "按类别";
        this.text3 = "按时间";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByArea.do?",{
          params:{
            area: this.text1
          }
        }).then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      choosePlace4: function(place){
        this.text1 = place.name;
        this.text2 = "按类别";
        this.text3 = "按时间";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByArea.do?",{
          params:{
            area: this.text1
          }
        }).then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      turnTostore: function(){
        console.log("跳转到商铺");
      },
      chooseKind1: function(kind){
        this.text1 = "按地区";
        this.text2 = kind.name;
        this.text3 = "按时间";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByClasses?",{
          params:{
            classes: this.text2
          }
        }).then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      chooseKind2: function(kind){
        this.text1 = "按地区";
        this.text2 = kind.name;
        this.text3 = "按时间";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByClasses?",{
          params:{
            classes: this.text2
          }
        }).then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      chooseKind3: function(kind){
        this.text1 = "按地区";
        this.text2 = kind.name;
        this.text3 = "按时间";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByClasses?",{
          params:{
            classes: this.text2
          }
        }).then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      chooseKind4: function(kind){
        this.text1 = "按地区";
        this.text2 = kind.name;
        this.text3 = "按时间";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByClasses?",{
          params:{
            classes: this.text2
          }
        }).then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      chooseKind5: function(kind){
        this.text1 = "按地区";
        this.text2 = kind.name;
        this.text3 = "按时间";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByClasses?",{
          params:{
            classes: this.text2
          }
        }).then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      chooseKind6: function(kind){
        this.text1 = "按地区";
        this.text2 = kind.name;
        this.text3 = "按时间";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByClasses?",{
          params:{
            classes: this.text2
          }
        }).then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      chooseTime1 :function(){
        this.text1 = "按地区";
        this.text2 = "按类别";
        this.text3 = "近三天";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByDates?dateType=threeDays").then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      chooseTime2:function(){
        this.text1 = "按地区";
        this.text2 = "按类别";
        this.text3 = "近一周";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByDates?dateType=oneWeek").then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      chooseTime3:function(){
        this.text1 = "按地区";
        this.text2 = "按类别";
        this.text3 = "近一月";
        axios.get("http://192.168.0.114:8080/rener/colles/selectStoresByDates?dateType=oneMonth").then(res => {
          let data = res.data;
          this.dataAll = Object.assign({},data);
        }).catch(err => {
          console.log(err);
        })
      },
      loadMore() {
        let timer = null;
        timer = this.loading = true;
        setTimeout(() => {
          let last = this.linkList[j];
          for (let i = 0; i < 2 && j < this.linkList.length; i++) {
            this.dataAll.push(last);
            last = this.linkList[++j];
          }
          this.loading = false;
        }, 3000);
        clearTimeout(timer);
      },
      trunToStore:function(item,index){
        let id = item.storeId;
        this.$router.push({
          path : '/storeDetails',
          query : {
            storeId:id
          }
        })
      },
    },
    watch:{
      dataAll:function(val){
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
  .collect{
    .choose{
      height:108px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .page-actionsheet-wrapper-choosePlace,.page-actionsheet-wrapper-chooseKind,.page-actionsheet-wrapper-chooseTime{
        .mint-button{
          height:60px;
          width:227px;
          color: #fff;
          font-size:$font-size-two;
          background: url("./img/smallBg.png") $color-light-pink no-repeat 170px 17px;
        }
      }
    }
    .main{
      height:100%;
      background-color: $color-light-blue;
      padding:20px 30px 0;
      .list{
        margin-bottom:20px;
        display: flex;
        justify-content: center;
        .pic{
          background-color: #fff;
          width:260px;
          height:190px;
          padding:13px 12px 12px;
          img{
            width:100%;
            height:100%;
          }
        }
        .message{
          margin-left:20px;
          background-color: #fff;
          padding:20px;
          width:420px;
          .name{
            font-size:$font-size-one;
            color: $color-dark-pink;
          }
          .address,.telephone{
            font-size:$font-size-three;
            color: $color-dark-blue;
          }
        }
      }
    }
  }
</style>
