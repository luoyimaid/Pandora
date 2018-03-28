<template>
  <div class="main">
    <headerBar text="相册展示"></headerBar>
    <div class="none">--暂时还没有照片--</div>
    <div class="center">
      <div class="photo-top" v-for="item in data2">
        <div class="photo-top-right">
          <p>{{item.monthTime}}</p>
          <span>...</span>
        </div>
        <div class="photo-top-center">
          <img :src="item" alt="" v-for="item in item.photoUrl " v-if="4>3"  width="115" height="110" class="photo-top-center-img">
         <!--<div id="photo-top-center-img" >-->
           <!--<img src="./img/timg.jpg" width="95" height="110">-->
         <!--</div>-->
        </div>
        </div>
    </div>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'  //引入头部组件
  import axios from 'axios'
  export default {
    data () {
      return {
        dataTime : [],
        photoUrlA :[],
        data2 : []
      }
    },
    methods: {
        _initData: function () {
          axios.get('http://192.168.0.114:8080/rener/photo/allMonth?id=1').then( resp=>{
            let data=resp.data;
            this.data2 = Object.assign({},data)
            if(!data.length){
              let None =document.getElementsByClassName('none')[0];
                  None.style.display = 'block';
            }
//            console.log(data);
          }).catch(err => {
            console.log(err);
          })
        }
    },
    components:{
      headerBar
    },
    created () {
      // 初始化商家数据
      this._initData()
    }
  }
//  var imgNumber = document.getElementsByClassName('photo-top-center-img');
//  console.log(imgNumber.length)
</script>

<style  lang="scss" scoped>
  .none{
    width: 100%;
    height: 300px;
    line-height: 300px;
    text-align: center;
    color: #ccc;
    display: none;
  }
  .center{
    padding: 20px 19px;
    .photo-top{
      margin-top: 10px;

      .photo-top-right{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 50px;
        padding-right: 5px;
        color: #ccc;
        span{
          font-weight: bold;
          line-height: 50px;
          padding-bottom: 20px;
        }
        p{
          font-weight: bold;
          font-size: 26px;
          padding-left: 5px;
          color: black;
        }
      }
      .photo-top-center{
        display: flex;
        flex-wrap: wrap;
        #photo-top-center-img{

        }

        img{
          margin-top: 10px;
          margin-right: 7px;
        }
        /*img:nth-of-type(2){*/
          /*margin-left: 10px;*/
          /*margin-right: 15px;*/
        /*}*/
      }

    }
  }
</style>
