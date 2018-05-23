   <template>
  <div class="index">
    <tab-Bar></tab-Bar>
    <!-- 轮播图 -->
    <div class="slider">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(item,index) in swipeData" :index="index" :key="item.goodsSamplePic">
          <img :src="item.goodsSamplePic" @click="toGoodList(item,index)">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <section class="keyWordsSection">
      <div class="keyWordsName">关键字</div>
      <div class="keyWords">
        <div class="singleKeyWords" style="height: 30px;width: 70px;line-height: 30px" v-for="(item,index) in keyWords" @click="keysToGoodList(item,index)">{{item.goodsType}}</div>
      </div>
    </section>
    <section class="allPurchase">
      <div class="allPurchaseName">全部团购</div>
      <!--引入动作表单组件-->
      <div class="good-select">
        <div class="action-sheet">
          <div class="page-actionsheet-wrapper">
            <button class="mint-button mint-button--default mint-button--large" @click="actionSheet1">
              <label class="mint-button-text">{{content1}}</label>
            </button>
          </div>
          <mt-actionsheet :actions="data1" v-model="sheetVisible1"></mt-actionsheet>
        </div>

        <div class="action-sheet">
          <div class="page-actionsheet-wrapper">
            <button class="mint-button mint-button--default mint-button--large" @click="actionSheet2">
              <label class="mint-button-text">{{content2}}</label>
            </button>
          </div>
          <mt-actionsheet :actions="data2" v-model="sheetVisible2"></mt-actionsheet>
        </div>

        <div class="action-sheet">
          <div class="page-actionsheet-wrapper">
            <button class="mint-button mint-button--default mint-button--large" @click="actionSheet3">
              <label class="mint-button-text">{{content3}}</label>
            </button>
          </div>
          <mt-actionsheet :actions="data3" v-model="sheetVisible3"></mt-actionsheet>
        </div>
      </div>
      <!--引入无限加载组件-->
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10" class="goods-content">
        <li v-for="(item,index) in list" class="single-good-content clearfix" @click="toGoodDetails(item,index)">
          <div class="single-good-img"><img :src="item.goodsPic" ></div>
          <div class="single-good-details">
            <div class="good-name">[{{item.storeAddress}}]{{item.goodsName}}</div>
            <div class="discount-inform">{{item.priceDiscripe}}</div>
          </div>
        </li>
      </ul>
    </section>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  let timer;
  let j = 0;
  import tabBar from '@/components/base/tabbar/tabbar'
  import footerBar from '@/components/base/footerbar/footerbar'
  import axios from 'axios'
  window.onload = function(){
    clearInterval(timer);
    timer = setInterval(function(){
      for (let i=0; i< $(".singleKeyWords").length; i++) {
        $(".singleKeyWords").eq(i).css({
          "width": Math.random() * 25 + 50 + "px",
          "height": Math.random() * 2 + 25 + "px",
          "line-height": Math.random() * 2 + 25 + "px"
        })
      }
      $(".singleKeyWords").eq(0).offset({top: Math.round(Math.random()*10+175+1), left: Math.round(Math.random()*25+15+1)});
      $(".singleKeyWords").eq(1).offset({top: Math.round(Math.random()*10+175+1), left: Math.round(Math.random()*25+135+1)});
      $(".singleKeyWords").eq(2).offset({top: Math.round(Math.random()*10+175+1), left: Math.round(Math.random()*25+255+1)});
      $(".singleKeyWords").eq(3).offset({top: Math.round(Math.random()*10+215+1), left: Math.round(Math.random()*25+15+1)});
      $(".singleKeyWords").eq(4).offset({top: Math.round(Math.random()*10+215+1), left: Math.round(Math.random()*25+135+1)});
      $(".singleKeyWords").eq(5).offset({top: Math.round(Math.random()*10+215+1), left: Math.round(Math.random()*25+255+1)});
      $(".singleKeyWords").eq(6).offset({top: Math.round(Math.random()*10+255+1), left: Math.round(Math.random()*75+50+1)});
      $(".singleKeyWords").eq(7).offset({top: Math.round(Math.random()*10+255+1), left: Math.round(Math.random()*75+180+1)});

    },3000);
//    clearTimeout(timer);
  };
  export default {
    data () {
      return {
        swipeData: [],
        content1:'全部分类',
        content2:'全部商区',
        content3:'智能排序',
        status:"1",
        data:"",
        keyWords:[],
        list:[],
        linkList:[],
        typeMethods:[this.allType,this.loadSoyean,this.loadPorridge,this.loadMilk,this.loadBread,this.loadSmallSteam,this.loadHotDog,this.loadPancake,this.loadSteamBun],
        data1:[],
        addressMethods:[this.allAddress,this.loadChangan,this.loadLianhu,this.loadWeiyang,this.loadYanta],
        data2:[],
        autosMethods:[this.autoSort,this.loadSaleNumber,this.loadInHot,this.loadPrice,this.loadInstance],
        data3:[],
        //action sheet 默认不显示，为false，操作sheetVisible 可以控制显示和隐藏
        sheetVisible1 : false,
        sheetVisible2 : false,
        sheetVisible3 : false
      }
    },
    components:  {
      tabBar,
      footerBar,
    },
    created (){
      this._initIndex();
    },
    methods:{
      _initIndex(){
        axios.post("http://192.168.0.114:8080/rener/goods/rest",{
          type:this.content1,
          address:this.content2,
          auto:this.content3,
        }).then(resp => {
          console.log(resp.data);
          let data = resp.data;
          this.swipeData = Object.assign([], data.goodsPicName);
          for(let i = 0; i < data.types.length; i++){
            let obj = {};
            obj.name = data.types[i].goodsType;
            obj.method = this.typeMethods[i];
            this.data1.push(obj);
          }
          for(let i = 0; i < data.address.length; i++){
            let obj = {};
            obj.name = data.address[i];
            obj.method = this.addressMethods[i];
            this.data2.push(obj);
          }
          for(let i = 0; i < data.autoes.length; i++){
            let obj = {};
            obj.name = data.autoes[i];
            obj.method = this.autosMethods[i];
            this.data3.push(obj);
          }
          this.list = Object.assign([], data.firstList);
          this.linkList = Object.assign([], data.lastList);
          this.keyWords = Object.assign([],data.goodsType);
        }).catch(err => {
          console.log(err);
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
      allType:function(){
        this.content1 = "全部分类";
        axios.post("http://192.168.0.114:8080/rener/goods/rest",{
          type:this.content1,
          address:this.content2,
          auto:this.content3,
        }).then(resp => {
          this.list = Object.assign([], resp.data.goodsGroup);
        }).catch(err => {
          console.log(err)
        });
        this.$options.methods.loadMore();
      },
      autoSort:function(){
        this.content3 = "智能排序";
        axios.post("http://192.168.0.114:8080/rener/goods/rest",{
          type:this.content1,
          address:this.content2,
          auto:this.content3,
        }).then(resp => {
          this.list = Object.assign([], resp.data.goodsGroup);
        }).catch(err => {
          console.log(err)
        });
        this.$options.methods.loadMore();
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
      loadHotDog:function(){
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
          for (let i = 0; i < 3 && j < this.linkList.length; i++) {
            this.list.push(last);
            last = this.linkList[++j];
          }
          this.loading = false;
        }, 2000);
        clearTimeout(timer);
      },
      toGoodList:function (item,index) {
        this.$router.push({
          path: "./goodlist",
          query:{
            type : this.swipeData[index].goodsType
          }
        });
        console.log(this.swipeData[index].goodsType)
      },
      keysToGoodList:function (item,index) {
        this.$router.push({
          path: "./goodlist",
          query:{
            type : this.keyWords[index].goodsType
          }
        });
        console.log(this.keyWords[index].goodsType)
      },
      toGoodDetails:function (item,index) {
        this.$router.push({
          path: "./goodDetails",
          query:{
            goodsId : this.list[index].goodsId
          }
        });
        console.log(this.list[index].goodsId)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .index{
    .slider{
      width:100%;
      height:218px;
      img{
        width:100%;
        height:218px;
      }
    }
    .keyWordsSection{
      .keyWordsName{
        width:100%;
        height:50px;
        background-color: $color-dark-blue;
        color: #fff;
        font-size: $font-size-one;
        text-align: center;
        line-height: 50px;
      }
      .keyWords{
        width:100%;
        height:260px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        .singleKeyWords{
          margin:20px;
          width:70px;
          height:30px;
          /*padding:20px;*/
          color: #fff;
          background-color: $color-light-pink;
          border-radius: 5px;
          font-size: $font-size-two;
          text-align: center;
        }
        .singleKeyWords:nth-child(2n){
          background-color: $color-dark-blue;
        }
      }
    }
    .allPurchase{
      .allPurchaseName{
        width:100%;
        height:50px;
        background-color: $color-dark-blue;
        color: #fff;
        font-size: $font-size-one;
        text-align: center;
        line-height: 50px;
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
              color: #000;
              margin-bottom: 15px;
            }
            .discount-inform{
              font-size: $font-size-four;
              color: $color-dark-pink;
            }
          }
        }
      }
      .good-select{
        display:flex;
        justify-content: space-around;
        align-items: center;
        height:108px;
        .mint-button--default{
          width:228px;
          height: 60px;
          background: $color-light-pink url("./img/trans.png") top 19px right 15px no-repeat;
          .mint-button-text{
            font-size: $font-size-two;
            color: #fff;
          }
        }
      }
    }
  }
</style>
