<template>
  <div class="main">
    <headerBar text="好友展示"></headerBar>
    <mt-index-list id="center">
      <div class="top">
        <div class="top-left">
          <img :src="this.$route.query.userPhoto" alt="哦，头像丢失了" width="30" height="30">
        </div>
        <span>{{this.$route.query.userName}}</span>
      </div>
      <div id="none">--暂时还没有好友--</div >
      <mt-index-section  v-for="item in data2" :index="item.initial">
        <div id="row" v-for="item in item.friendShipVo">
          <img :src="item.userPhoto" alt="" width="30" height="30">
          <mt-cell :title="item.userNickname"></mt-cell>
        </div>
      </mt-index-section>
      </mt-index-list>
  </div>
</template>

<script>
  import headerBar from '@/components/base/headerbar/headerbar'  //引入头部组件
  import axios from 'axios'
  export default {
    components:{
      headerBar,
    },
    methods: {
      _initData: function () {
        axios.get('http://192.168.0.114:8080/rener/friendShip/allFriend?id=3').then(resp => {
//          console.log(resp.data);
          let  data = resp.data;
          this.data2 = Object.assign({}, data);
          if(!data.length){
            let None =document.getElementById('none');
            None.style.display = 'block';
          }
        }).catch(error =>{
          console.log(error);
        })
      },

    },
    created () {
      // 初始化商家数据
      this._initData()
    },
    data () {
      return {
        data2 : []
      }
    },
  }
</script>

<style lang="scss" scoped>
  #center{
    #none{
      width: 100%;
      height: 300px;
      line-height: 300px;
      text-align: center;
      color: #ccc;
      display: none;
    }

    #row{
      display: flex;
      padding-left: 20px;
      img{
        border-radius: 50%;
      }
    }
  .top{
    padding: 20px 10px;
    display: flex;
    align-items: center;
    .top-left{
      img{
        border-radius: 50%;
      }
    }
  }
  }
</style>
