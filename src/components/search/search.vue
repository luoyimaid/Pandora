<template>
  <div class="search" onLoad="checkCookie()">
    <!--头部-->
    <div class="header-bar">
      <div class="ba">
        <img src="./img/back.png" class="header-bar-back">
        <div class="header-bar-left" @click="toBack">BACK</div>
      </div>
      <input type="text" class="kuang" id="put" v-on:keyup="unClearSearch">
      <div class="sea" @click="sea">搜索</div>
    </div>
    <div class="aaa">
      <div class="unClearSearch" v-for="item in searchList">{{item.goodsType}}</div>
    </div>
    <!--热门搜索-->
    <div class="search-hot">
      <div class="tit-div">
        <div class="tit">热门搜索</div>
      </div>
      <div class="hot-good">
        <div class="good" v-for="item in searchHot" @click="toGoodlist">
          <span class="baozi">{{item.goodsType}}</span>
        </div>
      </div>
    </div>
    <!--历史记录-->
    <div class="history">
      <div class="tit-div">
        <div class="tit">历史记录</div>
        <img src="./img/垃圾桶.png" alt="图片加载失败" width="20" height="20" @click="deletegood">
      </div>
      <div class="empty-history">历史记录暂时为空</div>
      <div class="hot-good h-hot-goodn" id="h-hot-good-id" v-html="tag">
        <div class="h-good good" v-for="n in 3" @click="toGoodlist"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  let i=0;
  let history=['a','b','c','d','e','f','g','h','j','k'];
  //得到cookie
  function getCookie(key){
    var arr1 = document.cookie.split('; ');
    for(var i=0;i<arr1.length;i++){
      var arr2 = arr1[i].split('=');
      if(arr2[0]==key){
        return decodeURI(arr2[1]);
      }
    }
  }
  window.onload=function () {
    let arr=[];
    arr[0]=getCookie("undefined");
    for(let i=1;i<history.length;i++){
      arr[i]=getCookie(history[i-1]);
    }
    for(let m=0 ;m<arr.length&&arr[m]!=undefined;m++){
      var oSpan=document.createElement('span');
      var oDiv=document.createElement('div');
      oDiv.className="h-good good";
      oSpan.className="baozi";
      oSpan.innerHTML=arr[m];
      oDiv.appendChild(oSpan);
      document.getElementsByClassName('empty-history')[0].innerHTML='';
      document.getElementById('h-hot-good-id').appendChild(oDiv);
      oSpan.style.backgroundColor="#e6e6f3";
      oSpan.style.boxSizing="border-box";
      oSpan.style.fontSize="15px";
      oSpan.style.textAlignt="center";
      oSpan.style.lineHeight="22px";
      oSpan.style.height="32px";
      oSpan.style.borderRadius="5px";
      oSpan.style.marginRight="30px";
      oSpan.style.marginBottom="30px";
      oSpan.style.display="block";
      oSpan.style.padding="5px";
    }
  }
  export default {
    data () {
      return {
        searchHot:[],
        searchList:[],
        historyA:[],
        tag:''
      }
    },
    methods:{
      deletegood:function () {
        document.getElementsByClassName('history')[0].style.display='none';
      },
      toGoodlist:function () {
        this.$router.push({
          path:'/goodlist'
        })
      },
      toBack: function () {
        this.$router.back(-1)
      },
      sea:function () {
        let oDate=new Date();
        document.cookie = history[getCookie('i')]+'='+document.getElementById("put").value+';expires='+oDate.setDate(oDate.getDate()+30)+oDate.toGMTString();
        document.cookie = 'i'+'='+i+';expires='+oDate.setDate(oDate.getDate()+30)+oDate.toGMTString();
        ++i;
        let value=document.getElementById("put").value;
        this.$router.push({
          path:'/goodlist',
          query:{
            type:value
          }
        });
      },
      unClearSearch:function () {
        let value=document.getElementById("put").value;
        axios.get('http://192.168.0.114:8080/rener/fuzzySelectType/selectType',{
          params:{
            types:value
          }
        }).then(res => {
          console.log(res.data);
          if(res.data.selectGoodsType.length!=0){
            document.getElementsByClassName('empty-history')[0].style.display="none";
          }
          this.searchList=Object.assign({},res.data.selectGoodsType);
        }).catch(err => {
          console.log("搜索列表页请求失败!")
        })
      },
      _initSearchListData:function(){
        axios.get('http://192.168.0.114:8080/rener/fuzzySelectType/goodsHeatType').then(res => {
          console.log(res.data);
          this.searchHot=Object.assign({},res.data.goodsHeatType);
        }).catch(err => {
          console.log("搜索页请求失败!")
        })

      }
    },
    created () {
      // 初始化列表数据
      this._initSearchListData()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/const.scss';
  .search{
    position: relative;
    .header-bar{
      width: 100%;
      height:70px;
      color: #fff;
      font-size: $font-size-one;
      background-color: $color-dark-blue;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .header-bar-left{
        font-size: $font-size-one;
        color: $color-dark-blue;
        text-align: center;
        line-height:40px;
        width:113px;
        height:39px;
        position: absolute;
        left:6px;
        top:12px;
        padding-left: 15px;
      }
      .header-bar-back{
        width:113px;
        height:39px;
        padding-left: 15px;
      }
      .sea{
        margin-right: 15px;
      }
      .kuang{
        height: 45px;
        background-color: #ffffff;
        width: 70%;
        border-radius: 10px;
        outline: none;
      }
    }
    .aaa{
      position: absolute;
      width: 71%;
      margin-left: -32%;
      left: 50%;
      .unClearSearch{
        height: 40px;
        color: #ffffff;
        line-height: 40px;
        background-color: #000000;
        padding-left:15px;
        padding-top: 5px;
        opacity: 0.2;
        border-bottom: 1px #ffffff solid;
      }
    }
    .search-hot{
      padding: 30px 30px 0 30px;
      .tit-div{
        padding-bottom: 30px;
        .tit{
          color: #868686;
          font-size: 26px;
        }
      }
      .hot-good{
        display: flex;
        flex-wrap: wrap;
        .good{
          padding-bottom: 30px;
          .baozi{
            box-sizing: border-box;
            font-size: 22px;
            text-align: center;
            line-height: 50px;
            height: 50px;
            border-radius: 10px;
            background-color: #e6e6f3;
            padding: 10px;
            margin-right: 30px;
          }
        }
      }
    }
    .history{
      padding: 10px 30px 0 30px;
      .empty-history{
        line-height: 50px;
        text-align: center;
        font-size: 26px;
        color: #868686;
      }
      .tit-div{
        padding-bottom: 30px;
        display: flex;
        justify-content: space-between;
        .tit{
          color: #868686;
          font-size: 26px;
        }
      }
      .hot-good{
        display: flex;
        flex-wrap: wrap;
        .good{
          padding-bottom: 30px;
          .baozi{
            box-sizing: border-box;
            font-size: 22px;
            text-align: center;
            line-height: 50px;
            height: 50px;
            border-radius: 10px;
            background-color: #e6e6f3;
            padding: 10px;
            margin-right: 30px;
          }
        }
      }
    }
  }
</style>
