<template>
  <div class="good-list">
    <div class="good-list-header">
      <headerBar :text="this.$route.query.type"></headerBar>
    </div>
    <div class="good-select">
      <div class="action-sheet">
        <div class="page-actionsheet-wrapper">
          <input type="button" :value="content1" class="mint-button mint-button--default mint-button--large" id="mint-button1" @click="actionSheet1">
        </div>
        <mt-actionsheet :actions="data1" v-model="sheetVisible1"></mt-actionsheet>
      </div>

      <div class="action-sheet">
        <div class="page-actionsheet-wrapper">
          <input type="button" :value="content2" class="mint-button mint-button--default mint-button--large" id="mint-button2" @click="actionSheet2">
        </div>
        <mt-actionsheet :actions="data2" v-model="sheetVisible2"></mt-actionsheet>
      </div>

      <div class="action-sheet">
        <div class="page-actionsheet-wrapper">
          <input type="button" :value="content3" class="mint-button mint-button--default mint-button--large" @click="actionSheet3">
        </div>
        <mt-actionsheet :actions="data3" v-model="sheetVisible3"></mt-actionsheet>
      </div>
    </div>

    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10" class="goods-content">
      <li v-for="item in list" class="single-good-content clearfix" @click="toGoodDetails">
            <div class="single-good-img"><img :src="item.goodsPic" ></div>
            <div class="single-good-details">
              <div class="good-name">[{{item.storeAddress}}]{{item.goodsName}}</div>
              <div class="good-address">店铺：{{item.storeName}}</div>
              <div class="good-sale">月售：{{item.goodsSales}}份&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;好评率：98%</div>
              <div class="good-discount clearfix">
                <div class="discount-rate">{{item.praiseRate}}折</div>
                <div class="discount-limit">限购一份</div>
              </div>
                <div class="good-price">￥{{item.goodsPrice}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>￥29.5</span></div>
            </div>
      </li>
    </ul>
  </div>
</template>

<script>
  let j = 0;
  import headerBar from '@/components/base/headerbar/headerbar';
  import axios from 'axios'
  export default {
    name: 'action-sheet',
    components: {
      headerBar
    },
    data () {
      return {
        // action 选项内容
        content1:'全部分类',
        content2:'全部商区',
        content3:'智能排序',
        list:[],
        linkList:[],
        data1:[],
        arrData1:[this.allTypes,this.loadSoyean,this.loadPorridge,this.loadMilk,this.loadBread,this.loadSmallSteam,this.loadDotDog,this.loadPacake,this.loadSteam],
        data2:[],
        arrData2:[this.allAddress,this.loadChangan,this.loadLianhu,this.loadWeiyang,this.loadYanta],
        data3:[],
        arrData3:[this.allSort,this.loadSaleNumber,this.loadInHot,this.loadPrice,this.loadInstance],
        //action sheet 默认不显示，为false，操作sheetVisible 可以控制显示和隐藏
        sheetVisible1 : false,
        sheetVisible2 : false,
        sheetVisible3 : false
      }
    },
    methods:{
      _initGoodListData () {
        this.content1 = this.$route.query.type;
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1
        }).then(resp => {
          let data = resp.data;

          for(let i = 0; i < data.goodsType.length; i++){
            let obj = {};
            obj.name = data.goodsType[i].goodsType;
            obj.method = this.arrData1[i];
            this.data1.push(obj);
          }
          for(let i = 0; i < data.goodsAddress.length; i++){
            let obj = {};
            obj.name = data.goodsAddress[i];
            obj.method = this.arrData2[i];
            this.data2.push(obj);
          }
          for(let i = 0; i < data.autoes.length; i++){
            let obj = {};
            obj.name = data.autoes[i];
            obj.method = this.arrData3[i];
            this.data3.push(obj);
          }
          this.list = Object.assign([], data.firstGoods);
          this.linkList = Object.assign([], data.lastGoods);
          console.log(data)
        }).catch(err => {
          console.log(err)
        })
      },
      toGoodDetails:function () {
        this.$router.push({
          path:"./goodDetails"
        })
      },
      actionSheet1: function(){
        // 打开action sheet
        this.sheetVisible1 = true;
      },
      actionSheet2: function(){
        // 打开action sheet
        this.sheetVisible2 = true;
      },
      actionSheet3: function(){
        // 打开action sheet
        this.sheetVisible3 = true;
      },
      allTypes:function(){
        this.content1 = '全部分类';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadPorridge:function(){
        this.content1 = '粥';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
//        this.$options.methods.requireUrl();
      },
      loadBread:function(){
        this.content1 = '面包';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadSoyean:function(){
        this.content1 = '豆浆';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadMilk:function(){
        this.content1 = '牛奶';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadSmallSteam:function(){
        this.content1 = '小笼包';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadDotDog:function(){
        this.content1 = '香肠';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadPacake:function () {
        this.content1 = '煎饼';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadSteam:function(){
        this.content1 = '馒头';
//        console.log(this.content1,this.content2,this.content3);
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      allAddress:function(){
        this.content2 = "全部商区";
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadChangan:function(){
        this.content2 = '长安区';
//        this.$options.methods.requireUrl();
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadYanta:function(){
        this.content2 = '雁塔区';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadLianhu:function(){
        this.content2 = '莲湖区';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadWeiyang:function(){
        this.content2 = '未央区';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      allSort:function(){
        this.content3 = '智能排序';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadSaleNumber:function(){
        this.content3 = '销量';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
//          console.log(resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadInHot:function(){
        this.content3 = '热度';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadInstance:function(){
        this.content3 = '距离';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
      },
      loadPrice:function(){
        this.content3 = '价格';
        axios.post("http://192.168.0.114:8080/rener/allInfo/allGoodsInfo",{
          type:this.content1,
          address:this.content2,
          auto:this.content3
        }).then(resp => {
          this.list = Object.assign([], resp.data.firstGoods);
          this.linkList = Object.assign([], resp.data.lastGoods);
        }).catch(err => {
          console.log(err)
        });
        this.$options.methods.loadMore();
      },
      loadMore() {
        let timer = null;
        timer = this.loading = true;
        setTimeout(() => {
          let last = this.linkList[j];
          for (let i = 0; i < 4 && j < this.linkList.length; i++) {
            this.list.push(last);
            last = this.linkList[++j];
          }
          this.loading = false;
        }, 2000);
        clearTimeout(timer);
      }
    },
    created () {
      this._initGoodListData();
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .good-list{
    .good-select{
      display:flex;
      justify-content: space-around;
      align-items: center;
      height:108px;
      .mint-button--default{
        width:228px;
        height: 60px;
        font-size: $font-size-two;
        color: #fff;
        background: $color-light-pink url("./trans.png") top 15px right 15px no-repeat;
      }
    }
    .goods-content{
      padding:22px 20px 0;
      background-color: $color-light-blue;
      .single-good-content{
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        .single-good-img{
          background-color: #fff;
          width: 262px;
          height:205px;
          margin-right: 20px;
          img{
            margin:8px;
            width:245px;
            height:188px;
          }
        }
        .single-good-details{
          width:600px;
          background-color: #fff;
          padding:22px 80px 22px 25px;
          .good-name{
            font-size: $font-size-three;
            color: $color-dark-pink;
            margin-bottom: 15px;
          }
          .good-address{
            font-size:16px;
            margin-bottom:5px;
          }
          .good-sale{
            font-size: 16px;
            margin-bottom: 5px;
          }
          .good-discount{
            margin-bottom: 5px;
            .discount-rate{
              float: left;
              width:60px;
              height:22px;
              line-height: 22px;
              text-align: center;
              background-color: $color-light-pink;
              color: #fff;
              font-size: 16px;
            }
            .discount-limit{
              float: left;
              width: 100px;
              height: 19px;
              line-height: 18px;
              text-align: center;
              color:$color-light-pink;
              font-size: 16px;
              border:2px solid $color-light-pink;
            }
          }
          .good-price{
            font-size:$font-size-four;
            color: $color-dark-pink;
            span{
              font-size: 10px;
              color: #000;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
</style>
